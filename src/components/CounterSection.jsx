"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp/CountUp";
import Countdown from "./Counter";

const CounterSection = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Event Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <Countdown />
      </motion.div>
    </div>
  );
};

export default CounterSection; 