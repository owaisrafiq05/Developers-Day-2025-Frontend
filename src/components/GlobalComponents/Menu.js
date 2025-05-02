"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Menu() {
  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/5 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-18 md:h-20">
            <div className="flex items-center my-2">
              <Image src="/logo.png" alt="Logo" width={90} height={90} className="rounded-full" />
              <span className="text-3xl font-bold text-white hidden sm:block">Developers Day 2025</span>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
