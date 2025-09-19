import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../api/axiosConfig';
import { createTextPollBanner } from '../utils/imageUtils'; // You will need the banner generator

const LinkedInPublisher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPublishing, setIsPublishing] = useState(false);
    const [poll, setPoll] = useState(location.state?.poll);

    useEffect(() => {
        const initializePage = async () => {
            setIsLoading(true);
            let currentPoll = location.state?.poll;
            
            try {
                if (!currentPoll) {
                    const pollId = sessionStorage.getItem('linkedinSharePollId');
                    if (!pollId) {
                        navigate('/dashboard');
                        return;
                    }
                    const response = await apiClient.get(`/api/polls/${pollId}`);
                    currentPoll = response.data;
                    setPoll(currentPoll);
                }

                const authResponse = await apiClient.get('/api/linkedin/auth/status');
                setIsAuthenticated(authResponse.data.isAuthenticated);
                sessionStorage.removeItem('linkedinSharePollId');

            } catch (error) {
                console.error("Initialization failed:", error);
                navigate('/dashboard');
            } finally {
                setIsLoading(false);
            }
        };
        initializePage();
    }, [navigate, location.state]);

    const handleLogin = () => {
        if (poll) sessionStorage.setItem('linkedinSharePollId', poll._id);
        window.location.href = 'http://localhost:5000/api/linkedin/auth';
    };
    
  const handlePublish = async () => {
    setIsPublishing(true);
    const toastId = toast.loading('Publishing poll to LinkedIn...');

    try {
        // No longer need to create a banner or use FormData
        const pollData = {
            pynglPollId: poll._id,
        };

        // Call the new, dedicated backend endpoint
        await apiClient.post('/api/linkedin/publish-poll', pollData);

        toast.success('Successfully published to LinkedIn!', { id: toastId });
        navigate('/dashboard');

    } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to publish campaign.', { id: toastId });
    } finally {
        setIsPublishing(false);
    }
};
    if (isLoading || !poll) {
        return <div className="p-10 text-center">Loading...</div>;
    }
    
    if (!isAuthenticated) {
        return (
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold">LinkedIn Campaign Publisher</h1>
                <p className="mt-2 mb-8">Connect your LinkedIn account to publish this poll.</p>
                <button onClick={handleLogin} className="p-3 bg-blue-600 text-white rounded-lg font-semibold">
                    Connect with LinkedIn
                </button>
            </div>
        );
    }
    
    // The new "Review and Confirm" UI
    return (
        <div className="p-4 font-sans">
            <h2 className="text-2xl font-bold mb-4 text-center">Review Your Post</h2>
            <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-lg mb-4">{poll.question}</h3>
                <div className="space-y-3">
                    {poll.options.map((opt, i) => (
                        <div key={opt._id || i} className="w-full border rounded-full px-4 py-2 text-center bg-gray-50 text-gray-700">
                            {opt.text}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <button 
                    onClick={handlePublish} 
                    disabled={isPublishing} 
                    className="w-full py-3 rounded-full text-white font-medium bg-blue-600 flex items-center justify-center disabled:bg-blue-400"
                >
                    {isPublishing ? 'Publishing...' : 'Publish to LinkedIn'}
                </button>
            </div>
        </div>
    );
};

export default LinkedInPublisher;