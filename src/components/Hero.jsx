"use client";

import Balatro from "./Balatro/Balatro";
import Orb from "./Orb/Orb";
import CountUp from "./CountUp/CountUp";
import Countdown from "./Counter";

const Hero = () => {
  return (
    <div className="w-full h-screen relative">
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

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Developers Day <sup className="text-2xl md:text-4xl absolute">'25</sup>
      </h1>
      
      <div className="pt-18 z-1"> {/* Added margin-top to create space */}
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
