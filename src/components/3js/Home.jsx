import Link from "next/link";
import HorizontalList from "./widgets/HorizontalList";
import Light from "./widgets/atomic/Light";
import GradientTag from "./widgets/atomic/GradientTag";

const horizontalUserStats = [
  {
    text: "Our Clients: +185",
  },
  {
    text: "Our Projects : +134",
  },
  {
    text: "Active Orders : +51",
  },
];

const PageHeader = () => {
  return (
    <>
      <div className="p-1 lg:p-10 pt-0 w-full grid grid-cols-1 md:grid-cols-2 grid-row-1 mb-10">
        <div className="bg-back w-full row-span-1 h-full md:ml-10">
          <GradientTag
            gradientStartColor={"to-[rgba(50,47,53,0)] to-90%"}
            gradientEndColor={"from-[#ff3333]"}
            show={true}
          >
            Develop Ideas Into Reality
          </GradientTag>

          <Light
            className="h-[500px] w-[180px] rotate-45 z-10"
            color="#ff6666"
            blurRadius={400}
          />

          <div className="text-4xl md:text-6xl lg:text-8xl mt-10 md:mb-5 ml-10 leading-snug font-bold text-white 
            [text-shadow:_0_0_30px_rgb(255_255_255_/_50%)]">
            e.ocean Developers Day{" "}
            <span className="text-[#ff3333] sm:inline 
              [text-shadow:_0_0_30px_rgb(255_51, 51, 40%)]">
              2025
            </span>
          </div>
          <div className="ml-10">
            <span className="text-xl lg-text-3xl md:ml-2">17th April 2025 at FAST NUCES, Karachi</span>
          </div>

          <div className="ml-10 mt-8">
            <Link href="/registration">
              <span 
                className="relative inline-flex items-center justify-center px-8 py-4 
                overflow-hidden font-bold rounded-lg group bg-gradient-to-br 
                from-[#ff3333] to-[#ff6666] text-white
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-[0_0_40px_rgba(255,51,51,0.4)]
                active:scale-95
                before:absolute before:inset-0
                before:bg-gradient-to-br before:from-[#ff4444] before:to-[#ff7777]
                before:transition-all before:duration-300 before:ease-out before:opacity-0
                hover:before:opacity-100
                after:absolute after:inset-0 after:-z-10
                after:bg-gradient-to-br after:from-[#ff3333] after:to-[#ff6666]
                after:blur-xl after:transition-all after:duration-300
                after:scale-105 after:opacity-40
                hover:after:scale-110 hover:after:opacity-70
                cursor-pointer"
              >
                <span className="relative z-10 flex items-center">
                  Register Now
                  <svg 
                    className="ml-2 -mr-1 w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
