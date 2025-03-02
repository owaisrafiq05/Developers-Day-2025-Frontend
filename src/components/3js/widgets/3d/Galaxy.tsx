import * as THREE from "three";
import galaxyVertexShader from "./shaders/galaxy/vertex.glsl.js";
import galaxyFragmentShader from "./shaders/galaxy/fragment.glsl.js";
import { useMemo } from "react";

const parameters = {
  count: 159999,
  size: 0.005,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.25,
  randomnessPower: 3,
  insideColor: "#8229ff",
  outsideColor: "rgb(190, 141, 238)",
  maxYPosition: 10,
};

type ScalarFloat32Array = [Float32Array, number];
interface OutputPositions {
  position: ScalarFloat32Array;
  aRandomness: ScalarFloat32Array;
  color: ScalarFloat32Array;
  aScale: ScalarFloat32Array;
}

const _generateRandomDisplacement = (radius: number): number => {
  const randomness = Math.pow(Math.random(), parameters.randomnessPower);
  const sign = Math.random() < 0.5 ? 1 : -1;
  return (randomness * sign * parameters.randomness * radius) - 5;
};

const _generateGalaxyShaderMaterial = (
  galaxyFragmentShader: string,
  galaxyVertexShader: string
): THREE.ShaderMaterial => {
  return new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: {
      uTime: { value: 100 },
      uSize: { value: 30 * devicePixelRatio },
    },
    fragmentShader: galaxyFragmentShader,
    vertexShader: galaxyVertexShader,
  });
};

const _getBranchAngleAt = (i: number): number => {
  return ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
};

const _generateCompositeF32 = (x: number): Float32Array => {
  return new Float32Array(parameters.count * x);
};

const generateGalaxy = (): OutputPositions => {
  const positions = _generateCompositeF32(3);
  const randomness = _generateCompositeF32(3);
  const colors = _generateCompositeF32(3);
  const scales = _generateCompositeF32(1);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;

    const branchAngle = _getBranchAngleAt(i);

    const randomX = _generateRandomDisplacement(radius);
    const randomY = _generateRandomDisplacement(radius);
    const randomZ = _generateRandomDisplacement(radius);

    const x = Math.cos(branchAngle) * radius;
    const y = Math.tan(branchAngle * radius);
    const z = Math.sin(branchAngle) * radius;

    if (y > parameters.maxYPosition) {
      positions[i3] = Math.random();
      positions[i3 + 1] = Math.random();
      positions[i3 + 2] = Math.random();
    } else {
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Scale
    scales[i] = Math.random();
  }

  /**
   * Points
   */
  const outputPositions: OutputPositions = {
    position: [positions, 3],
    aRandomness: [randomness, 3],
    color: [colors, 3],
    aScale: [scales, 1],
  };

  
  return outputPositions;
};

export default function Gallaxy() {
  const material = useMemo(
    () =>
      _generateGalaxyShaderMaterial(galaxyFragmentShader, galaxyVertexShader),
    []
  );
  const points = useMemo(() => generateGalaxy(), []);

  return (
    <>
      <points name="galaxy" material={material} position={[-10, -40, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            args={[...points.position]}
          />
          <bufferAttribute
            attach={"attributes-aRandomness"}
            args={[...points.aRandomness]}
          />
          <bufferAttribute
            attach={"attributes-color"}
            args={[...points.color]}
          />
          <bufferAttribute
            attach={"attributes-aScale"}
            args={[...points.aScale]}
          />
        </bufferGeometry>
      </points>
    </>
  );
}
