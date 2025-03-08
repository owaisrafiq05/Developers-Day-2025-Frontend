"use client";
import React, { useEffect, useRef } from "react";
import { FaScroll } from "react-icons/fa";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import gsap from "gsap";

const rules = [
  { 
    title: "Project Requirements", 
    description: "<ul class='list-disc pl-5 mt-2'><li>The idea must be unique.</li><li>If selected for the onsite round, teams must present some tangible results, a platform, or a working project.</li></ul>" 
  },
  { 
    title: "Team Formation", 
    description: "<ul class='list-disc pl-5 mt-2'><li>A team can have a minimum of 3 and maximum of 4 members.</li></ul>" 
  },
  { 
    title: "Competition Structure", 
    description: "<ul class='list-disc pl-5 mt-2'><li>Round 1: Teams must submit an abstract of their project.</li><li>Evaluation Criteria: Projects will be judged by a jury based on:<ul class='list-disc pl-5 mt-1'><li>Problem Complexity</li><li>Creativity</li><li>Innovation</li></ul></li><li>Selection for Onsite Round: Only 40 projects will qualify for the onsite round.</li></ul>" 
  },
  { 
    title: "Onsite Round", 
    description: "<ul class='list-disc pl-5 mt-2'><li>Selected teams will be provided a designated space to present their project.</li><li>A jury of industry experts will evaluate the projects.</li></ul>" 
  },
  { 
    title: "Participation Fee", 
    description: "<ul class='list-disc pl-5 mt-2'><li>Teams selected for the onsite round must pay a fee of <b>4000 PKR</b>.</li></ul>" 
  },
];

const Rules = () => {
  const titleRef = useRef(null);
  const rulesRef = useRef([]);

  useEffect(() => {
    // GSAP Animation for title
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "easeOut",
    });

    // GSAP Animation for rules
    rulesRef.current.forEach((rule, index) => {
      gsap.from(rule, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1, // Stagger effect
      });
    });
  }, []);

  return (
    <section className="text-white py-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="bg-transparent text-white flex flex-col max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div ref={titleRef} className="pb-4 mb-6 sm:mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-3">
            <FaScroll className="text-red-500 h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
            Competition Rules
          </h1>
        </div>

        {/* Spotlight Card */}
        <SpotlightCard className="bg-transparent">
          <div className="absolute inset-0 bg-gray-900 to-transparent opacity-30 blur-xl" />

          {/* Rules List */}
          <div className="space-y-4 sm:space-y-6">
            {rules.map((rule, index) => (
              <div
                key={index}
                ref={(el) => (rulesRef.current[index] = el)} // Store reference for GSAP animation
                className="text-base sm:text-lg"
              >
                <div className="text-red-500 font-bold text-xl mb-1">
                  {index + 1}. {rule.title}
                </div>
                <div dangerouslySetInnerHTML={{ __html: rule.description }} />
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Rules;
