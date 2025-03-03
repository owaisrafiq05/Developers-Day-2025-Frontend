"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { FaLinkedin, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa"

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/modules", label: "Modules" },
  // { path: "/team", label: "Team" },
  { path: "/contact-us", label: "Contact Us" },
  { path: "/register", label: "Registration" },
  { path: "/fyp-xtreme", label: "FYP Extreme" },
  // { path: "/job-orbit", label: "Job Orbit" },
  { path: "/sponsors", label: "Sponsors" },
]

const socialLinks = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/developersday/", label: "LinkedIn" },
  { icon: <FaFacebookF />, url: "https://web.facebook.com/DevelopersDay/", label: "Facebook" },
  { icon: <FaInstagram />, url: "https://www.instagram.com/developersday/", label: "Instagram" },
  { icon: <FaGithub />, url: "https://github.com/owaisrafiq05/Developers-Day-2025-Frontend", label: "GitHub" },
]

const developers = [
  {
    name: "Owais Rafiq",
    role: "Head of Frontend Team",
    linkedin: "https://www.linkedin.com/in/owais-rafiq-639494253/",
  },
  {
    name: "Arham Alvi",
    role: "Co-Head of Frontend Team",
    linkedin: "https://linkedin.com/in/samrivera",
  },
  {
    name: "Abdullah Farooqui",
    role: "Co-Head of Frontend Team",
    linkedin: "https://www.linkedin.com/in/muhammad-abdullah-farooqui-24754b27a/",
  },
  {
    name: "Hashir Ali",
    role: "Deputy of Frontend Team",
    linkedin: "https://linkedin.com/in/taylorkim",
  },
]

export default function Footer() {
  const socialRefs = useRef([])
  const linkRefs = useRef([])

  useEffect(() => {
    // Hover animations for social icons
    socialRefs.current.forEach((icon) => {
      const iconAnim = gsap.timeline({ paused: true })
      iconAnim.to(icon, {
        scale: 1.3,
        color: "#ef4444",
        duration: 0.3,
        ease: "power2.out",
      })

      icon.addEventListener("mouseenter", () => iconAnim.play())
      icon.addEventListener("mouseleave", () => iconAnim.reverse())
    })

    // Hover animations for links
    linkRefs.current.forEach((link) => {
      const linkAnim = gsap.timeline({ paused: true })
      linkAnim.to(link, {
        x: 5,
        color: "#ef4444",
        duration: 0.2,
        ease: "power1.out",
      })

      link.addEventListener("mouseenter", () => linkAnim.play())
      link.addEventListener("mouseleave", () => linkAnim.reverse())
    })

    // Floating animation for logo
    gsap.to(".footer-logo", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    // Cleanup
    return () => {
      socialRefs.current.forEach((icon) => {
        if (icon) {
          icon.removeEventListener("mouseenter", null)
          icon.removeEventListener("mouseleave", null)
        }
      })
      linkRefs.current.forEach((link) => {
        if (link) {
          link.removeEventListener("mouseenter", null)
          link.removeEventListener("mouseleave", null)
        }
      })
    }
  }, [])

  return (
    <footer className="relative overflow-hidden w-full">
      {/* Static 3D Curved top boundary */}
      <div className="relative h-32">
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-black"
          style={{
            clipPath: "ellipse(75% 100% at 50% 100%)",
            transform: "perspective(1000px) rotateX(5deg)",
            transformOrigin: "bottom",
            zIndex: 10,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-red-900/30 to-black/90"
          style={{
            clipPath: "ellipse(70% 100% at 50% 100%)",
            transform: "perspective(1000px) rotateX(8deg) translateY(5px)",
            transformOrigin: "bottom",
            zIndex: 9,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-gray-800/20 to-black/80"
          style={{
            clipPath: "ellipse(65% 100% at 50% 100%)",
            transform: "perspective(1000px) rotateX(12deg) translateY(10px)",
            transformOrigin: "bottom",
            zIndex: 8,
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 pt-16 pb-8 px-4 sm:px-12 md:px-20 m-auto w-full">
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 container lg:grid-cols-3 gap-12 w-full lg:place-items-center">
          {/* Logo and About Section */}
          <div className="space-y-4 h-full">
            <Link href="/" className="flex items-center space-x-3">
              <div className="footer-logo relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-30 animate-pulse"></div>
                <Image
                  src="/logo.png"
                  alt="Developers Day Logo"
                  width={80}
                  height={80}
                  className="rounded-full relative z-10"
                />
              </div>
              <span className="text-2xl font-bold text-white">Developers Day 2025</span>
            </Link>
            <p className="text-gray-400 mt-4">
              Empowering developers to create, innovate, and transform the future through technology and collaboration.
            </p>

            {/* Social Links */}
            <div className="flex space-x-5 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-2xl transition-all duration-300 hover:text-red-500"
                  aria-label={social.label}
                  ref={(el) => (socialRefs.current[index] = el)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 h-full">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-red-500 rounded-full"></span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-gray-400 transition-all duration-300 hover:text-red-500 flex items-center"
                  ref={(el) => (linkRefs.current[index] = el)}
                >
                  <span className="text-red-500 mr-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    ›
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Meet Our Developers
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-red-500 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              {developers.map((dev, index) => (
                <div key={index} className="group">
                  <h4 className="text-white font-medium group-hover:text-red-400 transition-colors duration-300">
                    {dev.name}
                  </h4>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-red-500 transition-colors duration-300 flex items-center mt-1"
                  >
                    <FaLinkedin className="mr-1" />
                    LinkedIn Profile
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="container mx-auto">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Developers Day. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

