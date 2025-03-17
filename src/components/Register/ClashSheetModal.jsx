"use client"

import {useState } from "react"
import Image from 'next/image';

export default function ClashSheetModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const imageUrl = "https://res.cloudinary.com/dgwkprjru/image/upload/v1742171285/d1sesnpuqt4kacuwabve.png";

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Desktop View - Full Screen Image */}
      <div className="hidden md:block w-full">
      <h2 className="text-2xl font-semibold text-white py-4 text-center">Competition time slots</h2>
        <Image
          src={imageUrl}
          alt="Clash Sheet"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Mobile View - Clickable Image with Modal */}
      <div className="md:hidden w-full mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full relative"
        >
            <h2 className="text-2xl font-semibold text-white py-4 text-center">Competition time slots</h2>
          <Image
            src={imageUrl}
            alt="Clash Sheet"
            width={800}
            height={600}
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
            <span className="text-white text-sm font-medium px-4 py-2 bg-red-600 rounded-full">
              Tap to View Full Screen
            </span>
          </div>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 pt-20"
            onClick={handleBackdropClick}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Enhanced Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-20 right-4 text-white p-3 z-[9999]
                  bg-red-600 rounded-full hover:bg-red-700 
                  transition-all duration-300 ease-in-out
                  transform hover:scale-110
                  shadow-lg hover:shadow-red-500/50"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div onClick={e => e.stopPropagation()}>
                <Image
                  src={imageUrl}
                  alt="Clash Sheet"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
