"use client";

import Balatro from "./Balatro/Balatro";
// import Orb from "./Orb/Orb";
// import CountUp from "./CountUp/CountUp";
import Countdown from "./Counter";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import GradientText from "./GradientText/GradientText";

const Hero = () => {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center gap-6">
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        lighting={0.2}
        pixelFilter={700}
        color1="#b91c1c"
        color2="#991b1b"
        contrast={2.5}
        spinSpeed={4.0}
      />

      <div className="relative flex">
        <GradientText
          className="text-4xl md:text-6xl lg:text-7xl font-bold relative bg-none"
          colors={["#ffaa40", "#9c40ff", "#ffaa40"]}
          animationSpeed={8}
          showBorder={false}
        >
          {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold relative"> */}
          Developers Day {/* </h1> */}
        </GradientText>
        <sup className="text-2xl md:text-4xl relative">
          <GradientText
            colors={["#9c40ff", "#ffaa40", "#9c40ff"]}
            animationSpeed={20}
            showBorder={false}
          >
            '25
          </GradientText>
        </sup>
      </div>

      <div className="relative flex gap-8 items-center justify-center">
        <div className="flex gap-2 items-center justify-center">
          <FaLocationDot /> <h3>FAST NUCES KHI</h3>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <FaCalendarDays /> <h3>April 17, 2025</h3>
        </div>
      </div>

      <div className="pt-18 z-1">
        {" "}
        {/* Added margin-top to create space */}
        <Countdown />
      </div>
      {/* <div style={{ width: "300px", height: "300px", position: "relative" }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={true}
        />
      </div> */}
    </div>
  );
};

export default Hero;
