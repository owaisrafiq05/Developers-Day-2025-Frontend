"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

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
  const cardRefs = useRef([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  const competitionModules = [
    { name: "Idea Submission", description: "Present your innovative concept" },
    { name: "Prototype Development", description: "Build and refine your working model" },
    { name: "Technical Evaluation", description: "Expert assessment of feasibility & impact" },
    { name: "Pitch Presentation", description: "Showcase your idea to the judges" },
    { name: "Final Round", description: "Compete for the top spot in the grand finale" }
];


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
    const cards = cardRefs.current

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
      gsap.set(cards, { 
        opacity: 0, 
        x: (i) => (!isMobile && i % 2 === 0 ? -50 : isMobile ? 0 : 50), 
        y: 30 
      })

      // Main animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: false,
        },
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
        opacity: isMobile ? 0 : 1, // Hide decoration line on mobile
        height: isMobile ? 0 : "65vh",
        duration: 1.5,
        ease: "power3.inOut"
      }, "-=1")
      .to(cards, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)"
      }, "-=1.3")

      // Floating animation for cards - reduced on mobile
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: isMobile ? (index % 2 === 0 ? 5 : -5) : (index % 2 === 0 ? 10 : -10),
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        })
      })

      // Parallax background effect - reduced on mobile
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
  }, [isMobile]) // Re-run when isMobile changes

  // Handle card click
  const handleCardClick = (index) => {
    setCurrentIndex(index)
    
    // Animate text change
    gsap.to(subtitleRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        })
      }
    })
    
    // Highlight active card
    cardRefs.current.forEach((card, i) => {
      gsap.to(card, {
        scale: i === index ? 1.1 : 1,
        boxShadow: i === index 
          ? "0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 8px 10px -6px rgba(220, 38, 38, 0.4)" 
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.4,
        ease: "power2.out"
      })
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-0"
      style={{
        backgroundImage: "url('/images/modules/hero2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundAttachment: isMobile ? "scroll" : "fixed" // Disable fixed background on mobile for better performance
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
        className="absolute hidden md:block left-1/4 top-1/2 w-px bg-gradient-to-b from-red-600/0 via-red-600 to-red-600/0 transform -translate-y-1/2"
      />
      
      {/* Main content */}
      <div ref={contentRef} className="relative w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          
          {/* Left side - Title and subtitle */}
          <div className="text-center lg:text-left">
            <div 
              ref={titleWrapperRef}
              className="inline-block bg-black/60 backdrop-blur-sm border-l-4 border-red-600 mb-4 sm:mb-6"
            >
              <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white px-2 py-1 sm:px-4">
                FYP <span ref={highlightRef} className="text-red-600">Xtreme</span>
              </h1>
            </div>
            
            <p 
              ref={subtitleRef} 
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {competitionModules[currentIndex].description}
            </p>
          </div>
          
          {/* Right side - Team category cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {competitionModules.map((member, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => handleCardClick(index)}
                className={`p-3 sm:p-4 rounded-lg backdrop-blur-sm cursor-pointer transition-all border-l-2 ${
                  index === currentIndex ? 'bg-red-600/20 border-red-600' : 'bg-black/40 border-gray-700 hover:bg-black/60'
                }`}
                style={{
                  boxShadow: index === currentIndex 
                    ? "0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 8px 10px -6px rgba(220, 38, 38, 0.4)" 
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              >
                <h3 className={`text-base sm:text-lg font-semibold ${
                  index === currentIndex ? 'text-white' : 'text-gray-300'
                }`}>
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements - repositioned on mobile */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex space-x-1 sm:space-x-2">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <div 
            key={index}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
              index === currentIndex ? 'bg-red-600' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero