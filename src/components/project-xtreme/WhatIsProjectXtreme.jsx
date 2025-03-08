"use client";

import { FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

const WhatIsProjectExtreme = () => {
  return (
    <section className="text-white py-5 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="pb-4 mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-3">
            <FaBolt className="text-red-500 h-8 w-8 animate-pulse" />
            What is Project Xtreme?
          </h1>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SpotlightCard
              spotlightColor="rgba(255, 0, 0, 0.4)"
              className=" rounded-xl  p-6 md:p-8 bg-transparent border-0"
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
          </motion.div>

          {/* Key highlights with SpotlightCard */}
          <motion.div
            className="bg-transparent rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SpotlightCard className=" rounded-lg p-6 md:p-8 bg-red-900/80">
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
                  <motion.li
                    key={index}
                    className="flex items-start text-lg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInLeft}
                    custom={index}
                  >
                    <motion.span
                      className="text-red-600 mr-3"
                      animate={{
                        opacity: [1, 0.3, 1], // Blinking effect
                        scale: [1, 1, 1], // Slight pulse
                      }}
                      transition={{
                        repeat: Infinity, // Loop forever
                        duration: 2, // Speed of blinking
                        ease: "easeInOut",
                      }}
                    >
                      •
                    </motion.span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsProjectExtreme;
