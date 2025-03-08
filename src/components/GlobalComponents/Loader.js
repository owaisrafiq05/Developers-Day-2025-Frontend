"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import "./loader.css"

const Loader = () => {
  const loaderRef = useRef(null)
  const maskRef = useRef(null)
  const textRef = useRef(null)
  const contentRef = useRef(null)
  const progressTextRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    let progress = 0
    const duration = 4

    const tl = gsap.timeline()
    
    // Initial setup
    gsap.set(maskRef.current, {
      xPercent: -100,
    })
    
    gsap.set(contentRef.current, {
      opacity: 1,
    })

    // Logo animation
    gsap.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })

    // Continuous logo animation
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    })

    // Update progress counter
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) progress = 100

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.floor(progress)}%`
      }

      if (progress >= 100) {
        clearInterval(interval)
        
        // Final animation sequence
        tl.to(maskRef.current, {
          xPercent: 0,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to([contentRef.current, logoRef.current], {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }, "-=0.5")
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            if (loaderRef.current) {
              loaderRef.current.style.display = "none"
            }
          }
        })
      }
    }, 200)

    // Text reveal animation
    gsap.to(textRef.current, {
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "power2.out",
    })

    return () => {
      clearInterval(interval)
      tl.kill()
    }
  }, [])

  return (
    <div ref={loaderRef} className="loader-container">
      <div className="mask-container">
        <div ref={maskRef} className="mask"></div>
        <div ref={contentRef} className="loader-content">
          <div ref={logoRef} className="dev-logo">
            <Image
              src="/logo3.png"
              alt="Developers Day Logo"
              width={400}
              height={400}
              className="logo-image"
              priority
            />
          </div>
          <h1 ref={textRef} className="loading-text">
            <span ref={progressTextRef}>0%</span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Loader

