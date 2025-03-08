"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import Squares from "@/components/Squares/Squares"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const Hero = () => {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const titleWrapperRef = useRef(null)
  const titleRef = useRef(null)
  const highlightRef = useRef(null)
  const subtitleRef = useRef(null)
  const decorRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    const content = contentRef.current
    const titleWrapper = titleWrapperRef.current
    const title = titleRef.current
    const highlight = highlightRef.current
    const subtitle = subtitleRef.current
    const decor = decorRef.current

    // Reset GSAP animations on component mount
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(overlay, { opacity: 0 })
      gsap.set(content, { opacity: 0 })
      gsap.set(titleWrapper, { width: 0, padding: 0 })
      gsap.set(title, { opacity: 0 })
      gsap.set(highlight, { opacity: 0, scale: 0.8 })
      gsap.set(subtitle, { opacity: 0, y: 20 })
      gsap.set(decor, { opacity: 0, height: 0 })

      // Main animation sequence - removed ScrollTrigger
      const tl = gsap.timeline({
        delay: 0.2 // Small delay before animation starts
      })

      tl.to(overlay, { 
        opacity: 1, 
        duration: 1.5, 
        ease: "power2.inOut" 
      })
      .to(content, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5")
      .to(titleWrapper, {
        width: "auto",
        padding: isMobile ? "0.5rem 1rem" : "0.75rem 2rem",
        duration: 1.2,
        ease: "power3.inOut"
      }, "-=0.8")
      .to(title, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(highlight, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(decor, {
        opacity: isMobile ? 0 : 1,
        height: isMobile ? 0 : "65vh",
        duration: 1.5,
        ease: "power3.inOut"
      }, "-=1")

      // Optional: Add parallax effect on scroll
      gsap.to(section, {
        backgroundPosition: isMobile ? "50% 60%" : "50% 70%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, section)

    // Cleanup function
    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [isMobile])

  return (
    <>
      {/* Background Squares Animation */}
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal'
        borderColor='rgba(255, 255, 255, 0.2)'
        hoverFillColor='#222'
        className="fixed top-0 left-0 w-screen h-screen z-0"
      />
      
      {/* 3D Canvas Experience */}
      <Canvas
        className="fixed top-0 left-0 canvas z-10"
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [20.3 ,  0.18,  1.30]
        }}
      >
        <Experience />
      </Canvas>

      {/* Main Content Section */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center overflow-hidden py-16 sm:py-0 z-20"
      >
        {/* Modern gradient overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0"
        />
        
        {/* Vertical decoration line - hidden on mobile */}
        <div 
          ref={decorRef}
          className="hidden left-1/4 top-1/2 w-px bg-gradient-to-b from-red-600/0 via-red-600 to-red-600/0 transform -translate-y-1/2"
        />
        
        {/* Main content */}
        <div ref={contentRef} className="relative w-full px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Left-aligned content container */}
            <div className="max-w-xl ml-0 md:ml-8 lg:ml-16">
              <div 
                ref={titleWrapperRef}
                className="inline-block bg-black/60 backdrop-blur-sm border-l-4 border-red-600 mb-4 sm:mb-6"
              >
                <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white px-2 py-1 sm:px-4">
                  Project <span ref={highlightRef} className="text-red-600">Xtreme</span>
                </h1>
              </div>
              
              <p 
                ref={subtitleRef} 
                className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8"
              >
                  Unleash your potential in the ultimate project competition
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero