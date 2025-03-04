"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import dummyData from "@/data/data-comp"

gsap.registerPlugin(ScrollTrigger)

const competitionNames = dummyData.map(module => module.title)
const competitionPrices = dummyData.reduce((acc, module) => {
  acc[module.title] = module.price; // Assuming each module has a price property
  return acc;
}, {});

const CustomInput = ({ label, name, value, onChange, onBlur, type = "text", placeholder }) => {
  return (
    <div className="form-field">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {type === "text" && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400
        focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-200"
        placeholder={placeholder}
      />
    </div>
  );
};

const RegistrationForm = () => {
  const formRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  
  // Combine all form fields into a single state object
  const [formData, setFormData] = useState({
    competitionName: "",
    instituteName: "",
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    leaderContact: "",
    leaderCNIC: "",
    m1Name: "",
    m1Email: "",
    m1Contact: "",
    m1CNIC: "",
    m2Name: "",
    m2Email: "",
    m2Contact: "",
    m2CNIC: "",
    institution: "",
    baId: ""
  });

  const steps = ["Contact Info", "Player Info", "Review", "Payment", "Submit"]

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
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Update the specific field in formData
    }));
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
        // Ensure a competition is selected
        if (!formData.competitionName) {
          toast.error("Please select a competition.");
          return false;
        }
        return true; // Allow moving to the next step if competition is selected

      case 2:
        if (!formData.leaderName || !formData.leaderEmail || !formData.leaderContact || !formData.leaderCNIC) {
          toast.error("Please fill in all required fields for the leader.");
          return false;
        }
        
        if (!validateEmail(formData.leaderEmail)) {
          toast.error("Please enter a valid email address for leader");
          return false;
        }
        
        if (formData.leaderCNIC.length !== 13) {
          toast.error("Leader's CNIC must be 13 digits");
          return false;
        }
        
        if (formData.leaderContact.length !== 11) {
          toast.error("Leader's contact must be 11 digits");
          return false;
        }
        break;

      case 3:
        if (!formData.m1Name || !formData.m1Email || !formData.m1CNIC || !formData.m1Contact) {
          toast.error("Please fill in all required fields for member 1.");
          return false;
        }
        
        if (!validateEmail(formData.m1Email)) {
          toast.error("Please enter a valid email address for member 1");
          return false;
        }
        
        if (formData.m2Name || formData.m2Email || formData.m2CNIC || formData.m2Contact) {
          if (!formData.m2Name || !formData.m2Email || !formData.m2CNIC || !formData.m2Contact) {
            toast.error("Please complete member 2's information.");
            return false;
          }
          
          if (!validateEmail(formData.m2Email)) {
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
      setCurrentStep(prev => prev + 1);
      gsap.to(window, {
        duration: 0.5,
        scrollTo: formRef.current.offsetTop + 50 // Adjusting the scroll position directly
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep) || !isAgreed) {
      if (!isAgreed) {
        toast.error("You must agree to the privacy policies to submit the form.");
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/register', {
        Competition_Name: formData.competitionName,
        Institute_Name: formData.instituteName,
        Team_Name: formData.teamName,
        L_Name: formData.leaderName,
        L_Email: formData.leaderEmail,
        L_Contact: formData.leaderContact,
        L_CNIC: formData.leaderCNIC,
        M1_Name: formData.m1Name,
        M1_Email: formData.m1Email,
        M1_Contact: formData.m1Contact,
        M1_CNIC: formData.m1CNIC,
        M2_Name: formData.m2Name,
        M2_Email: formData.m2Email,
        M2_Contact: formData.m2Contact,
        M2_CNIC: formData.m2CNIC,
        Institution: formData.institution,
        BA_Id: formData.baId
      });
      toast.success(response.data.message);
      // Reset form or redirect
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
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

  // Payment Step Component
  const PaymentStep = () => {
    const selectedCompetitionPrice = competitionPrices[formData.competitionName] || 0;

    const handleCheckboxChange = () => {
      setIsAgreed(prev => !prev);
    };

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
          Payment Information
        </h3>
        <p className="text-gray-300">The payment for the selected competition <strong>{formData.competitionName}</strong> is <strong>${selectedCompetitionPrice}</strong>.</p>
        
        <div className="text-gray-300">
          <h4 className="font-semibold pt-4">Developers Day Competition Registration Policies</h4>
          <br style={{ display: 'none' }} />
          <h5 className="font-semibold pt-4">Privacy Policy</h5>
          <br style={{ display: 'none' }} />
          <p>All personal data collected during registration will be kept strictly confidential and will only be used for purposes related to Developers Day. We will not share, sell, or distribute your information to any third party.</p>
          
          <h5 className="font-semibold pt-4">Refund Policy</h5>
          <br style={{ display: 'none' }} />
          <p>Developers Day follows a strict no refund policy for competition registrations. However, if a team has an empty slot, they may add a teammate by contacting the Developers Day 25 PR team before the event.</p>
          
          <h5 className="font-semibold pt-4">Terms and Conditions</h5>
          <br style={{ display: 'none' }} />
          <ol className="list-decimal pl-5">
            <li>Participants must adhere to all competition rules and guidelines provided before and during the event.</li>
            <li>Any violation of the rules may result in immediate disqualification from the competition.</li>
            <li>Collaboration between teams or external assistance is strictly prohibited and will lead to disqualification.</li>
            <li>No edibles are allowed inside the competition venue.</li>
            <li>The organizers reserve the right to adjust rules or competition parameters to maintain fairness and integrity.</li>
            <li>The competition will begin at the scheduled time, and teams must arrive early for instructions and setup.</li>
          </ol>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-gray-300">I have read and agree to the privacy policies.</label>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isAgreed) {
              toast.success("Proceeding to payment...");
              // Add your payment processing logic here
            } else {
              toast.error("You must agree to the privacy policies to proceed.");
            }
          }}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Proceed to Payment
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="bottom-right z-10" richColors className="custom-toast" />
      
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
                    name="competitionName" // Use the correct name for formData
                    value={formData.competitionName}
                    onChange={handleInputChange}
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
                <CustomInput
                  label="Brand Ambassador Code"
                  name="baId"
                  value={formData.baId}
                  onChange={handleInputChange}
                  placeholder="Enter BA ID"
                />
                <CustomInput
                  label="Team Name"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="Enter Team Name"
                />
                <CustomInput
                  label="Institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="Enter Institution"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <CustomInput
                  label="Leader Name"
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleInputChange}
                  placeholder="Enter Leader Name"
                />
                <CustomInput
                  label="Leader Email"
                  name="leaderEmail"
                  value={formData.leaderEmail}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('leaderEmail', formData.leaderEmail)}
                  type="email"
                  placeholder="Enter Leader Email"
                />
                <CustomInput
                  label="Leader CNIC"
                  name="leaderCNIC"
                  value={formData.leaderCNIC}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('leaderCNIC', formData.leaderCNIC)}
                  placeholder="Enter Leader CNIC"
                />
                <CustomInput
                  label="Leader Contact"
                  name="leaderContact"
                  value={formData.leaderContact}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('leaderContact', formData.leaderContact)}
                  placeholder="Enter Leader Contact"
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Member 1 Information
                  </h3>
                  <CustomInput
                    label="Name"
                    name="m1Name"
                    value={formData.m1Name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                  />
                  <CustomInput
                    label="Email"
                    name="m1Email"
                    value={formData.m1Email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Enter Email"
                  />
                  <CustomInput
                    label="CNIC"
                    name="m1CNIC"
                    value={formData.m1CNIC}
                    onChange={handleInputChange}
                    placeholder="Enter CNIC"
                  />
                  <CustomInput
                    label="Contact"
                    name="m1Contact"
                    value={formData.m1Contact}
                    onChange={handleInputChange}
                    placeholder="Enter Contact"
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
                    Member 2 Information
                  </h3>
                  <CustomInput
                    label="Name"
                    name="m2Name"
                    value={formData.m2Name}
                    onChange={handleInputChange}
                    placeholder="Enter Name"
                  />
                  <CustomInput
                    label="Email"
                    name="m2Email"
                    value={formData.m2Email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Enter Email"
                  />
                  <CustomInput
                    label="CNIC"
                    name="m2CNIC"
                    value={formData.m2CNIC}
                    onChange={handleInputChange}
                    placeholder="Enter CNIC"
                  />
                  <CustomInput
                    label="Contact"
                    name="m2Contact"
                    value={formData.m2Contact}
                    onChange={handleInputChange}
                    placeholder="Enter Contact"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && <PaymentStep />}

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
              
              {currentStep < 4 ? (
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