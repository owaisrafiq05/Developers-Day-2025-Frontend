// "use client";
// import Squares from "@/components/Squares/Squares";
// import Link from "next/link";
// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
// import "./page.css";
// import Map from "@/components/Map";
// import Card from "./Card";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger);

// const page = () => {
//   const ref = useRef();

//   useEffect(() => {
//     const el = ref.current;

//     // initial animation
//     gsap.fromTo(
//       el,
//       { opacity: 0, scale: 0 },
//       { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
//     );

//     // scroll triggered animation
//     gsap.fromTo(el, {opacity: 1, y: 0}, {
//       opacity: 0,
//       duration: 1,
//       scale: 0,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: el,
//         start: "bottom 10%", 
//         end: "bottom top",
//         toggleActions: "play none none reverse",
//       },
//     });

//     return () => ScrollTrigger.killAll();
//   }, []);

//   return (
//     <div>
//       <div className="relative">
//         <Squares
//           speed={0.5}
//           squareSize={40}
//           direction="diagonal" // up, down, left, right, diagonal
//           borderColor="#000"
//           hoverFillColor="#222"
//         />
//         <div className="relative w-full px-5 pb-2 pt-32 mb-0 flex items-center justify-center">
//           <h1 className="text-3xl font-bold">Contact Us</h1>
//         </div>

//         <div
//           className="flex flex-wrap gap-x-4 gap-y-0 h-max items-center justify-center py-6"
//           ref={ref}
//         >
//           <Card
//             name={"Abubakr Danish"}
//             phone={"+92 333 2475885"}
//             designation={"Secretary"}
//             title={"For Collaborations"}
//           />
//           <Card
//             name={"Hanzala Shamsi"}
//             phone={"+92 344 0775484"}
//             designation={"General Secretary"}
//             title={"For Registration"}
//           />
//           <Card
//             name={"Muhammad Shaheer Luqman"}
//             phone={"+92 310 0124127"}
//             designation={"Director Technology"}
//             title={"For Competition"}
//           />
//           <Card
//             name={"Wajheeh Ali Khan"}
//             phone={"+92 331 2321775"}
//             designation={"Director Standards"}
//             title={"For General Inquiries"}
//           />
//         </div>
//       </div>

//       <div
//         className="px-8 py-10 rounded-t-3xl"
//         style={{
//           backgroundImage: "linear-gradient(to bottom, #181818 0%, black 40%)",
//         }}
//       >
//         {/* <div className="w-full mb-10 flex gap-10 items-center justify-center">
//           <Link
//             href="https://www.facebook.com/developersday/"
//             className=" hover:scale-110 duration-200 transition-transform"
//           >
//             <FaFacebook className="text-3xl text-blue-600 pointer-events-none" />
//           </Link>
//           <Link
//             href="https://www.linkedin.com/company/developersday"
//             className=" hover:scale-110 duration-200 transition-transform"
//           >
//             <FaLinkedin className="text-3xl text-blue-500 pointer-events-none" />
//           </Link>
//           <Link
//             href="https://www.instagram.com/developersday/"
//             className=" hover:scale-110 duration-200 transition-transform"
//           >
//             <FaInstagram className="text-3xl text-red-600 pointer-events-none" />
//           </Link>
//         </div> */}

//         <div className="">
//           <h3 className="m-auto w-max">St-4, Sector 17-D, NH 5, Karachi, Sindh</h3>
//           <h3 className="m-auto w-max">(021) 111 128 128</h3>
//           <h3 className="m-auto w-max">info.khi@nu.edu.pk</h3>
//         </div>

//         <div className="my-map mt-6 max-w-[1600px] w-[90%] m-auto h-[500px] bg-gray-300 rounded-xl">
//           <Map />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";
import Squares from "@/components/Squares/Squares";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import "./page.css";
import Map from "@/components/Map";
import Card from "./Card";

const Page = () => {
  return (
    <div>
      <div className="relative">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#000"
          hoverFillColor="#222"
        />
        <div className="relative w-full px-5 pb-2 pt-32 mb-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-0 h-max items-center justify-center py-6">
          <Card
            name={"Abubakr Danish"}
            phone={"+92 333 2475885"}
            designation={"Secretary"}
            title={"For Collaborations"}
          />
          <Card
            name={"Hanzala Shamsi"}
            phone={"+92 344 0775484"}
            designation={"General Secretary"}
            title={"For Registration"}
          />
          <Card
            name={"Muhammad Shaheer Luqman"}
            phone={"+92 310 0124127"}
            designation={"Director Technology"}
            title={"For Competition"}
          />
          <Card
            name={"Wajheeh Ali Khan"}
            phone={"+92 331 2321775"}
            designation={"Director Standards"}
            title={"For General Inquiries"}
          />
        </div>
      </div>

      <div
        className="px-8 py-10 rounded-t-3xl"
        style={{
          backgroundImage: "linear-gradient(to bottom, #181818 0%, black 40%)",
        }}
      >
        {/* Social media links section removed as well */}

        <div className="">
          <h3 className="m-auto w-max">St-4, Sector 17-D, NH 5, Karachi, Sindh</h3>
          <h3 className="m-auto w-max">(021) 111 128 128</h3>
          <h3 className="m-auto w-max">info.khi@nu.edu.pk</h3>
        </div>

        <div className="my-map mt-6 max-w-[1600px] w-[90%] m-auto h-[500px] bg-gray-300 rounded-xl">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Page;
