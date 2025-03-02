import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import Menu from "../components/GlobalComponents/Menu.js";
import Loader from "../components/GlobalComponents/Loader";
import Footer from "@/components/GlobalComponents/Footer";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Developers Day 2025",
  description: "Developers Day is the inter university flagship events in whole Pakistan, hosted by FAST NUCES, Karachi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.className} bg-black relative`}>
         <Loader /> 
         <Menu />
        <main className="relative z-0 min-h-screen">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
