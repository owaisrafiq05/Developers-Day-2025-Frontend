import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const Registration = () => {
  const formRef = useRef(null);
  const fieldsRef = useRef([]);

  const [teamSize, setTeamSize] = useState(3);

  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 768; // Adjust breakpoint as needed
  
    if (!isLargeScreen) return; // Skip animations on small screens
  
    // Section Fade-in Animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      }
    );
  
    // Fields Animation - Sequential Appearance
    fieldsRef.current.forEach((field, index) => {
      gsap.fromTo(
        field,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.15, // Stagger effect
          scrollTrigger: {
            trigger: field,
            start: "top 90%",
          },
        }
      );
    });
  }, [teamSize]);
  

  return (
    <section
      ref={formRef}
      className="w-full px-4 py-6 bg-gray-900 text-white rounded-lg shadow-lg mx-auto "

    >
      <SpotlightCard className="bg-transparent border-0 rounded-lg !p-0 md:!p-10" spotlightColor="rgba(0, 0, 0, 0.4) ">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 text-center">
          Registration
        </h2>
        {/* <SpotlightCard className="bg-transparent border-0 rounded-lg" spotlightColor="rgba(0, 0, 0, 0.4) "> */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">
          {/* Basic Fields */}
          <input
            ref={(el) => (fieldsRef.current[0] = el)}
            className="p-3 bg-gray-800  rounded-lg border border-gray-700 focus:border-red-600 hover:border-red-600  outline-none w-full"
            type="text"
            placeholder="Project Name"
          />
          <input
            ref={(el) => (fieldsRef.current[1] = el)}
            className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-600 focus:border-red-600 outline-none w-full"
            type="text"
            placeholder="University Name"
          />

          {/* Team Size Selector */}
          {/* Team Size Selector */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-sm text-gray-400">
              Team size must be between 3 and 4 members.
            </span>
            <div
              ref={(el) => (fieldsRef.current[2] = el)}
              className="flex items-center mt-2 justify-start space-x-2"
            >
              <button
                type="button"
                className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-l-lg text-white"
                onClick={() => setTeamSize((prev) => Math.max(3, prev - 1))}
              >
                -
              </button>
              <span className="bg-gray-800 px-6 py-2 text-lg rounded-lg">
                {teamSize}
              </span>
              <button
                type="button"
                className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-r-lg text-white"
                onClick={() => setTeamSize((prev) => Math.min(4, prev + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Dynamic Team Members Fields */}
          {Array.from({ length: teamSize }).map((_, index) => (
            <div
              key={index}
              ref={(el) => (fieldsRef.current[3 + index] = el)}
              className="col-span-1 md:col-span-2 bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-2 text-red-500">
                Team Member {index + 1}
              </h3>
              <input
                className="p-3 bg-gray-900 rounded-lg w-full border border-gray-700 hover:border-red-600 focus:border-red-600 outline-none mb-2"
                type="text"
                placeholder="Full Name"
              />
              <input
                className="p-3 bg-gray-900 rounded-lg w-full border border-gray-700 hover:border-red-600 focus:border-red-600 outline-none mb-2"
                type="text"
                placeholder="CNIC"
              />
              <input
                className="p-3 bg-gray-900 rounded-lg w-full border border-gray-700 hover:border-red-600 focus:border-red-600 outline-none mb-2"
                type="email"
                placeholder="Email"
              />
              <input
                className="p-3 bg-gray-900 rounded-lg w-full border border-gray-700 hover:border-red-600 focus:border-red-600 outline-none"
                type="tel"
                placeholder="Phone Number"
              />
            </div>
          ))}

          {/* File Submission */}
          <div
            ref={(el) => (fieldsRef.current[10] = el)}
            className="col-span-1 md:col-span-2"
          >
            <span className="text-sm text-gray-400">
              Upload a document with project details which includes project
              title, domain, abstarct, problem statement, methadology, results,
              product link and conclusion.
            </span>
            <input
              className="mt-2 p-3 bg-gray-800 rounded-lg w-full border border-gray-700 focus:border-red-600 hover:border-red-600  outline-none"
              type="file"
            />
          </div>

          {/* Submit Button */}
          <button
            ref={(el) => (fieldsRef.current[11] = el)}
            className="col-span-1 md:col-span-2 bg-red-700 hover:bg-red-800 p-4 rounded-lg text-lg font-semibold text-white transition-all"
          >
            Submit Registration
          </button>
        </form>
        </SpotlightCard>
      {/* </SpotlightCard> */}
    </section>
  );
};

export default Registration;
