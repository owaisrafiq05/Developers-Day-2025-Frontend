"use client"
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Squares from "@/components/Squares/Squares";
import ModuleCard from "@/components/Modules/ModuleCard";
import ModuleHero from "@/components/Modules/ModuleHero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
// Place your dummy data **right before** the Team component
const dummyData = [
    {
      title: "Hackathon 2024",
      description:
        "A 36-hour coding challenge where developers solve real-world problems using innovative tech solutions. Compete solo or in teams!",
      prize: "50,000",
      category: "Tech Competitions",
    },
    {
      title: "AI Challenge",
      description:
        "Showcase your AI/ML expertise by building intelligent solutions for healthcare, finance, and automation. Open to students and professionals.",
      prize: "75,000",
      category: "Tech Competitions",
    },
    {
      title: "Esports Championship",
      description:
        "Battle it out in popular online multiplayer games. Compete against top gamers and win exciting cash prizes and gaming gear!",
      prize: "1,00,000",
      category: "Gaming",
    },
    {
      title: "Esports Championship",
      description:
        "Battle it out in popular online multiplayer games. Compete against top gamers and win exciting cash prizes and gaming gear!",
      prize: "1,00,000",
      category: "Gaming",
    },
    {
      title: "Esports Championship",
      description:
        "Battle it out in popular online multiplayer games. Compete against top gamers and win exciting cash prizes and gaming gear!",
      prize: "1,00,000",
      category: "Gaming",
    },
    {
      title: "Startup Pitch Fest",
      description:
        "Entrepreneurs pitch their groundbreaking startup ideas to a panel of investors and industry leaders. The best pitch wins funding & mentorship.",
      prize: "1,50,000",
      category: "Business & Startups",
    },
    {
      title: "Startup Pitch Fest",
      description:
        "Entrepreneurs pitch their groundbreaking startup ideas to a panel of investors and industry leaders. The best pitch wins funding & mentorship.",
      prize: "1,50,000",
      category: "Business & Startups",
    },
    {
      title: "Startup Pitch Fest",
      description:
        "Entrepreneurs pitch their groundbreaking startup ideas to a panel of investors and industry leaders. The best pitch wins funding & mentorship.",
      prize: "1,50,000",
      category: "Business & Startups",
    },
    {
      title: "Robotics Showdown",
      description:
        "Build and program autonomous robots to complete complex challenges. Compete in different categories like combat, line-following, and AI bots.",
      prize: "2,00,000",
      category: "Tech Competitions",
    },
    {
      title: "Cybersecurity CTF",
      description:
        "Test your ethical hacking skills in a Capture The Flag (CTF) event. Solve security challenges, exploit vulnerabilities, and defend networks.",
      prize: "1,25,000",
      category: "Cybersecurity",
    },
    {
      title: "Cybersecurity CTF",
      description:
        "Test your ethical hacking skills in a Capture The Flag (CTF) event. Solve security challenges, exploit vulnerabilities, and defend networks.",
      prize: "1,25,000",
      category: "Cybersecurity",
    },
    {
      title: "Cybersecurity CTF",
      description:
        "Test your ethical hacking skills in a Capture The Flag (CTF) event. Solve security challenges, exploit vulnerabilities, and defend networks.",
      prize: "1,25,000",
      category: "Cybersecurity",
    },
  ];
  

export default function Module() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  // Correctly define isSearchInView hook
  const isSearchInView = useInView(searchRef, {
    triggerOnce: true,
    threshold: 0.8,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".team-heading", {
        scrollTrigger: {
          trigger: ".team-heading",
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
        scale: 2,
        opacity: 0,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

// Filtered modules based on search query
const filteredData = dummyData.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get unique categories
  const categories = [...new Set(dummyData.map((module) => module.category))];
  
  // Filtered categories based on search query
  const filteredCategories = [
    ...new Set(
      filteredData.map((module) => module.category)
    ),
  ];
  
  // Ensure that when the search query is empty, all categories are displayed
  const categoriesToShow = searchQuery ? filteredCategories : categories;
  
  return (
    <div>
      <ModuleHero />
      <section ref={sectionRef} className="relative overflow-hidden bg-white">
        <Squares />
        <div className="container mx-auto px-3 md:px-16 py-16">
          <div className="text-center mb-8">
            <h1 className="team-heading text-4xl md:text-5xl font-bold">
              Our Modules
            </h1>
          </div>
  
          {/* Search Bar */}
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isSearchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full flex justify-center mb-20 px-4"
          >
            <div className="relative w-full lg:w-1/2 border border-red-500 rounded-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to close dropdown
                className="w-full min-h-12 pl-12 pr-20 text-white bg-black border border-red-500 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
              />
              <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-red-600" />
              <button
                onClick={() => console.log("Search:", searchQuery)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-700 hover:bg-red-800 text-white font-medium px-6 py-2 rounded-full transition duration-300"
              >
                Search
              </button>
  
              {/* Search Suggestions Dropdown */}
              {showDropdown && (filteredCategories.length > 0 || filteredData.length > 0) && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-0 right-0 mt-2 bg-black border border-gray-300 rounded-lg shadow-lg z-50"
                >
                  {filteredCategories.map((category, index) => (
                    <li
                      key={`cat-${index}`}
                      className="px-4 py-2 font-bold text-white hover:bg-red-800 cursor-pointer"
                      onMouseDown={() => setSearchQuery(category)}
                    >
                      {category}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
  
          {/* Sections for Each Category */}
          {categoriesToShow.map((category, categoryIndex) => {
            const modulesInCategory = filteredData.filter(
              (module) => module.category === category
            );
  
            return (
              <div key={categoryIndex} className="mb-16" id={category}>
                <h2 className="team-heading text-3xl font-bold text-white mb-6 text-center">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {modulesInCategory.length > 0 ? (
                    modulesInCategory.map((module, index) => (
                      <div key={index} ref={(el) => (cardsRef.current[index] = el)}>
                        <ModuleCard
                          title={module.title}
                          description={module.description}
                          prize={module.prize}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full">
                      No results found for "{searchQuery}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}