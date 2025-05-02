import Image from "next/image";
import Squares from "@/components/Squares/Squares";

export default function Home() {
  return (
    <>
      <div className="py-10 bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative min-h-screen flex flex-col items-center justify-center">
        <Squares
          squareSize={40}
          borderColor="#000"
        />
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-10 flex justify-center">
            <Image src="/logo.png" alt="Developers Day Logo" width={180} height={180} className="rounded-full" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 
            [text-shadow:_0_0_30px_rgb(255_255_255_/_50%)]">
            e.ocean Developers Day{" "}
            <span className="text-[#ff3333] 
              [text-shadow:_0_0_30px_rgb(255_51_51_/_40%)]">
              2025
            </span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-semibold text-white mb-8">
            Thank you for your interest!
          </div>
          
          <div className="text-xl md:text-2xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent p-4 mb-4 border border-red-800 rounded-lg inline-block">
            <span className="font-bold">This event has concluded</span>
          </div>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            We appreciate all participants, sponsors, and attendees who made this event a success.
            <br />Stay tuned for future events!
          </p>
        </div>
      </div>
    </>
  );
}
