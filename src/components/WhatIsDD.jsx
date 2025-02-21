"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const WhatIsDD = () => {
  const heading = useRef(null);
  const para = useRef(null);

  useEffect(() => {
    // heading anim
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

    // paragraph anim
    para.current.innerHTML = para.current.textContent
      .split("")
      .map((char) => `<span className="z-10" style="z-index: 10">${char}</span>`)
      .join("");

    gsap.from(para.current.querySelectorAll("span"), {
      scrollTrigger: {
        trigger: para.current,
        start: "top 85%",
        end: "top 35%",
        scrub: true,
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.01,
      delay: 1,
      zIndex: 10,
    });
  }, []);

  return (
    <div className="z-10 w-full px-10 pt-10 flex items-center justify-center flex-col gap-4 text-center">
      <h1 ref={heading} className="text-3xl max-w-[1000px]">
        What is <span>Developers Day</span>?
      </h1>

      <div>
        {/* <h3 className="text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3> */}
        <p ref={para} className="z-10 text-xl max-w-[1000px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est atque
          natus maxime! Ex nam in saepe sunt rerum quis mollitia sapiente
          expedita, culpa nobis deleniti, hic quo similique maxime ratione ea!
          Corrupti, laudantium! Voluptatem eaque natus dolore voluptate
          repellendus expedita.
        </p>
      </div>
    </div>
  );
};

export default WhatIsDD;
