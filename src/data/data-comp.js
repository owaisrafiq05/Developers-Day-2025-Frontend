const fetchCompetitions = async () => {
  try {
    const response = await fetch("https://dev-day-backend.vercel.app/Competition/allCompetitions");
    const data = await response.json();

    if (data.success) {
      // Map the API response to the desired format
      const competitions = data.competitions.map(comp => {
        const minParticipants = comp.Min_Participants;
        const maxParticipants = comp.Max_Participants;
        
        return {
          title: comp.Competition_Name,
          description: comp.Description,
          prize: comp.Prize,
          entryFee: comp.Entry_Fee.toString(), // Convert to string to match previous format
          category: comp.Competition_Type,
          minParticipants, // Store min participants
          maxParticipants, // Store max participants
        };
      });

      return competitions;
    } else {
      throw new Error("Failed to fetch competitions");
    }
  } catch (error) {
    console.error("Error fetching competitions:", error);
    return []; // Return an empty array in case of error
  }
};

// Export the competitions
export default fetchCompetitions;