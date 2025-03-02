import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Scene = () => {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.PI / 4;
    }
  }, []);

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    </group>
  );
};

const Balatro = () => {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Balatro; 