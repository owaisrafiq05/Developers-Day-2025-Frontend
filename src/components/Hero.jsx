"use client";

import Balatro from "./Balatro/Balatro";

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

      <h1 className="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Developers Day '25
      </h1>
    </div>
  );
};

export default Hero;
