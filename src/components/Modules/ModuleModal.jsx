import { React, useState } from "react";
import { FaDollarSign, FaTrophy, FaUsers, FaInfoCircle } from "react-icons/fa"; // Import additional icons
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for exit animation

const ModuleModal = ({ 
    isOpen, 
    onClose, 
    title, 
    description, 
    prize, 
    entryFee,
    category,
    minMaxTeamMembers 
}) => {
    const [isClosing, setIsClosing] = useState(false); // Local state to control exit animation

    // Handle closing with animation
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose(); // Close the modal after the animation completes
        }, 300); // Match this duration with the animation duration
    };

    if (!isOpen && !isClosing) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
                    initial={{ opacity: 0 }}  // Initial state before animation
                    animate={{ opacity: 1 }}   // Final state after animation
                    exit={{ opacity: 0 }}     // State when the modal is exiting
                    transition={{ duration: 0.3 }}  // Duration of the animation
                >
                    <motion.div
                        className="bg-[#1e1e1e] border border-[#333] rounded-lg w-[600px] h-[600px] p-6 shadow-lg overflow-auto"
                        initial={{ scale: 0.8 }}   // Initial scale (small size)
                        animate={{ scale: 1 }}     // Final scale (normal size)
                        exit={{ scale: 0.8 }}      // Scale down during exit animation
                        transition={{ duration: 0.3 }}  // Duration of the animation
                    >
                        <div className="bg-[#9b2121] rounded-lg p-4 text-center">
                            <img
                                alt="Trophy icon"
                                src="/logo.png"
                                className="w-16 h-16 mx-auto"
                            />
                        </div>
                        <div className="text-2xl font-bold text-white mt-4 text-center">{title}</div>
                        <div className="flex gap-2 justify-center mt-4">
                            <div className="bg-[#d32f2f] rounded-full py-1 px-4 text-xs text-white">{category}</div>
                        </div>
                        <div className="flex justify-between mt-4 gap-2">
                            <div className="bg-[#333] p-4 rounded-lg w-1/2">
                                <div className="text-[#d32f2f] text-xs flex items-center">
                                    <FaDollarSign className="mr-1" /> {/* Entry Fee Icon */}
                                    Entry Fee
                                </div>
                                <div className="text-white font-medium text-lg">Rs.{entryFee}</div> {/* Correct usage */}
                            </div>
                            <div className="bg-[#333] p-4 rounded-lg w-1/2">
                                <div className="text-[#d32f2f] text-xs flex items-center">
                                    <FaTrophy className="mr-1" /> {/* Prize Pool Icon */}
                                    Prize Pool
                                </div>
                                <div className="text-white font-medium text-lg">Rs.{prize}</div> {/* Correct usage */}
                            </div>
                        </div>
                        <div className="bg-[#333] rounded-lg p-4 mt-4">
                            <span className="text-[#d32f2f] text-xs flex items-center mb-2">
                                <FaUsers className="mr-1" /> {/* Team Requirements Icon */}
                                Team Requirements
                            </span>
                            <div className="text-white text-sm">Max Team Size: {minMaxTeamMembers}</div> {/* Correct usage */}
                        </div>
                        <div className="mt-4">
                            <div className="text-[#d32f2f] text-sm font-medium mb-2 flex items-center">
                                <FaInfoCircle className="mr-1" /> {/* Description Icon */}
                                Description
                            </div>
                            <div className="text-white text-xs leading-6 overflow-y-auto max-h-[200px]">
                                {description} {/* Correct usage */}
                            </div>
                        </div>
                
                        <div className="flex justify-between mt-4">
                            <Button 
                                className="border border-[#d32f2f] text-[#d32f2f] py-2 px-4 rounded-md text-sm"
                                onClick={handleClose}  // Close the modal with animation
                            >
                                Close
                            </Button>
                            <Button className="bg-[#d32f2f] text-white py-2 px-4 rounded-md text-sm">
                                Register Now
                            </Button>
                        </div>
                        <Button 
                            onClick={handleClose} 
                            className="absolute top-4 right-4 text-white text-2xl"
                        >
                            ×
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModuleModal;
