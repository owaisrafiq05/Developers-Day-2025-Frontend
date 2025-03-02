import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex.glsl.js";
import particlesFragmentShader from "./shaders/particles/fragment.glsl.js";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useCallback } from "react";
import { useState } from "react";
import gsap from "gsap";
import { useIndex } from "@/components/hooks/useIndex";

/**
 Creates a neat particles effect using threejs
*/
function Particles__(props: {
  onAnimationComplete: () => void;
  onAnimationStart: () => void;
  geometries: THREE.BufferGeometry[];
  index: number;
  colorA: string;
  colorB: string;
  particleMaxCount: number;
}) {
  if (props.particleMaxCount > 50000) {
    /** The threshold is greater than what most devices can endure, raise warning */
    console.warn(
      "WARNING: Particle count greater than 50000. It is recommended to keep particle count less than 50000 to ensure performance."
    );
  }

  const MAX_COUNT = props.particleMaxCount;
  const { camera } = useThree();
  const particles = useRef<THREE.Points | null>(null);
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particlesVertexShader,
        fragmentShader: particlesFragmentShader,
        uniforms: {
          uSize: new THREE.Uniform(0.5),
          uResolution: new THREE.Uniform(
            new THREE.Vector2(
              sizes.width * sizes.pixelRatio,
              sizes.height * sizes.pixelRatio
            )
          ),
          uProgress: { value: 0 },
          uColorA: new THREE.Uniform(new THREE.Color(props.colorA)),
          uColorB: new THREE.Uniform(new THREE.Color(props.colorB)),
        },
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [props.colorA, props.colorB, sizes.height, sizes.pixelRatio, sizes.width]
  );

  const positionSelectionIndex = useRef(0);
  const grp: THREE.BufferGeometry[] = props.geometries;

  const geometryPositions = useMemo(() => {
    if (grp.length <= 0) return [];
    const positions = grp.map((child: THREE.BufferGeometry) => {
      if (child instanceof THREE.BufferGeometry)
        return child.attributes.position;
    });

    const geometryTMPPositions = [];
    let a = 0;
    const objectOffsets: number[] = [0];
    for (let i = 0; i <= grp.length; i++) {
      if (i == 1) {
        objectOffsets[i] = 0;
      } else if (i == 3) {
        objectOffsets[i] = 30;
      } else {
        objectOffsets[i] = 15;
      }
    }

    for (const position of positions) {
      const originalArray = position!.array;
      const newArray = new Float32Array(MAX_COUNT * 3);

      for (let i = 0; i < MAX_COUNT; i++) {
        const i3 = i * 3;
        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0] - objectOffsets[a];
          newArray[i3 + 1] = originalArray[i3 + 1] - objectOffsets[a] / 2;
          newArray[i3 + 2] = originalArray[i3 + 2];
        } else {
          const random = Math.floor(Math.random() * position!.count) * 3;
          newArray[i3 + 0] = originalArray[random + 0] - objectOffsets[a];
          newArray[i3 + 1] = originalArray[random + 1] - objectOffsets[a] / 2;
          newArray[i3 + 2] = originalArray[random + 2];
        }
      }
      geometryTMPPositions.push(new THREE.Float32BufferAttribute(newArray, 3));
      a++;
    }
    return geometryTMPPositions;
  }, [MAX_COUNT, grp]);

  const geometry = useMemo(() => {
    const sizesArray = new Float32Array(MAX_COUNT);
    for (let i = 0; i < MAX_COUNT; i++) sizesArray[i] = Math.random();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      geometryPositions[positionSelectionIndex.current]
    );

    geometry.setAttribute("targetPosition", geometryPositions[3]);
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));
    geometry.setIndex(null);

    return geometry;
  }, [MAX_COUNT, geometryPositions]);

  const MorphParticles = useCallback(
    (index: number) => {
      props.onAnimationStart();
      geometry.attributes.position =
        geometryPositions[positionSelectionIndex.current];
      geometry.attributes.targetPosition = geometryPositions[index];
      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        { value: 1, duration: 2, ease: "sine.inOut" }
      );
      const timeout = setTimeout(() => {
        props.onAnimationComplete();
        clearTimeout(timeout);
      }, 2000);
    },
    [
      geometry.attributes,
      geometryPositions,
      props,
      shaderMaterial.uniforms.uProgress,
    ]
  );

  useFrame(() => {
    if (particles.current && typeof window == "object") {
      const top = (-window.scrollY / window.innerHeight) * 12;
      camera.position.y = top;
    }
    if (positionSelectionIndex.current != props.index) {
      MorphParticles(props.index);
      positionSelectionIndex.current = props.index;
    }
  });
  


  return (
    <>
      <points
        ref={particles}
        args={[geometry, shaderMaterial]}
        position={[-5, 1, -2]}
        rotation={[0, Math.PI, 0]}
      ></points>
    </>
  );
}

interface ParticlesEffectProps {
  geometries: THREE.BufferGeometry[];
}

export default function ParticlesEffect(props: ParticlesEffectProps) {
  /** Component that controls the transitioning of the particles component.
   * Such a component is required to properly control the animation. If you add more particle
   * sections, kindly insert corresponding triggers to ensure that they are triggered.
   */

  const [transition, setTransition] = useState<boolean>(false);
  const Scaling_Factor = window.innerWidth / 1700;

  const [index, SCROLL_CONTROLLER] = useIndex([
    { upperLim: 0.025, lowerLim: 0, indexValue: 1},
    { upperLim: 0.125, lowerLim: 0.025, indexValue: 2 },
    { upperLim: 0.4, lowerLim: 0.125, indexValue: 3 },
  ], 1);

  useFrame(() => {
    const doc = document.documentElement;
    const top =
      ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)) /
      document.body.scrollHeight;
    if (transition === false) {
      SCROLL_CONTROLLER(top)
    }
  });

  return (
    <>
     <group scale={Scaling_Factor}>
     <Particles__
        index={index}
        onAnimationComplete={() => {
          setTransition(false);
        }}
        onAnimationStart={() => {
          setTransition(true);
        }}
        geometries={props.geometries}
        colorA="#8229ff"
        colorB="rgb(190, 141, 238)"
        particleMaxCount={35000}
      />
     </group>
    </>
  );
}
