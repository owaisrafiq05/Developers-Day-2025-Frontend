import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { GeometricHyperbola } from "./models/GeometricHyperbola";
import { useThree } from "@react-three/fiber";
import { FogExp2 } from "three";

const Experience = () => {
  const [scale, setScale] = useState(1)
  const {scene} = useThree()
  useEffect(() => {
    const resize = () => {
      const mdl_scale = window.innerWidth/1300
      setScale(mdl_scale)
      console.log(mdl_scale, window.innerWidth)
      if (scene.fog instanceof FogExp2) {
        scene.fog.density /= scale
      }
    }
    resize()
    window.addEventListener('resize', resize)

    return () => {
        window.removeEventListener('resize', resize)

    }
  }, [])
  return (
    <>
      <ambientLight intensity={0.5} color={"#3c0292"} />
      <directionalLight
        position={[5, 10, 5]} // Position of the light source
        intensity={1.5} // Brightness of the light
        color="#e6d7fb" // Light color
        castShadow // Enable shadows
      />

      <directionalLight
        position={[5, -10, 5]} // Position of the light source
        intensity={0.5} // Brightness of the light
        color="white" // Light color
        castShadow // Enable shadows
      />

   
      <OrbitControls/>

      <GeometricHyperbola
        scale={[0.0075*scale, 0.0175*scale, 0.0075*scale]}
        position={[-5*scale, -7*scale, -3*scale]}
        rotation={[0, Math.PI * 0.2, -Math.PI * 0.2]}
      />
    </>
  );
};

export default Experience;
