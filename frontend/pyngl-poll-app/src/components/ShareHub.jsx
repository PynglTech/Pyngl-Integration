import React, { useState, useEffect } from 'react';
import { X, Share2, Instagram, Linkedin, Facebook } from 'lucide-react';
import { generateBrandedVariant } from '../utils/imageUtils';

// Define the platforms and their target image sizes
const platforms = {
    'Instagram Story': { icon: <Instagram />, size: { width: 1080, height: 1920 } },
    'Instagram Post': { icon: <Instagram />, size: { width: 1080, height: 1350 } },
    'LinkedIn/Facebook': { icon: <Linkedin />, size: { width: 1200, height: 630 } },
};

const VariantPreview = ({ platform, variant, poll }) => {
    const [isSharing, setIsSharing] = useState(false);
    
    const handleShare = async () => {
        if (!navigator.share || !variant.file) {
            alert("Web Share is not supported on your browser, or the image is not ready.");
            return;
        }
        setIsSharing(true);
        try {
            await navigator.share({
                title: poll.question,
                text: `Vote now on this poll: ${poll.question}`,
                files: [variant.file],
            });
        } catch (error) {
            console.error("Sharing failed:", error);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                {variant.url ? (
                    <img src={variant.url} alt={`${platform} preview`} className="object-contain w-full h-full" />
                ) : (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                )}
            </div>
            <button
                onClick={handleShare}
                disabled={!variant.url || isSharing}
                className="w-full flex items-center justify-center gap-2 py-2 bg-pink-500 text-white font-semibold rounded-full disabled:bg-gray-400"
            >
                {isSharing ? 'Sharing...' : <><Share2 size={16}/> {platform}</>}
            </button>
        </div>
    );
};

export default function ShareHub({ masterImageUrl, poll, onClose }) {
    const [variants, setVariants] = useState({});
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        const generateAllVariants = async () => {
            setIsGenerating(true);
            const generated = {};
            for (const platform in platforms) {
                try {
                    const file = await generateBrandedVariant(masterImageUrl, '/pynglLogoImage.png', platforms[platform].size);
                    generated[platform] = { file: file, url: URL.createObjectURL(file) };
                } catch (error) {
                    console.error(`Failed to generate variant for ${platform}:`, error);
                    generated[platform] = { file: null, url: null }; // Mark as failed
                }
            }
            setVariants(generated);
            setIsGenerating(false);
        };

        generateAllVariants();

        // Cleanup object URLs on component unmount
        return () => {
            for (const platform in variants) {
                if (variants[platform].url) {
                    URL.revokeObjectURL(variants[platform].url);
                }
            }
        };
    }, [masterImageUrl, poll]);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col p-6">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800">Share Your Poll</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1"><X/></button>
                </div>
                {isGenerating && <p className="text-center">Generating shareable images...</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
                    {Object.keys(platforms).map(platform => (
                        <VariantPreview key={platform} platform={platform} variant={variants[platform] || {}} poll={poll} />
                    ))}
                </div>
            </div>
        </div>
    );
}

