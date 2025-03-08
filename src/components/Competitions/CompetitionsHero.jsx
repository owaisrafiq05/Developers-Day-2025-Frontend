"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

gsap.registerPlugin(TextPlugin)

const fadeInOut = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const ModuleHero = () => {
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
    }, section)

    // Cleanup function
    return () => {
      ctx.revert()
    }
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-0"
      style={{
        backgroundImage: "url('/images/competitions/hero2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundAttachment: isMobile ? "scroll" : "fixed"
      }}
    >
      {/* Modern gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-black/60"
      />

      {/* Vertical decoration line - hidden on mobile */}
      <div
        ref={decorRef}
        className="absolute hidden left-1/4 top-1/2 w-px bg-gradient-to-b from-red-600/0 via-red-600 to-red-600/0 transform -translate-y-1/2"
      />

      {/* Main content */}
      <div ref={contentRef} className="relative w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title and subtitle */}
          <div className="text-center">
            <div
              ref={titleWrapperRef}
              className="inline-block bg-black/60 backdrop-blur-sm border-l-4 border-red-600 mb-4 sm:mb-6"
            >
              <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white px-2 py-1 sm:px-4">
                Our <span ref={highlightRef} className="text-red-600">Competitions</span>
              </h1>
            </div>

            <motion.div
              className="w-full py-6 my-10"
              initial="hidden"
              whileInView="visible"
              exit="exit"
              variants={fadeInOut}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="container mx-auto flex items-center justify-center px-4">
                <div className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-red-600/50 shadow-md">
                  <FaTrophy className="text-white text-2xl md:text-3xl mr-1" />
                  <span className="text-xl md:text-2xl font-bold text-white mr-1">Prize pool Upto</span>
                  <span className="text-2xl md:text-4xl font-extrabold text-white">
                    PKR. 1 Million
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModuleHero