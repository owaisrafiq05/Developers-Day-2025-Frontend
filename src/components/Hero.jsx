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
        speed={0.5} 
        squareSize={40}
        direction='diagonal'
        borderColor='rgba(255, 255, 255, 0.2)'
        hoverFillColor='#222'
        className="fixed top-0 left-0 w-screen h-screen z-0"
      />
      
      <Canvas
        className="fixed top-0 left-0 canvas z-10 pt-20"
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [27.216, -0.079, 5.026],
        }}
      >
        <Experience />
      </Canvas>

      <div className="relative min-h-full z-20">
        <div className="z-20">
          <PageHeader />
        </div>
      </div>
    </> 
  );
}
export default Hero;

