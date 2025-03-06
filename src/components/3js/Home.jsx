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
            className="h-[500px] w-[180px] rotate-45  z-10"
            color="#ff6666"
            blurRadius={400}
          />

          <div className="text-4xl md:text-6xl lg:text-8xl mt-10 ml-10 leading-snug font-bold text-white 
            [text-shadow:_0_0_30px_rgb(255_255_255_/_50%)]">
            Developers Day{" "}
            <span className="text-[#ff3333] sm:inline 
              [text-shadow:_0_0_30px_rgb(255_51, 51, 40%)]">
              2025
            </span>
          </div>
        </div>
      </div>

     
    </>
  );
};






export default PageHeader;
