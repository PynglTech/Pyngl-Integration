import React, { useState, useRef } from "react";
import { Plus, Trash2, Upload, Camera, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper components for icons to keep this self-contained
const Icon = ({ name, ...props }) => {
    const icons = {
        plus: <Plus {...props} />,
        trash2: <Trash2 {...props} />,
        upload: <Upload {...props} />,
        camera: <Camera {...props} />,
        sparkles: <Sparkles {...props} />,
        x: <X {...props} />,
    };
    return icons[name] || null;
};

export default function CreateImagePoll() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [duration, setDuration] = useState("24h"); // State for poll duration
    const [imageUrl, setImageUrl] = useState(null);
    const [status, setStatus] = useState("idle"); // idle | loading | generated | uploaded | error
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const navigate = useNavigate();

    const DURATION_OPTIONS = ["1h", "2h", "12h", "24h", "36h", "48h"];

    const handlePreview = () => {
        const trimmedQuestion = question.trim();
        const filledOptions = options.filter((opt) => opt.trim() !== "");

        if (!trimmedQuestion) {
            setErrorMessage("⚠️ Question is required.");
            return;
        }
        if (filledOptions.length < 2) {
            setErrorMessage("⚠️ Please provide at least 2 options.");
            return;
        }
        if (!imageUrl) {
            setErrorMessage("⚠️ Please add or generate an image.");
            return;
        }

        setErrorMessage("");
        // Pass the duration to the preview page
        navigate("/preview-image-poll", {
            state: { question: trimmedQuestion, options: filledOptions, imageUrl, duration },
        });
    };

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
                setStatus("uploaded");
                setErrorMessage("");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateImage = async () => {
        if (!question.trim()) {
            setErrorMessage("⚠️ Please enter a question to generate an image.");
            return;
        }
        setErrorMessage("");
        const prompt = `A visually appealing image for a poll about: ${question}. Options are ${options.filter(o => o.trim()).join(", ")}.`;
        setStatus("loading");
        setImageUrl(null);
        try {
            const response = await fetch("/api/polls/generate-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (response.ok) {
                setImageUrl(data.imageUrl);
                setStatus("generated");
            } else {
                throw new Error(data.error || "Failed to generate image.");
            }
        } catch (err) {
            console.error("Error:", err);
            setStatus("error");
            setErrorMessage(`❌ ${err.message}`);
        }
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
        setStatus("idle");
    };

    // The main container no longer has the header, as it's handled by AppLayout.jsx
    return (
        <div className="p-4">
            {/* Question */}
            <div className="mb-6">
                <label className="block font-medium mb-2">Question</label>
                <input type="text" placeholder="e.g., Which logo do you prefer?" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>

            {/* Image Upload/Generate */}
            <div className="mb-6">
                 <label className="block font-medium mb-2">Image</label>
                 <div className="rounded-xl border border-gray-300 p-4 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
                    {status === 'idle' && (
                         <div className="grid grid-cols-3 gap-3 w-full">
                            <button onClick={() => fileInputRef.current.click()} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Icon name="upload" className="w-5 h-5 mb-1" /> Upload</button>
                            <button onClick={() => cameraInputRef.current.click()} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Icon name="camera" className="w-5 h-5 mb-1" /> Take Photo</button>
                            <button onClick={handleGenerateImage} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Icon name="sparkles" className="w-5 h-5 mb-1 text-pink-500" /> AI image gen</button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
                        </div>
                    )}
                    {status === 'loading' && ( <div className="text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div><p>Generating...</p></div> )}
                    {(status === 'generated' || status === 'uploaded') && imageUrl && (
                        <div className="relative w-full h-full">
                            <img src={imageUrl} alt="Poll" className="rounded-md w-full h-full object-cover" />
                            <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-white/70 rounded-full p-1 shadow-md backdrop-blur-sm"><Icon name="x" className="w-4 h-4" /></button>
                        </div>
                    )}
                </div>
            </div>

            {/* Options */}
            <div className="mb-6">
                <label className="block font-medium mb-2">Options</label>
                 <div className="space-y-3">
                    {options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium">{i + 1}</span>
                            <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleChangeOption(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                            {options.length > 2 && (
                                <button onClick={() => handleRemoveOption(i)} className="text-pink-500"><Icon name="trash2" className="w-5 h-5" /></button>
                            )}
                        </div>
                    ))}
                </div>
                 {options.length < 6 && (
                    <button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1 hover:bg-pink-50"><Icon name="plus" className="w-4 h-4" /> Add option</button>
                )}
            </div>

            {/* Poll Duration Selection */}
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

            {/* Preview Button */}
            <button onClick={handlePreview} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500">
                Preview poll
            </button>

            {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
        </div>
    );
}

