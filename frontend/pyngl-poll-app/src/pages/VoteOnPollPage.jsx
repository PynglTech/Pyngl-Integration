import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuthStore from "../store/useAuthStore";
import apiClient from '../api/axiosConfig';

// Poll results componenet 
const PollResults = ({ poll }) => {
    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

    // This function creates the specific gradient you requested.
    const createGradient = () => {
        const colors = ["#20DAE8", "#37AEFC", "#7C80EE", "#BF58DC", "#B55EDF", "#E244D3"];
        const percentages = [0, 37, 58, 79, 88, 98];
        const stops = colors.map((color, index) => `${color} ${percentages[index]}%`);
        return `linear-gradient(to right, ${stops.join(', ')})`;
    };

    return (
        <div className="space-y-3">
            {poll.options.map((option) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                
                // --- THIS IS THE FIX ---
                // We'll set the text color based on the percentage
                const textColor = percentage > 20 ? 'text-white' : 'text-gray-700';

                return (
                    // The container has the gray background
                    <div key={option._id} className="w-full bg-gray-100 rounded-full overflow-hidden relative h-12 flex items-center">
                        {/* The colored bar animates behind the text */}
                        <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${percentage}%`, background: createGradient() }}
                        />
                        {/* The text is always visible in a layer on top */}
                        <div className="absolute inset-0 px-4 flex justify-between items-center">
                            <span className={`font-semibold ${textColor}`}>{option.text}</span>
                            <span className={`font-bold ${textColor}`}>{percentage}%</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
// This is the main component for the voting page.
const VoteOnPollPage = () => {
    const { pollId } = useParams();
    const [poll, setPoll] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const { userInfo } = useAuthStore();

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await apiClient.get(`/api/polls/${pollId}`);
                const data = response.data;
                setPoll(data);

                if (userInfo?._id && data.votedBy.includes(userInfo._id)) {
                    setHasVoted(true);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Poll not found.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPoll();
    // FIX 1: Depend on the user's ID (a stable value), not the entire userInfo object.
    }, [pollId, hasVoted, userInfo?._id]);


 // Function to handle the vote submission.
       const handleVote = async () => {
        if (!selectedOption) return;
        try {
            // 3. Use apiClient to submit the vote
            await apiClient.post(`/api/polls/${pollId}/vote`, { optionId: selectedOption });
            setHasVoted(true);
        } catch (err) {
            // The global interceptor handles 401s, but we can show other errors
            alert(err.response?.data?.error || "Failed to cast vote.");
        }
    };

   if (isLoading) return <div className="p-6 text-center">Loading poll...</div>;
    
    if (error) return (
        <div className="p-6 text-center text-red-500">
            <p>{error}</p>
            <Link to="/dashboard" className="text-blue-500 hover:underline mt-4 inline-block">Back to Dashboard</Link>
        </div>
    );

    // FIX 2: Add a check to ensure 'poll' is not null before trying to render its details.
    if (!poll) {
        return <div className="p-6 text-center">Poll could not be loaded.</div>;
    }
 return (
  <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
        {/* FIX: Embedded the CSS styles directly into the component */}
        <style>{`
            @keyframes growAndFadeIn {
              from {
                width: 0%;
                opacity: 0.4;
              }
              to {
                opacity: 1;
              }
            }

            .poll-result-container {
              width: 100%;
              border-radius: 9999px;
              text-align: left;
              font-weight: 500;
              overflow: hidden;
              background-color: #e5e7eb;
            }

            .poll-result-bar {
              padding: 0.5rem 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: white;
              animation: growAndFadeIn 0.8s ease-out forwards;
            }
        `}</style>

   <div className="rounded-xl border border-gray-200 p-4">
    {poll.imageUrl && (
     <img 
      src={poll.imageUrl} 
      alt="Poll visual" 
      className="rounded-xl mb-4 w-full h-48 object-cover"
     />
    )}

    <h2 className="font-bold text-lg mb-4">{poll.question}</h2>
  {!hasVoted ? (
    <div className="space-y-2">
        {poll.options.map((option) => (
            <button
                key={option._id}
                onClick={() => setSelectedOption(option._id)}
                
                // --- THIS IS THE UPDATED LINE ---
                className={`w-full border rounded-full px-4 py-4 text-center transition-colors ${
                    selectedOption === option._id 
                        ? 'bg-pink-600 text-white border-pink-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
                {option.text}
            </button>
        ))}
    </div>
) : (
    <PollResults poll={poll} />
)}

  </div>

   {!hasVoted ? (
    <button
     onClick={handleVote}
     disabled={!selectedOption}
     className="mt-6 w-full py-3 rounded-full text-white font-medium bg-pink-600 disabled:opacity-50"
    >
     Cast Your Vote
  </button>
   ) : (
    <Link to="/dashboard" className="mt-6 block w-full py-3 rounded-full text-center text-white font-medium bg-gray-700">
     Back to Dashboard
    </Link>
   )}
  </div>
 );
};

export default VoteOnPollPage;

