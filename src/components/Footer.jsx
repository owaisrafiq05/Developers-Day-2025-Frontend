"use client"
import Image from "next/image"
import Link from "next/link"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapPin,
} from "react-icons/fa6"

export default function Footer() {
  // Updated navigation links
  const links = [
    { name: "Home", href: "/" },
    { name: "Modules", href: "/modules" },
    { name: "Team", href: "/team" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Registration", href: "/registration" },
    { name: "FYP-Xtreme", href: "/fyp-xtreme" },
    { name: "Job Orbit", href: "/job-orbit" },
    { name: "Sponsors", href: "/sponsors" },
  ]

  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
    { name: "GitHub", icon: FaGithub, href: "https://github.com" },
  ]

  return (
    <footer className="mt-24 w-full relative z-20 bg-[#131313] rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-4">
        <div className="px-6 py-12 lg:px-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="logo" width={50} height={50} />
                <h2 className="text-xl font-bold">Developers Day '25</h2>
              </div>
              <p className="text-sm text-gray-400">
                Empowering innovation through collaboration and sponsorship since 2010.
              </p>
            </div>

            {/* Navigation links */}
            <div className="col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-4">Quick Links</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-300 transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapPin className="mr-2 h-5 w-5 shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-300">123 Innovation Drive, Tech City, TC 10101</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2 h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-300">info@example.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social media icons */}
          <div className="border-t border-gray-800 pt-8 flex justify-center md:justify-start">
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-red-600 hover:text-white"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Copyright and legal */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} Developers Day. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-xs text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-xs text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-xs text-gray-400 hover:text-white">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

