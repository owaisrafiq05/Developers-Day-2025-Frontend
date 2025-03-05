"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import fetchCompetitions from "../../data/data-comp" // Import the fetch function
import axios from 'axios' // Import Axios at the top of your file

// Define the form validation schema
const FormDataSchema = z.object({
  // Competition Details
  competitionCategory: z.string().min(1, "Competition category is required"),
  competitionName: z.string().min(1, "Competition name is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  teamName: z.string().min(1, "Team name is required"),
  brandAmbassadorCode: z.string().optional(),

  // Leader Details
  leaderName: z.string().min(1, "Leader name is required"),
  leaderEmail: z.string()
    .email("Invalid email address")
    .regex(/^(.*@gmail\.com|.*@nu\.edu\.pk)$/, "Email must be a valid Gmail or NU email address"),
  leaderCnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  leaderPhone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Member 1 Details
  member1Name: z.string().min(1, "Member 1 name is required"),
  member1Email: z.string()
    .email("Invalid email address")
    .regex(/^(.*@gmail\.com|.*@nu\.edu\.pk)$/, "Email must be a valid Gmail or NU email address"),
  member1Cnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  member1Phone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Member 2 Details
  member2Name: z.string().min(1, "Member 2 name is required"),
  member2Email: z.string()
    .email("Invalid email address")
    .regex(/^(.*@gmail\.com|.*@nu\.edu\.pk)$/, "Email must be a valid Gmail or NU email address"),
  member2Cnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  member2Phone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Payment Details
  paymentScreenshots: z.array(z.string()).optional(), // Array of uploaded file names
  entryFee: z.number().optional(), // Entry fee for the competition
})

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
    fields: [
      "member1Name",
      "member1Email",
      "member1Cnic",
      "member1Phone",
      "member2Name",
      "member2Email",
      "member2Cnic",
      "member2Phone",
    ],
  },
  {
    id: "Step 4",
    name: "Payment",
    fields: ["paymentScreenshots", "entryFee"],
  },
  {
    id: "Step 5",
    name: "Review & Submit",
    fields: [],
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
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormDataSchema),
    defaultValues: formData,
  })

  // Watch all form values
  const watchedValues = watch()

  // Fetch competitions on component mount
  useEffect(() => {
    const loadCompetitions = async () => {
      const competitions = await fetchCompetitions();
      setCompetitionOptions(competitions);
    };

    loadCompetitions();
  }, []);

  // Handle file upload
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files); // Store the actual file objects
  }

  // Process form submission
  const processForm = async (data) => {
    const formData = new FormData();
    formData.append("Competition_Name", data.competitionName);
    formData.append("Institute_Name", data.instituteName);
    formData.append("Team_Name", data.teamName);
    formData.append("L_Name", data.leaderName);
    formData.append("L_Email", data.leaderEmail);
    formData.append("L_Contact", data.leaderPhone.replace("+92", "0")); // Convert to local format
    formData.append("L_CNIC", data.leaderCnic);
    
    // Append members
    const members = [
      {
        Name: data.member1Name,
        Email: data.member1Email,
        Contact: data.member1Phone.replace("+92", "0"), // Convert to local format
        CNIC: data.member1Cnic,
      },
      {
        Name: data.member2Name,
        Email: data.member2Email,
        Contact: data.member2Phone.replace("+92", "0"), // Convert to local format
        CNIC: data.member2Cnic,
      },
    ];
    formData.append("Members", JSON.stringify(members)); // Append members as a JSON string

    // Append the payment photo (assuming the first uploaded file is the payment photo)
    if (uploadedFiles.length > 0) {
      formData.append("Payment_Photo", uploadedFiles[0]); // Append the actual file
    }

    // Append brand ambassador code if available
    formData.append("BA_Code", data.brandAmbassadorCode || ""); // Optional field

    try {
      const response = await axios.post("https://dev-day-backend.vercel.app/Team/Register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });

      if (response.data.success) {
        toast.success(response.data.message); // Show success message from the response
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error("Error:", error);
    }
  }

  // Handle next step navigation
  const next = async () => {
    // If we're on the review step, submit the form
    if (currentStep === steps.length - 1) {
      handleSubmit(processForm)();
      return;
    }

    const fields = steps[currentStep].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    // Update form data with current values
    setFormData((prev) => ({ ...prev, ...watchedValues }));

    // Set entry fee based on selected competition
    if (currentStep === 0 && selectedCompetition) {
      const competition = competitionOptions.find(comp => comp.title === selectedCompetition);
      if (competition) {
        setFormData(prev => ({ ...prev, entryFee: competition.entryFee }));
      }
    }

    setPreviousStep(currentStep);
    setCurrentStep((step) => step + 1);
  }

  // Handle previous step navigation
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  }

  // Render input field with label and error message
  const renderField = (name, label, type = "text", placeholder = "", onChange) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      {errors[name]?.message && <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  )

  // Function to format CNIC input
  const formatCnic = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 13); // Limit to 13 digits
    const formatted = cleaned.replace(/(\d{5})(\d{7})(\d?)/, "$1-$2-$3").slice(0, 15); // Format as 00000-0000000-0
    return formatted;
  }

  // Function to format phone number input
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12); // Limit to 12 digits (including +92)
    const formatted = cleaned.length > 2 ? `+92${cleaned.slice(2)}` : cleaned; // Format as +920000000000
    return formatted;
  }

  // Filter competition options based on selected category
  const filteredCompetitions = selectedCategory
    ? competitionOptions.filter(comp => comp.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8">
      <Toaster position="bottom-left" theme="dark" />

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
        <form className="p-4 md:p-6" onSubmit={handleSubmit(processForm)}>
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
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Category</option>
                  {[...new Set(competitionOptions.map(comp => comp.category))].map((category, index) => (
                    <option key={`${category}-${index}`} value={category}>
                      {category}
                    </option>
                  ))}
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
                  onChange={(e) => setSelectedCompetition(e.target.value)} // Set selected competition
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Competition</option>
                  {filteredCompetitions.map((option, index) => (
                    <option key={`${option.title}-${index}`} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </select>
                {errors.competitionName?.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.competitionName.message}</p>
                )}
              </div>

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
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Team Members Information</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-200 mb-3">Member 1</h3>
                {renderField("member1Name", "Full Name", "text", "Enter member's full name")}
                {renderField("member1Email", "Email Address", "email", "Enter member's email")}
                {renderField("member1Cnic", "CNIC Number", "text", "Enter member's CNIC", (e) => {
                  e.target.value = formatCnic(e.target.value);
                })}
                {renderField("member1Phone", "Phone Number", "tel", "Enter member's phone number", (e) => {
                  e.target.value = formatPhone(e.target.value);
                })}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-3">Member 2</h3>
                {renderField("member2Name", "Full Name", "text", "Enter member's full name")}
                {renderField("member2Email", "Email Address", "email", "Enter member's email")}
                {renderField("member2Cnic", "CNIC Number", "text", "Enter member's CNIC", (e) => {
                  e.target.value = formatCnic(e.target.value);
                })}
                {renderField("member2Phone", "Phone Number", "tel", "Enter member's phone number", (e) => {
                  e.target.value = formatPhone(e.target.value);
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Payment</h2>

              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Payment Details</h3>
                <p className="text-gray-400">Account Title: MUHAMMAD HASSAAN</p>
                <p className="text-gray-400">IBAN: PK30MPBL9971727140101389</p>
                <p className="text-gray-400">Account No: 6-99-71-29310-714-101389</p>
                <p className="text-gray-400">Bank: Habib Metropolitan Bank Limited</p>
                <p className="text-gray-400">Branch: IBB Baitul Mukarram Branch, Karachi</p>
                <p className="text-gray-400">Entry Fee: PKR {watchedValues.entryFee || 0}</p>
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
                        <div key={`${file}-${index}`} className="rounded-xl bg-slate-900/50 p-4">
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
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 4 && (
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
                  <div>
                    <p className="text-gray-400">Entry Fee:</p>
                    <p className="font-medium">PKR {watchedValues.entryFee || 0}</p>
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

                <h4 className="text-white font-medium mt-3 mb-1">Member 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p className="font-medium">{watchedValues.member1Name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p className="font-medium">{watchedValues.member1Email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">CNIC:</p>
                    <p className="font-medium">{watchedValues.member1Cnic || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                    <p className="font-medium">{watchedValues.member1Phone || "-"}</p>
                  </div>
                </div>

                <h4 className="text-white font-medium mt-3 mb-1">Member 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p className="font-medium">{watchedValues.member2Name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p className="font-medium">{watchedValues.member2Email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">CNIC:</p>
                    <p className="font-medium">{watchedValues.member2Cnic || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone:</p>
                    <p className="font-medium">{watchedValues.member2Phone || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <p>Please review all information carefully before proceeding to payment.</p>
              </div>
            </motion.div>
          )}
        </form>

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

          <button
            type="button"
            onClick={next}
            className={`px-4 py-2 rounded-md flex items-center ${
              currentStep === steps.length - 1
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {currentStep === steps.length - 1 ? (
              "Proceed to Payment"
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

