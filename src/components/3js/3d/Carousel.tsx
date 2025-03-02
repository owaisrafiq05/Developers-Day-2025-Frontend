/* eslint-disable jsx-a11y/alt-text */
import { Image, Text, useScroll, useTexture } from "@react-three/drei";
import { GroupProps, MeshProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { easing } from "maath";
import { BufferGeometry, DoubleSide, Group, Mesh, MeshBasicMaterial, RepeatWrapping } from "three";
import { MeshSineMaterial } from "../utils/geometries";



interface CarouselProps {
    radius?: number,
    count?: number,
    links: string[],
    labels: string[],
    images: string[]
}


interface CardProps {
    imgUrl: string,
    redirect: string,
    label: string
}


const Rig = (props: GroupProps) => {
  const ref = useRef<Group | null>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    if (state.events.update) 
        state.events.update();
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

const Carousel = ({ radius = 1.0, count = 5, links = [], labels=[], images=[] }: CarouselProps) => {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      redirect={links[i]}
      label={labels[i]}
      imgUrl={images[i]}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}

    />
  ));
}

const Card = ({ imgUrl, redirect, label, ...props }: CardProps & GroupProps) => {
  const ref = useRef<Mesh<BufferGeometry, MeshBasicMaterial>>(null);
  const [hovered, hover] = useState(false); 
  // const geom = new BentPlaneGeometry()
  const pointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const el: HTMLElement = document.getElementById('__next')!;
    el.style.cursor = 'pointer'
    hover(true)
  };

  const pointerOut = () => {
    const el: HTMLElement = document.getElementById('__next')!;
    el.style.cursor = ''

    hover(false)
 };
  const router = useRouter();
  useFrame((state, delta) => {
    if (!ref.current) return
    easing.damp3(ref.current.scale, hovered ? 1.1 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.15 : 0.1,
      0.2,
      delta
    );
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
    easing.damp(ref.current.material.color, "r", hovered ? 0.6 : 1, 0.2, delta);
    easing.damp(ref.current.material.color, "g", hovered ? 0.6 : 1, 0.2, delta);
  });
  return (
    <group {...props}>
      <Image
        ref={ref}
        onClick={() => {
          console.log('CLICKED', redirect)
          router.replace(`/loading?redirect=${redirect}`);
        }}
        url={imgUrl}
        transparent
        side={DoubleSide}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
      > 
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]}/>
      </Image>
      <Text fontSize={0.1} position={[0.0, -0.625, -0.2]} rotation={[0, Math.PI, 0]} font="/PTSerif-Regular.ttf">{label}</Text>
    </group>
  );
}

const Banner = (props: MeshProps & {mul: number}) => {
  const ref = useRef<Mesh<BufferGeometry, MeshSineMaterial>>(null);
  const texture = useTexture("/Img/Integral.png");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  const material = useMemo(() => {
    const mat = new MeshSineMaterial();
    mat.map = texture;
    mat.map.anisotropy = 16
    mat.map.repeat.x = 30
    mat.map.repeat.y = 1
    mat.side = DoubleSide
    mat.toneMapped = false
    mat.transparent = true
    return mat
  }, [texture])
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.material.mul.value = props.mul
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map!.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props} material={material}>
      <cylinderGeometry args={[1.3, 1.3, 0.14, 128, 16, true]} />
    </mesh>
  );
}


export default Carousel
export {
    Banner, 
    Card,
    Rig
}