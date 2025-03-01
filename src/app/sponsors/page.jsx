"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SponsorShowcase() {
  const sponsors = {
    platinum: Array.from({ length: 4 }, (_, i) => ({
      id: `platinum-${i + 1}`,
      name: `Platinum Sponsor ${i + 1}`,
      logo: "/sample-sponsor.png",
    })),
    gold: Array.from({ length: 8 }, (_, i) => ({
      id: `gold-${i + 1}`,
      name: `Gold Sponsor ${i + 1}`,
      logo: "/sample-sponsor.png",
    })),
    silver: Array.from({ length: 16 }, (_, i) => ({
      id: `silver-${i + 1}`,
      name: `Silver Sponsor ${i + 1}`,
      logo: "/sample-sponsor.png",
    })),
    bronze: Array.from({ length: 22 }, (_, i) => ({
      id: `bronze-${i + 1}`,
      name: `Bronze Sponsor ${i + 1}`,
      logo: "/sample-sponsor.png",
    })),
  };

  return (
    <main className="mx-auto relative">
      <header className="px-4 mb-16 w-full text-center pt-[140px] pb-[80px] bg-gradient-to-br from-[#1c1c1c] to-[#310101] rounded-b-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-5xl font-bold tracking-tight relative"
        >
          Our <span className="text-red-600">Sponsors</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-lg text-gray-400 relative"
        >
          We extend our deepest gratitude to all our sponsors who make our work
          possible. Their support drives innovation and enables us to create
          meaningful impact.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-center relative"
        >
          <button className="group flex items-center gap-2 rounded-full border border-red-600 px-6 py-3 text-red-600 transition-all hover:bg-red-600 hover:text-white">
            Become a Sponsor
            {/* <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" /> */}
          </button>
        </motion.div>
      </header>

      <div className="container m-auto">
        {Object.keys(sponsors).map((tier) => (
          <section key={tier} className="mb-20 z-30 relative px-4">
            <div className="mb-8 flex items-center">
              <div className="h-px flex-1 bg-gray-800"></div>
              <h2 className="mx-4 text-2xl font-bold text-red-600">
                {tier.toUpperCase()} SPONSORS
              </h2>
              <div className="h-px flex-1 bg-gray-800"></div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {sponsors[tier].map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex flex-col items-center justify-center rounded-xl bg-gray-900 p-8 transition-transform hover:scale-105"
                >
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={sponsor.name}
                    width={240}
                    height={120}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-24 text-center px-4">
        <p className="text-gray-500">
          Interested in becoming a sponsor?{" "}
          <a href="#" className="text-red-600 hover:underline">
            Contact us
          </a>{" "}
          for more information.
        </p>
      </footer>
    </main>
  );
}
