"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownTimer = () => {
  const initialTime = { days: 5, hours: 12, minutes: 30, seconds: 45 };
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center min-h-screen bg-black p-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Event Starts In</h2>
      </div>

      <div className="flex space-x-2 sm:space-x-4 md:space-x-6 text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold">
        {Object.entries(timeLeft).map(([label, value], index) => (
          <motion.span key={index} className="flex flex-col items-center">
            <motion.span
              className="text-red-600"
              initial={{
                textShadow: "0px 0px 6px rgba(255, 0, 0, 0.7)", 
              }}
              whileHover={{
                textShadow: [
                  "0px 0px 10px rgba(0, 0, 0, 0.9)",  
                  "0px 0px 18px rgba(255, 0, 0, 1)", 
                  "0px 0px 25px rgba(255, 0, 0, 0.8)"
                ],
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {value}
            </motion.span>
            <motion.span className="text-white text-[10px] sm:text-xs md:text-lg lg:text-2xl">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </motion.span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
