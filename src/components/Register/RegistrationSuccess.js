"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Squares from "@/components/Squares/Squares";
import gsap from "gsap";

const RegistrationSuccess = () => {
  const contentRef = useRef(null);
  const checkmarkRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const checkmark = checkmarkRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const button = buttonRef.current;
    const copyright = copyrightRef.current;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(content, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(checkmark, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, 
      "-=0.4"
    )
    .fromTo(title, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
      "-=0.2"
    )
    .fromTo(text, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
      "-=0.3"
    )
    .fromTo(button, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
      "-=0.2"
    )
    .fromTo(copyright, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.5 }, 
      "-=0.1"
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal'
        borderColor='rgba(255, 255, 255, 0.2)'
        hoverFillColor='#222'
        className="fixed top-0 left-0 w-screen h-screen z-0"
      />
      
      <div ref={contentRef} className="w-full max-w-2xl bg-black/30 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-800 z-10 relative">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div ref={checkmarkRef} className="w-24 h-24 text-red-700 rounded-full bg-black/50 border-2 border-red-700 flex items-center justify-center">
              <span className="text-4xl">✓</span>
            </div>
          </div>
          
          <h1 ref={titleRef} className="text-3xl font-bold text-white mb-4">
            Registration Successful!
          </h1>
          
          <p ref={textRef} className="text-gray-300 text-lg mb-8">
            Thank you for registering for Developers Day 2025.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/" className="w-full">
              <motion.button 
                ref={buttonRef}
                className="w-full py-3 px-6 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Return to Home
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
      
      <div ref={copyrightRef} className="mt-8 text-gray-400 text-sm z-10">
        © {new Date().getFullYear()} Developers Day 2025
      </div>
    </div>
  );
};

export default RegistrationSuccess; 