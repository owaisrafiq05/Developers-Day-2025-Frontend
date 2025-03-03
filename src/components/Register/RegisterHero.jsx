"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

const RegisterHero = () => {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const titleWrapperRef = useRef(null)
  const titleRef = useRef(null)
  const highlightRef = useRef(null)
  const subtitleRef = useRef(null)
  const formWrapperRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    const content = contentRef.current
    const titleWrapper = titleWrapperRef.current
    const title = titleRef.current
    const highlight = highlightRef.current
    const subtitle = subtitleRef.current
    const formWrapper = formWrapperRef.current

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([overlay, content], { opacity: 0 })
      gsap.set(titleWrapper, { width: 0, padding: 0 })
      gsap.set([title, highlight, subtitle], { opacity: 0, y: 20 })
      gsap.set(formWrapper, { opacity: 0, x: 50 })

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
      .to([title, highlight, subtitle], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6")
      .to(formWrapper, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4")
    }, section)

    return () => {
      ctx.revert()
    }
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-0"
      style={{
        backgroundImage: "url('/images/register/herobg.webp')", // Make sure to add this image
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundAttachment: isMobile ? "scroll" : "fixed"
      }}
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black/60"
      />
      
      <div ref={contentRef} className="relative w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div 
              ref={titleWrapperRef}
              className="inline-block bg-black/60 backdrop-blur-sm border-l-4 border-red-600 mb-6"
            >
              <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Join the <span ref={highlightRef} className="text-red-600">Challenge</span>
              </h1>
            </div>
            
            <p 
              ref={subtitleRef} 
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Register now to showcase your innovation and compete with the best minds in technology.
            </p>
          </div>
          
          <div 
            ref={formWrapperRef}
            className="bg-black/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-red-600"
          >
            {/* Your registration form will go here */}
            <h2 className="text-2xl font-semibold text-white mb-4">Registration Form</h2>
            {/* Add your form components here */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterHero 