// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // --- Helper Components: Inline SVG Icons ---
// const PlusIcon = ({ className }) => (
//     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//     </svg>
// );

// const Trash2Icon = ({ className }) => (
//     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <polyline points="3 6 5 6 21 6"></polyline>
//         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//         <line x1="10" y1="11" x2="10" y2="17"></line>
//         <line x1="14" y1="11" x2="14" y2="17"></line>
//     </svg>
// );

// export default function TextToPoll() {
//     const [question, setQuestion] = useState("");
//     const [options, setOptions] = useState(["", ""]);
//     const [duration, setDuration] = useState("24h");
//     const [errorMessage, setErrorMessage] = useState("");
//     const navigate = useNavigate();

//     const DURATION_OPTIONS = ["1h", "2h", "24h", "36h", "48h"];

//     const handleAddOption = () => {
//         if (options.length < 6) setOptions([...options, ""]);
//     };

//     const handleRemoveOption = (index) => {
//         setOptions(options.filter((_, i) => i !== index));
//     };

//     const handleChangeOption = (index, value) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handlePreview = () => {
//         const trimmedQuestion = question.trim();
//         const filledOptions = options.filter((opt) => opt.trim() !== "");

//         if (!trimmedQuestion) {
//             setErrorMessage("⚠️ Question is required.");
//             return;
//         }
//         if (filledOptions.length < 2) {
//             setErrorMessage("⚠️ Please provide at least 2 options.");
//             return;
//         }

//         setErrorMessage("");
//         navigate("/preview-text-poll", {
//             state: { question: trimmedQuestion, options: filledOptions, duration },
//         });
//     };

//     // The header has been removed as it is now handled by AppLayout.jsx
//     return (
//         <div className="p-4 font-sans">
//             <div className="mb-6">
//                 <label className="block font-medium mb-2">Question</label>
//                 <input
//                     type="text"
//                     placeholder="Enter your question..."
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                 />
//             </div>

//             <div className="mb-6">
//                 <label className="block font-medium mb-2">Options</label>
//                 <div className="space-y-3">
//                     {options.map((opt, i) => (
//                         <div key={i} className="flex items-center gap-2">
//                             <span className="w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium flex-shrink-0">
//                                 {i + 1}
//                             </span>
//                             <input
//                                 type="text"
//                                 placeholder={`Option ${i + 1}`}
//                                 value={opt}
//                                 onChange={(e) => handleChangeOption(i, e.target.value)}
//                                 className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
//                             />
//                             {options.length > 2 && (
//                                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500 p-1">
//                                     <Trash2Icon className="w-5 h-5" />
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 {options.length < 6 && (
//                     <button
//                         onClick={handleAddOption}
//                         className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1"
//                     >
//                         <PlusIcon className="w-4 h-4" /> Add option
//                     </button>
//                 )}
//                 <p className="text-gray-400 text-xs mt-2">You can add up to 6 options.</p>
//             </div>

//             <div className="mb-6">
//                 <label className="block font-medium mb-2">Poll Duration</label>
//                 <div className="flex flex-wrap gap-2">
//                     {DURATION_OPTIONS.map((d) => (
//                         <button
//                             key={d}
//                             onClick={() => setDuration(d)}
//                             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                                 duration === d
//                                     ? "bg-pink-500 text-white"
//                                     : "bg-gray-100 text-gray-700 hover:bg-pink-100"
//                             }`}
//                         >
//                             {d.replace("h", " Hours")}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <button
//                 onClick={handlePreview}
//                 className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500"
//             >
//                 Preview poll
//             </button>

//             {errorMessage && (
//                 <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
//             )}
//         </div>
//     );
// }


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- Helper Components: Inline SVG Icons (Unchanged) ---
const PlusIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
);
const Trash2Icon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export default function TextToPoll() {
    const navigate = useNavigate();
    const location = useLocation(); // Keep useLocation to handle potential state passing

    // MERGED: State from both files
    const [question, setQuestion] = useState(location.state?.question || "");
    const [options, setOptions] = useState(location.state?.options || ["", ""]);
const [duration, setDuration] = useState("24h"); // Was 'selectedDuration'
  const [ageRange, setAgeRange] = useState("13-17"); // Was 'selectedAgeRange'
    const [shareToTrending, setShareToTrending] = useState(location.state?.shareToTrending || false);
    const [errorMessage, setErrorMessage] = useState("");

    // MERGED: Constants from both files
    const DURATION_OPTIONS = ["1h", "2h", "24h", "36h", "48h"];
    const AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45+"];

    // --- All your handler functions are preserved (Unchanged) ---
    const handleAddOption = () => { if (options.length < 6) setOptions([...options, ""]); };
    const handleRemoveOption = (index) => { setOptions(options.filter((_, i) => i !== index)); };
    const handleChangeOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

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

        setErrorMessage("");
        // UPDATED: Pass the new state to the preview page
        navigate("/preview-text-poll", {
            state: { question: trimmedQuestion, options: filledOptions, duration, ageRange, shareToTrending },
        });
    };

    return (
        <div className="p-4 font-sans">
            {/* --- Question and Options Inputs (Unchanged) --- */}
            <div className="mb-6">
                <label className="block font-medium mb-2">Question</label>
                <input type="text" placeholder="Enter your question..." value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            <div className="mb-6">
                <label className="block font-medium mb-2">Options</label>
                <div className="space-y-3">
                    {options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium flex-shrink-0">{i + 1}</span>
                            <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleChangeOption(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                            {options.length > 2 && (<button onClick={() => handleRemoveOption(i)} className="text-pink-500 p-1"><Trash2Icon className="w-5 h-5" /></button>)}
                        </div>
                    ))}
                </div>
                {options.length < 6 && (<button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1"><PlusIcon className="w-4 h-4" /> Add option</button>)}
                <p className="text-gray-400 text-xs mt-2">You can add up to 6 options.</p>
            </div>

            {/* --- Poll Duration (Your existing UI) --- */}
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

            {/* --- NEW: Audience Targeting Section from your partner --- */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Targeting</h3>
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-3">Age range</p>
                    <div className="flex flex-wrap gap-2">
                        {AGE_RANGES.map((range) => (
                            <button key={range} onClick={() => setAgeRange(range)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${ageRange === range ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- NEW: Trending Polls Checkbox from your partner --- */}
            <div className="mb-6 flex items-center gap-3">
                <label className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="sr-only" />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${shareToTrending ? "bg-pink-500 border-pink-500" : "bg-white border-gray-300"}`}>
                            {shareToTrending && (<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>)}
                        </div>
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Also share to Trending polls</span>
                </label>
            </div>

            {/* --- Preview Button and Error Message (Unchanged) --- */}
            <button onClick={handlePreview} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500">
                Preview poll
            </button>
            {errorMessage && (<p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>)}
        </div>
    );
}