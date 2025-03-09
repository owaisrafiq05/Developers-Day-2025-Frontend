"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight, Check, Plus, Trash2 } from "lucide-react"
import fetchCompetitions from "../../data/data-comp.js" // Import the fetch function
import ReCAPTCHA from "react-google-recaptcha" 

// Define the base form validation schema
const baseFormSchema = {
  competitionCategory: z.string().min(1, "Competition category is required"),
  competitionName: z.string().min(1, "Competition name is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  teamName: z.string().min(1, "Team name is required"),
  brandAmbassadorCode: z.string().optional(),

  // Leader Details
  leaderName: z.string().min(1, "Leader name is required"),
  leaderEmail: z.string()
    .min(1, "Email is required")
    .email("Invalid email format. Please use a valid email address (e.g., example@domain.com)")
    .refine(val => val.includes('@') && val.includes('.'), {
      message: "Email must contain '@' and '.' characters"
    }),
  leaderCnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  leaderPhone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Payment Details
  paymentScreenshots: z.array(z.string()).optional(), // Array of uploaded file names
  entryFee: z.number().optional(), // Entry fee for the competition
};

// Create a member schema factory function
const createMemberSchema = (index, isRequired = true) => {
  const nameField = isRequired 
    ? z.string().min(1, `Member ${index} name is required`)
    : z.string().optional();
  
  const emailField = isRequired
    ? z.string()
        .min(1, "Email is required")
        .email("Invalid email format")
        .refine(val => val.includes('@') && val.includes('.'), {
          message: "Email must contain '@' and '.' characters"
        })
    : z.string().email("Invalid email format").optional();
  
  const cnicField = isRequired
    ? z.string()
        .length(15, "CNIC must be exactly 15 characters")
        .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0")
    : z.string()
        .length(15, "CNIC must be exactly 15 characters")
        .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0")
        .optional();
  
  const phoneField = isRequired
    ? z.string().regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000")
    : z.string().regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000").optional();
  
  return {
    [`member${index}Name`]: nameField,
    [`member${index}Email`]: emailField,
    [`member${index}Cnic`]: cnicField,
    [`member${index}Phone`]: phoneField,
  };
};

// Initial form schema
const FormDataSchema = z.object(baseFormSchema).passthrough();

// Define the form steps
const steps = [
  {
    id: "Step 1",
    name: "Competition Details",
    fields: ["competitionCategory", "competitionName", "instituteName", "teamName", "brandAmbassadorCode"],
  },
  {
    id: "Step 2",
    name: "Leader Information",
    fields: ["leaderName", "leaderEmail", "leaderCnic", "leaderPhone"],
  },
  {
    id: "Step 3",
    name: "Team Members",
    fields: [], // Will be populated dynamically based on team size
  },
  {
    id: "Step 4",
    name: "Review & Submit",
    fields: [],
  },
  {
    id: "Step 5",
    name: "Payment",
    fields: ["paymentScreenshots", "entryFee"],
  },
]

export default function MultiStepForm() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState(""); // State for selected competition
  const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
  const [competitionOptions, setCompetitionOptions] = useState([]); // State for competition options
  const [entryFeeAmount, setEntryFeeAmount] = useState(0); // State to track entry fee amount
  const [teamMembers, setTeamMembers] = useState(0); // Start with 0 member by default
  const [minTeamSize, setMinTeamSize] = useState(1); // Minimum team size
  const [maxTeamSize, setMaxTeamSize] = useState(3); // Maximum team size
  const [validationSchema, setValidationSchema] = useState(FormDataSchema); // Dynamic validation schema
  const delta = currentStep - previousStep
  const [captchaValue, setCaptchaValue] = useState(null); // State for CAPTCHA value
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this near other state variables

  // Update validation schema when team members change
  useEffect(() => {
    let schema = { ...baseFormSchema };
    
    // Add validation for each team member
    for (let i = 1; i <= maxTeamSize; i++) {
      // Required fields for minimum team size, optional for additional members
      const isRequired = i <= minTeamSize;
      const memberSchema = createMemberSchema(i, isRequired);
      schema = { ...schema, ...memberSchema };
    }
    
    setValidationSchema(z.object(schema).passthrough());
  }, [minTeamSize, maxTeamSize, teamMembers]);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...formData,
      leaderPhone: formData.leaderPhone || "+92",
      entryFee: formData.entryFee || 0,
    },
    mode: "onChange", // Validate on change
  })

  // Watch all form values
  const watchedValues = watch()

  // Initialize phone numbers with +92 prefix for all team members
  useEffect(() => {
    // Set default phone number prefix for all team members
    for (let i = 1; i <= maxTeamSize; i++) {
      const phoneField = `member${i}Phone`;
      if (!watchedValues[phoneField]) {
        setValue(phoneField, "+92");
      }
    }
  }, [maxTeamSize, setValue, watchedValues]);

  // Update team members fields in steps array
  useEffect(() => {
    const memberFields = [];
    for (let i = 1; i <= teamMembers; i++) {
      memberFields.push(`member${i}Name`);
      memberFields.push(`member${i}Email`);
      memberFields.push(`member${i}Cnic`);
      memberFields.push(`member${i}Phone`);
    }
    steps[2].fields = memberFields;
  }, [teamMembers]);

  // Fetch competitions on component mount
  useEffect(() => {
    const loadCompetitions = async () => {
      const response = await fetch('https://dev-day-backend.vercel.app/Competition/allCompetitions');
      const data = await response.json();
      console.log("API Response:", data); // Log the full response for debugging
      // Check if the response is valid and contains competitions
      if (data.success && data.competitions) {
        // Convert the competitions object into an array of competition objects
        const competitionsArray = Object.entries(data.competitions).flatMap(([category, competitions]) => 
          competitions.map(comp => ({ ...comp, category }))
        );
        setCompetitionOptions(competitionsArray);
      } else {
        console.error("Fetched competitions is not valid:", data);
        setCompetitionOptions([]); // Reset to empty array if not valid
      }
    };

    loadCompetitions();
  }, []);

  // Update entry fee and team size limits when selected competition changes
  useEffect(() => {
    if (selectedCompetition) {
      const competition = competitionOptions.find(comp => comp.Competition_Name === selectedCompetition);
      if (competition) {
        const fee = parseFloat(competition.Entry_Fee);
        setFormData(prev => ({ ...prev, entryFee: fee }));
        setValue('entryFee', fee); // Update the form value directly
        setEntryFeeAmount(fee); // Update the entry fee amount state
        
        // Set team size limits based on competition
        if (competition.Min_Participants) {
          setMinTeamSize(competition.Min_Participants);
          // Initialize with minimum required members
          setTeamMembers(competition.Min_Participants - 1); // Update to set the correct number of team members
        }
        
        if (competition.Max_Participants) {
          setMaxTeamSize(competition.Max_Participants);
        }
      }
    }
  }, [selectedCompetition, competitionOptions, setValue]);

  // Handle file upload
  const handleFileChange = (event) => {
    console.log("File change event:", event.target.files);
    const files = Array.from(event.target.files);
    setUploadedFiles(files); // Store the actual file objects
    console.log("Uploaded files:", files);
  }

  // Process form submission
  const processForm = async (data) => {
    try {
      setIsSubmitting(true); // Set loading state to true when submission starts
      console.log("processForm called with data:", data);
      
      // Validate that we have at least the minimum number of team members
      if (teamMembers + 1 < minTeamSize) {
        toast.error(`This competition requires at least ${minTeamSize} team members.`);
        setIsSubmitting(false); // Reset loading state
        return;
      }

      // Validate that payment screenshot is uploaded
      if (uploadedFiles.length === 0) {
        toast.error("Please upload a payment screenshot");
        setIsSubmitting(false); // Reset loading state
        return;
      }

      // Validate CAPTCHA
      if (!captchaValue) {
        toast.error("Please complete the CAPTCHA.");
        setIsSubmitting(false); // Reset loading state
        return;
      }

      // Create a new FormData instance
      const formData = new FormData();
      
      // Add all form fields
      formData.append("Competition_Name", data.competitionName);
      formData.append("Institute_Name", data.instituteName);
      formData.append("Team_Name", data.teamName);
      formData.append("L_Name", data.leaderName);
      formData.append("L_Email", data.leaderEmail);
      formData.append("L_Contact", data.leaderPhone.replace("+92", "0")); // Convert to local format
      formData.append("L_CNIC", data.leaderCnic);
      
      // Append members dynamically
      const members = [];
      for (let i = 1; i <= teamMembers; i++) {
        if (data[`member${i}Name`]) {
          members.push({
            Name: data[`member${i}Name`],
            Email: data[`member${i}Email`],
            Contact: data[`member${i}Phone`]?.replace("+92", "0") || "", // Convert to local format
            CNIC: data[`member${i}Cnic`] || "",
          });
        }
      }
      
      // Convert members array to JSON string and append
      const membersJson = JSON.stringify(members);
      console.log("Members JSON:", membersJson);
      formData.append("Members", membersJson);

      // Append the payment photo
      if (uploadedFiles[0]) {
        console.log("Appending file:", uploadedFiles[0].name, uploadedFiles[0].type, uploadedFiles[0].size);
        formData.append("Payment_Photo", uploadedFiles[0]);
      }

      // Append brand ambassador code if available
      if (data.brandAmbassadorCode) {
        formData.append("BA_Code", data.brandAmbassadorCode);
      }

      // Log the FormData contents for debugging
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? `File: ${value.name}` : value}`);
      }

      console.log("Sending API request...");
      
      // Use fetch API instead of axios
      const response = await fetch('https://dev-day-backend.vercel.app/Team/Register', {
        method: 'POST',
        body: formData,
        // No need to set Content-Type header, fetch will set it automatically with the boundary
      });
      
      console.log("API Response status:", response.status);
      
      const responseData = await response.json().catch(() => null);
      console.log("API Response data:", responseData);
      
      if (response.ok) {
        toast.success("Registration successful!");
        // Redirect to success page
        window.location.href = "/registration/success";
      } else {
        toast.error(`Registration failed: ${responseData?.message || "Unknown error"}`);
        setIsSubmitting(false); // Reset loading state on error
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("An error occurred while submitting the form: " + error.message);
      setIsSubmitting(false); // Reset loading state on error
    }
  }

  // Handle next step navigation
  const next = async () => {
    // Update form data with current values
    setFormData((prev) => ({ ...prev, ...watchedValues }));

    // If we're on the review step, submit the form
    if (currentStep === steps.length - 1) {
        console.log("Submitting form from next function");
        await handleSubmit(processForm)();33443
        return;
    }

    // Get the fields for the current step
    const fields = steps[currentStep].fields;

    // If we're on the team members step, validate all member fields
    if (currentStep === 2) {
        // Create an array of fields to validate based on current team members
        const memberFields = [];
        for (let i = 1; i <= teamMembers; i++) {
            // Only validate required fields (up to minTeamSize)
            if (i <= minTeamSize) {
                memberFields.push(`member${i}Name`);
                memberFields.push(`member${i}Email`);
                memberFields.push(`member${i}Cnic`);
                memberFields.push(`member${i}Phone`);
            }
        }

        // Validate all required member fields
        const output = await trigger(memberFields, { shouldFocus: true });
        if (!output) {
            toast.error(`Please fill in all required team member information`);
            return;
        }
    } 
    // For other steps, validate the fields defined in the step
    else if (fields.length) {
        const output = await trigger(fields, { shouldFocus: true });

    if (!output) {
            // Get specific error messages for the current step's fields
            const currentErrors = fields.reduce((acc, field) => {
                if (errors[field]) {
                    acc.push(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${errors[field].message}`);
                }
                return acc;
            }, []);

            if (currentErrors.length > 0) {
                // Show specific error messages
                toast.error(
                    <div>
                        <p>Please fix the following errors:</p>
                        <ul className="list-disc pl-4 mt-1">
                            {currentErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else {
                toast.error("Please fill all required fields correctly");
            }
            return;
        }
    }

    setPreviousStep(currentStep);
    setCurrentStep((step) => step + 1);
};


  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  // Function to format CNIC input
  const formatCnic = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 13); // Limit to 13 digits
    const formatted = cleaned.replace(/(\d{5})(\d{7})(\d?)/, "$1-$2-$3").slice(0, 15); // Format as 00000-0000000-0
    return formatted;
  }

  // Function to format phone number input
  const formatPhone = (value) => {
    // If the value doesn't start with +92, add it
    if (!value.startsWith('+92')) {
      // Remove any non-digit characters
      const digits = value.replace(/\D/g, "");
      // Add +92 prefix
      value = `+92${digits}`;
    }
    
    // Clean the value (remove non-digits) and limit to 12 digits total
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    
    // Format as +92XXXXXXXXXX
    const formatted = `+92${cleaned.slice(2)}`;
    
    return formatted;
  }

  // Function to normalize email input
  const normalizeEmail = (value) => {
    // Trim whitespace and convert to lowercase
    return value.trim().toLowerCase();
  }

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Render input field with label and error message
  const renderField = (name, label, type = "text", placeholder = "", onChange) => {
    // Check if this is a phone field
    const isPhoneField = name.toLowerCase().includes('phone');
    // Check if this is an email field
    const isEmailField = name.toLowerCase().includes('email');
    
    return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
          onChange={(e) => {
            // Apply special formatting for phone fields
            if (isPhoneField && onChange) {
              onChange(e);
            }
            // Apply normalization for email fields
            else if (isEmailField) {
              const normalizedValue = normalizeEmail(e.target.value);
              e.target.value = normalizedValue;
              
              // Log the normalized value
              console.log("Normalized email value:", normalizedValue);

              // Update React Hook Form's internal state with the normalized value
              register(name).onChange(e);

              // Provide immediate feedback on email format
              if (normalizedValue && !validateEmail(normalizedValue)) {
                e.target.classList.add('border-red-500');
                e.target.classList.add('focus:ring-red-500');
              } else {
                e.target.classList.remove('border-red-500');
                e.target.classList.add('focus:ring-blue-500');
              }
            }
            // Call the original onChange if provided
            else if (onChange) {
              onChange(e);
            }
          }}
          placeholder={isPhoneField ? "+92XXXXXXXXXX" : isEmailField ? "example@domain.com" : placeholder}
          onFocus={(e) => {
            // If this is a phone field and it's empty, add +92
            if (isPhoneField && !e.target.value) {
              e.target.value = "+92";
            }
          }}
          className={`w-full px-3 py-2 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 ${
            errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
          }`}
        />
        {errors[name]?.message && (
          <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  }

  // Filter competition options based on selected category
  const filteredCompetitions = selectedCategory
    ? competitionOptions[selectedCategory] || [] // Access competitions by category
    : [];

  // Add a team member
  const addTeamMember = () => {
    if (teamMembers < maxTeamSize - 1) { // Adjust max size to account for leader
      setTeamMembers(prev => prev + 1);
    } else {
      toast.error(`Maximum team size is ${maxTeamSize} members`);
    }
  };

  // Remove a team member
  const removeTeamMember = (index) => {
    if (teamMembers > minTeamSize - 1) { // Adjust min size to account for leader
      setTeamMembers(prev => prev - 1);
    } else {
      toast.error(`Minimum team size is ${minTeamSize} members`);
    }
  };

  // Generate member fields dynamically
  const renderMemberFields = (index) => {
    return (
      <div key={`member-${index}`} className="mb-6 p-4 bg-gray-800 rounded-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-200">Member {index+1}</h3>
          {index+1 > minTeamSize && (
            <button
              type="button"
              onClick={() => removeTeamMember(index)}
              className="p-1 text-red-400 hover:text-red-300 focus:outline-none"
              aria-label="Remove member"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        {renderField(`member${index}Name`, "Full Name", "text", "Enter member's full name")}
        {renderField(`member${index}Email`, "Email Address", "email", "Enter member's email")}
        {renderField(`member${index}Cnic`, "CNIC Number", "text", "Enter member's CNIC", (e) => {
          e.target.value = formatCnic(e.target.value);
        })}
        {renderField(`member${index}Phone`, "Phone Number", "tel", "Enter member's phone number", (e) => {
          e.target.value = formatPhone(e.target.value);
        })}
    </div>
    );
  };

  // Add this log to see the watched values
  useEffect(() => {
    console.log("Watched values:", watchedValues);
  }, [watchedValues]);

  // Render competition categories and names
  {competitionOptions.length > 0 && (
    <div>
      {Array.from(new Set(competitionOptions.map(comp => comp.category))).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-semibold text-red-500">{category}</h2>
          <ul>
            {competitionOptions.filter(comp => comp.category === category).map(comp => (
              <li key={comp.id} className="text-gray-200">{comp.Competition_Name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )}

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8">
      <Toaster 
        position="bottom-left" 
        theme="dark"
        toastOptions={{
          success: {
            style: {
              background: 'rgba(34, 197, 94, 0.9)',
              color: 'white',
              border: '1px solid rgb(22, 163, 74)',
            },
            icon: <Check className="w-5 h-5" />,
          },
          error: {
            style: {
              background: 'rgba(239, 68, 68, 0.9)',
              color: 'white',
              border: '1px solid rgb(220, 38, 38)',
            },
          },
        }}
      />

      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        {/* Header with red accent */}
        <div className="bg-gradient-to-r from-red-800 to-red-600 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Competition Registration</h1>
          <p className="text-gray-200 mt-1">Complete all steps to register your team</p>
        </div>

        {/* Progress steps */}
        <nav className="p-4 border-b border-gray-800">
          <ol className="flex flex-wrap justify-between">
            {steps.map((step, index) => (
              <li key={step.name} className={`flex items-center ${index > 0 ? "ml-2" : ""}`}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 
                    ${
                      currentStep > index
                        ? "bg-red-600 text-white"
                        : currentStep === index
                          ? "bg-red-500 text-white"
                          : "bg-gray-700 text-gray-300"
                    }`}
                >
                  {currentStep > index ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <span
                  className={`hidden md:block text-sm font-medium 
                  ${currentStep === index ? "text-red-500" : currentStep > index ? "text-gray-300" : "text-gray-500"}`}
                >
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Form */}
        <form 
          className="p-4 md:p-6" 
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            console.log("Form submit event triggered");
            const formValues = watch();
            processForm(formValues);
          }}
          noValidate
        >
          {/* Step 1: Competition Details */}
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Competition Details</h2>

              {/* Competition Category Dropdown */}
              <div className="mb-4">
                <label htmlFor="competitionCategory" className="block text-sm font-medium text-gray-200 mb-1">
                  Competition Category
                </label>
                <select
                  id="competitionCategory"
                  {...register("competitionCategory")}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedCompetition(""); // Reset selected competition when category changes
                  }}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Category</option>
                  {[...new Set(competitionOptions.map(comp => comp.category))].map((category, index) => {
                    const displayName = category === "EE" ? "Electrical Engineering Competitions" :
                                        category === "CS" ? "Computer Science Competitions" :
                                        category === "GC" ? "General Competitions" :
                                        category; // Default to the original category if no match
                    return (
                      <option key={`${category}-${index}`} value={category}>
                        {displayName}
                      </option>
                    );
                  })}
                </select>
                {errors.competitionCategory?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.competitionCategory.message}</p>
                )}
              </div>

              {/* Competition Name Dropdown */}
              <div className="mb-4">
                <label htmlFor="competitionName" className="block text-sm font-medium text-gray-200 mb-1">
                  Competition Name
                </label>
                <select
                  id="competitionName"
                  {...register("competitionName")}
                  onChange={(e) => {
                    setSelectedCompetition(e.target.value);
                    // Set entry fee when competition changes
                    const competition = competitionOptions.find(comp => comp.Competition_Name === e.target.value);
                    if (competition) {
                      const fee = parseFloat(competition.Entry_Fee);
                      setFormData(prev => ({ ...prev, entryFee: fee }));
                      setValue('entryFee', fee); // Update the form value directly
                      setEntryFeeAmount(fee); // Update the entry fee amount state
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Competition</option>
                  {competitionOptions.filter(comp => comp.category === selectedCategory).map((option, index) => (
                    <option key={`${option.id}-${index}`} value={option.Competition_Name}>
                      {option.Competition_Name}
                    </option>
                  ))}
                </select>
                {errors.competitionName?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.competitionName.message}</p>
                )}
              </div>

              {/* Display Entry Fee when competition is selected */}
              {selectedCompetition && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-200">Entry Fee:</span>
                    <span className="text-lg font-bold text-red-400">
                      PKR {parseFloat(competitionOptions.find(comp => comp.Competition_Name === selectedCompetition)?.Entry_Fee || 0)}
                    </span>
                  </div>
                </div>
              )}

              {renderField("instituteName", "Institute Name", "text", "Enter your institute name")}
              {renderField("teamName", "Team Name", "text", "Enter your team name")}
              {renderField(
                "brandAmbassadorCode",
                "Brand Ambassador Code (Optional)",
                "text",
                "Enter code if available",
              )}
            </motion.div>
          )}

          {/* Step 2: Leader Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Team Leader Information (Member 1)</h2>

              {renderField("leaderName", "Full Name", "text", "Enter leader's full name")}
              {renderField("leaderEmail", "Email Address", "email", "Enter leader's email")}
              {renderField("leaderCnic", "CNIC Number", "text", "Enter leader's CNIC", (e) => {
                e.target.value = formatCnic(e.target.value);
              })}
              {renderField("leaderPhone", "Phone Number", "tel", "Enter leader's phone number", (e) => {
                e.target.value = formatPhone(e.target.value);
              })}
            </motion.div>
          )}

          {/* Step 3: Team Members */}
          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-red-500">Team Members Information</h2>
                <div className="text-sm text-gray-400">
                  {teamMembers + 1}/{maxTeamSize} members
                </div>
              </div>

              {/* Competition team size requirements */}
              <div className="p-3 bg-gray-800 rounded-md mb-4">
                <p className="text-sm text-gray-300">
                  This competition requires a minimum of <span className="font-bold text-red-400">{minTeamSize}</span> and 
                  a maximum of <span className="font-bold text-red-400">{maxTeamSize}</span> team members.
                </p>
              </div>

              {/* Render dynamic member fields */}
              {Array.from({ length: teamMembers }, (_, i) => renderMemberFields(i + 1))}

              {/* Add member button */}
              {teamMembers < maxTeamSize - 1 && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="w-full py-2 px-4 mt-4 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </button>
              )}
            </motion.div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Review Your Information</h2>

              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Competition Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Competition Category:</p>
                    <p className="font-medium">{watchedValues.competitionCategory || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Competition Name:</p>
                    <p className="font-medium">{watchedValues.competitionName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Institute Name:</p>
                    <p className="font-medium">{watchedValues.instituteName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Team Name:</p>
                    <p className="font-medium">{watchedValues.teamName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Brand Ambassador Code:</p>
                    <p className="font-medium">{watchedValues.brandAmbassadorCode || "Not provided"}</p>
                  </div>
                </div>
                
                {/* Highlighted Entry Fee in Review */}
                <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Entry Fee:</span>
                    <span className="text-xl font-bold text-red-400">
                      PKR {parseFloat(watchedValues.entryFee || formData.entryFee || entryFeeAmount || 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Team Leader</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p className="font-medium">{watchedValues.leaderName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p className="font-medium">{watchedValues.leaderEmail || "-"}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">CNIC:</p>
                    <p className="font-medium">{watchedValues.leaderCnic || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                    <p className="font-medium">{watchedValues.leaderPhone || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Team Members</h3>

                {/* Dynamically render team members in review */}
                {Array.from({ length: teamMembers }, (_, i) => {
                  const index = i + 1;
                  return (
                    <div key={`review-member-${index}`}>
                      <h4 className="text-white font-medium mt-3 mb-1">Member {index+1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-400">Name:</p>
                          <p className="font-medium">{watchedValues[`member${index}Name`] || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                          <p className="font-medium">{watchedValues[`member${index}Email`] || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">CNIC:</p>
                          <p className="font-medium">{watchedValues[`member${index}Cnic`] || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                          <p className="font-medium">{watchedValues[`member${index}Phone`] || "-"}</p>
                  </div>
                </div>
                  </div>
                  );
                })}
              </div>

              <div className="text-sm text-gray-400">
                <p>Please review all information carefully before proceeding to payment.</p>
              </div>
            </motion.div>
          )}

          {/* Step 5: Payment */}
          {currentStep === 4 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Payment</h2>

              {/* Hidden input to ensure entryFee is registered with the form */}
              <input 
                type="hidden" 
                {...register("entryFee")} 
                value={parseFloat(watchedValues.entryFee || formData.entryFee || entryFeeAmount || 0)} 
              />
              
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Payment Details</h3>
                <p className="text-gray-400">Account Title: MUHAMMAD HASSAAN</p>
                <p className="text-gray-400">IBAN: PK30MPBL9971727140101389</p>
                <p className="text-gray-400">Account No: 6-99-71-29310-714-101389</p>
                <p className="text-gray-400">Bank: Habib Metropolitan Bank Limited</p>
                <p className="text-gray-400">Branch: IBB Baitul Mukarram Branch, Karachi</p>
                
                {/* Highlighted Entry Fee */}
                <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Entry Fee:</span>
                    <span className="text-xl font-bold text-red-400">
                      PKR {parseFloat(watchedValues.entryFee || formData.entryFee || entryFeeAmount || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* New Section for Note */}
              <div className="bg-red-800  p-4 rounded-md">
                <h3 className="text-lg font-medium text-white mb-2">Note</h3>
                <p className="text-white">
                  An email will be sent to you upon successful registration and success screen would be shown. If you face any issues while registering, please contact Mr. Shaheer Luqman (Tech Lead) at <span className="font-bold">+92 310 0124127</span>.
                </p>
              </div>

              <div className="group relative w-full">
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Upload Files</h3>
                        <p className="text-sm text-slate-400">Drag & drop your files here</p>
                      </div>
                      <div className="rounded-lg bg-cyan-500/10 p-2">
                        <svg className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                    </div>

                    <div className="group/dropzone mt-6">
                      <div className="relative rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-8 transition-colors group-hover/dropzone:border-cyan-500/50">
                        <input
                          type="file"
                          className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                          multiple=""
                          onChange={handleFileChange} // Handle file change
                        />
                        <div className="space-y-6 text-center">
                          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-900">
                            <svg className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>

                          <div className="space-y-2">
                            <p className="text-base font-medium text-white">Drop your files here or browse</p>
                            <p className="text-sm text-slate-400">Support files: PDF, DOC, DOCX, JPG, PNG</p>
                            <p className="text-xs text-slate-400">Max file size: 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="rounded-xl bg-slate-900/50 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-lg bg-cyan-500/10 p-2">
                                <svg className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-white">{file.name}</p>
                                <p className="text-xs text-slate-400">File uploaded</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button className="text-slate-400 transition-colors hover:text-white">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


              {/* reCAPTCHA Component */}
              <div className="mb-4">
                <ReCAPTCHA
                  sitekey="6LdUIdUqAAAAAM84Ki3WS2ARudCLK4Bf2QnI1qWi"
                  onChange={(value) => setCaptchaValue(value)} // Set the CAPTCHA value
                />
                {!captchaValue && (
                  <p className="mt-1 text-sm text-red-500">Please complete the CAPTCHA.</p>
                )}
              </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}

        {/* Navigation */}
        <div className="p-4 md:p-6 border-t border-gray-800 flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md flex items-center ${
              currentStep === 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

            {currentStep === steps.length - 1 ? (
              // Submit button for the final step
              <button
                type="button"
                onClick={(e) => {
                  console.log("Submit button clicked directly");
                  // Manually trigger form submission with the current form data
                  const formValues = watch();
                  processForm(formValues);
                }}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md flex items-center bg-red-600 text-white hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            ) : (
              
          <button
            type="button"
            onClick={next}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md flex items-center bg-red-500 text-white hover:bg-red-600 disabled:bg-red-800 disabled:cursor-not-allowed"
          >
            {currentStep === 3 ? (
              <>
                Proceed to Payment
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
            )}
        </div>
        </form>
      </div>
    </div>
  )
}