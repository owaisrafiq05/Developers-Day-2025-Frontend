"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

// Define the base form validation schema
const baseFormSchema = {
  projectTitle: z.string().min(1, "Project title is required"),
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
  projectDocument: z.instanceof(File).refine(file => file.name.includes("project title"), {
    message: "Document name must include the project title",
  }),
};

// Define the form steps
const steps = [
  { id: "Step 1", name: "Project Details", fields: ["projectTitle", "instituteName", "brandAmbassadorCode"] },
  { id: "Step 2", name: "Team Leader Information", fields: ["leaderName", "leaderEmail", "leaderCnic", "leaderPhone"] },
  { id: "Step 3", name: "Team Members", fields: [] }, // Will be populated dynamically based on team size
  { id: "Step 4", name: "Upload Document", fields: ["projectDocument"] },
  { id: "Step 5", name: "Review & Submit", fields: [] },
];

const Registration = () => {
  const formRef = useRef(null);
  const fieldsRef = useRef([]);

  const [teamSize, setTeamSize] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [teamMembers, setTeamMembers] = useState([{ name: "", email: "", cnic: "", phone: "" }]); // Start with one member
  const [validationSchema, setValidationSchema] = useState(z.object(baseFormSchema).passthrough());

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...formData,
      leaderPhone: formData.leaderPhone || "+92",
    },
    mode: "onChange", // Validate on change
  });

  const watchedValues = watch();

  // Update team members fields in steps array
  useEffect(() => {
    steps[2].fields = teamMembers.map((_, index) => `member${index + 1}`);
  }, [teamMembers]);

  // Handle next step navigation
  const next = async () => {
    // Update form data with current values
    setFormData((prev) => ({ ...prev, ...watchedValues }));

    // If we're on the review step, submit the form
    if (currentStep === steps.length - 1) {
      console.log("Submitting form from next function");
      await handleSubmit(processForm)();
      return;
    }

    // Get the fields for the current step
    const fields = steps[currentStep].fields;

    // Validate fields for the current step
    const output = await trigger(fields, { shouldFocus: true });
    if (!output) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  // Handle previous step navigation
  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  // Process form submission
  const processForm = async (data) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
    toast.success("Registration successful!");
  };

  // Render input field with label and error message
  const renderField = (name, label, type = "text", placeholder = "") => {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
        <input
          type={type}
          id={name}
          {...register(name)}
          placeholder={placeholder}
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

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 md:p-8">
      <Toaster position="bottom-left" theme="dark" />
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
        <form ref={formRef} className="p-4 md:p-6" onSubmit={handleSubmit(processForm)} noValidate>
          {/* Step 1: Project Details */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Project Details</h2>
              {renderField("projectTitle", "Project Title", "text", "Enter your project title")}
              {renderField("instituteName", "Institute Name", "text", "Enter your institute name")}
              {renderField("brandAmbassadorCode", "Brand Ambassador Code (Optional)", "text", "Enter code if available")}
            </motion.div>
          )}

          {/* Step 2: Team Leader Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Team Leader Information</h2>
              {renderField("leaderName", "Full Name", "text", "Enter leader's full name")}
              {renderField("leaderEmail", "Email Address", "email", "Enter leader's email")}
              {renderField("leaderCnic", "CNIC Number", "text", "Enter leader's CNIC")}
              {renderField("leaderPhone", "Phone Number", "tel", "Enter leader's phone number")}
            </motion.div>
          )}

          {/* Step 3: Team Members */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Team Members Information</h2>
              {teamMembers.map((_, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-500 mb-2">Member {index + 1}</h3>
                  {renderField(`member${index + 1}Name`, "Full Name", "text", "Enter member's full name")}
                  {renderField(`member${index + 1}Email`, "Email Address", "email", "Enter member's email")}
                  {renderField(`member${index + 1}Cnic`, "CNIC Number", "text", "Enter member's CNIC")}
                  {renderField(`member${index + 1}Phone`, "Phone Number", "tel", "Enter member's phone number")}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setTeamMembers([...teamMembers, { name: "", email: "", cnic: "", phone: "" }])}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Add Team Member
              </button>
            </motion.div>
          )}

          {/* Step 4: Upload Document */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Upload Document</h2>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-600 hover:border-red-600 outline-none w-full"
                required
              />
              <p className="text-sm text-gray-400">Document must include project title and abstract. Name of the file must be the project title.</p>
            </motion.div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-red-500 mb-4">Review Your Information</h2>
              {/* Display all collected information for review */}
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Project Details</h3>
                <p>Project Title: {watchedValues.projectTitle}</p>
                <p>Institute Name: {watchedValues.instituteName}</p>
                <p>Brand Ambassador Code: {watchedValues.brandAmbassadorCode || "Not provided"}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Team Leader</h3>
                <p>Name: {watchedValues.leaderName}</p>
                <p>Email: {watchedValues.leaderEmail}</p>
                <p>CNIC: {watchedValues.leaderCnic}</p>
                <p>Phone: {watchedValues.leaderPhone}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium text-red-400 mb-2">Team Members</h3>
                {teamMembers.map((_, index) => (
                  <div key={index}>
                    <h4 className="text-white font-medium">Member {index + 1}</h4>
                    <p>Name: {watchedValues[`member${index + 1}Name`]}</p>
                    <p>Email: {watchedValues[`member${index + 1}Email`]}</p>
                    <p>CNIC: {watchedValues[`member${index + 1}Cnic`]}</p>
                    <p>Phone: {watchedValues[`member${index + 1}Phone`]}</p>
                  </div>
                ))}
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
              <button
                type="button"
                onClick={handleSubmit(processForm)}
                className="px-4 py-2 rounded-md flex items-center bg-red-600 text-white hover:bg-red-700"
              >
                Register
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                className="px-4 py-2 rounded-md flex items-center bg-red-500 text-white hover:bg-red-600"
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
