"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/fyp-xtreme/Header";
import WhatIsFYP from "@/components/fyp-xtreme/WhatIsFYP";
import Participation from "@/components/fyp-xtreme/Participation";
import Registration from "@/components/fyp-xtreme/Registeration";
import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import Rules from "@/components/fyp-xtreme/Rules";

// Fade In/Out Animation Variants
const fadeInOut = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
};

const FinalYearXtreme = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      {/* Header Section */}
      <header className="w-full border-b border-gray-700 py-8">
        <div className="mx-auto">
          <Header />
        </div>
      </header>

      <SpotlightCard spotlightColor="rgba(129, 0, 0, 0.2)" className=" rounded-xl  p-6 md:p-8 bg-transparent border-0">
      {/* Main Content Section */}
      <motion.section
        className="container mx-auto space-y-20 py-10 mt-20"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={fadeInOut}
        viewport={{ once: false, amount: 0.2 }} // Controls when animation triggers
      >
        <WhatIsFYP />
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
        <Rules/>
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
          <Registration />
        </div>
      </motion.section>
      </SpotlightCard>
    </div>
  );
};

export default FinalYearXtreme;
