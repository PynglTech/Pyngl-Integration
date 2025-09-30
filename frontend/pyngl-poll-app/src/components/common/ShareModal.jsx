// src/components/common/ShareModal.js
import React from 'react';
import { X, Twitter, MessageSquare, Linkedin, Facebook } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, pollUrl, pollQuestion }) {
    if (!isOpen) return null;

    const encodedUrl = encodeURIComponent(pollUrl);
    const encodedText = encodeURIComponent(`Vote on this poll: "${pollQuestion}" ${pollUrl}`);

    const shareTargets = [
        {
            name: 'WhatsApp',
            icon: <MessageSquare className="w-8 h-8 text-green-500" />,
            url: `https://api.whatsapp.com/send?text=${encodedText}`
        },
        {
            name: 'X (Twitter)',
            icon: <Twitter className="w-8 h-8 text-black" />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`Vote on this poll: "${pollQuestion}"`)}`
        },
        {
            name: 'Facebook',
            icon: <Facebook className="w-8 h-8 text-blue-600" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin className="w-8 h-8 text-blue-800" />,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(`Poll: ${pollQuestion}`)}&summary=${encodedText}`
        }
    ];

    const handleShare = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative animate-fade-in">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <h3 className="text-lg font-bold text-center mb-6">Share this Poll</h3>
                <div className="grid grid-cols-4 gap-4">
                    {shareTargets.map((target) => (
                        <div key={target.name} className="flex flex-col items-center">
                            <button
                                onClick={() => handleShare(target.url)}
                                className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                {target.icon}
                            </button>
                            <span className="text-xs mt-2 font-medium text-gray-600">{target.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}