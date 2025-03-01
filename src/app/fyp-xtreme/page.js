"use client";
import React from "react";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import Header from "@/components/fyp-xtreme/Header";
import WhatIsFYP from "@/components/fyp-xtreme/WhatIsFYP";
import Participation from "@/components/fyp-xtreme/Participation";
import Registration from "@/components/fyp-xtreme/Registeration";

const FinalYearXtreme = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="w-full border-b border-gray-700 py-8">
        <div className="container mx-auto">
          <Header />
        </div>
      </header>

      {/* Main Content Section */}
      <section className="container mx-auto space-y-20 py-10 mt-20">
        <WhatIsFYP />
      </section>
      <section className="container mx-auto space-y-20 py-10 mt-20">
        
        <Participation />
      </section>

      {/* Registration Section */}
      <section className="py-16 md:px-14 lg:px-14">
        <div className="container mx-auto">
          <Registration />
        </div>
      </section>
    </div>
  );
};

export default FinalYearXtreme;
