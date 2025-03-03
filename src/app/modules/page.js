"use client";
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Squares from "@/components/Squares/Squares";
import ModuleCard from "@/components/Modules/ModuleCard";
import ModuleHero from "@/components/Modules/ModuleHero";
import ModuleModal from "@/components/Modules/ModuleModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
// Place your dummy data **right before** the Team component
const dummyData = [
  {
    title: "Hackathon",
    description: "A 36-hour coding challenge where developers solve real-world problems using innovative tech solutions.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Competitive Programming",
    description: "Compete in algorithmic challenges and improve your coding skills.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "AI Showdown",
    description: "Showcase your AI skills in this competitive event.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Query Master",
    description: "Test your database querying skills in this exciting competition.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "UI/UX Design",
    description: "Design user-friendly interfaces and experiences in this competition.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Fix Fast",
    description: "Solve bugs and issues in a race against time.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Code Sprint",
    description: "A fast-paced coding competition to solve as many problems as possible.",
    prize: "To Be Decided",
    entryFee: "1050",
    category: "CS Competitions",
    minMaxTeamMembers: "1-2",
  },
  {
    title: "Code Roulette: Expect the unexpected",
    description: "A surprise coding challenge where anything can happen.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Web Nexus",
    description: "Build and deploy web applications in a competitive environment.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Cyber Quiz",
    description: "Test your knowledge in cybersecurity through a quiz competition.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "CS Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Human Ludo",
    description: "A fun and strategic game where players navigate a board to reach the finish line.",
    prize: "To Be Decided",
    entryFee: "1250",
    category: "General Competition",
    minMaxTeamMembers: "2-4",
  },
  {
    title: "Reels",
    description: "A competition to create the best short video reel.",
    prize: "To Be Decided",
    entryFee: "850",
    category: "General Competition",
    minMaxTeamMembers: "1-1",
  },
  {
    title: "Photography",
    description: "Showcase your photography skills in this exciting competition.",
    prize: "To Be Decided",
    entryFee: "850",
    category: "General Competition",
    minMaxTeamMembers: "1-1",
  },
  {
    title: "Chess",
    description: "Compete in a classic game of strategy and skill.",
    prize: "To Be Decided",
    entryFee: "850",
    category: "General Competition",
    minMaxTeamMembers: "1-1",
  },
  {
    title: "Math Olympiad",
    description: "Test your math skills in this challenging competition.",
    prize: "To Be Decided",
    entryFee: "1250",
    category: "General Competition",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Squid Game",
    description: "Participate in a series of games to win the ultimate prize.",
    prize: "To Be Decided",
    entryFee: "550",
    category: "General Competition",
    minMaxTeamMembers: "1-1",
  },
  {
    title: "Detective Dilemma - By TNC",
    description: "Solve mysteries and challenges in this detective-themed competition.",
    prize: "To Be Decided",
    entryFee: "2050",
    category: "General Competition",
    minMaxTeamMembers: "3-5",
  },
  {
    title: "The Escape Lab - By TNC",
    description: "Work together to solve puzzles and escape the room.",
    prize: "To Be Decided",
    entryFee: "2050",
    category: "General Competition",
    minMaxTeamMembers: "3-5",
  },
  {
    title: "Circuit Design",
    description: "Design and create a circuit that meets specific requirements.",
    prize: "To Be Decided",
    entryFee: "1050",
    category: "EE Competitions",
    minMaxTeamMembers: "1-2",
  },
  {
    title: "Soldering",
    description: "Compete in soldering skills to create a functional circuit.",
    prize: "To Be Decided",
    entryFee: "1550",
    category: "EE Competitions",
    minMaxTeamMembers: "1-3",
  },
  {
    title: "Robo Soccer",
    description: "Build and program robots to compete in a soccer match.",
    prize: "To Be Decided",
    entryFee: "2050",
    category: "EE Competitions",
    minMaxTeamMembers: "1-4",
  },
  {
    title: "Robo War",
    description: "Design robots to battle against each other in a competitive arena.",
    prize: "To Be Decided",
    entryFee: "2050",
    category: "EE Competitions",
    minMaxTeamMembers: "1-4",
  },
  {
    title: "Line Following Robot",
    description: "Create a robot that can follow a line autonomously.",
    prize: "To Be Decided",
    entryFee: "2050",
    category: "EE Competitions",
    minMaxTeamMembers: "1-4",
  },
  {
    title: "Robo Sumo",
    description: "Build robots to compete in a sumo wrestling match.",
    prize: "To Be Decided",
    entryFee: "2050",
    category: "EE Competitions",
    minMaxTeamMembers: "1-4",
  },
];

export default function Module() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    prize: "",
    entryFee:"",
    minMaxTeamMembers: "",
    category:""
  });

// Update openModal function
const openModal = (moduleData) => {
    setModalData(moduleData);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    console.log("isModalOpen has changed:", isModalOpen);
  }, [isModalOpen]);

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
    ...new Set(filteredData.map((module) => module.category)),
  ];

  // Ensure that when the search query is empty, all categories are displayed
  const categoriesToShow = searchQuery ? filteredCategories : categories;

  return (
    <div>
      <ModuleHero />
      <section ref={sectionRef} className="relative overflow-hidden bg-white">
      <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#000"
          hoverFillColor="#222"
        />
        <div className="container mx-auto px-3 md:px-16 py-16">

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
              {showDropdown &&
                (filteredCategories.length > 0 || filteredData.length > 0) && (
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
                      <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                      >
                        <ModuleCard
                          key={index}
                          title={module.title}
                          description={module.description}
                          prize={module.prize}
                          minMaxTeamMembers={module.minMaxTeamMembers}
                          openModal={() => openModal(module)} // Pass the entire module object
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
          <ModuleModal
            isOpen={isModalOpen}
            onClose={closeModal}
            {...modalData} // Spread the modalData state
          />
        </div>
      </section>
    </div>
  );
}
