"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Cards = ({ teamMembers = [] }) => {
  const cardRefs = useRef([])
  const overlayRefs = useRef([])
  const contentRefs = useRef([])
  const indicatorRefs = useRef([])

  useEffect(() => {
    if (teamMembers.length === 0) return;
    
    // Initial animation for cards appearing
    gsap.set(cardRefs.current, { opacity: 0, y: 50 })

    gsap.to(cardRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    })

    // Blinking animation for indicators
    indicatorRefs.current.forEach((indicator) => {
      if (indicator) {
        gsap.to(indicator, {
          opacity: 0.5,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
      }
    })
  }, [teamMembers])

  const handleMouseEnter = (index) => {
    if (overlayRefs.current[index] && contentRefs.current[index]) {
      gsap.to(overlayRefs.current[index], {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        duration: 0.3,
      })

      gsap.to(contentRefs.current[index], {
        y: -10,
        opacity: 1,
        duration: 0.3,
      })
    }
  }

  const handleMouseLeave = (index) => {
    if (overlayRefs.current[index] && contentRefs.current[index]) {
      gsap.to(overlayRefs.current[index], {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        duration: 0.3,
      })

      gsap.to(contentRefs.current[index], {
        y: 0,
        opacity: 0.8,
        duration: 0.3,
      })
    }
  }

  // If no team members are provided, render placeholder cards
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-8 p-10">
        <div className="w-[300px] h-[400px] rounded-2xl bg-gray-200 animate-pulse"></div>
        <div className="w-[300px] h-[400px] rounded-2xl bg-gray-200 animate-pulse"></div>
        <div className="w-[300px] h-[400px] rounded-2xl bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 p-10">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
          style={{
            backgroundImage: `url(${member.image || "/placeholder.svg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div
            ref={(el) => (overlayRefs.current[index] = el)}
            className="absolute inset-0 bg-black opacity-50"
          ></div>

          {/* Content */}
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="absolute inset-0 p-6 flex flex-col justify-end text-white opacity-80 transition-all duration-300"
          >
            <div className="flex items-center mb-2">
              <div
                ref={(el) => (indicatorRefs.current[index] = el)}
                className="w-2 h-2 bg-red-600 rounded-full mr-2"
              ></div>
              <p className="text-sm text-red-600 uppercase tracking-wider">{member.designation}</p>
            </div>
            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
            <div className="w-12 h-1 bg-red-600 rounded-full"></div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
            <div className="absolute transform rotate-45 bg-red-600 opacity-80 w-20 h-5 -top-2 -right-5"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards