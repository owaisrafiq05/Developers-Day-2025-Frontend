import Hero from "@/components/Hero";
import Squares from "@/components/Squares/Squares";
import Stats from "@/components/Stats";
import WhatIsDD from "@/components/WhatIsDD";
import Projects from "@/components/Project";
import Countdown from "@/components/Counter";

export default function Home() {
  return (
    <>

      <div className="py-10 bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#000"
          hoverFillColor="#222"
        />
        <Hero />  
        <div className="relative z-10 mb-20">
          <Countdown />
        </div>
        <WhatIsDD />
        <br/>
        <br/>
        <Stats />
        <div className="relative z-10">
          <Projects/>
        </div>
      </div>
    </>
  );
}
