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

    const originalText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est atque natus maxime! Ex nam in saepe sunt rerum quis mollitia sapiente expedita, culpa nobis deleniti, hic quo similique maxime ratione ea! Corrupti, laudantium! Voluptatem eaque natus dolore voluptate repellendus expedita.";

    const words = originalText.split(" ");
    const wrappedText = words
      .map(
        (word) =>
          `<span class="word-span">${word}&nbsp;</span>`
      )
      .join("");

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
        <p
          ref={para}
          className="text-lg md:text-xl"
          dangerouslySetInnerHTML={{ __html: animatedText }}
        />
      </div>
    </div>
  );
};

export default WhatIsDD;
