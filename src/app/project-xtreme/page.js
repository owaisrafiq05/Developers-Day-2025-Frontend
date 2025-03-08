"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/project-xtreme/Header";
import WhatIsProjectExtreme from "@/components/project-xtreme/WhatIsProjectXtreme";
import Participation from "@/components/project-xtreme/Participation";
import Registration from "@/components/project-xtreme/Registeration";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import Rules from "@/components/project-xtreme/Rules";
import Squares from "@/components/Squares/Squares";

// Fade In/Out Animation Variants
const fadeInOut = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
};

const ProjectXtreme = () => {
  return (
    <div className=" text-white min-h-screen flex flex-col">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#000"
        hoverFillColor="#222"
      />
      {/* Header Section */}
      <header className="w-full border-b border-gray-700 py-8">
        <div className="mx-auto">
          <Header />
        </div>
      </header>

      <SpotlightCard
        spotlightColor="rgba(129, 0, 0, 0.2)"
        className=" rounded-xl  p-6 md:p-8 bg-transparent border-0"
      >
        {/* Main Content Section */}
        <motion.section
          className="container mx-auto space-y-20 py-10 mt-20"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={fadeInOut}
          viewport={{ once: false, amount: 0.2 }} // Controls when animation triggers
        >
          <WhatIsProjectExtreme />
        </motion.section>

        <motion.section
          className="container mx-auto space-y-20 py-10 mt-20"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={fadeInOut}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Participation />
        </motion.section>

        <motion.section
          className="container mx-auto space-y-20 py-10 mt-20"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={fadeInOut}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Rules />
        </motion.section>

        {/* Registration Section */}
        <motion.section
          className="py-16 md:px-14 lg:px-14"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={fadeInOut}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="container mx-auto">
            {/* <Registration /> */}
            <h2 className="text-center text-3xl font-bold text-red-600 bg-gray-800 p-4 rounded-lg shadow-lg">
              Registrations will be live soon!
            </h2>
          </div>
        </motion.section>
      </SpotlightCard>
    </div>
  );
};

export default ProjectXtreme;
