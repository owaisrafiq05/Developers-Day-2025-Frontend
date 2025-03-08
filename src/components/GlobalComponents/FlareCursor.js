"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Custom hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(userAgent)
      const isSmallScreen = window.innerWidth < 768

      setIsMobile(isMobileDevice || isSmallScreen)
    }

    // Check on initial load
    checkMobile()

    // Check on resize
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}

function FlareCursor() {
  // Check if on mobile device
  const isMobile = useIsMobile()

  // States
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [trail, setTrail] = useState(Array(12).fill({ x: 0, y: 0 }))

  // Don't render on mobile
  if (isMobile) {
    return null
  }

  // Mouse move handler with velocity calculation
  const handleMouseMove = (e) => {
    const currentPosition = { x: e.clientX, y: e.clientY }

    // Update position
    setPosition(currentPosition)

    // Calculate velocity (for dynamic effects)
    setVelocity({
      x: currentPosition.x - prevPosition.x,
      y: currentPosition.y - prevPosition.y,
    })

    // Update previous position for next calculation
    setPrevPosition(currentPosition)

    // Update trail positions
    setTrail((prev) => [currentPosition, ...prev.slice(0, -1)])

    // Check if the cursor is over a clickable element
    const target = e.target
    setIsPointer(window.getComputedStyle(target).getPropertyValue("cursor") === "pointer")
  }

  // Mouse down/up handlers
  const handleMouseDown = () => setIsClicked(true)
  const handleMouseUp = () => setIsClicked(false)

  // Set up event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Hide the default cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      // Restore the default cursor only if we changed it
      if (!isMobile) {
        document.body.style.cursor = "auto"
      }
    }
  }, [prevPosition, isMobile])

  // Calculate speed for dynamic effects
  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
  const maxSpeed = 10
  const normalizedSpeed = Math.min(speed, maxSpeed) / maxSpeed

  // Prepare rendering properties based on state
  const mainSize = isPointer ? 20 : 25
  const glowSize = isPointer ? 35 : 45
  const glowOpacity = isPointer ? 0.8 : 0.5

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="flare-cursor-main"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicked ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 300,
          damping: 20,
          bounce: 0.2,
        }}
        style={{
          position: "fixed",
          top: -mainSize / 2,
          left: -mainSize / 2,
          width: mainSize,
          height: mainSize,
          borderRadius: "50%",
          backgroundColor: isPointer ? "#ff1a1a" : "#ff0000",
          boxShadow: `0 0 ${5 + normalizedSpeed * 15}px ${isPointer ? "#ff6666" : "#ff0000"}`,
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="flare-cursor-glow"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicked ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.8,
          stiffness: 150,
          damping: 15,
        }}
        style={{
          position: "fixed",
          top: -glowSize / 2,
          left: -glowSize / 2,
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,0,0,${glowOpacity}) 0%, rgba(255,0,0,0) 70%)`,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Trailing effect */}
      {trail.map((pos, index) => {
        const size = 5 - index * 0.4
        if (size <= 0) return null

        const opacity = 1 - index * 0.08
        return (
          <motion.div
            key={index}
            className="flare-cursor-trail"
            animate={{
              x: pos.x,
              y: pos.y,
            }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0.05,
            }}
            style={{
              position: "fixed",
              top: -size / 2,
              left: -size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: isPointer ? "#ff3333" : "#990000",
              opacity: isPointer ? opacity * 0.7 : opacity,
              pointerEvents: "none",
              zIndex: 9997,
            }}
          />
        )
      })}

      {/* Particles effect when clicked */}
      {isClicked && <ParticleExplosion position={position} color="#ff0000" />}
    </>
  )
}

// Particle explosion effect when clicking
function ParticleExplosion({ position, color }) {
  const particles = Array.from({ length: 8 })

  return (
    <>
      {particles.map((_, index) => {
        const angle = (index / particles.length) * Math.PI * 2
        const distance = 20

        return (
          <motion.div
            key={index}
            initial={{
              x: position.x,
              y: position.y,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              x: position.x + Math.cos(angle) * distance,
              y: position.y + Math.sin(angle) * distance,
              opacity: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              position: "fixed",
              top: -2,
              left: -2,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: color,
              pointerEvents: "none",
              zIndex: 9996,
            }}
          />
        )
      })}
    </>
  )
}

export default FlareCursor

