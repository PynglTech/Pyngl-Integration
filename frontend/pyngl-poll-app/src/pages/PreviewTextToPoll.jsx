import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig"; 
import ShareSheet from "../components/common/ShareSheet"; // 1. Import the new ShareSheet component

export default function PreviewTextPoll() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [createdPoll, setCreatedPoll] = useState(null);
    const [isShareSheetOpen, setIsShareSheetOpen] = useState(false); // 2. Add state for the sheet

    const handleCreateAndSharePoll = async () => {
        // If the poll is already created, just open the share sheet
        if (createdPoll) {
            setIsShareSheetOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            const pollData = {
                question: state.question,
                options: state.options,
                type: 'text',
                duration: state.duration,
            };
            
            const response = await apiClient.post("/api/polls/create-poll", pollData);
            const newPoll = response.data; 
            setCreatedPoll(newPoll);
            setIsShareSheetOpen(true); // 3. Open the share sheet on success

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || "Error saving poll. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!state) {
        return <div className="p-6 text-center">No poll data found. Please go back.</div>
    }

    const { question, options } = state;

    return (
        <div className="p-4 font-sans">
            <div className="rounded-xl border border-gray-200 p-4">
                <h2 className="font-medium mb-4">{question}</h2>
                <div className="space-y-3">
                    {options.map((opt, i) => (
                        <div key={i} className="w-full border rounded-full px-4 py-2 text-center text-gray-700">
                            {opt}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-3 text-xs text-gray-400">
                    <span className="font-medium text-pink-500"><img src='./pynglLogoImage.png' alt="Pyngl Logo" height={15} width={41}></img></span>
                </div>
            </div>

            {/* 4. The button now handles both creating and re-opening the share sheet */}
            <button
                onClick={handleCreateAndSharePoll}
                disabled={isLoading}
                className="mt-6 w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70"
            >
                {isLoading ? "Creating Poll..." : (createdPoll ? "Share Poll" : "Create & Share Poll")}
            </button>

            {/* 5. Conditionally render the ShareSheet */}
            {isShareSheetOpen && createdPoll && (
                <ShareSheet poll={createdPoll} onClose={() => setIsShareSheetOpen(false)} />
            )}
        </div>
    );
}