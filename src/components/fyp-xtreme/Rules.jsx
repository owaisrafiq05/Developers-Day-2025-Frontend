"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaScroll } from "react-icons/fa";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

const rules = [
  { title: "Project Originality", description: "All submitted projects must be original work developed primarily by the team members. Any use of third-party components, libraries, or frameworks must be properly cited." },
  { title: "Submission Deadline", description: "All project submissions must be completed by the specified deadline. Late submissions will not be accepted under any circumstances." },
  { title: "Team Composition", description: "Teams must consist of 1-5 members, all from the same university. Each participant can only be part of one team." },
  { title: "Documentation", description: "Complete documentation as specified in the submission guidelines must be provided. This includes abstract, problem statement, methodology, results, and conclusion." },
  { title: "Working Prototype", description: "A functional prototype or working model of the project must be available for demonstration during the evaluation phase." },
  { title: "Intellectual Property", description: "Participants retain the intellectual property rights to their projects, but grant the organizers the right to publicize and display their work for promotional purposes." },
  { title: "Ethical Considerations", description: "Projects must adhere to ethical standards and not promote harmful, illegal, or unethical activities." },
  { title: "Judging Criteria", description: "Projects will be evaluated based on innovation, technical complexity, practical application, presentation quality, and adherence to submission guidelines." },
  { title: "Disqualification", description: "The organizers reserve the right to disqualify any team found violating the competition rules or engaging in unethical behavior." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Rules = () => {
  return (
    <section className="text-white py-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className=" text-white flex flex-col max-w-7xl mx-auto rounded-lg">
        
        {/* Title */}
        <motion.div
          className="p-6 mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-5xl  font-extrabold flex items-center gap-3">
            <FaScroll className="text-red-500 h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
            Competition Rules
          </h1>
        </motion.div>

        {/* Spotlight Card */}
        <SpotlightCard className="bg-transparent">
          <div className="absolute inset-0 bg-gray-900 to-transparent opacity-30 blur-xl" />

          {/* Rules List */}
          <div className="space-y-4 sm:space-y-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                className="text-base sm:text-lg"
              >
                <span className="text-red-500 font-bold">
                  {index + 1}. {rule.title}:
                </span>{" "}
                {rule.description}
              </motion.div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default Rules;
