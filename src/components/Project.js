"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/images/highlight-img-1.jpg", text: "Developer's Day 2023" },
  { src: "/images/highlight-img-2.jpg", text: "Developer's Day 2023" },
  { src: "/images/highlight-img-3.jpg", text: "Developer's Day 2023" },
  { src: "/images/highlight-img-4.jpg", text: "Developer's Day 2023" },
  { src: "/images/highlight-img-5.jpg", text: "Developer's Day 2023" },
  { src: "/images/highlight-img-6.jpg", text: "Developer's Day 2023" },
  { src: "/images/highlight-img-7.jpg", text: "Developer's Day 2023" },
];

export default function Projects() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(container, {
      x: () => `-${scrollWidth - viewportWidth + 100}px`,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollWidth - viewportWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.to(triggerRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top center",
        pin: false,
        onEnter: () => {
          ScrollTrigger.getById("horizontal")?.kill();
        },
      },
    });
  }, []);

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".grid-item"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Event Highlights</h2>
        <p className="text-red-600 mt-1">Showcasing the Best in Tech: Competitions, Careers & More</p>
      </div>

      <div className="flex items-center justify-start">
        <div
          ref={containerRef}
          className="flex gap-6 no-scrollbar px-6 whitespace-nowrap"
        >
          {images.map((item, index) => (
            <div
              key={index}
              className="grid-item relative rounded-lg shadow-lg overflow-hidden flex-shrink-0 bg-gray-800 group w-[40vw] h-[40vh]"
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute top-3 left-3 text-white font-bold text-lg z-10">
                {item.text}
              </div>
              <img src={item.src} alt={`Project ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div ref={triggerRef} className="h-screen w-full"></div>
    </section>
  );
}
