"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./menu.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/modules", label: "Modules" },
  { path: "/team", label: "Team" },
  { path: "/contact-us", label: "Contact Us" },
  { path: "/registration", label: "Registration" },
  { path: "/fyp-extreme", label: "FYP Extreme" },
  { path: "/job-orbit", label: "Job Orbit" },
  { path: "/sponsors", label: "Sponsors" },
];

const Menu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="menu-container" ref={container}>
      <div className="menu-bar flex items-center justify-between">
        <div className="menu-logo">
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <div className="hamburger-icon">
            <svg width="50" height="50" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="red" />
              <path d="M7 10H23" stroke="black" strokeWidth="2" />
              <path d="M7 15H23" stroke="black" strokeWidth="2" />
              <path d="M7 20H23" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          <div className="menu-open" onClick={toggleMenu}>
          <div className="hamburger-icon">
            <svg width="50" height="50" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="red" />
              <path d="M7 10H23M7 15H23M7 20H23" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </div>
        </div>

        <div className="menu-close-icon">
          <p onClick={toggleMenu}>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link) => {
              return (
                <div className="menu-link-item" key={link.label}>
                  <div className="menu-link-item-holder" onClick={toggleMenu}>
                    <Link href={link.path} className="menu-link">
                      {link.label}
                    </Link>
                  </div>
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