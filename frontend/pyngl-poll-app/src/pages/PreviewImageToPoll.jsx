import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import ShareHub from '../components/ShareHub';
import { Instagram, Linkedin } from 'lucide-react';
import Cropper from 'react-easy-crop';

// --- Configuration for Cloudinary ---
const CLOUDINARY_CLOUD_NAME = "dsza5zui8"; 
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// --- Platform Specifications ---
const PLATFORM_SPECS = {
    'Instagram Story (9:16)': {
        icon: <Instagram size={20}/>,
        transformations: 'w_1080,h_1920,c_fill,g_auto',
        aspect: 9 / 16
    },
    'Instagram Post (4:5)': {
        icon: <Instagram size={20}/>,
        transformations: 'w_1080,h_1350,c_fill,g_auto',
        aspect: 4 / 5
    },
    'Square Post (1:1)': {
        icon: <Instagram size={20}/>,
        transformations: 'w_1080,h_1080,c_fill,g_auto',
        aspect: 1 / 1
    },
    'Link Share (1.91:1)': {
        icon: <Linkedin size={20}/>,
        transformations: 'w_1200,h_630,c_fill,g_auto',
        aspect: 1.91 / 1
    },
};

// --- Child Component for Previews ---
const VariantPreviewCard = ({ platform, spec, masterImagePublicId, focalPoint }) => {
//    const logoOverlay = 'l_pyngl_logo,w_0.15,g_south_east,x_0.05,y_0.05,o_90';
   
const gravity = focalPoint
        ? `g_custom,x_${focalPoint.x},y_${focalPoint.y},w_${focalPoint.width},h_${focalPoint.height}`
        : 'g_auto';

    // ✅ FIX: The logoOverlay variable has been removed from the URL.
    const previewUrl = `${CLOUDINARY_BASE_URL}/${spec.transformations.replace('g_auto', gravity)}/${masterImagePublicId}`;

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 space-y-3 animate-fadeInUp">
            <div className="flex items-center gap-2">
                {spec.icon}
                <span className="font-semibold text-sm">{platform}</span>
            </div>
            <div className={`aspect-[${spec.aspect.toString().replace('/',':')}] bg-black/20 rounded-lg overflow-hidden flex items-center justify-center`}>
                <img src={previewUrl} alt={`${platform} preview`} className="object-cover w-full h-full" />
            </div>
        </div>
    );
};

// --- Main Component ---
export default function PreviewImagePoll() {
    const { state } = useLocation();
    const navigate = useNavigate();

    // State for poll creation and sharing
    const [isLoading, setIsLoading] = useState(false);
    const [createdPoll, setCreatedPoll] = useState(null);
    const [isShareHubOpen, setIsShareHubOpen] = useState(false);
    
    // State for manual cropping
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [editingVariant, setEditingVariant] = useState(null);
    const [manualCrops, setManualCrops] = useState({});

    // Data from previous page
    const masterImagePublicId = state?.imagePublicId || 'samples/woman-in-a-flowery-dress';
    const focalPoint = state?.focalPoint; 

    // --- Handlers ---
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const saveManualCrop = () => {
        const newManualCrops = { ...manualCrops, [editingVariant]: croppedAreaPixels };
        setManualCrops(newManualCrops);
        setEditingVariant(null);
    };
    const handleCreatePoll = async () => {
        // If the poll is already created, just open the share hub again.
        if (createdPoll) {
            setIsShareHubOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            // 1. Prepare the poll data to send to the server
            const pollData = {
                question: state.question,
                options: state.options,
                type: 'image',
                imageUrl: state.imageUrl, // The master Cloudinary URL
                duration: state.duration,
            };

            // 2. Call your backend API to save the poll
            const response = await apiClient.post("/api/polls/create-poll", pollData);
            
            // 3. Store the newly created poll from the server's response
            setCreatedPoll(response.data);
            
            // 4. Open the Share Hub
            setIsShareHubOpen(true);

        } catch (error) {
            console.error("Error creating poll:", error);
            alert(error.response?.data?.error || "Could not save the poll. Please try again.");
        } finally {
            // 5. Ensure the loading state is turned off
            setIsLoading(false);
        }
    };

    if (!state) {
        return <div className="p-6 text-center text-white">No poll data found.</div>;
    }
    
    return (
        <div className="font-sans bg-gray-900 text-white h-screen flex flex-col">
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
            `}</style>

            {/* --- Cropping Modal --- */}
            {editingVariant && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col p-4">
                    <div className="relative flex-grow">
                        <Cropper
                            image={state.imageUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={PLATFORM_SPECS[editingVariant].aspect}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="flex-shrink-0 pt-4 flex justify-center gap-4">
                        <button onClick={saveManualCrop} className="bg-pink-500 text-white px-6 py-2 rounded-lg">Save Crop</button>
                        <button onClick={() => setEditingVariant(null)} className="bg-gray-600 text-white px-6 py-2 rounded-lg">Cancel</button>
                    </div>
                </div>
            )}

            {/* --- Main Content --- */}
            <div className="p-4 flex-shrink-0">
                <h1 className="text-2xl font-bold text-center">{state.question}</h1>
                <p className="text-center text-gray-400">Auto-generated previews for each platform</p>
            </div>
            
            <div className="flex-grow overflow-y-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(PLATFORM_SPECS).map(([platform, spec]) => (
                        <div key={platform}>
                            <VariantPreviewCard 
                                platform={platform} 
                                spec={spec} 
                                masterImagePublicId={masterImagePublicId}
                                focalPoint={manualCrops[platform] || focalPoint}
                            />
                            <button onClick={() => setEditingVariant(platform)} className="text-xs text-center w-full mt-2 text-gray-400 hover:text-pink-400 transition-colors">
                                Edit Crop
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border-t border-white/10">
                <button onClick={handleCreatePoll} disabled={isLoading} className="w-full py-4 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:opacity-70">
                    {isLoading ? "Creating..." : (createdPoll ? "Share Poll" : "Create & Share Poll")}
                </button>
            </div>

            {isShareHubOpen && createdPoll && (
                 <ShareHub 
        poll={createdPoll} 
        onClose={() => setIsShareHubOpen(false)}
        // ✅ ADD THESE PROPS
        masterImagePublicId={masterImagePublicId}
        focalPoint={focalPoint}
        manualCrops={manualCrops}
    />
            )}
        </div>
    );
}