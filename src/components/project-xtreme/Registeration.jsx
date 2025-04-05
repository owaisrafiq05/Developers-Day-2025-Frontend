"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Check, Trash2, Plus } from "lucide-react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import ReCAPTCHA from "react-google-recaptcha";

// Define the base form validation schema
const baseFormSchema = {
  projectTitle: z.string().min(1, "Project title is required"),
  teamName: z.string().min(1, "Team name is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  brandAmbassadorCode: z.string().optional(),

  // Leader Details
  leaderName: z.string().min(1, "Leader name is required"),
  leaderEmail: z.string()
    .min(1, "Email is required")
    .email("Invalid email format. Please use a valid email address (e.g., example@domain.com)"),
  leaderCnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  leaderPhone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Team Members
  teamMembers: z.array(z.object({
    name: z.string().min(1, "Member name is required"),
    email: z.string().email("Invalid email format"),
    cnic: z.string()
      .length(15, "CNIC must be exactly 15 characters")
      .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
    phone: z.string()
      .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),
  })).min(1, "At least one team member is required"),

  // Document
  projectDocument: z.instanceof(File),
  paymentScreenshots: z.instanceof(File),
  entryFee: z.literal(4000), // Entry fee for the competition
};

// Define the form steps
const steps = [
  { id: "Step 1", name: "Project Details", fields: ["projectTitle", "teamName", "instituteName", "brandAmbassadorCode"] },
  { id: "Step 2", name: "Team Leader Information", fields: ["leaderName", "leaderEmail", "leaderCnic", "leaderPhone"] },
  { id: "Step 3", name: "Team Members", fields: [] }, // Will be populated dynamically based on team size
  { id: "Step 4", name: "Upload Document", fields: ["projectDocument"] },
  { id: "Step 5", name: "Review", fields: [] },
  { id: "Step 6", name: "Payment", fields: ["paymentScreenshots", "entryFee"]},
];

const Registration = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]); // State for uploaded files
  const [paymentScreenshots, setPaymentScreenshots] = useState([]); // State for payment screenshot
  const [validationSchema, setValidationSchema] = useState(z.object(baseFormSchema).passthrough());
  const [entryFeeAmount, setEntryFeeAmount] = useState(4000); // State to track entry fee amount
  const minTeamSize = 3;
  const maxTeamSize = 4;
  const [captchaValue, setCaptchaValue] = useState(null); // State for CAPTCHA value
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this new state variable

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...formData,
      leaderPhone: formData.leaderPhone || "+92",
      teamMembers: formData.teamMembers || [
        { name: "", email: "", cnic: "", phone: "+92" },
        { name: "", email: "", cnic: "", phone: "+92" }
      ]
    },
    mode: "onChange", // Validate on change
  });

  // Use useFieldArray to manage team members dynamically
  const { fields, append, remove } = useFieldArray({
    control, // Use the control from useForm
    name: "teamMembers", // Name of the field array
  });

  const watchedValues = watch();
  const delta = currentStep - previousStep;

  // Handle file upload
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files); // Store the actual file objects
    if (files.length > 0) {
      setValue("projectDocument", files[0]);
    }
  };

  const handleScreenshotChange = (event) => {
    const files = Array.from(event.target.files);
    setPaymentScreenshots(files); // Store the actual file objects
    if (files.length > 0) {
      setValue("paymentScreenshots", files[0]);
    }
  };

  // Handle next step navigation
  const next = async () => {
    // Update form data with current values
    setFormData((prev) => ({ ...prev, ...watchedValues }));

    // If we're on the review step, submit the form
    if (currentStep === steps.length - 1) {
      await handleSubmit(processForm)();
      return;
    }

    // Get the fields for the current step
    const fields = steps[currentStep].fields;

    // Validate fields for the current step
    const output = await trigger(fields, { shouldFocus: true });
    if (!output) {
      const currentErrors = fields.reduce((acc, field) => {
        if (errors[field]) {
          acc.push(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${errors[field].message}`);
        }
        return acc;
      }, []);

      if (currentErrors.length > 0) {
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

    setPreviousStep(currentStep);
    setCurrentStep((step) => step + 1);
  };

  // Handle previous step navigation
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  // Process form submission
  const processForm = async (data) => {
    try {
      setIsSubmitting(true); // Set loading state to true when submission starts
      
      // Validate that we have at least the minimum number of team members
      if (data.teamMembers.length < (minTeamSize-1)) {
        toast.error(`This project requires at least ${minTeamSize} team members (including leader).`);
        setIsSubmitting(false); // Reset loading state
        return;
      }
      
      // Validate that a project document is uploaded
      if (uploadedFiles.length === 0) {
        toast.error("Please upload a project document");
        setIsSubmitting(false); // Reset loading state
        return;
      }

      // Validate that a project document is uploaded
      if (paymentScreenshots.length === 0) {
        toast.error("Please upload a project document");
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
      
      // Add all form fields directly to FormData
      formData.append("Team_Name", data.teamName);
      formData.append("Institution_Name", data.instituteName);
      formData.append("Project_Name", data.projectTitle);
      formData.append("L_Name", data.leaderName);
      formData.append("L_Email", data.leaderEmail);
      formData.append("L_Contact", data.leaderPhone.replace("+92", "0")); // Convert to local format
      formData.append("L_CNIC", data.leaderCnic);
      
      // Append members dynamically
      const members = data.teamMembers.map(member => ({
        Name: member.name,
        Email: member.email,
        Contact: member.phone.replace("+92", "0"), // Convert to local format
        CNIC: member.cnic,
      }));
      
      console.log("Members to be submitted:", members);
      
      // Append members as a JSON string
      formData.append("Members", JSON.stringify(members));

      // Append brand ambassador code if available
        formData.append("BA_Code", data.brandAmbassadorCode);

      // Append the project document
      if (uploadedFiles[0]) {
        formData.append("Project_Report", uploadedFiles[0]);
      }

      if(paymentScreenshots[0]) {
        formData.append("Payment_Photo", paymentScreenshots[0]);
      }

      // Send the API request
      const response = await fetch('https://dev-day-backend.vercel.app/Project/Register', {
        method: 'POST',
        body: formData,
      });
      
      const responseData = await response.json();
      
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
  };

  // Function to format CNIC input
  const formatCnic = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 13); // Limit to 13 digits
    const formatted = cleaned.replace(/(\d{5})(\d{7})(\d?)/, "$1-$2-$3").slice(0, 15); // Format as 00000-0000000-0
    return formatted;
  };

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
  };

  // Function to normalize email input
  const normalizeEmail = (value) => {
    // Trim whitespace and convert to lowercase
    return value.trim().toLowerCase();
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

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
          style={{ transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}
        />
        {errors[name]?.message && (
          <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>
    );
  };

  // Add a team member
  const addTeamMember = () => {
    if (fields.length < maxTeamSize - 1) {
      append({ name: "", email: "", cnic: "", phone: "" }); // Use append from useFieldArray
    } else {
      toast.error(`Maximum team size is ${maxTeamSize} members (including leader)`);
    }
  };

  // Remove a team member
  const removeTeamMember = (index) => {
    if (fields.length > minTeamSize - 1) {
      remove(index); // Use remove from useFieldArray
    } else {
      toast.error(`Minimum team size is ${minTeamSize} members (including leader)`);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 md:p-8">
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
        <div className="bg-gradient-to-r from-red-800 to-red-600 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Project Xtreme Registration</h1>
          <p className="text-gray-200 mt-1">Complete all steps to register your project</p>
        </div>

        {/* Progress steps */}
        <nav className="p-4 border-b border-gray-800">
          <ol className="flex flex-wrap justify-between">
            {steps.map((step, index) => (
              <li key={step.name} className={`flex items-center ${index > 0 ? "ml-2" : ""}`}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 
                    ${currentStep > index ? "bg-red-600 text-white" : currentStep === index ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
                >
                  {currentStep > index ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <span className={`hidden md:block text-sm font-medium ${currentStep === index ? "text-red-500" : currentStep > index ? "text-gray-300" : "text-gray-500"}`}>
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Form */}
        <form className="p-4 md:p-6" onSubmit={handleSubmit(processForm)} noValidate>
          {/* Step 1: Project Details */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, x: delta >= 0 ? "50%" : "-50%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Project Details</h2>
              {renderField("projectTitle", "Project Title", "text", "Enter your project title")}
              {renderField("teamName", "Team Name", "text", "Enter your team name")}
              {renderField("instituteName", "Institute Name", "text", "Enter your institute name")}
              {renderField("brandAmbassadorCode", "Brand Ambassador Code (Optional)", "text", "Enter code if available")}
            </motion.div>
          )}

          {/* Step 2: Team Leader Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: delta >= 0 ? "50%" : "-50%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Team Leader Information</h2>
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
              initial={{ opacity: 0, x: delta >= 0 ? "50%" : "-50%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-red-500">Team Members Information</h2>
                <div className="text-sm text-gray-400">
                  {fields.length + 1}/{maxTeamSize} members (including leader)
                </div>
              </div>

              {/* Team size requirements info */}
              <div className="p-3 bg-gray-800 rounded-md mb-4">
                <p className="text-sm text-gray-300">
                  This project requires a minimum of <span className="font-bold text-red-400">{minTeamSize}</span> and 
                  a maximum of <span className="font-bold text-red-400">{maxTeamSize}</span> team members (including leader).
                </p>
              </div>

              {fields.map((member, index) => (
                <div key={member.id} className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-red-500">Member {index + 2}</h3>
                    {fields.length > minTeamSize - 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-1 text-red-400 hover:text-red-300 focus:outline-none"
                        aria-label="Remove member"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {renderField(`teamMembers[${index}].name`, "Full Name", "text", "Enter member's full name")}
                  {renderField(`teamMembers[${index}].email`, "Email Address", "email", "Enter member's email")}
                  {renderField(`teamMembers[${index}].cnic`, "CNIC Number", "text", "Enter member's CNIC", (e) => {
                    e.target.value = formatCnic(e.target.value);
                  })}
                  {renderField(`teamMembers[${index}].phone`, "Phone Number", "tel", "Enter member's phone number", (e) => {
                    e.target.value = formatPhone(e.target.value);
                  })}
                </div>
              ))}
              
              {/* Only show Add Team Member button if we haven't reached max team size */}
              {fields.length < maxTeamSize - 1 && (
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

          {/* Step 4: Upload Document */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: delta >= 0 ? "50%" : "-50%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Upload Document</h2>
              
              <div className="group relative w-full">
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/10">
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Upload Project Document</h3>
                        <p className="text-sm text-slate-400">Drag & drop your file here</p>
                      </div>
                      <div className="rounded-lg bg-red-500/10 p-2">
                        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                    </div>

                    <div className="group/dropzone mt-6">
                      <div className="relative rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-8 transition-colors group-hover/dropzone:border-red-500/50">
                        <input
                          type="file"
                          className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <div className="space-y-6 text-center">
                          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-900">
                            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>

                          <div className="space-y-2">
                            <p className="text-base font-medium text-white">Drop your file here or browse</p>
                            <p className="text-sm text-slate-400">Support files: PDF, DOC, DOCX</p>
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
                              <div className="rounded-lg bg-red-500/10 p-2">
                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-white">{file.name}</p>
                                <p className="text-xs text-slate-400">File uploaded</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button 
                                type="button"
                                onClick={() => setUploadedFiles([])}
                                className="text-slate-400 transition-colors hover:text-white"
                              >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-400">Document must include project title and abstract.</p>
            </motion.div>
          )}

          {/* Step 5: Payment */}
          {currentStep === 5 && (
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
                        <h3 className="text-lg font-semibold text-white">Upload Receipt Screenshot</h3>
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
                          onChange={handleScreenshotChange} // Handle file change
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
                      {paymentScreenshots.map((file, index) => (
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
                  sitekey="6LdUIdUqAAAAAM84Ki3WS2ARudCLK4Bf2QnI1qWi" // Replace with your reCAPTCHA site key
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

          {/* Step 5: Review & Submit */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: delta >= 0 ? "50%" : "-50%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Review Your Information</h2>
              
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Project Title:</p>
                    <p className="font-medium">{watchedValues.projectTitle || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Team Name:</p>
                    <p className="font-medium">{watchedValues.teamName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Institute Name:</p>
                    <p className="font-medium">{watchedValues.instituteName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Brand Ambassador Code:</p>
                    <p className="font-medium">{watchedValues.brandAmbassadorCode || "Not provided"}</p>
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
                {watchedValues.teamMembers.map((member, index) => (
                  <div key={index} className="mb-4 border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-white font-medium mb-2">Member {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Name:</p>
                        <p className="font-medium">{member.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Email:</p>
                        <p className="font-medium">{member.email || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">CNIC:</p>
                        <p className="font-medium">{member.cnic || "-"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Phone:</p>
                        <p className="font-medium">{member.phone || "-"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Uploaded Document</h3>
                {uploadedFiles.length > 0 ? (
                  <div className="text-sm">
                    <p className="text-gray-400">File Name:</p>
                    <p className="font-medium">{uploadedFiles[0].name}</p>
                  </div>
                ) : (
                  <p className="text-yellow-500 text-sm">No document uploaded yet</p>
                )}
              </div>

              
            </motion.div>
          )}

          {/* Navigation */}
          <div className="p-4 md:p-6 border-t border-gray-800 flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0 || isSubmitting}
              className={`px-4 py-2 rounded-md flex items-center ${
                currentStep === 0 || isSubmitting
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit(processForm)}
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
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registration;