const fetchCompetitions = async () => {
  try {
    const response = await fetch("https://dev-day-backend.vercel.app/Competition/allCompetitions")
    const data = await response.json()

    if (data.success) {
      // Check if data.competitions is an object
      if (typeof data.competitions === "object" && data.competitions !== null) {
        // Map the API response to the desired format
        const competitions = Object.entries(data.competitions).reduce((acc, [category, comps]) => {
          // Ensure comps is an array
          if (Array.isArray(comps)) {
            // Format category name for display
            const formattedCategory = category

            acc[formattedCategory] = comps.map((comp) => {
              return {
                id: comp.id, // Include the id for each competition
                title: comp.Competition_Name,
                description: comp.Description,
                prize: comp.Prize,
                entryFee: comp.Entry_Fee.toString(), // Convert to string to match previous format
                category: comp.Competition_Type,
                minParticipants: comp.Min_Participants, // Store min participants
                maxParticipants: comp.Max_Participants, // Store max participants
                rulebook: comp.Rulebook, // Include rulebook if needed
              }
            })
          }
          return acc
        }, {})

        return competitions
      } else {
        throw new Error("Competitions data is not an object")
      }
    } else {
      throw new Error("Failed to fetch competitions")
    }
  } catch (error) {
    console.error("Error fetching competitions:", error)
    return {} // Return an empty object in case of error to match expected structure
  }
}

// Export the competitions
export default fetchCompetitions

