"use client";
import Squares from "@/components/Squares/Squares";
import { motion } from "framer-motion";
const page = () => {
  return (
    <div className="pt-[100px] h-full">
      <Squares
        squareSize={40}
        borderColor="#000"
      />
      <motion.div
        // initial={{ opacity: 0, y: -40, scale: 0 }}
        // animate={{ opacity: 1, y: 0, scale: 1 }}
        // transition={{ duration: 0.4, delay: 1 }}
        className="container px-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full m-auto text-center flex-col gap-6 flex items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -40, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative text-red-600 text-5xl font-bold"
        >
          Job Orbit
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: -40, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative text-4xl font-bold"
        >
          COMING SOON
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: -40, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative max-w-[600px]"
        >
          Something Big is on the Horizon!<br /><br />
          Opportunities are about to take a whole new orbit—<strong>Job Orbit</strong> is coming soon!<br />Whether you're seeking your next career move, looking for game-changing insights, or simply curious about what's ahead, something exciting is brewing.<br /><br />
          Stay tuned for more details.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default page;
