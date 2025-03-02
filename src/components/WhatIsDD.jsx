"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const WhatIsDD = () => {
  const heading = useRef(null);
  const para = useRef(null);
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    // Heading Animation
    gsap.from(heading.current, {
      scrollTrigger: {
        trigger: heading.current,
        start: "top 85%",
        end: "top 35%",
        scrub: true,
      },
      scale: 2,
      opacity: 0,
      duration: 1,
    });

    const originalText = `"Developers' Day" is not just an event; it's a burgeoning legend that's making its mark in our institution and rippling through the entire industry. With each passing year, it evolves into an industrywide phenomenon, redefining itself. And the countdown to this year's groundbreaking event is on.\n\nOur goal is very clear: to close the gap between professional and academic domains. To achieve this, we invite prominent figures from the sector to speak with our undergraduate students in person on campus.`;

    // Split paragraphs and then words
    const paragraphs = originalText.split('\n\n');
    const wrappedText = paragraphs
      .map(paragraph => 
        `<p class="mb-4">${
          paragraph.split(' ')
            .map(word => `<span class="word-span">${word}&nbsp;</span>`)
            .join('')
        }</p>`
      )
      .join('');

    setAnimatedText(wrappedText);

    setTimeout(() => {
      if (para.current) {
        const spans = para.current.querySelectorAll(".word-span");

        gsap.to(spans, {
          scrollTrigger: {
            trigger: para.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 1,
        });
      }
    }, 100);

  }, []);

  return (
    <div className="relative z-10 w-full px-4 md:px-10 pt-10 flex items-center justify-center flex-col gap-4 text-center overflow-hidden">
      <h1 ref={heading} className="text-2xl md:text-3xl max-w-[1000px] font-bold">
        What is <span className="text-red-600">Developers Day</span>?
      </h1>

      <div className="w-full max-w-[1000px] overflow-hidden">
        <div
          ref={para}
          className="text-lg md:text-xl text-gray-300"
          dangerouslySetInnerHTML={{ __html: animatedText }}
        />
      </div>
    </div>
  );
};

export default WhatIsDD;
