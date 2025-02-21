"use client"

import React, { useEffect } from "react";
import { TweenMax, Expo } from "gsap"; // Import TweenMax and Expo
import anime from "animejs"; // Import Anime.js
import "./loader.css"; // Create this CSS file for the loader styles

const Loader = () => {
  useEffect(() => {
    // Animation logic
    const overlay = document.querySelector(".overlay");
    const textWrapper = document.querySelector(".header");
    
    // TweenMax animation for overlay
    TweenMax.to(overlay, 1.2, {
      top: "-120%",
      ease: Expo.easeOut,
      delay: 5,
    });

    // Animating the text
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime.timeline().add({
      targets: ".header .letter",
      translateY: [100, 0],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 4800 + 40 * i,
    });
  }, []);

  return (
    <div className="loader overlay">
      <div className="preloader">
        <img src="./logo2.png"></img>
      </div>
      <h1 className="header">Powered by E-Ocean</h1>
    </div>
  );
};

export default Loader; 