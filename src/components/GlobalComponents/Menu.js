"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaEnvelope,
  FaClipboardList,
  FaProjectDiagram,
  FaBriefcase,
  FaHandshake,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

const menuItems = [
  { path: "/", label: "Home", icon: <FaHome className="text-red-700 text-4xl" /> },
  { path: "/modules", label: "Modules", icon: <FaBoxOpen className="text-red-700 text-4xl" /> },
  { path: "/team", label: "Team", icon: <FaUsers className="text-red-700 text-4xl" /> },
  { path: "/contact-us", label: "Contact Us", icon: <FaEnvelope className="text-red-700 text-4xl" /> },
  { path: "/registration", label: "Registration", icon: <FaClipboardList className="text-red-700 text-4xl" /> },
  { path: "/fyp-extreme", label: "FYP Extreme", icon: <FaProjectDiagram className="text-red-700 text-4xl" /> },
  { path: "/job-orbit", label: "Job Orbit", icon: <FaBriefcase className="text-red-700 text-4xl" /> },
  { path: "/sponsors", label: "Sponsors", icon: <FaHandshake className="text-red-700 text-4xl" /> },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/5 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link href="/" className="flex items-center mt-5 mb-5">
              <Image src="/logo.png" alt="Logo" width={90} height={90} className="rounded-full" />
              <span className="text-3xl font-bold text-white">Developers Day 2025</span>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 text-white"
            >
              {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={handleCloseMenu}
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex items-center justify-center"
            >
              <motion.div className="relative z-50 w-full max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  {menuItems.map((item) => (
                    <motion.div key={item.path}>
                      <SpotlightCard className="bg-transparent border-transparent !p-4">
                        <Link href={item.path} onClick={handleCloseMenu}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-4 text-white font-semibold text-xl"
                          >
                            <div className="p-2">{item.icon}</div>
                            <span>{item.label}</span>
                          </motion.div>
                        </Link>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
