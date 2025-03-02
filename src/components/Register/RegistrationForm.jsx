"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Toaster, toast } from 'sonner'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const RegistrationForm = () => {
  const formRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    Competition_Name: "",
    Institute_Name: "",
    Team_Name: "",
    L_Name: "",
    L_Email: "",
    L_Contact: "",
    L_CNIC: "",
    M1_Name: "",
    M1_Email: "",
    M1_Contact: "",
    M1_CNIC: "",
    M2_Name: "",
    M2_Email: "",
    M2_Contact: "",
    M2_CNIC: "",
    Institution: "",
    BA_Id: ""
  })

  const steps = ["Contact Info", "Player Info", "Review", "Submit"]

  // GSAP animations setup
  useEffect(() => {
    const form = formRef.current
    
    const ctx = gsap.context(() => {
      gsap.set(form, { opacity: 0, y: 50 })
      
      gsap.to(form, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top center+=100",
        }
      })

      gsap.from(".form-field", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top center+=100",
        }
      })
    }, form)

    return () => ctx.revert()
  }, [currentStep])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Special handling for different input types
    switch(true) {
      case name.includes('CNIC'):
        // Only allow numbers and limit to 13 digits
        const cnicValue = value.replace(/\D/g, '');
        finalValue = cnicValue.slice(0, 13);
        break;

      case name.includes('Contact'):
        // Only allow numbers and limit to 11 digits
        const contactValue = value.replace(/\D/g, '');
        finalValue = contactValue.slice(0, 11);
        break;

      case name.includes('Email'):
        // Allow all characters for email
        finalValue = value;
        break;

      default:
        // For all other fields, allow normal input
        finalValue = value;
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('Email') && value && !validateEmail(value)) {
      toast.error('Please enter a valid email address');
    }
    if (name.includes('CNIC') && value && value.length !== 13) {
      toast.error('CNIC must be exactly 13 digits');
    }
    if (name.includes('Contact') && value && value.length !== 11) {
      toast.error('Contact number must be exactly 11 digits');
    }
  }

  const validateStep = (step) => {
    switch(step) {
      case 1:
        const step1Fields = ['Competition_Name', 'Institute_Name', 'Team_Name', 'Institution', 'BA_Id'];
        const step1Missing = step1Fields.filter(field => !formData[field]);
        if (step1Missing.length > 0) {
          toast.error(`Please fill in: ${step1Missing.map(f => f.replace('_', ' ')).join(', ')}`);
          return false;
        }
        break;

      case 2:
        const leaderFields = ['L_Name', 'L_Email', 'L_Contact', 'L_CNIC'];
        const leaderMissing = leaderFields.filter(field => !formData[field]);
        
        if (leaderMissing.length > 0) {
          toast.error(`Please fill in leader's: ${leaderMissing.map(f => f.replace('L_', '')).join(', ')}`);
          return false;
        }
        
        if (!validateEmail(formData.L_Email)) {
          toast.error("Please enter a valid email address for leader");
          return false;
        }
        
        if (formData.L_CNIC.length !== 13) {
          toast.error("Leader's CNIC must be 13 digits");
          return false;
        }
        
        if (formData.L_Contact.length !== 11) {
          toast.error("Leader's contact must be 11 digits");
          return false;
        }
        break;

      case 3:
        // Validate Member 1 (required)
        const member1Fields = ['M1_Name', 'M1_Email', 'M1_CNIC', 'M1_Contact'];
        const member1Missing = member1Fields.filter(field => !formData[field]);
        
        if (member1Missing.length > 0) {
          toast.error(`Please fill in member 1's: ${member1Missing.map(f => f.replace('M1_', '')).join(', ')}`);
          return false;
        }
        
        if (!validateEmail(formData.M1_Email)) {
          toast.error("Please enter a valid email address for member 1");
          return false;
        }
        
        // Member 2 validation (optional, but if any field is filled, all are required)
        const member2HasSomeData = ['M2_Name', 'M2_Email', 'M2_CNIC', 'M2_Contact'].some(field => formData[field]);
        
        if (member2HasSomeData) {
          const member2Fields = ['M2_Name', 'M2_Email', 'M2_CNIC', 'M2_Contact'];
          const member2Missing = member2Fields.filter(field => !formData[field]);
          
          if (member2Missing.length > 0) {
            toast.error(`Please complete member 2's information: ${member2Missing.map(f => f.replace('M2_', '')).join(', ')}`);
            return false;
          }
          
          if (!validateEmail(formData.M2_Email)) {
            toast.error("Please enter a valid email address for member 2");
            return false;
          }
        }
        break;
    }
    return true;
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: formRef.current, offsetY: 50 }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/register', formData)
      toast.success(response.data.message)
      // Reset form or redirect
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const InputField = ({ label, name, type = "text", required = true, pattern = null }) => {
    const isInvalid = () => {
      const value = formData[name];
      if (!value) return false;

      if (name.includes('Email')) {
        return !validateEmail(value);
      }
      if (name.includes('CNIC')) {
        return value.length !== 13;
      }
      if (name.includes('Contact')) {
        return value.length !== 11;
      }
      return false;
    };

    return (
      <div className="form-field">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${
              isInvalid() ? 'border-red-500' : 'border-gray-700'
            } text-white placeholder-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
            transition-colors duration-200`}
            required={required}
            placeholder={`Enter ${label}`}
            pattern={pattern}
          />
          {isInvalid() && (
            <div className="text-red-500 text-xs mt-1">
              {name.includes('Email') && 'Invalid email format'}
              {name.includes('CNIC') && 'CNIC must be 13 digits'}
              {name.includes('Contact') && 'Contact must be 11 digits'}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add helper text component for input fields
  const getHelperText = (name) => {
    if (name.includes('CNIC')) return '13 digits required';
    if (name.includes('Contact')) return '11 digits required';
    if (name.includes('Email')) return 'Valid email required';
    return '';
  };

  // Progress Stepper Component
  const Stepper = () => {
    return (
      <div className="w-full relative mb-8 px-4">
        <div className="max-w-4xl mx-auto relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-[50px] right-[50px] h-[2px] bg-gray-200">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center relative"
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center 
                    text-sm font-medium relative z-10 transition-all duration-300
                    ${
                      index + 1 < currentStep 
                        ? "bg-red-500 border-2 border-red-500"
                        : index + 1 === currentStep
                        ? "bg-white border-2 border-red-500"
                        : "bg-white border-2 border-gray-200"
                    }
                  `}
                >
                  {index + 1 < currentStep ? (
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  ) : (
                    <span
                      className={
                        index + 1 === currentStep
                          ? "text-red-500"
                          : "text-gray-400"
                      }
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                <span
                  className={`
                    mt-2 text-xs sm:text-sm font-medium text-center
                    ${
                      index + 1 <= currentStep
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" richColors />
      
      <div 
        ref={formRef}
        className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-red-500/20"
      >
        <div className="p-8">
          {/* Replace the old progress indicator with the new Stepper */}
          <Stepper />

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <InputField label="Competition Name" name="Competition_Name" />
                <InputField label="Institute Name" name="Institute_Name" />
                <InputField label="Team Name" name="Team_Name" />
                <InputField label="Institution" name="Institution" />
                <InputField label="Bank Account ID" name="BA_Id" />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <InputField label="Leader Name" name="L_Name" />
                <InputField label="Leader Email" name="L_Email" type="email" />
                <InputField 
                  label="Leader CNIC" 
                  name="L_CNIC" 
                  pattern="\d{13}"
                />
                <InputField 
                  label="Leader Contact" 
                  name="L_Contact"
                  pattern="\d{11}"
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Member 1 Information
                  </h3>
                  <InputField label="Name" name="M1_Name" />
                  <InputField label="Email" name="M1_Email" type="email" />
                  <InputField label="CNIC" name="M1_CNIC" pattern="\d{13}" />
                  <InputField label="Contact" name="M1_Contact" pattern="\d{11}" />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Member 2 Information
                  </h3>
                  <InputField label="Name" name="M2_Name" required={false} />
                  <InputField label="Email" name="M2_Email" type="email" required={false} />
                  <InputField label="CNIC" name="M2_CNIC" pattern="\d{13}" required={false} />
                  <InputField label="Contact" name="M2_Contact" pattern="\d{11}" required={false} />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                           transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Previous</span>
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 
                           transition-colors duration-200 flex items-center space-x-2 ml-auto"
                >
                  <span>Next</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 
                           transition-colors duration-200 flex items-center space-x-2 ml-auto
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Registration</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm 