"use client";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import CountUp from "./CountUp/CountUp";

const Stats = () => {
  const heading = useRef(null);

  useEffect(() => {
    gsap.from(heading.current, {
      scrollTrigger: {
        trigger: heading.current,
        start: "top 85%",
        end: "top 35%",
        scrub: true,
      },
      scale: 2,
      opacity: 0,
      duration: 1,
      delay: 1,
    });
  }, []);
  return (
    <div className="flex items-center justify-center flex-col gap-4 px-10 pb-10">
      <h1 className="text-3xl font-bold" ref={heading}>
        Stats
      </h1>
      <div className="flex gap-4 justify-center items-center flex-wrap">
        <motion.div
          initial={{ opacity: 0, x: 0, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative z-10 w-[275px] min-h-[200px] rounded-2xl flex flex-col justify-center items-center gap-3 text-center"
        >
          <SpotlightCard className="absolute top-0 left-0 p-10 w-full h-full bg-gradient-to-br from-[#6e0a0a] to-[#3f070a]">
            <h1 className="text-5xl text-left w-full mb-2">
              <CountUp
                from={0}
                to={25}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text font-bold"
              />
              +
            </h1>
            <p className="text-left text-xl font-semibold">
              COMPETITIONS
            </p>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="relative z-10 w-[275px] min-h-[200px] rounded-2xl flex flex-col justify-center items-center gap-3 text-center"
        >
          <SpotlightCard className="absolute top-0 left-0 p-10 w-full h-full bg-gradient-to-br from-[#6e0a0a] to-[#3f070a]">
            <h1 className="text-5xl text-left w-full mb-2">
              <CountUp
                from={0}
                to={35}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text font-bold"
              />
              +
            </h1>
            <p className="text-left text-xl font-semibold">
              COMPANIES
            </p>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="relative z-10 w-[275px] min-h-[200px] rounded-2xl flex flex-col justify-center items-center gap-3 text-center"
        >
          <SpotlightCard className="absolute top-0 left-0 p-10 w-full h-full bg-gradient-to-br from-[#6e0a0a] to-[#3f070a]">
            <h1 className="text-5xl text-left w-full mb-2">
              <CountUp
                from={0}
                to={4500}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text font-bold"
              />
              +
            </h1>
            <p className="text-left text-xl font-semibold">
              PARTICIPANTS
            </p>
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0, scale: 0 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="relative z-10 w-[275px] min-h-[200px] rounded-2xl flex flex-col justify-center items-center gap-3 text-center"
        >
          <SpotlightCard className="absolute top-0 left-0 p-10 w-full h-full bg-gradient-to-br from-[#6e0a0a] to-[#3f070a]">
            <h1 className="text-5xl text-left w-full mb-2">
              <CountUp
                from={0}
                to={6}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text font-bold"
              />
              +
            </h1>
            <p className="text-left text-xl font-semibold">
              SEMINAR TALKS
            </p>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
