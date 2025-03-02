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
            View some of the major projects
          </GradientTag>

          <Light
            className="h-[500px] w-[180px] rotate-45  z-10"
            color="#ff6666"
            blurRadius={400}
          />

          <div className="text-4xl md:text-6xl lg:text-8xl mt-10 ml-10 leading-snug font-bold text-white 
            [text-shadow:_0_0_30px_rgb(255_255_255_/_50%)]">
            THE 2025 <br className="hidden md:block" />{" "}
            <span className="text-[#ff3333] sm:block  
              [text-shadow:_0_0_30px_rgb(255_51_51_/_40%)]">
              DevDay
            </span>{" "}
            
          </div>
          <p className="text-white text-[1rem] p-5 w-full lg:w-11/12 mt-5 hidden md:block lg:text-xl
            [text-shadow:_0_0_20px_rgb(255_255_255_/_20%)]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            voluptates molestias sit harum temporibus! Eum odit suscipit nisi
            unde expedita?
          </p>
        </div>
      </div>

     
    </>
  );
};






export default PageHeader;
