import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Check, Instagram, Linkedin, Twitter, Facebook, MessageSquare, Send, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createTextPollBanner, createImagePollShareable } from '../utils/imageUtils';

// Helper object for share URLs and platform-specific icons
const sharePlatforms = {
    'WhatsApp': {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
        link: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`
    },
    'LinkedIn': {
        icon: <Linkedin className="w-8 h-8 text-blue-700"/>,
        link: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    'X (Twitter)': {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-black"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>,
        link: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    },
    'Facebook': {
        icon: <Facebook className="w-8 h-8 text-blue-600"/>,
        link: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    'Telegram': {
        icon: <Send className="w-8 h-8 text-sky-500"/>,
        link: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    },
    'Instagram': {
        icon: <Instagram className="w-8 h-8 text-pink-500"/>,
        link: () => `https://www.instagram.com/`
    },
};

const SharePlatformButton = ({ platform, onSelect, isSelected, isCompleted }) => {
    const platformData = sharePlatforms[platform];
    return (
        <button onClick={onSelect} className="flex flex-col items-center gap-2 text-center transition-transform transform hover:scale-105">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative transition-all duration-200 ${isSelected ? 'ring-2 ring-pink-500 bg-pink-50' : 'bg-gray-100'} ${isCompleted ? 'opacity-40' : ''}`}>
                {platformData?.icon || <p>{platform.charAt(0)}</p>}
                {(isSelected || isCompleted) && (
                    <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${isCompleted ? 'bg-green-500' : 'bg-pink-500'}`}>
                        <Check size={12} className="text-white" />
                    </div>
                )}
            </div>
            <span className="text-xs text-gray-600 font-medium w-16 truncate">{platform}</span>
        </button>
    );
};

export default function SharePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { poll } = location.state || {};
    
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [shareQueue, setShareQueue] = useState([]);
    const [completedShares, setCompletedShares] = useState([]);
    const [generatedCardFile, setGeneratedCardFile] = useState(null);
    const [generatedCardUrl, setGeneratedCardUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(true);
    const platformToShare = useRef(null);

    // Effect to generate the correct shareable image based on poll type
    useEffect(() => {
        const generateCard = async () => {
            if (!poll) return;
            setIsGenerating(true);
            try {
                let imageFile;
                // --- THIS IS THE UPDATED LOGIC ---
                // It checks the poll type and calls the correct function
                if (poll.type === 'image' && poll.imageUrl) {
                    imageFile = await createImagePollShareable(poll, '/pynglLogoImage.png');
                } else {
                    imageFile = await createTextPollBanner(poll, '/pynglLogoImage.png');
                }
                setGeneratedCardFile(imageFile);
                setGeneratedCardUrl(URL.createObjectURL(imageFile));
            } catch (error) {
                console.error('Failed to generate poll card:', error);
                toast.error('Could not prepare shareable image.');
                navigate(-1);
            } finally {
                setIsGenerating(false);
            }
        };
        generateCard();
        return () => {
            if (generatedCardUrl) URL.revokeObjectURL(generatedCardUrl);
        };
    }, [poll, navigate]);

    
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && platformToShare.current) {
                setCompletedShares(prev => [...prev, platformToShare.current]);
                setShareQueue(currentQueue => {
                    const newQueue = currentQueue.slice(1);
                    if (newQueue.length > 0) {
                        setTimeout(() => {
                            const nextPlatform = newQueue[0];
                            platformToShare.current = nextPlatform;
                            const link = sharePlatforms[nextPlatform]?.link(pollUrl, pollText);
                            if (link) window.open(link, '_blank');
                        }, 1200);
                    } else {
                        toast.success("All platforms shared successfully!");
                        platformToShare.current = null;
                        setTimeout(() => navigate(-1), 1500);
                    }
                    return newQueue;
                });
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [poll, navigate]);
    
    if (!poll) {
        useEffect(() => { navigate('/dashboard'); }, [navigate]);
        return null;
    }

    const pollUrl = `${window.location.origin}/poll/${poll._id}`;
    const pollText = poll.question;
    
    const toggleSelection = (platform) => {
        if (shareQueue.length > 0) return;
        setSelectedPlatforms(prev => 
            prev.includes(platform) 
                ? prev.filter(p => p !== platform) 
                : [...prev, platform]
        );
    };

 const handleShare = async () => {
        if (!generatedCardFile) {
            toast.error("Image is still generating, please wait.");
            return;
        }

        if (navigator.share && navigator.canShare({ files: [generatedCardFile] })) {
            try {
                await navigator.share({
                    title: poll.question,
                    text: `Vote on this poll and see the results!`,
                    url: pollUrl,
                    files: [generatedCardFile],
                });
                toast.success("Shared successfully!");
            } catch (error) {
                if (error.name !== 'AbortError') toast.error("An error occurred during sharing.");
            }
        } else {
            // Fallback for browsers that don't support file sharing
            toast('Sharing to each app one by one...');
            setShareQueue(selectedPlatforms);
            const firstPlatform = selectedPlatforms[0];
            platformToShare.current = firstPlatform;
            const firstLink = sharePlatforms[firstPlatform]?.link(pollUrl, pollText);
            if (firstLink) window.open(firstLink, '_blank');
        }
    };

    // Dynamically set the aspect ratio for the preview container
    const previewAspectRatio = poll.type === 'image' ? 'aspect-[9/16]' : 'aspect-[1.91/1]';

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-gray-800"><X size={24} /></button>
                <h1 className="text-lg font-bold text-gray-800">Share Via</h1>
                <span className="text-sm font-semibold text-gray-700 w-12 text-right">{selectedPlatforms.length} / {Object.keys(sharePlatforms).length}</span>
            </div>
            
            <div className="rounded-xl border border-gray-200 p-4 mb-6 flex-shrink-0">
                <h2 className="font-semibold text-gray-800 mb-3">{poll.question}</h2>
                <div className={`bg-gray-100 rounded-lg ${previewAspectRatio} flex items-center justify-center`}>
                    {isGenerating ? (
                         <div className="text-center text-gray-400">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
                             <p>Generating Preview...</p>
                         </div>
                    ) : (
                        <img src={generatedCardUrl} alt="Generated Poll Card" className="max-w-full max-h-full rounded-md object-contain" />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-y-6 flex-1 overflow-y-auto content-start">
                {Object.keys(sharePlatforms).map(platform => (
                    <SharePlatformButton 
                        key={platform}
                        platform={platform}
                        onSelect={() => toggleSelection(platform)}
                        isSelected={selectedPlatforms.includes(platform)}
                        isCompleted={completedShares.includes(platform)}
                    />
                ))}
            </div>

            <div className="flex gap-4 pt-4 flex-shrink-0 border-t border-gray-100">
                <button onClick={() => navigate(-1)} className="flex-1 py-3 border border-gray-300 rounded-full font-semibold text-gray-700">Cancel</button>
                <button 
                    onClick={handleShare} 
                    disabled={selectedPlatforms.length === 0 || isGenerating}
                    className="flex-1 py-3 bg-pink-500 text-white rounded-full font-semibold disabled:bg-gray-300 shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
                >
                    <Share2 size={16} />
                    {shareQueue.length > 0 ? 'Sharing...' : `Share (${selectedPlatforms.length})`}
                </button>
            </div>
        </div>
    );
}