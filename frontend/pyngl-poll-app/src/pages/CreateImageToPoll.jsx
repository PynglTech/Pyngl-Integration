import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import apiClient from "../api/axiosConfig";
import imageCompression from 'browser-image-compression';
import { Plus, Trash2, Upload, Camera, Sparkles, X } from "lucide-react";

export default function CreateImagePoll() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [duration, setDuration] = useState("24h");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const DURATION_OPTIONS = ["1h", "2h", "12h", "24h", "36h", "48h"];

    const handleFileUpload = async (file) => {
        if (!file) return;
        setStatus("compressing");
        setErrorMessage("");
        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });
            
            setImageFile(compressedFile);
            setImagePreview(URL.createObjectURL(compressedFile));
            setStatus("ready");
        } catch (error) {
            console.error("Error compressing image:", error);
            setErrorMessage("Could not process the image.");
            setStatus("error");
        }
    };

    const handleFileChange = (e) => handleFileUpload(e.target.files[0]);

    const handleAddOption = () => {
        if (options.length < 6) setOptions([...options, ""]);
    };

    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleChangeOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handlePreview = async () => {
        if (!question.trim()) return setErrorMessage("⚠️ Question is required.");
        if (options.filter(opt => opt.trim()).length < 2) return setErrorMessage("⚠️ Please provide at least 2 options.");
        if (!imageFile) return setErrorMessage("⚠️ Please add an image.");
        
 setStatus("uploading");
    const toastId = toast.loading('Uploading & analyzing image...'); // Updated toast message for clarity
    
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await apiClient.post("/api/polls/upload-image", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.dismiss(toastId);
        setErrorMessage("");

        // --- THIS IS THE ONLY CHANGE ---
        navigate("/preview-image-poll", {
            state: {
                question: question.trim(),
                options: options.filter(opt => opt.trim()),
                duration,
                imageUrl: response.data.imageUrl,
                imagePublicId: response.data.imagePublicId,
                focalPoint: response.data.focalPoint // <-- ✅ ADD THIS LINE
            },
        });
    } catch (error) {
        console.error("Upload failed:", error);
        toast.error(error.response?.data?.error || "Upload failed.", { id: toastId });
        setStatus("error");
    }
};
    return (
        <div className="p-4 font-sans">
            <div className="mb-6">
                <label className="block font-medium mb-2">Question</label>
                <input type="text" placeholder="e.g., Which logo do you prefer?" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>

            <div className="mb-6">
                <label className="block font-medium mb-2">Image</label>
                <div className="rounded-xl border border-gray-300 p-4 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
                    {status === 'idle' && (
                        <div className="grid grid-cols-3 gap-3 w-full">
                            <button onClick={() => fileInputRef.current.click()} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Upload className="w-5 h-5 mb-1" /> Upload</button>
                            <button onClick={() => cameraInputRef.current.click()} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Camera className="w-5 h-5 mb-1" /> Take Photo</button>
                            <button disabled className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-400 cursor-not-allowed"><Sparkles className="w-5 h-5 mb-1 text-pink-300" /> AI (Soon)</button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
                        </div>
                    )}
                    {(status === 'compressing' || status === 'uploading') && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
                            <p>{status === 'compressing' ? 'Compressing...' : 'Uploading...'}</p>
                        </div>
                    )}
                    {(status === 'ready' || status === 'error') && imagePreview && (
                        <div className="relative w-full h-full">
                            <img src={imagePreview} alt="Poll Preview" className="rounded-md max-h-48 object-contain" />
                            <button onClick={() => { setImageFile(null); setImagePreview(null); setStatus('idle'); }} className="absolute top-2 right-2 bg-white/70 rounded-full p-1 shadow-md backdrop-blur-sm"><X className="w-4 h-4" /></button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <label className="block font-medium mb-2">Options</label>
                <div className="space-y-3">
                    {options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium">{i + 1}</span>
                            <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleChangeOption(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                            {options.length > 2 && (
                                <button onClick={() => handleRemoveOption(i)} className="text-pink-500"><Trash2 className="w-5 h-5" /></button>
                            )}
                        </div>
                    ))}
                </div>
                {options.length < 6 && (
                    <button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1 hover:bg-pink-50"><Plus className="w-4 h-4" /> Add option</button>
                )}
            </div>

            <div className="mb-6">
                <label className="block font-medium mb-2">Poll Duration</label>
                <div className="flex flex-wrap gap-2">
                    {DURATION_OPTIONS.map((d) => (
                        <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${duration === d ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-pink-100"}`}>
                            {d.replace("h", " Hours")}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={handlePreview} disabled={status === 'uploading' || status === 'compressing'} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 disabled:opacity-50">
                {status === 'uploading' ? 'Uploading...' : 'Preview Poll'}
            </button>

            {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
        </div>
    );
}

