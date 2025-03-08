"use client";

import { FaBolt } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

const WhatIsProjectXtreme = () => {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const highlightsRef = useRef([]);

  useEffect(() => {
    // GSAP Animation for header
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "easeOut",
    });

    // GSAP Animation for main content
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    });

    // GSAP Animation for highlights
    highlightsRef.current.forEach((highlight, index) => {
      gsap.from(highlight, {
        opacity: 0,
        x: -10,
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1,
      });
    });
  }, []);

  return (
    <section className="text-white py-5 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="pb-4 mb-6 sm:mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-3">
            <FaBolt className="text-red-500 h-8 w-8 animate-pulse" />
            What is Project Xtreme?
          </h1>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SpotlightCard
              spotlightColor="rgba(255, 0, 0, 0.4)"
              className="rounded-xl p-6 md:p-8 bg-transparent border-0"
            >
              <p className="text-lg leading-relaxed">
                Project Xtreme is the ultimate competition for 
                students to showcase their innovative projects and technical
                skills. This platform brings together the brightest minds from
                universities across the country to compete, collaborate, and
                create groundbreaking solutions.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you've developed a revolutionary app, designed an
                innovative system, or created a unique solution to a real-world
                problem, Project Xtreme is your chance to gain recognition,
                receive expert feedback, and potentially win amazing prizes.
              </p>
            </SpotlightCard>
          </div>

          {/* Key highlights with SpotlightCard */}
          <div className="bg-transparent rounded-lg shadow-lg">
            <SpotlightCard className="rounded-lg p-6 md:p-8 bg-red-900/80">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Key Highlights
              </h2>
              <ul className="space-y-4">
                {[
                  "Showcase your project to industry experts",
                  "Network with tech leaders and potential employers",
                  "Win prizes and recognition for your innovation",
                  "Get valuable feedback to improve your project",
                  "Launch your career with exposure to industry leaders",
                ].map((highlight, index) => (
                  <li
                    key={index}
                    ref={(el) => (highlightsRef.current[index] = el)} // Store reference for GSAP animation
                    className="flex items-start text-lg"
                  >
                    <span className="text-red-600 mr-3">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsProjectXtreme;
