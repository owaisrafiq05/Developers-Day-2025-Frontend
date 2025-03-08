"use client"
import { useEffect, useRef, useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Squares from "@/components/Squares/Squares"
import ModuleCard from "@/components/Competitions/CompetitionsCard"
import ModuleHero from "@/components/Competitions/CompetitionsHero"
import ModuleModal from "@/components/Competitions/CompetitionsModal"
import fetchCompetitions from "@/data/data-comp" // Import the fetch function

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Module() {
  const sectionRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    prize: "",
    entryFee: "",
    minParticipants: "",
    maxParticipants: "",
    category: "",
    rulebook: "",
  })
  const [competitions, setCompetitions] = useState({}) // State to hold fetched competitions
  const [isLoading, setIsLoading] = useState(true)

  // Update openModal function
  const openModal = (moduleData) => {
    setModalData(moduleData)
    setIsModalOpen(true)
  }

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false) // Close the modal
  }

  useEffect(() => {
    const loadCompetitions = async () => {
      setIsLoading(true)
      try {
        const competitionsData = await fetchCompetitions()
        setCompetitions(competitionsData) // Set the fetched competitions
      } catch (error) {
        console.error("Error loading competitions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCompetitions()
  }, [])

  // Correctly define isSearchInView hook
  const isSearchInView = useInView(inputRef, {
    triggerOnce: true,
    threshold: 0.8,
  })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
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
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Filtered competitions based on search query
  const filteredData = Object.entries(competitions).reduce((acc, [category, comps]) => {
    if (!Array.isArray(comps)) return acc

    const filteredComps = comps.filter((module) => {
      // Check if module is defined and has the required properties
      if (module && module.title && module.category) {
        const titleMatch = module.title.toLowerCase().includes(searchQuery.toLowerCase())
        const categoryMatch = module.category.toLowerCase().includes(searchQuery.toLowerCase())
        const descriptionMatch =
          module.description && module.description.toLowerCase().includes(searchQuery.toLowerCase())
        return titleMatch || categoryMatch || descriptionMatch
      }
      return false // Exclude undefined or improperly structured modules
    })

    if (filteredComps.length > 0) {
      acc[category] = filteredComps
    }
    return acc
  }, {})

  // Custom order for categories
  const categoryOrder = ["CS Competitions", "EE Competitions", "General Competitions", "ESports Competitions"]

  // Sort categories according to the custom order
  const sortedCategories = Object.keys(filteredData).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  })

  return (
    <div>
      <ModuleHero />
      <section ref={sectionRef} className="relative overflow-hidden bg-white">
        <Squares squareSize={40} borderColor="#000" />
        <div className="container mx-auto px-3 md:px-16 py-16">
          {/* Search Bar */}
          <motion.div
            ref={inputRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isSearchInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full flex justify-center mb-20 px-4"
          >
            <div className="relative w-full lg:w-1/2 border border-red-500 rounded-full">
              <input
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
              {showDropdown && sortedCategories.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-0 right-0 mt-2 bg-black border border-gray-300 rounded-lg shadow-lg z-50"
                >
                  {sortedCategories.map((category) => (
                    <li key={category} className="px-4 py-2 font-bold text-white hover:bg-red-800 cursor-pointer">
                      {category}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && sortedCategories.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold">No competitions found</h3>
              <p className="text-gray-600 mt-2">Try adjusting your search query</p>
            </div>
          )}

          {/* Sections for Each Category in Custom Order */}
          {!isLoading &&
            categoryOrder.map((category) => {
              console.log("Category:", category)
              return (
                filteredData[category] && (
                  <div key={category} className="mb-16" id={category}>
                    <h2 className="team-heading text-3xl font-bold text-red-4xl mb-6 text-center">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {filteredData[category].map((module, index) => (
                        <div key={module.id || index} className="flex flex-col">
                          <ModuleCard
                            title={module.title}
                            description={module.description}
                            prize={module.prize}
                            entryFee={module.entryFee}
                            minParticipants={module.minParticipants}
                            maxParticipants={module.maxParticipants}
                            category={module.category}
                            rulebook={module.rulebook}
                            openModal={() => openModal(module)} // Pass the entire module object
                          />
                          {/* Get Rulebook Button */}
                          {module.rulebook && (
                            <a
                              href={module.rulebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-center transition-colors duration-300"
                            >
                              Get Rulebook
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )
            })}

          {/* Modal Component */}
          <ModuleModal
            isOpen={isModalOpen}
            onClose={closeModal}
            {...modalData} // Spread the modalData state
          />
        </div>
      </section>
    </div>
  )
}

