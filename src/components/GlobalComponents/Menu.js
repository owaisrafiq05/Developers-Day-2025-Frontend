"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./menu.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaBars, FaCross, FaXmark } from "react-icons/fa6";

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

  /*GSAP*/
  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container z-40" ref={container}>
      <div className="menu-bar flex items-center justify-between">
        <div className="menu-logo">
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </Link>
        </div>
        <div
          className="menu-open absolute top-[60px] right-[60px]"
          onClick={toggleMenu}
        >
          <FaBars className="p-2 text-[2.5rem] rounded-md cursor-pointer hover:scale-110 transition-all duration-100" />
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          <div className="menu-open" onClick={toggleMenu}>
            <div
              className="menu-open absolute top-[60px] right-[60px]"
              onClick={toggleMenu}
            >
              <FaBars className="p-2 text-white text-[2.5rem] rounded-md cursor-pointer hover:scale-110 transition-all duration-100" />
            </div>
            {/* <div className="hamburger-icon">
            <svg width="50" height="50" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="red" />
              <path d="M7 10H23M7 15H23M7 20H23" stroke="black" strokeWidth="2" />
            </svg>
          </div> */}
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
              );
            })}
          </div>
          {/* <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Instagram &#8599;</a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Behance &#8599;</a>
              <a href="#">Dribble &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>info@nextjsxgsap.com</p>
              <p>1234567890</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
