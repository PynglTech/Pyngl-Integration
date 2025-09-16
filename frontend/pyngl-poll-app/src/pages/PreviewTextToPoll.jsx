import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; 
import apiClient from "../api/axiosConfig"; 
export default function PreviewTextPoll() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [createdPoll, setCreatedPoll] = useState(null);

  const handleCreateAndSharePoll = async () => {
    setIsLoading(true);
    try {
        const pollData = {
            question: state.question,
            options: state.options,
            type: 'text',
            duration: state.duration,
        };
        
        // Make the API request FIRST
        const response = await apiClient.post("/api/polls/create-poll", pollData);
        
        // THEN, use the response
        const newPoll = response.data; 
        setCreatedPoll(newPoll);

    } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || "Error saving poll. Please try again.");
    } finally {
        setIsLoading(false);
    }
};
    // This function navigates and passes the new poll data
    // in the location state so the homepage can display it immediately.
    const handleGoToDashboard = () => {
        navigate('/dashboard', {
            state: {
                newPoll: createdPoll
            }
        });
    };
  if (!state) {
        return <div className="p-6 text-center">No poll data found. Please go back.</div>
    }

    const { question, options } = state;
    const pollUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll._id}` : "";
    const qrCodeUrl = createdPoll ? `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pollUrl)}` : "";

    // The local header has been removed, as it is now handled by AppLayout.jsx
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

            {!createdPoll ? (
                <button
                    onClick={handleCreateAndSharePoll}
                    disabled={isLoading}
                    className="mt-6 w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70"
                >
                    {isLoading ? "Creating Poll..." : "Create & Share Poll"}
                </button>
            ) : (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Poll is Live!</h3>
                    <div className="p-3 bg-white inline-block rounded-lg border">
                        <img src={qrCodeUrl} alt="Poll QR Code" width="140" height="140" />
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
                        onClick={handleGoToDashboard} // Use the corrected function here
                        className="mt-4 w-full py-2 rounded-full text-white font-medium bg-pink-500"
                    >
                        Go to Dashboard
                    </button>
                </div>
            )}
        </div>
    );
}