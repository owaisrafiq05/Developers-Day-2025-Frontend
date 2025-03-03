"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Tilt } from "react-tilt"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const images = [
  { src: "/images/highlight-img-1.jpg", text: "Developer's Day 2023", category: "Competition" },
  { src: "/images/highlight-img-2.jpg", text: "Developer's Day 2023", category: "Workshop" },
  { src: "/images/highlight-img-3.jpg", text: "Developer's Day 2023", category: "Networking" },
  { src: "/images/highlight-img-4.jpg", text: "Developer's Day 2023", category: "Hackathon" },
  { src: "/images/highlight-img-5.jpg", text: "Developer's Day 2023", category: "Panel" },
  { src: "/images/highlight-img-6.jpg", text: "Developer's Day 2023", category: "Awards" },
  { src: "/images/highlight-img-7.jpg", text: "Developer's Day 2023", category: "Keynote" },
]

// Replace the random particle generation with a stable version
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  top: `${(i * 6.5) % 100}%`,
  left: `${(i * 8.3) % 100}%`,
  duration: 5 + (i * 0.5),
  delay: i * 0.3
}));

export default function EventHighlights() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const gridRef = useRef(null)

  // Initialize animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })

      // Timeline animation
      gsap.from(".timeline-dot", {
        scale: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      })

      gsap.from(".timeline-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      })

      // Grid items staggered animation
      gsap.from(".grid-item", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      })

      // Parallax effect for images
      gsap.utils.toArray(".grid-item").forEach((item) => {
        const img = item.querySelector("img")
        gsap.to(img, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToGrid = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: gridRef.current, offsetY: 100 },
      ease: "power3.inOut",
    })
  }

  const defaultTiltOptions = {
    max: 15,
    scale: 1.05,
    speed: 1000,
    glare: true,
    "max-glare": 0.3,
  }

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen text-white overflow-hidden py-8 sm:py-16">
      {/* Cool animated gradient lines - adjust for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent top-10 sm:top-20 blur-sm"></div>
        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-red-600/30 to-transparent right-5 sm:right-20 blur-sm"></div>
        
        {/* Enhanced bottom glow - adjusted for mobile */}
        <div className="absolute bottom-0 right-0 w-[80%] sm:w-[60%] h-[40%] sm:h-[60%] bg-gradient-to-tl from-red-600/10 via-red-900/5 to-transparent rounded-full blur-[120px] transform rotate-12"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full"
              style={{
                top: particle.top,
                left: particle.left,
                animation: `floatParticle ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header - adjust text sizes for mobile */}
      <div ref={headerRef} className="relative text-center mb-8 sm:mb-16 px-4">
        <h2 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
          Event <span className="text-red-600">Highlights</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Showcasing the Best in Tech: Competitions, Careers & More
        </p>
        <div className="mt-8 sm:mt-12 scroll-indicator cursor-pointer" onClick={scrollToGrid}>
          <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
          <ChevronDown className="w-6 h-6 mx-auto text-red-600" />
        </div>
      </div>

      {/* Timeline */}
      {/* <div ref={timelineRef} className="relative w-full max-w-5xl mx-auto mb-16 px-4">
        <div className="timeline-line h-1 bg-gradient-to-r from-red-800 to-red-600 w-full"></div>
        <div className="flex justify-between relative -mt-2">
          {images.map((_, index) => (
            <div key={index} className="timeline-dot relative">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                Day {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Grid Layout - use CSS for responsive behavior */}
      <div
        ref={gridRef}
        className="relative w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
      >
        {images.map((item, index) => (
          <Tilt
            key={index}
            options={defaultTiltOptions}
            className="grid-item"
          >
            <div
              className="relative overflow-hidden rounded-lg cursor-pointer group h-[250px] sm:h-[300px] lg:h-[350px] bg-gray-900"
            >
              <img
                src={item.src || `/placeholder.svg?height=350&width=500`}
                alt={`Event highlight ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

              {/* Red overlay on hover */}
              <div className="absolute inset-0 bg-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-block px-3 py-1 bg-red-600 text-white text-xs rounded-full mb-3">
                  {item.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.text}</h3>
              </div>

              {/* Animated border on hover */}
              <div className="absolute inset-0 border-2 border-red-600/0 group-hover:border-red-600/100 transition-colors duration-300 rounded-lg"></div>
            </div>
          </Tilt>
        ))}
      </div>

      <style jsx>{`
        /* Add media query for tilt effect */
        @media (max-width: 768px) {
          .grid-item {
            transform: none !important;
            transition: none !important;
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          25% {
            transform: translate(10px, -10px) scale(1.5);
            opacity: 0.5;
          }
          50% {
            transform: translate(-10px, 10px) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translate(10px, -10px) scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
        }
        
        /* Add responsive styles for the detail container */
        @media (max-width: 640px) {
          .detail-container {
            margin: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

