"use client"
import Image from "next/image"
import { FaLinkedin, FaFacebookF, FaInstagram } from "react-icons/fa"

const socialLinks = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/developersday/", label: "LinkedIn" },
  { icon: <FaFacebookF />, url: "https://web.facebook.com/DevelopersDay/", label: "Facebook" },
  { icon: <FaInstagram />, url: "https://www.instagram.com/developersday/", label: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full">
      {/* Main footer content */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 pt-10 pb-6 px-4 sm:px-12 md:px-20 m-auto w-full">
        <div className="mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="footer-logo relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-30 animate-pulse"></div>
              <Image
                src="/logo.png"
                alt="Developers Day Logo"
                width={60}
                height={60}
                className="rounded-full relative z-5"
              />
            </div>
          </div>
          
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Empowering developers to create, innovate, and transform the future through technology and collaboration.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-5 mt-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-2xl transition-all duration-300 hover:text-red-500"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Developers Day. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

