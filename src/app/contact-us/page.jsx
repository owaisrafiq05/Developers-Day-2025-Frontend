import Squares from "@/components/Squares/Squares";
import Cards from "@/components/TeamComponents/Cards";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import './page.css'

const Marker = ({ text }) => <div>{text}</div>;

const page = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

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
        <div className="relative w-full px-5 pb-5  pt-16 mb-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>

        <Cards
          teamMembers={[
            {
              name: "Bob Williams",
              designation: "President",
              image: "/images/team/person.avif",
              email: "L2NtK@example.com",
              phone: "123-456-7890",
            },
            {
              name: "Bob Williams",
              designation: "Vice President",
              image: "/images/team/person.avif",
              email: "L2NtK@example.com",
              phone: "123-456-7890",
            },
            {
              name: "Bob Williams",
              designation: "Product Manager",
              image: "/images/team/person.avif",
              email: "L2NtK@example.com",
              phone: "123-456-7890",
            },
            {
              name: "Bob Williams",
              designation: "Tech Lead",
              image: "/images/team/person.avif",
              email: "L2NtK@example.com",
              phone: "123-456-7890",
            },
          ]}
        />
      </div>

      <div className="px-8 py-10 rounded-t-2xl">
        <div className="w-full mb-10 flex gap-10 items-center justify-center">
          <Link
            href="https://www.google.com"
            className=" hover:scale-110 duration-200 transition-transform"
          >
            <FaFacebook className="text-3xl text-blue-600 pointer-events-none" />
          </Link>
          <Link
            href="https://www.google.com"
            className=" hover:scale-110 duration-200 transition-transform"
          >
            <FaLinkedin className="text-3xl text-blue-500 pointer-events-none" />
          </Link>
          <Link
            href="https://www.google.com"
            className=" hover:scale-110 duration-200 transition-transform"
          >
            <FaInstagram className="text-3xl text-red-600 pointer-events-none" />
          </Link>
        </div>

        <div className="">
          <h3 className="m-auto w-max">1234 Main Street</h3>
          <h3 className="m-auto w-max">Your City, Your State</h3>
        </div>

        <div className="my-map mt-6 max-w-[1000px] w-[90%] m-auto h-[300px] bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default page;
