"use client";
import Squares from "@/components/Squares/Squares";
import { motion } from "framer-motion";
const page = () => {
  return (
    <div className="pt-[100px] h-full">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#000"
        hoverFillColor="#222"
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, iure
          eveniet? Deleniti maiores praesentium id soluta quae modi omnis
          magnam, doloribus eius, consectetur quo dolores.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default page;
