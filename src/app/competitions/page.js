"use client";
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Squares from "@/components/Squares/Squares";
import ModuleCard from "@/components/Competitions/CompetitionsCard";
import ModuleHero from "@/components/Competitions/CompetitionsHero";
import ModuleModal from "@/components/Competitions/CompetitionsModal";
import fetchCompetitions from "@/data/data-comp"; // Import the fetch function

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    entryFee: "",
    minParticipants: "",
    maxParticipants: "",
    category: ""
  });
  const [competitions, setCompetitions] = useState([]); // State to hold fetched competitions
  const [isCompetitionsFetched, setIsCompetitionsFetched] = useState(false);

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
    const loadCompetitions = async () => {
      const competitionsData = await fetchCompetitions();
      setCompetitions(competitionsData); // Set the fetched competitions
      setIsCompetitionsFetched(true); // Set to true after fetching
    };

    loadCompetitions();
  }, []);

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

  // Filtered competitions based on search query
  const filteredData = competitions.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique categories
  const categories = [...new Set(competitions.map((module) => module.category))];

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
          key={isCompetitionsFetched ? 'fetched' : 'loading'} 
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
            const competitionsInCategory = filteredData.filter(
              (module) => module.category === category
            );

            return (
              <div key={categoryIndex} className="mb-16" id={category}>
                <h2 className="team-heading text-3xl font-bold text-white mb-6 text-center">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {competitionsInCategory.length > 0 ? (
                    competitionsInCategory.map((module, index) => (
                      <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                      >
                        <ModuleCard
                          key={index}
                          title={module.title}
                          description={module.description}
                          prize={module.prize}
                          entryFee={module.entryFee}
                          minParticipants={module.minParticipants}
                          maxParticipants={module.maxParticipants}
                          category={module.category}
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
