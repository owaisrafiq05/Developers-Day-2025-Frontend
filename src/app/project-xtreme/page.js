"use client";
import React from "react";
import Header from "@/components/project-xtreme/Header";
import WhatIsProjectXtreme from "@/components/project-xtreme/WhatIsProjectXtreme";
import Registration from "@/components/project-xtreme/Registeration";
import Rules from "@/components/project-xtreme/Rules";
import Squares from "@/components/Squares/Squares";
import { FaTrophy } from "react-icons/fa";

const ProjectXtreme = () => {
  return (
    <div className="text-white min-h-screen flex flex-col">
      <Squares squareSize={40} borderColor="#000" />
      {/* Header Section */}
      <header className="w-full border-b border-gray-700 py-8">
        <div className="mx-auto">
          <Header />
        </div>
      </header>

      {/* Main Content Section */}
      <section className="container mx-auto space-y-20 py-10 mt-20">
        <WhatIsProjectXtreme />
      </section>

      {/* Prize Pool Banner */}
      <div className="w-full py-6 my-10">
        <div className="container mx-auto flex items-center justify-center px-4">
          <div className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-red-600/50 shadow-md">
            <FaTrophy className="text-white text-2xl md:text-3xl mr-1" />
            <span className="text-xl md:text-2xl font-bold text-white mr-1">Prize pool:</span>
            <span className="text-2xl md:text-4xl font-extrabold text-white">
              Rs. 100,000
            </span>
          </div>
        </div>
      </div>

      <section className="container mx-auto space-y-20 py-10 mt-20">
        <Rules />
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

export default ProjectXtreme;
