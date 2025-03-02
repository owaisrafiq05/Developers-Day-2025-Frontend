"use client"
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'
import { useThree, useFrame } from '@react-three/fiber'
// import { useControls } from 'leva'
import GUI from 'lil-gui'
import particlesVertexShader from '../shaders/particles/vertex.js'
import particlesFragmentShader from '../shaders/particles/fragment.js'
import gpgpuParticlesShader from '../shaders/gpgpu/particles.js'
import { useGLTF } from '@react-three/drei'


export default function Experience() {
    const gpgpu = useRef({})
    const particles = useRef({})
    const three = useThree()
    const scene = three.scene
    const renderer = three.gl
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    
  //  const gui = new GUI({ width: 340 })
    const debugObject = {
        clearColor: '#00000000' // Making it fully transparent
    }
    
    // Set initial clear color
    renderer.setClearColor(debugObject.clearColor, 0) // The second parameter (0) sets full transparency
  

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    
    const gltf = useGLTF('/minecraft_park.glb')

 
   
    // Add error checking for model loading
   useEffect(() => {
    if (!gltf || !gltf.scene) {
        console.error('Failed to load model:', gltf)
        throw new Error('Model loading failed')
    }
    const baseGeometry = {}
    function findFirstMesh(object) {
        if (object.isMesh) {
            return object
        }
        
    for (const child of object.children) {
            const mesh = findFirstMesh(child)
            if (mesh) return mesh
        }
        
        return null
    }

    const firstMesh = findFirstMesh(gltf.scene)
    if (!firstMesh) {
        console.error('No mesh found in the model')
        throw new Error('No mesh found in model')
    }
    baseGeometry.instance = firstMesh.geometry
    if (!baseGeometry.instance || !baseGeometry.instance.attributes.position) {
        console.error('Invalid geometry or missing position attribute:', baseGeometry.instance)
        throw new Error('Invalid geometry data')
    }
    console.log('Geometry attributes:', baseGeometry.instance.attributes)
    baseGeometry.count = baseGeometry.instance.attributes.position.count

    if (!baseGeometry.instance.attributes.color) {
        console.warn('No color attribute found in geometry, creating default colors')
        const colorArray = new Float32Array(baseGeometry.count * 3)
        for(let i = 0; i < baseGeometry.count * 3; i += 3) {
            colorArray[i] = 1      // R - Red
            colorArray[i + 1] = 0  // G - No green
            colorArray[i + 2] = 0  // B - No blue
        }
        baseGeometry.instance.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    }
    console.log('Color attribute:', baseGeometry.instance.attributes.color)
    console.log('First few colors:', 
    baseGeometry.instance.attributes.color.array.slice(0, 9)  // Show first 3 vertices
)

gpgpu.current.size = Math.ceil(Math.sqrt(baseGeometry.count))
gpgpu.current.computation = new GPUComputationRenderer(gpgpu.current.size, gpgpu.current.size, renderer)

const baseParticlesTexture = gpgpu.current.computation.createTexture()
for(let i = 0; i < baseGeometry.count; i++)
    {
        const i3 = i * 3
        const i4 = i * 4
    
        // Position based on geometry
        baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3 + 0]
        baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1]
        baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2]
        baseParticlesTexture.image.data[i4 + 3] = Math.random()
    }

    gpgpu.current.particlesVariable = gpgpu.current.computation.addVariable('uParticles', gpgpuParticlesShader, baseParticlesTexture)
gpgpu.current.computation.setVariableDependencies(gpgpu.current.particlesVariable, [ gpgpu.current.particlesVariable ])

// Uniforms
gpgpu.current.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0)
gpgpu.current.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0)
gpgpu.current.particlesVariable.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture)
gpgpu.current.particlesVariable.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.5)
gpgpu.current.particlesVariable.material.uniforms.uFlowFieldStrength = new THREE.Uniform(2)
gpgpu.current.particlesVariable.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.5)

gpgpu.current.computation.init()

// Debug
gpgpu.current.debug = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshBasicMaterial({ map: gpgpu.current.computation.getCurrentRenderTarget(gpgpu.current.particlesVariable).texture })
)
gpgpu.current.debug.position.x = 3
gpgpu.current.debug.visible = false
scene.add(gpgpu.current.debug)



const particlesUvArray = new Float32Array(baseGeometry.count * 2)
const sizesArray = new Float32Array(baseGeometry.count)

for(let y = 0; y < gpgpu.current.size; y++)
    {
        for(let x = 0; x < gpgpu.current.size; x++)
        {
            const i = (y * gpgpu.current.size + x);
            const i2 = i * 2
    
            // UV
            const uvX = (x + 0.5) / gpgpu.current.size;
            const uvY = (y + 0.5) / gpgpu.current.size;
    
            particlesUvArray[i2 + 0] = uvX;
            particlesUvArray[i2 + 1] = uvY;
    
            // Size
            sizesArray[i] = Math.random()
        }
    }

    particles.current.geometry = new THREE.BufferGeometry()
    particles.current.geometry.setDrawRange(0, baseGeometry.count)
    particles.current.geometry.setAttribute('aParticlesUv', new THREE.BufferAttribute(particlesUvArray, 2))
    particles.current.geometry.setAttribute('aColor', baseGeometry.instance.attributes.color.clone())
    particles.current.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1))

    particles.current.material = new THREE.ShaderMaterial({
        vertexShader: particlesVertexShader,
        fragmentShader: particlesFragmentShader,
        uniforms:
        {
            uSize: new THREE.Uniform(0.0043),
            uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
            uParticlesTexture: new THREE.Uniform()
        }
    })
    particles.current.points = new THREE.Points(particles.current.geometry, particles.current.material)
scene.add(particles.current.points)
particles.current.points.position.x = 17
particles.current.points.rotation.y = Math.PI / 2

// gui.addColor(debugObject, 'clearColor').onChange(() => { renderer.setClearColor(debugObject.clearColor) })
// gui.add(particles.current.material.uniforms.uSize, 'value').min(0).max(1).step(0.001).name('uSize')
// gui.add(gpgpu.current.particlesVariable.material.uniforms.uFlowFieldInfluence, 'value').min(0).max(1).step(0.001).name('uFlowfieldInfluence')
// gui.add(gpgpu.current.particlesVariable.material.uniforms.uFlowFieldStrength, 'value').min(0).max(10).step(0.001).name('uFlowfieldStrength')
// gui.add(gpgpu.current.particlesVariable.material.uniforms.uFlowFieldFrequency, 'value').min(0).max(1).step(0.001).name('uFlowfieldFrequency')
// gui.add(particles.current.points.rotation, 'z')
    // .min(0)
    // .max(Math.PI )
    // .step(0.01)
    // .name('Rotation Y')

   }, [renderer])
const clock = new THREE.Clock()
let previousTime = 0

useFrame(() => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // controls.update()
    
    gpgpu.current.particlesVariable.material.uniforms.uTime.value = elapsedTime
    gpgpu.current.particlesVariable.material.uniforms.uDeltaTime.value = deltaTime
   // gpgpu.current.particlesVariable.material.uniforms.uFlowFieldInfluence.value = ;
    gpgpu.current.computation.compute()
    particles.current.material.uniforms.uParticlesTexture.value = gpgpu.current.computation.getCurrentRenderTarget(gpgpu.current.particlesVariable).texture
   // particles.current.material.uniforms.uFlowFieldInfluence.value = Math.sin(elapsedTime);
    
},[])

    return <></>
}