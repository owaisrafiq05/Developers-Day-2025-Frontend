"use client";

import Countdown from "./Counter";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import PageHeader from "./3js/Home";
import Squares from "@/components/Squares/Squares";

const Hero = () => {
  return (
    <> 
      <Squares
        squareSize={40}
        borderColor='rgba(255, 255, 255, 0.2)'
        className="fixed top-0 left-0 w-screen h-screen z-0"
      />
      
      <div className="relative min-h-full z-20 grid grid-cols-1">
        <Canvas
          className="canvas z-10 pt-20 mb-10"
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [27.216, -0.060, 5.026],
          }}
        >
          <Experience />
        </Canvas>

        <div className="z-20">
          <PageHeader />
        </div>
      </div>
    </> 
  );
}

export default Hero;

