"use client";
import Image from "next/image";
import Squares from "@/components/Squares/Squares";
import { motion } from "framer-motion";

export default function SponsorShowcase() {
  const sponsors = {
    title: {
      id: "title-sponsor",
      name: "Title Sponsor",
      logo: "/sample-sponsor.png",
    },
    cotitle: Array.from({ length: 4 }, (_, i) => ({
      id: `Co-title-${i + 1}`,
      name: `Co Title Sponsor ${i + 1}`,
    })),
    platinum: Array.from({ length: 4 }, (_, i) => ({
      id: `Platinum-${i + 1}`,
      name: `Platinum Sponsor ${i + 1}`,
    })),
    diamond: Array.from({ length: 4 }, (_, i) => ({
      id: `Diamond-${i + 1}`,
      name: `Diamond Sponsor ${i + 1}`,
    })),
    gold: Array.from({ length: 4 }, (_, i) => ({
      id: `gold-${i + 1}`,
      name: `Gold Sponsor ${i + 1}`,
    })),
    silver: Array.from({ length: 4 }, (_, i) => ({
      id: `silver-${i + 1}`,
      name: `Silver Sponsor ${i + 1}`,
    })),
  };

  const recruitmentPartners = Array.from({ length: 4 }, (_, i) => ({
    id: `Recruitment Partners-${i + 1}`,
    name: `Recruitment Partners Sponsor ${i + 1}`,
  }));

  

  return (
    <main className="mx-auto" style={{
      backgroundImage: 'linear-gradient(to bottom right, black, #131313)',
    }}>
      
      <header className="flex relative flex-col z-10 px-4 mb-16 w-full text-center pt-[140px] pb-[80px] bg-gradient-to-br from-[#1c1c1c] to-[#310101] rounded-b-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-5xl font-bold tracking-tight"
        >
          Our <span className="text-red-600">Sponsors</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-lg text-gray-400"
        >
          We extend our deepest gratitude to all our sponsors who make our work
          possible. Their support drives innovation and enables us to create
          meaningful impact.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc8-_ooB3Yulbnc8qz_nXDuSJ0h9fMd19b5tziEl8UG6Nf_Ow/viewform" target="_blank" rel="noopener noreferrer">
            <button className="group flex items-center gap-2 rounded-full border border-red-600 px-6 py-3 text-red-600 transition-all hover:bg-red-600 hover:text-white">
              Become a Sponsor
            </button>
          </a>
        </motion.div>
      </header>

      <div className="container m-auto">
      <Squares
                squareSize={40}
                borderColor="#000"
              />
        {/* Title Sponsor Section */}
        <section className="mb-20 z-30 relative px-4">
          <div className="mb-8 flex items-center">
            <div className="h-px flex-1 bg-gray-800"></div>
            <h2 className="mx-4 text-2xl font-bold text-red-600">
              TITLE SPONSOR
            </h2>
            <div className="h-px flex-1 bg-gray-800"></div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-t-md rounded-bl-md rounded-br-3xl flex flex-col items-center justify-center bg-[#74111188] p-4 md:p-8 transition-transform hover:scale-105">
              {sponsors.title.logo ? (
                <Image
                  src={sponsors.title.logo}
                  alt={sponsors.title.name}
                  width={240}
                  height={120}
                  className="h-auto w-full object-contain"
                />
              ) : (
                <p className="text-white">To Be Announced</p>
              )}
            </div>
          </div>
        </section>

        {Object.keys(sponsors).filter(tier => tier !== 'title').map((tier) => (
          <section key={tier} className="mb-20 z-30 relative px-4">
            <div className="mb-8 flex items-center">
              <div className="h-px flex-1 bg-gray-800"></div>
              <h2 className="mx-4 text-2xl font-bold text-red-600">
                {/* {tier.toUpperCase()}  */}
                {tier === "recruitmentpartners" && " RECRUITMENT PARTNERS" || tier === "cotitle" && "CO TITLE" || tier.toUpperCase() } SPONSORS
              </h2>
              <div className="h-px flex-1 bg-gray-800"></div>
            </div>
            <div className="place-items-center align-content-center grid grid-cols-2 gap-2 sm:gap-4 items-center justify-center content-center sm:grid-cols-4 lg:grid-cols-4">
              {sponsors[tier].map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="rounded-t-md rounded-bl-md rounded-br-3xl flex flex-col items-center justify-center bg-[#74111188] p-4 md:p-8 transition-transform hover:scale-105"
                >
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={240}
                      height={120}
                      className="h-auto w-full object-contain"
                    />
                  ) : (
                    <p className="text-white">To Be Announced</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
        <section key="recruitmentpartners" className="mb-20 z-30 relative px-4">
          <div className="mb-8 flex items-center">
            <div className="h-px flex-1 bg-gray-800"></div>
            <h2 className="mx-4 text-2xl font-bold text-red-600">
              RECRUITMENT PARTNERS
            </h2>
            <div className="h-px flex-1 bg-gray-800"></div>
          </div>
          <div className="place-items-center align-content-center grid grid-cols-2 gap-2 sm:gap-4 items-center justify-center content-center sm:grid-cols-4 lg:grid-cols-4">
            {recruitmentPartners.map((partner) => (
              <div
                key={partner.id}
                className="rounded-t-md rounded-bl-md rounded-br-3xl flex flex-col items-center justify-center bg-[#74111188] p-4 md:p-8 transition-transform hover:scale-105"
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={240}
                    height={120}
                    className="h-auto w-full object-contain"
                  />
                ) : (
                  <p className="text-white">To Be Announced</p>
                )}
              </div>
            ))}
          </div>
        </section>


      </div>

      <footer className="mt-2 text-center px-4 pb-8">
        <p className="text-gray-500">
          Interested in becoming a sponsor?{" "}
          <a href="/contact-us" className="text-red-600 hover:underline">
            Contact us
          </a>{" "}
          for more information.
        </p>
      </footer>
    </main>
  );
}
