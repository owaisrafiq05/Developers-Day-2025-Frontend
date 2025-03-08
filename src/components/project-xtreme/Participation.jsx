"use client";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Participation = () => {
  return (
    <section className="bg-transparent text-white mt-4 mb-4 px-4 md:px-8 lg:px-12 py-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="pb-4 mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
            <FaUsers className="text-red-500 h-8 w-8" /> Who Can Participate?
          </h1>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Key highlights box */}
          <motion.div
            className="bg-red-900/80 rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SpotlightCard className=" rounded-lg p-6 md:p-8 bg-red-900/80">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Key Highlights
              </h2>
              <ul className="space-y-3">
                {[
                  "Open to all students from recognized universities",
                  "Teams can consist of up to four members",
                  "Projects from any field of technology are welcome",
                  "Industry experts will evaluate submissions",
                  "Top teams will receive mentorship and funding opportunities",
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
                    <span className="text-red-600 mr-2">•</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Content */}
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
                Project Xtreme is open to all students eager to
                present their innovative projects. Whether you're working solo
                or as part of a team, this competition is designed to showcase
                your technical skills and creativity.
              </p>
              <p className="text-lg leading-relaxed">
                If you've built a groundbreaking app, engineered an advanced
                system, or developed a novel solution to a real-world challenge,
                this is your chance to shine. Gain industry recognition,
                valuable feedback, and even potential career opportunities!
              </p>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Participation;
