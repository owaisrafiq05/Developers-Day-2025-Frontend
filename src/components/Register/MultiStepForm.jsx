"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

// Define the form validation schema
const FormDataSchema = z.object({
  // Competition Details
  competitionName: z.string().min(1, "Competition name is required"),
  instituteName: z.string().min(1, "Institute name is required"),
  teamName: z.string().min(1, "Team name is required"),
  brandAmbassadorCode: z.string().optional(),

  // Leader Details
  leaderName: z.string().min(1, "Leader name is required"),
  leaderEmail: z.string().email("Invalid email address"),
  leaderCnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  leaderPhone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Member 1 Details
  member1Name: z.string().min(1, "Member 1 name is required"),
  member1Email: z.string().email("Invalid email address"),
  member1Cnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  member1Phone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),

  // Member 2 Details
  member2Name: z.string().min(1, "Member 2 name is required"),
  member2Email: z.string().email("Invalid email address"),
  member2Cnic: z.string()
    .length(15, "CNIC must be exactly 15 characters")
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format 00000-0000000-0"),
  member2Phone: z.string()
    .regex(/^\+92\d{10}$/, "Phone number must be in the format +920000000000"),
})

// Define the form steps
const steps = [
  {
    id: "Step 0",
    name: "Terms & Conditions",
    fields: [],
  },
  {
    id: "Step 1",
    name: "Competition Details",
    fields: ["competitionName", "instituteName", "teamName", "brandAmbassadorCode"],
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
    name: "Review & Submit",
    fields: [],
  },
]

// Sample competition options
const competitionOptions = [
  "Hackathon 2025",
  "Code Challenge",
  "Design Competition",
  "Business Case Study",
  "Robotics Challenge",
]

export default function MultiStepForm() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
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

  // Process form submission
  const processForm = (data) => {
    setFormData(data)
    toast.success("Form submitted successfully!")
    console.log(JSON.stringify(data, null, 2))
  }

  // Handle next step navigation
  const next = async () => {
    // If we're on the review step, submit the form
    if (currentStep === steps.length - 1) {
      handleSubmit(processForm)()
      return
    }

    const fields = steps[currentStep].fields
    const output = await trigger(fields, { shouldFocus: true })

    if (!output) {
      toast.error("Please fill all required fields correctly")
      return
    }

    // Update form data with current values
    setFormData((prev) => ({ ...prev, ...watchedValues }))

    setPreviousStep(currentStep)
    setCurrentStep((step) => step + 1)
  }

  // Handle previous step navigation
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep((step) => step - 1)
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
          {/* Step 0: Terms & Conditions */}
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Terms & Conditions</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-red-400 mb-2">Payment Terms</h3>
                  <p className="text-gray-300">
                    The registration fee for the competition is PKR 2000 per team. This fee is non-refundable and must be paid to complete your registration.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-red-400 mb-2">Registration Rules</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Each team must consist of exactly 3 members (1 leader + 2 members)</li>
                    <li>All team members must be from the same institute</li>
                    <li>Each participant can only be part of one team</li>
                    <li>All provided information must be accurate and verifiable</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-red-400 mb-2">Important Notes</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Registration will only be confirmed after successful payment</li>
                    <li>Keep your registration details safe for future reference</li>
                    <li>You will receive a confirmation email after successful registration</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                Please proceed to the next step to start filling out your registration details.
              </p>
            </motion.div>
          )}

          {/* Step 1: Competition Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Competition Details</h2>

              <div className="mb-4">
                <label htmlFor="competitionName" className="block text-sm font-medium text-gray-200 mb-1">
                  Competition Name
                </label>
                <select
                  id="competitionName"
                  {...register("competitionName")}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Competition</option>
                  {competitionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
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
          {currentStep === 2 && (
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
          {currentStep === 3 && (
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

          {/* Step 4: Review & Submit */}
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

