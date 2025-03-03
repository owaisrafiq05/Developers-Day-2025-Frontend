"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard/SpotlightCard";

export default function Countdown() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 10);

  const [timeUnits, setTimeUnits] = useState([
    { value: 0, label: "DAYS" },
    { value: 0, label: "HOURS" },
    { value: 0, label: "MINUTES" },
    { value: 0, label: "SECONDS" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeUnits([
        { value: days, label: "DAYS" },
        { value: hours, label: "HOURS" },
        { value: minutes, label: "MINUTES" },
        { value: seconds, label: "SECONDS" },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center z-0 relative">
       <motion.div
          initial={{ opacity: 0, x: 0, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.5 }}>
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-3xl font-semibold text-white relative">Registration Starts In...</h2>
      </div>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {timeUnits.map((unit) => (
          <motion.div
          key={unit.label}
          initial={{ opacity: 0, x: 0, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 flex flex-col justify-center items-center gap-1 text-center border-0"
        >
          <SpotlightCard className="absolute top-0 left-0 w-full h-full bg-gradient-to-br bg-transparent border-white transition duration-300 hover:shadow-lg  hover:shadow-red-500/50 group">
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center bg-transparent 
         "
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums 
            transition duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-sm sm:text-base font-medium text-gray-400 mt-2 
            transition duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
              {unit.label}
            </div>
          </div>
          </SpotlightCard>
        </motion.div>
        ))}
      </div>
    </div>
  );
}
