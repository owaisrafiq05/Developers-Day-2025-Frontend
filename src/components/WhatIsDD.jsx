"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const WhatIsDD = () => {
  const heading = useRef(null);
  const para = useRef(null);
  const [animatedText, setAnimatedText] = useState(""); // Store processed text

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

    // Only modify text once, before animation
    const originalText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est atque natus maxime! Ex nam in saepe sunt rerum quis mollitia sapiente expedita, culpa nobis deleniti, hic quo similique maxime ratione ea! Corrupti, laudantium! Voluptatem eaque natus dolore voluptate repellendus expedita.";

    const words = originalText.split(" ");
    const wrappedText = words
      .map(
        (word) =>
          `<span style="display: inline-block; opacity: 0;">${word}&nbsp;</span>`
      )
      .join("");

    setAnimatedText(wrappedText); // Update state with processed text

    // Wait for state update before selecting spans
    setTimeout(() => {
      if (para.current) {
        const spans = para.current.querySelectorAll("span");

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
    }, 100); // Small delay to ensure spans are present

  }, []);

  return (
    <div className="z-10 w-full px-10 pt-10 flex items-center justify-center flex-col gap-4 text-center">
      <h1 ref={heading} className="text-3xl max-w-[1000px] font-bold">
        What is <span>Developers Day</span>?
      </h1>

      <div>
        <p
          ref={para}
          className="z-10 text-xl max-w-[1000px]"
          dangerouslySetInnerHTML={{ __html: animatedText }}
        />
      </div>
    </div>
  );
};

export default WhatIsDD;
