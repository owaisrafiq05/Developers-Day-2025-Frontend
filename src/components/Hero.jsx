"use client";

import { useEffect, useRef } from "react";
import Balatro from "./Balatro/Balatro";
import Countdown from "./Counter";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";
import GradientText from "./GradientText/GradientText";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.style.opacity = "0";
      hero.style.transform = "translateY(20px)";
      setTimeout(() => {
        hero.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
      }, 100);
    }

    // Menu toggle functionality
    const toggle = document.querySelector('.toggle');
    const menu = document.querySelector('.menu');
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Entry animation
    const entryAnime = () => {
      const tl = gsap.timeline();
      tl.to('.bg', { x: 0, ease: "power2.inOut", duration: 1 }, 0)
        .to('.strip', { x: 0, ease: "power2.inOut", duration: 1 }, 0)
        .to('.bg', { scale: 1.01, y: 3, duration: 1, repeat: -1, yoyo: true }, 0)
        .to('.heading-block', { y: 0, opacity: 1, duration: 0.75 }, 0)
        .to('.hero p', { y: 0, opacity: 1, duration: 0.75 }, 1)
        .to('.button-group', { y: 0, opacity: 1, duration: 0.75 })
        .to('.arrow', { opacity: 1, y: 20, duration: 0.5, repeat: -1, yoyo: true });
    };

    entryAnime();
  }, []);

  // Inject styles into the document
  useEffect(() => {
    const styles = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :root {
        --red: #ff0358;
        --orange: #f9a71c;
        --black: #000;
        --white: #fff;
        --lightgrey: #d7e1e7;
        --grey: #9db6c3;
        --darkgrey: #374045;
        --blue: #00ffff;
        --containerXPadding: 1.5rem;
        --unit: 16px;
      }
      body {
        font-size: var(--unit);
        line-height: 1.3;
        font-family: 'Oswald', sans-serif;
      }
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      a {
        text-decoration: none;
        color: var(--blue);
      }
      a:hover {
        text-decoration: none;
      }
      .huge-font {
        font-family: 'Audiowide', cursive;
      }
      .upper-text {
        text-transform: uppercase;
        letter-spacing: 0.1rem;
      }
      .hero-container {
        padding-left: var(--containerXPadding);
        padding-right: var(--containerXPadding);
      }
      .fullscreen {
        min-height: 100vh;
        width: 100%;
        display: flex;
      }
      .hero-header {
        position: fixed;
        z-index: 50;
        width: 100%;
        top: 0;
        padding-top: 1.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .toggle {
        width: 2rem;
        height: 1.5rem;
        cursor: pointer;
        position: relative;
      }
      .toggle span {
        width: 100%;
        display: block;
        border-bottom: 2px solid var(--white);
        position: absolute;
        transition: top 0.3s ease, transform 0.3s ease;
      }
      .toggle span:first-child {
        top: 0.4rem;
      }
      .toggle span:last-child {
        top: 0.9rem;
      }
      .toggle.active span {
        top: 0.75rem;
      }
      .toggle.active span:first-child {
        transform: rotate(45deg);
      }
      .toggle.active span:last-child {
        transform: rotate(-45deg);
      }
      .menu {
        position: fixed;
        top: 5rem;
        right: -15rem;
        width: 15rem;
        background: var(--darkgrey);
        opacity: 0;
        padding: 1rem;
        transition: right 0.3s ease, opacity 0.3s ease;
      }
      .menu ul {
        list-style: none;
      }
      .menu ul li {
        text-transform: uppercase;
        font-weight: 300;
      }
      .menu ul li a {
        color: var(--white);
        display: block;
        padding: 0.5rem;
        letter-spacing: 0.1rem;
        transition: color 0.3s ease;
      }
      .menu ul li a:hover {
        color: var(--blue);
      }
      .menu.active {
        right: var(--containerXPadding);
        opacity: 1;
      }
      .social {
        position: fixed;
        bottom: 0;
        right: var(--containerXPadding);
        bottom: 1.5rem;
        display: flex;
        gap: 1rem;
        font-size: 2rem;
      }
      .social a {
        color: var(--white);
        display: block;
        transition: color 0.3s ease;
      }
      .social a:hover {
        color: var(--blue);
      }
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('/logo.png');
        background-size: contain;
        background-position: right bottom;
        background-repeat: no-repeat;
        background-color: var(--red);
        background-blend-mode: multiply;
        z-index: -1;
        transform: translateX(100%);
      }
      .heading-block {
        transform: translateY(-50vh);
        opacity: 0;
      }
      .hero {
        position: relative;
        overflow: hidden;
      }
      .number {
        font-size: 10rem;
        opacity: 0.1;
        position: absolute;
        top: 3rem;
        left: 0;
        pointer-events: none;
      }
      .block {
        color: var(--white);
        font-weight: 400;
        display: flex;
        margin-top: auto;
        flex-direction: column;
        width: 100%;
      }
      .block h2 {
        font-size: 2rem;
      }
      .block h1 {
        font-size: 3rem;
      }
      .block p {
        font-weight: 300;
        margin-bottom: 2rem;
        opacity: 0;
        transform: translateY(50vh);
      }
      .btn {
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: 0.05rem;
        padding: 0.6rem 2rem;
        font-family: 'Oswald', sans-serif;
        overflow: hidden;
        min-width: 10rem;
        align-items: center;
        justify-content: center;
        border: none;
        line-height: 1.5;
        border-bottom-right-radius: 1rem;
        display: inline-flex;
        flex-direction: row;
        width: fit-content;
        cursor: pointer;
        border: 1px solid transparent;
        color: var(--white);
        position: relative;
        transition: color 0.5s ease;
        z-index: 1;
      }
      .btn.primary {
        background: var(--black);
        border-color: var(--black);
      }
      .btn.primary:hover {
        color: var(--black);
      }
      .button-group {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        opacity: 0;
      }
      .arrow {
        margin: 2rem 0;
        font-size: 2rem;
        opacity: 0;
      }
      .strip {
        position: absolute;
        top: 0;
        right: 0;
        width: 25%;
        bottom: 0;
        background-color: var(--blue);
        mix-blend-mode: hue;
        transform: translateX(-100vw);
      }
      @media (min-width: 768px) {
        :root {
          --containerXPadding: 2rem;
        }
        .bg {
          background-image: url('/logo.png');
        }
      }
      @media (min-width: 1260px) {
        :root {
          --containerXPadding: 3rem;
        }
        .bg {
          background-image: url('/logo.png');
        }
      }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div ref={heroRef} className="hero fullscreen">
      <div className="bg fullscreen"></div>
      <span className="strip"></span>
      <span className="number huge-font">02</span>
      <div className="block container hero-container">
        <div className="heading-block">
          <h2 className="upper-text">Developers Day</h2>
          <h1 className="huge-font">25</h1>
          <div className="flex-start flex p-8">
            <Countdown/>
          </div>
        </div>
        <p className="upper-text">
          the first Evanglion built specifically <br />
          for combat against the Angels
        </p>
        <div className="button-group">
          <a href="#" className="btn primary">Text Specs &nbsp;
            <i className="bi bi-download"></i>
          </a>
          <a href="#" className="btn border">Audit &nbsp;
            <i className="bi bi-card-list"></i>
          </a>
        </div>
        <i className="bi bi-chevron-double-down arrow"></i>
      </div>
      <div className="social">
        <a href="#"><i className="bi bi-facebook"></i></a>
        <a href="#"><i className="bi bi-twitter"></i></a>
        <a href="#"><i className="bi bi-instagram"></i></a>
      </div>
      <span className="toggle">
        <span></span>
        <span></span>
      </span>
    </div>
  );
};

export default Hero;

