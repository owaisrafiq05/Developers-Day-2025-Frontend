"use client"
import React, { useState } from "react";
import ModuleCard from "../../components/Modules/ModuleCard.jsx"; // import the ModuleCard component
import ModuleModal from "../../components/Modules/ModuleModal"; // import the modal component

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalDescription, setModalDescription] = useState(""); // State for the modal description

  // Function to handle opening the modal and setting description
  const openModal = (description) => {
    setModalDescription(description); // Set the description for the modal
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      {/* Render the ModuleCard component */}
      <ModuleCard
        title="Competition Title"
        description="This is a description of the competition."
        prize="5000"
        minMaxTeamMembers="1-5"
        openModal={openModal} // Pass openModal function to the ModuleCard
      />
      
      {/* Render the modal only when it's open */}
      <ModuleModal
        isOpen={isModalOpen} // Modal open state
        onClose={closeModal} // Function to close the modal
        description={modalDescription} // Pass the description to the modal
      />
    </div>
  );
};

export default ParentComponent;
