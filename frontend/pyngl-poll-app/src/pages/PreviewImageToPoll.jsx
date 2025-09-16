
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
// Note: This component uses a web service for QR codes to avoid external library issues.
export default function PreviewImagePoll() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    // State to hold the created poll data from the backend
    const [createdPoll, setCreatedPoll] = useState(null);

    // This function now creates the poll and then reveals the sharing options
const handleCreateAndSharePoll = async () => {
    setIsLoading(true);
    try {
        const pollData = {
            question: state.question,
            options: state.options,
            type: 'image',
            imageUrl: state.imageUrl,
            duration: state.duration,
        };

        // apiClient will automatically throw an error for non-2xx responses
        const response = await apiClient.post("/api/polls/create-poll", pollData);
        
        // With Axios, the data is directly in `response.data`
        const newPoll = response.data;
        setCreatedPoll(newPoll);

    } catch (error) {
        console.error(error);
        // The global interceptor handles 401s, but we can alert for other errors
        alert(error.response?.data?.error || "Error saving poll. Please try again.");
    } finally {
        setIsLoading(false);
    }
};

    if (!state) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>No poll data found. To create one, please go back.</p>
            </div>
        );
    }

    const { question, options, imageUrl } = state;
    // Construct the full, shareable URL for the poll
    const pollUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll._id}` : "";

    // The header has been removed as it is now handled by AppLayout.jsx
    return (
        <div className="p-4 font-sans">
            <div className="rounded-xl border border-gray-200 p-4">
                <h2 className="font-medium mb-4">{question}</h2>
                
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Poll visual"
                        className="rounded-xl mb-4 w-full h-48 object-cover"
                    />
                )}

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

            {/* --- CONDITIONAL RENDERING --- */}
            {!createdPoll ? (
                <button
                    onClick={handleCreateAndSharePoll}
                    disabled={isLoading}
                    className="mt-6 w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 disabled:opacity-50 flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                            Creating...
                        </>
                    ) : ( 
                        "Create & Share Poll"
                    )}
                </button>
            ) : (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Poll is Live!</h3>
                    <div className="p-3 bg-white inline-block rounded-lg border">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pollUrl)}`} alt="Poll QR Code" />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm font-medium text-gray-600">Shareable Link</label>
                        <input 
                            type="text" 
                            readOnly 
                            value={pollUrl} 
                            className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-center text-sm text-gray-700"
                            onClick={(e) => e.target.select()}
                        />
                    </div>
                    <button
                        onClick={() => navigate('/dashboard', { state: { newPoll: createdPoll } })}
                        className="mt-4 w-full py-2 rounded-full text-white font-medium bg-pink-500"
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}
        </div>
    );
}

