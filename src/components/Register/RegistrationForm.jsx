"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import dummyData from "@/data/data-comp"

gsap.registerPlugin(ScrollTrigger)

const competitionNames = dummyData.map(module => module.title)

const RegistrationForm = () => {
  const formRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [competitionName, setCompetitionName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderContact, setLeaderContact] = useState("");
  const [leaderCNIC, setLeaderCNIC] = useState("");
  const [m1Name, setM1Name] = useState("");
  const [m1Email, setM1Email] = useState("");
  const [m1Contact, setM1Contact] = useState("");
  const [m1CNIC, setM1CNIC] = useState("");
  const [m2Name, setM2Name] = useState("");
  const [m2Email, setM2Email] = useState("");
  const [m2Contact, setM2Contact] = useState("");
  const [m2CNIC, setM2CNIC] = useState("");
  const [institution, setInstitution] = useState("");
  const [baId, setBaId] = useState("");

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

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleBlur = (name, value) => {
    if (name === 'leaderEmail' && value && !validateEmail(value)) {
      toast.error('Please enter a valid email address');
    }
    if (name === 'leaderCNIC' && value && value.length !== 13) {
      toast.error('CNIC must be exactly 13 digits');
    }
    if (name === 'leaderContact' && value && value.length !== 11) {
      toast.error('Contact number must be exactly 11 digits');
    }
  }

  const validateStep = (step) => {
    switch(step) {
      case 1:
        if (!competitionName || !instituteName || !teamName || !institution || !baId) {
          toast.error("Please fill in all required fields.");
          return false;
        }
        break;

      case 2:
        if (!leaderName || !leaderEmail || !leaderContact || !leaderCNIC) {
          toast.error("Please fill in all required fields for the leader.");
          return false;
        }
        
        if (!validateEmail(leaderEmail)) {
          toast.error("Please enter a valid email address for leader");
          return false;
        }
        
        if (leaderCNIC.length !== 13) {
          toast.error("Leader's CNIC must be 13 digits");
          return false;
        }
        
        if (leaderContact.length !== 11) {
          toast.error("Leader's contact must be 11 digits");
          return false;
        }
        break;

      case 3:
        if (!m1Name || !m1Email || !m1CNIC || !m1Contact) {
          toast.error("Please fill in all required fields for member 1.");
          return false;
        }
        
        if (!validateEmail(m1Email)) {
          toast.error("Please enter a valid email address for member 1");
          return false;
        }
        
        if (m2Name || m2Email || m2CNIC || m2Contact) {
          if (!m2Name || !m2Email || !m2CNIC || !m2Contact) {
            toast.error("Please complete member 2's information.");
            return false;
          }
          
          if (!validateEmail(m2Email)) {
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
      const response = await axios.post('/api/register', {
        Competition_Name: competitionName,
        Institute_Name: instituteName,
        Team_Name: teamName,
        L_Name: leaderName,
        L_Email: leaderEmail,
        L_Contact: leaderContact,
        L_CNIC: leaderCNIC,
        M1_Name: m1Name,
        M1_Email: m1Email,
        M1_Contact: m1Contact,
        M1_CNIC: m1CNIC,
        M2_Name: m2Name,
        M2_Email: m2Email,
        M2_Contact: m2Contact,
        M2_CNIC: m2CNIC,
        Institution: institution,
        BA_Id: baId
      });
      toast.success(response.data.message)
      // Reset form or redirect
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Custom Input Component
  const CustomInput = ({ label, value, onChange, onBlur, name, type = "text", required = true }) => {
    return (
      <div className="form-field">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur(name, value)}
          required={required}
          className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border ${
            (name === 'leaderEmail' && !validateEmail(value)) || 
            (name === 'leaderCNIC' && value.length !== 13) || 
            (name === 'leaderContact' && value.length !== 11) ? 'border-red-500' : 'border-gray-700'
          } text-white placeholder-gray-400
          focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
          transition-colors duration-200`}
          placeholder={`Enter ${label}`}
        />
        {name === 'leaderEmail' && !validateEmail(value) && (
          <div className="text-red-500 text-xs mt-1">Invalid email format</div>
        )}
        {name === 'leaderCNIC' && value.length !== 13 && (
          <div className="text-red-500 text-xs mt-1">CNIC must be 13 digits</div>
        )}
        {name === 'leaderContact' && value.length !== 11 && (
          <div className="text-red-500 text-xs mt-1">Contact must be 11 digits</div>
        )}
      </div>
    );
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                    text-sm font-medium relative z-10 transition-all duration-300
                    ${index + 1 < currentStep ? "bg-red-500 border-2 border-red-500" : 
                      index + 1 === currentStep ? "bg-white border-2 border-red-500" : 
                      "bg-white border-2 border-gray-200"}
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
                      className={index + 1 === currentStep ? "text-red-500" : "text-gray-400"}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                <span
                  className={`mt-2 text-xs sm:text-sm font-medium text-center
                    ${index + 1 <= currentStep ? "text-red-500" : "text-gray-400"}
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
      <Toaster position="bottom-right z-10" richColors />
      
      <div 
        ref={formRef}
        className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-red-500/20"
      >
        <div className="p-8">
          <Stepper />

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Competition <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="Competition_Name"
                    value={competitionName}
                    onChange={handleInputChange(setCompetitionName)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors duration-200"
                    required
                  >
                    <option value="" disabled>Select a competition</option>
                    {competitionNames.map((name, index) => (
                      <option key={index} value={name} className="bg-black text-red-500">
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <CustomInput label="Brand Ambassador Code" value={baId} onChange={handleInputChange(setBaId)} name="Brand_Ambassador" />
                <CustomInput label="Team Name" value={teamName} onChange={handleInputChange(setTeamName)} name="Team_Name" />
                <CustomInput label="Institution" value={institution} onChange={handleInputChange(setInstitution)} name="Institution" />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <CustomInput label="Leader Name" value={leaderName} onChange={handleInputChange(setLeaderName)} name="L_Name" />
                <CustomInput label="Leader Email" value={leaderEmail} onChange={handleInputChange(setLeaderEmail)} name="L_Email" type="email" />
                <CustomInput label="Leader CNIC" value={leaderCNIC} onChange={handleInputChange(setLeaderCNIC)} name="L_CNIC" />
                <CustomInput label="Leader Contact" value={leaderContact} onChange={handleInputChange(setLeaderContact)} name="L_Contact" />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Member 1 Information
                  </h3>
                  <CustomInput label="Name" value={m1Name} onChange={handleInputChange(setM1Name)} name="M1_Name" />
                  <CustomInput label="Email" value={m1Email} onChange={handleInputChange(setM1Email)} name="M1_Email" type="email" />
                  <CustomInput label="CNIC" value={m1CNIC} onChange={handleInputChange(setM1CNIC)} name="M1_CNIC" />
                  <CustomInput label="Contact" value={m1Contact} onChange={handleInputChange(setM1Contact)} name="M1_Contact" />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Member 2 Information
                  </h3>
                  <CustomInput label="Name" value={m2Name} onChange={handleInputChange(setM2Name)} name="M2_Name" required={false} />
                  <CustomInput label="Email" value={m2Email} onChange={handleInputChange(setM2Email)} name="M2_Email" type="email" required={false} />
                  <CustomInput label="CNIC" value={m2CNIC} onChange={handleInputChange(setM2CNIC)} name="M2_CNIC" required={false} />
                  <CustomInput label="Contact" value={m2Contact} onChange={handleInputChange(setM2Contact)} name="M2_Contact" required={false} />
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
                    <span>Submitting...</span>
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