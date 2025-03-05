import { React, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@heroui/react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

export default function ModuleCard({
  title,
  description,
  prize,
  category,
  entryFee,
  minMaxTeamMembers,
  openModal,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { triggerOnce: true, threshold: 1.2 });

  return (
    <div className="flex items-center justify-center bg-black w-full rounded-[8px]">
      {/* Full width */}
      <SpotlightCard
        spotlightColor="rgba(140, 0, 0, 0.3)"
        className="!p-0 w-full max-w-none rounded-[8px] "
      >
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20, scale: 1 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="w-full max-w-none rounded-[8px]"
        >
          <Card className="border-0 overflow-hidden text-white shadow-[0_0_20px_rgba(255,0,0,0.6)] rounded-[8px] w-full max-w-none">
            <CardHeader className="relative p-0 rounded-t-[8px]">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 opacity-80 rounded-t-[8px]" />
              <motion.div
                className="relative z-10 p-5 rounded-t-[8px]"
                animate={{
                  background: isHovered
                    ? "linear-gradient(90deg, rgba(220,38,38,0.8) 0%, rgba(185,28,28,0.8) 100%)"
                    : "linear-gradient(90deg, rgba(220,38,38,0.6) 0%, rgba(185,28,28,0.6) 100%)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="text-lg md:text-xl font-bold tracking-tight"
                  animate={{
                    textShadow: isHovered
                      ? "0 0 6px rgba(255,255,255,0.5)"
                      : "0 0 0px rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {title}
                </motion.h2>
                <motion.div
                  className="h-1 w-12 md:w-14 bg-white mt-1 rounded-full"
                  animate={{ width: isHovered ? "56px" : "48px" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </CardHeader>
            <Divider />
            <CardBody className="p-5 space-y-3 flex-grow">
              <p className="text-zinc-300 text-sm md:text-base line-clamp-3">
                {description}
              </p>
              {/* Displaying Min-Max Team Members */}
              <motion.div
                className="flex items-center space-x-2 text-red-500 font-bold"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm md:text-base text-zinc-400">
                  Max. Members:
                </span>
                <span className="text-lg md:text-xl">{minMaxTeamMembers}</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 text-red-500 font-bold"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg md:text-xl">Entry Fee: {entryFee}</span>
                <span className="text-sm md:text-base text-zinc-400">
                </span>
              </motion.div>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-col space-y-3 p-5 pt-0">
              <motion.div
                className="grid grid-cols-2 gap-3 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="bordered"
                  className="border-red-800 text-white text-sm md:text-base hover:bg-red-900 rounded-[12px] h-10 md:h-12"
                >
                  Rulebook
                </Button>
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white text-sm md:text-base rounded-[12px] h-10 md:h-12"
                  onClick={() => openModal({
                    title,
                    description,
                    prize,
                    entryFee,
                    category,
                    minMaxTeamMembers
                  })}
                >
                  More Info
                </Button>
              </motion.div>
              <motion.div
                className="w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"
                animate={{
                  backgroundPosition: isHovered ? "100% 0%" : "0% 0%",
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 100%" }}
              />
            </CardFooter>
          </Card>
        </motion.div>
      </SpotlightCard>
    </div>
  );
}
