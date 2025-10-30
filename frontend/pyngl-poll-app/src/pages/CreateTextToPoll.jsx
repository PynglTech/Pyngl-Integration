// // // // // import React, { useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // // --- Helper Components: Inline SVG Icons ---
// // // // // const PlusIcon = ({ className }) => (
// // // // //     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
// // // // //     </svg>
// // // // // );

// // // // // const Trash2Icon = ({ className }) => (
// // // // //     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // // //         <polyline points="3 6 5 6 21 6"></polyline>
// // // // //         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
// // // // //         <line x1="10" y1="11" x2="10" y2="17"></line>
// // // // //         <line x1="14" y1="11" x2="14" y2="17"></line>
// // // // //     </svg>
// // // // // );

// // // // // export default function TextToPoll() {
// // // // //     const [question, setQuestion] = useState("");
// // // // //     const [options, setOptions] = useState(["", ""]);
// // // // //     const [duration, setDuration] = useState("24h");
// // // // //     const [errorMessage, setErrorMessage] = useState("");
// // // // //     const navigate = useNavigate();

// // // // //     const DURATION_OPTIONS = ["1h", "2h", "24h", "36h", "48h"];

// // // // //     const handleAddOption = () => {
// // // // //         if (options.length < 6) setOptions([...options, ""]);
// // // // //     };

// // // // //     const handleRemoveOption = (index) => {
// // // // //         setOptions(options.filter((_, i) => i !== index));
// // // // //     };

// // // // //     const handleChangeOption = (index, value) => {
// // // // //         const newOptions = [...options];
// // // // //         newOptions[index] = value;
// // // // //         setOptions(newOptions);
// // // // //     };

// // // // //     const handlePreview = () => {
// // // // //         const trimmedQuestion = question.trim();
// // // // //         const filledOptions = options.filter((opt) => opt.trim() !== "");

// // // // //         if (!trimmedQuestion) {
// // // // //             setErrorMessage("⚠️ Question is required.");
// // // // //             return;
// // // // //         }
// // // // //         if (filledOptions.length < 2) {
// // // // //             setErrorMessage("⚠️ Please provide at least 2 options.");
// // // // //             return;
// // // // //         }

// // // // //         setErrorMessage("");
// // // // //         navigate("/preview-text-poll", {
// // // // //             state: { question: trimmedQuestion, options: filledOptions, duration },
// // // // //         });
// // // // //     };

// // // // //     // The header has been removed as it is now handled by AppLayout.jsx
// // // // //     return (
// // // // //         <div className="p-4 font-sans">
// // // // //             <div className="mb-6">
// // // // //                 <label className="block font-medium mb-2">Question</label>
// // // // //                 <input
// // // // //                     type="text"
// // // // //                     placeholder="Enter your question..."
// // // // //                     value={question}
// // // // //                     onChange={(e) => setQuestion(e.target.value)}
// // // // //                     className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
// // // // //                 />
// // // // //             </div>

// // // // //             <div className="mb-6">
// // // // //                 <label className="block font-medium mb-2">Options</label>
// // // // //                 <div className="space-y-3">
// // // // //                     {options.map((opt, i) => (
// // // // //                         <div key={i} className="flex items-center gap-2">
// // // // //                             <span className="w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium flex-shrink-0">
// // // // //                                 {i + 1}
// // // // //                             </span>
// // // // //                             <input
// // // // //                                 type="text"
// // // // //                                 placeholder={`Option ${i + 1}`}
// // // // //                                 value={opt}
// // // // //                                 onChange={(e) => handleChangeOption(i, e.target.value)}
// // // // //                                 className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
// // // // //                             />
// // // // //                             {options.length > 2 && (
// // // // //                                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500 p-1">
// // // // //                                     <Trash2Icon className="w-5 h-5" />
// // // // //                                 </button>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     ))}
// // // // //                 </div>
// // // // //                 {options.length < 6 && (
// // // // //                     <button
// // // // //                         onClick={handleAddOption}
// // // // //                         className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1"
// // // // //                     >
// // // // //                         <PlusIcon className="w-4 h-4" /> Add option
// // // // //                     </button>
// // // // //                 )}
// // // // //                 <p className="text-gray-400 text-xs mt-2">You can add up to 6 options.</p>
// // // // //             </div>

// // // // //             <div className="mb-6">
// // // // //                 <label className="block font-medium mb-2">Poll Duration</label>
// // // // //                 <div className="flex flex-wrap gap-2">
// // // // //                     {DURATION_OPTIONS.map((d) => (
// // // // //                         <button
// // // // //                             key={d}
// // // // //                             onClick={() => setDuration(d)}
// // // // //                             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// // // // //                                 duration === d
// // // // //                                     ? "bg-pink-500 text-white"
// // // // //                                     : "bg-gray-100 text-gray-700 hover:bg-pink-100"
// // // // //                             }`}
// // // // //                         >
// // // // //                             {d.replace("h", " Hours")}
// // // // //                         </button>
// // // // //                     ))}
// // // // //                 </div>
// // // // //             </div>

// // // // //             <button
// // // // //                 onClick={handlePreview}
// // // // //                 className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500"
// // // // //             >
// // // // //                 Preview poll
// // // // //             </button>

// // // // //             {errorMessage && (
// // // // //                 <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // }


// // // // import React, { useState } from "react";
// // // // import { useLocation, useNavigate } from "react-router-dom";

// // // // // --- Helper Components: Inline SVG Icons (Unchanged) ---
// // // // const PlusIcon = ({ className }) => (
// // // //     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
// // // //     </svg>
// // // // );
// // // // const Trash2Icon = ({ className }) => (
// // // //     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //         <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
// // // //     </svg>
// // // // );

// // // // export default function TextToPoll() {
// // // //     const navigate = useNavigate();
// // // //     const location = useLocation(); // Keep useLocation to handle potential state passing

// // // //     // MERGED: State from both files
// // // //     const [question, setQuestion] = useState(location.state?.question || "");
// // // //     const [options, setOptions] = useState(location.state?.options || ["", ""]);
// // // // const [duration, setDuration] = useState("24h"); // Was 'selectedDuration'
// // // //   const [ageRange, setAgeRange] = useState("13-17"); // Was 'selectedAgeRange'
// // // //     const [shareToTrending, setShareToTrending] = useState(location.state?.shareToTrending || false);
// // // //     const [errorMessage, setErrorMessage] = useState("");

// // // //     // MERGED: Constants from both files
// // // //     const DURATION_OPTIONS = ["1h", "2h", "24h", "36h", "48h"];
// // // //     const AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45+"];

// // // //     // --- All your handler functions are preserved (Unchanged) ---
// // // //     const handleAddOption = () => { if (options.length < 6) setOptions([...options, ""]); };
// // // //     const handleRemoveOption = (index) => { setOptions(options.filter((_, i) => i !== index)); };
// // // //     const handleChangeOption = (index, value) => {
// // // //         const newOptions = [...options];
// // // //         newOptions[index] = value;
// // // //         setOptions(newOptions);
// // // //     };

// // // //     const handlePreview = () => {
// // // //         const trimmedQuestion = question.trim();
// // // //         const filledOptions = options.filter((opt) => opt.trim() !== "");

// // // //         if (!trimmedQuestion) {
// // // //             setErrorMessage("⚠️ Question is required.");
// // // //             return;
// // // //         }
// // // //         if (filledOptions.length < 2) {
// // // //             setErrorMessage("⚠️ Please provide at least 2 options.");
// // // //             return;
// // // //         }

// // // //         setErrorMessage("");
// // // //         // UPDATED: Pass the new state to the preview page
// // // //         navigate("/preview-text-poll", {
// // // //             state: { question: trimmedQuestion, options: filledOptions, duration, ageRange, shareToTrending },
// // // //         });
// // // //     };

// // // //     return (
// // // //         <div className="p-4 font-sans bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
// // // //             {/* --- Question and Options Inputs (Unchanged) --- */}
// // // //             <div className="mb-6">
// // // //                 <label className="block font-medium mb-2">Question</label>
// // // //                 <input type="text" placeholder="Enter your question..." value={question} onChange={(e) => setQuestion(e.target.value)}
// // // //                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400" />
// // // //             </div>
// // // //             <div className="mb-6">
// // // //                 <label className="block font-medium mb-2">Options</label>
// // // //                 <div className="space-y-3">
// // // //                     {options.map((opt, i) => (
// // // //                         <div key={i} className="flex items-center gap-2">
// // // //                             <span className="w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium flex-shrink-0">{i + 1}</span>
// // // //                             <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleChangeOption(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
// // // //                             {options.length > 2 && (<button onClick={() => handleRemoveOption(i)} className="text-pink-500 p-1"><Trash2Icon className="w-5 h-5" /></button>)}
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //                 {options.length < 6 && (<button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1"><PlusIcon className="w-4 h-4" /> Add option</button>)}
// // // //                 <p className="text-gray-400 text-xs mt-2">You can add up to 6 options.</p>
// // // //             </div>

// // // //             {/* --- Poll Duration (Your existing UI) --- */}
// // // //             <div className="mb-6">
// // // //                 <label className="block font-medium mb-2">Poll Duration</label>
// // // //                 <div className="flex flex-wrap gap-2">
// // // //                     {DURATION_OPTIONS.map((d) => (
// // // //                         <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${duration === d ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-pink-100"}`}>
// // // //                             {d.replace("h", " Hours")}
// // // //                         </button>
// // // //                     ))}
// // // //                 </div>
// // // //             </div>

// // // //             {/* --- NEW: Audience Targeting Section from your partner --- */}
// // // //             <div className="mb-6">
// // // //                 <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Targeting</h3>
// // // //                 <div className="mb-4">
// // // //                     <p className="text-sm text-gray-600 mb-3">Age range</p>
// // // //                     <div className="flex flex-wrap gap-2">
// // // //                         {AGE_RANGES.map((range) => (
// // // //                             <button key={range} onClick={() => setAgeRange(range)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${ageRange === range ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
// // // //                                 {range}
// // // //                             </button>
// // // //                         ))}
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             {/* --- NEW: Trending Polls Checkbox from your partner --- */}
// // // //             <div className="mb-6 flex items-center gap-3">
// // // //                 <label className="flex items-center cursor-pointer">
// // // //                     <div className="relative">
// // // //                         <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="sr-only" />
// // // //                         <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${shareToTrending ? "bg-pink-500 border-pink-500" : "bg-white border-gray-300"}`}>
// // // //                             {shareToTrending && (<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>)}
// // // //                         </div>
// // // //                     </div>
// // // //                     <span className="text-sm text-gray-600 ml-2">Also share to Trending polls</span>
// // // //                 </label>
// // // //             </div>

// // // //             {/* --- Preview Button and Error Message (Unchanged) --- */}
// // // //             <button onClick={handlePreview} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500">
// // // //                 Preview poll
// // // //             </button>
// // // //             {errorMessage && (<p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>)}
// // // //         </div>
// // // //     );
// // // // }
// // // import React, { useState } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";

// // // // --- Helper Components: Inline SVG Icons ---
// // // const PlusIcon = ({ className }) => (
// // //   <svg
// // //     className={className}
// // //     xmlns="http://www.w3.org/2000/svg"
// // //     fill="none"
// // //     viewBox="0 0 24 24"
// // //     stroke="currentColor"
// // //   >
// // //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
// // //   </svg>
// // // );

// // // const Trash2Icon = ({ className }) => (
// // //   <svg
// // //     className={className}
// // //     xmlns="http://www.w3.org/2000/svg"
// // //     fill="none"
// // //     viewBox="0 0 24 24"
// // //     stroke="currentColor"
// // //   >
// // //     <polyline points="3 6 5 6 21 6"></polyline>
// // //     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
// // //     <line x1="10" y1="11" x2="10" y2="17"></line>
// // //     <line x1="14" y1="11" x2="14" y2="17"></line>
// // //   </svg>
// // // );

// // // export default function TextToPoll() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const [question, setQuestion] = useState(location.state?.question || "");
// // //   const [options, setOptions] = useState(location.state?.options || ["", ""]);
// // //   const [selectedDuration, setSelectedDuration] = useState(location.state?.selectedDuration || "24 hr");
// // //   const [selectedAgeRange, setSelectedAgeRange] = useState(location.state?.selectedAgeRange || "13-17");
// // //   const [shareToTrending, setShareToTrending] = useState(location.state?.shareToTrending || false);
// // //   const [errorMessage, setErrorMessage] = useState("");

// // //   const ageRanges = ["13-17", "18-24", "25-34", "35-44"];
// // //   const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

// // //   const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
// // //   const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
// // //   const handleChangeOption = (index, value) => {
// // //     const newOptions = [...options];
// // //     newOptions[index] = value;
// // //     setOptions(newOptions);
// // //   };

// // //   const handlePreview = () => {
// // //     const trimmedQuestion = question.trim();
// // //     const filledOptions = options.filter(opt => opt.trim() !== "");

// // //     if (!trimmedQuestion) return setErrorMessage("⚠️ Question is required.");
// // //     if (filledOptions.length < 2) return setErrorMessage("⚠️ Please provide at least 2 options.");

// // //     setErrorMessage("");
// // //     navigate("/preview-text-poll", {
// // //       state: { question: trimmedQuestion, options: filledOptions, selectedDuration, selectedAgeRange, shareToTrending },
// // //     });
// // //   };

// // //   return (
// // //     <div className="p-4 font-sans bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      
// // //       {/* Question Input */}
// // //       <div className="mb-6">
// // //         <label className="block font-medium mb-2">Question</label>
// // //         <input
// // //           type="text"
// // //           placeholder="Enter your question..."
// // //           value={question}
// // //           onChange={(e) => setQuestion(e.target.value)}
// // //           className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
// // //         />
// // //       </div>

// // //       {/* Options */}
// // //       <div className="mb-6">
// // //         <label className="block font-medium mb-2">Options</label>
// // //         <div className="space-y-3">
// // //           {options.map((opt, i) => (
// // //             <div key={i} className="flex items-center gap-2">
// // //               <span className="w-6 h-6 flex items-center justify-center bg-pink-100 dark:bg-pink-800 text-pink-500 dark:text-pink-300 rounded-full text-sm font-medium flex-shrink-0">
// // //                 {i + 1}
// // //               </span>
// // //               <input
// // //                 type="text"
// // //                 placeholder={`Option ${i + 1}`}
// // //                 value={opt}
// // //                 onChange={(e) => handleChangeOption(i, e.target.value)}
// // //                 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
// // //               />
// // //               {options.length > 2 && (
// // //                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500 dark:text-pink-400 p-1">
// // //                   <Trash2Icon className="w-5 h-5" />
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //         {options.length < 6 && (
// // //           <button
// // //             onClick={handleAddOption}
// // //             className="mt-4 w-full border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg py-2 text-pink-500 dark:text-pink-300 flex items-center justify-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
// // //           >
// // //             <PlusIcon className="w-4 h-4" /> Add option
// // //           </button>
// // //         )}
// // //         <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">You can add up to 6 options.</p>
// // //       </div>

// // //       {/* Audience Targeting */}
// // //       <div className="mb-6">
// // //         <h3 className="text-lg font-medium mb-4">Audience Targeting</h3>

// // //         {/* Age Range */}
// // //         <div className="mb-4">
// // //           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Age range</p>
// // //           <div className="flex flex-wrap gap-2">
// // //             {ageRanges.map(range => (
// // //               <button
// // //                 key={range}
// // //                 onClick={() => setSelectedAgeRange(range)}
// // //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// // //                   selectedAgeRange === range
// // //                     ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
// // //                     : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
// // //                 }`}
// // //               >
// // //                 {range}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Poll Duration */}
// // //         <div className="mb-4">
// // //           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Poll duration</p>
// // //           <div className="flex flex-wrap gap-2">
// // //             {durations.map(duration => (
// // //               <button
// // //                 key={duration}
// // //                 onClick={() => setSelectedDuration(duration)}
// // //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// // //                   selectedDuration === duration
// // //                     ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
// // //                     : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
// // //                 }`}
// // //               >
// // //                 {duration}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Trending Checkbox */}
// // //         <div className="flex items-center gap-3">
// // //           <label className="flex items-center cursor-pointer">
// // //             <div className="relative">
// // //               <input
// // //                 type="checkbox"
// // //                 checked={shareToTrending}
// // //                 onChange={(e) => setShareToTrending(e.target.checked)}
// // //                 className="sr-only"
// // //               />
// // //               <div
// // //                 className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
// // //                   shareToTrending
// // //                     ? "bg-pink-500 border-pink-500"
// // //                     : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
// // //                 }`}
// // //               >
// // //                 {shareToTrending && (
// // //                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
// // //                     <path
// // //                       fillRule="evenodd"
// // //                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// // //                       clipRule="evenodd"
// // //                     />
// // //                   </svg>
// // //                 )}
// // //               </div>
// // //             </div>
// // //             <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Also share to Trending polls</span>
// // //           </label>
// // //         </div>
// // //       </div>

// // //       {/* Preview Button */}
// // //       <button
// // //         onClick={handlePreview}
// // //         className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 transition-colors"
// // //       >
// // //         Preview poll
// // //       </button>

// // //       {/* Error Message */}
// // //       {errorMessage && (
// // //         <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import React, { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";

// // // --- Helper Components: Inline SVG Icons ---
// // const PlusIcon = ({ className }) => (
// //   <svg
// //     className={className}
// //     xmlns="http://www.w3.org/2000/svg"
// //     fill="none"
// //     viewBox="0 0 24 24"
// //     stroke="currentColor"
// //   >
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
// //   </svg>
// // );

// // const Trash2Icon = ({ className }) => (
// //   <svg
// //     className={className}
// //     xmlns="http://www.w3.org/2000/svg"
// //     fill="none"
// //     viewBox="0 0 24 24"
// //     stroke="currentColor"
// //   >
// //     <polyline points="3 6 5 6 21 6"></polyline>
// //     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
// //     <line x1="10" y1="11" x2="10" y2="17"></line>
// //     <line x1="14" y1="11" x2="14" y2="17"></line>
// //   </svg>
// // );

// // export default function TextToPoll() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [question, setQuestion] = useState(location.state?.question || "");
// //   const [options, setOptions] = useState(location.state?.options || ["", ""]);
// //   const [selectedDuration, setSelectedDuration] = useState(location.state?.selectedDuration || "24 hr");
// //   const [selectedAgeRange, setSelectedAgeRange] = useState(location.state?.selectedAgeRange || "13-17");
// //   const [shareToTrending, setShareToTrending] = useState(location.state?.shareToTrending || false);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const ageRanges = ["13-17", "18-24", "25-34", "35-44"];
// //   const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

// //   const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
// //   const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
// //   const handleChangeOption = (index, value) => {
// //     const newOptions = [...options];
// //     newOptions[index] = value;
// //     setOptions(newOptions);
// //   };

// //   const handlePreview = () => {
// //     const trimmedQuestion = question.trim();
// //     const filledOptions = options.filter(opt => opt.trim() !== "");

// //     if (!trimmedQuestion) return setErrorMessage("⚠️ Question is required.");
// //     if (filledOptions.length < 2) return setErrorMessage("⚠️ Please provide at least 2 options.");

// //     setErrorMessage("");
// //     navigate("/preview-text-poll", {
// //       state: { question: trimmedQuestion, options: filledOptions, selectedDuration, selectedAgeRange, shareToTrending },
// //     });
// //   };

// //   return (
// //     <div className="font-sans bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 m-auto w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">

// //     {/* ✅ Sticky Header */}
// //   <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
// //     <button
// //       className="text-gray-600 text-lg"
// //       onClick={() => navigate("/dashboard")}
// //     >
// //       ←
// //     </button>
// //     <h1 className="flex-1 text-center font-semibold">Text to poll</h1>
// //     <button className="text-gray-600">
// //       <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
// //     </button>
// //   </div>
// //       <div className="bg-gray-100 dark:bg-gray-800 m-auto p-4 min-h-screen w-full md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-32">
// //       {/* Question Input */}
// //       <div className="mb-6">
// //         <label className="block font-medium mb-2">Question</label>
// //         <input
// //           type="text"
// //           placeholder="Enter your question..."
// //           value={question}
// //           onChange={(e) => setQuestion(e.target.value)}
// //           className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
// //         />
// //       </div>

// //       {/* Options */}
// //       <div className="mb-6">
// //         <label className="block font-medium mb-2">Options</label>
// //         <div className="space-y-3">
// //           {options.map((opt, i) => (
// //             <div key={i} className="flex items-center gap-2">
// //               <span className="w-6 h-6 flex items-center justify-center bg-pink-100 dark:bg-pink-800 text-pink-500 dark:text-pink-300 rounded-full text-sm font-medium flex-shrink-0">
// //                 {i + 1}
// //               </span>
// //               <input
// //                 type="text"
// //                 placeholder={`Option ${i + 1}`}
// //                 value={opt}
// //                 onChange={(e) => handleChangeOption(i, e.target.value)}
// //                 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
// //               />
// //               {options.length > 2 && (
// //                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500 dark:text-pink-400 p-1">
// //                   <Trash2Icon className="w-5 h-5" />
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //         {options.length < 6 && (
// //           <button
// //             onClick={handleAddOption}
// //             className="mt-4 w-full border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg py-2 text-pink-500 dark:text-pink-300 flex items-center justify-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
// //           >
// //             <PlusIcon className="w-4 h-4" /> Add option
// //           </button>
// //         )}
// //         <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">You can add up to 6 options.</p>
// //       </div>

// //       {/* Audience Targeting */}
// //       <div className="mb-6">
// //         <h3 className="text-lg font-medium mb-4">Audience Targeting</h3>

// //         {/* Age Range */}
// //         <div className="mb-4">
// //           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Age range</p>
// //           <div className="flex flex-wrap gap-2">
// //             {ageRanges.map(range => (
// //               <button
// //                 key={range}
// //                 onClick={() => setSelectedAgeRange(range)}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                   selectedAgeRange === range
// //                     ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
// //                     : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
// //                 }`}
// //               >
// //                 {range}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Poll Duration */}
// //         <div className="mb-4">
// //           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Poll duration</p>
// //           <div className="flex flex-wrap gap-2">
// //             {durations.map(duration => (
// //               <button
// //                 key={duration}
// //                 onClick={() => setSelectedDuration(duration)}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                   selectedDuration === duration
// //                     ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
// //                     : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
// //                 }`}
// //               >
// //                 {duration}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Trending Checkbox */}
// //         <div className="flex items-center gap-3">
// //           <label className="flex items-center cursor-pointer">
// //             <div className="relative">
// //               <input
// //                 type="checkbox"
// //                 checked={shareToTrending}
// //                 onChange={(e) => setShareToTrending(e.target.checked)}
// //                 className="sr-only"
// //               />
// //               <div
// //                 className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
// //                   shareToTrending
// //                     ? "bg-pink-500 border-pink-500"
// //                     : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
// //                 }`}
// //               >
// //                 {shareToTrending && (
// //                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
// //                     <path
// //                       fillRule="evenodd"
// //                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                       clipRule="evenodd"
// //                     />
// //                   </svg>
// //                 )}
// //               </div>
// //             </div>
// //             <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Also share to Trending polls</span>
// //           </label>
// //         </div>
// //       </div>

// //       {/* Preview Button */}
// //       <button
// //         onClick={handlePreview}
// //         className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 transition-colors"
// //       >
// //         Preview poll
// //       </button>

// //       {/* Error Message */}
// //       {errorMessage && (
// //         <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
// //       )}
// //     </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import { Plus, Trash2, ArrowLeft, Bell, HelpCircle, Users } from "lucide-react";
// import useBreakpoint from '../hooks/useBreakpoint';
// import DesktopNav from '../components/layout/DesktopNav'; 
// // A reusable Card component to create the consistent layout
// const Card = ({ title, children, icon }) => (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
//         <div className="flex items-center gap-3">
//             {icon}
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
//         </div>
//         <div className="mt-5">{children}</div>
//     </div>
// );

// export default function TextToPoll() {
//     const navigate = useNavigate();
//     const location = useLocation();
//   const isDesktop = useBreakpoint();
//     // All your existing state and handler functions remain exactly the same
//     const [question, setQuestion] = useState(location.state?.question || "");
//     const [options, setOptions] = useState(location.state?.options || ["", ""]);
//     const [selectedDuration, setSelectedDuration] = useState(location.state?.selectedDuration || "1 hr");
//     const [selectedAgeRange, setSelectedAgeRange] = useState(location.state?.selectedAgeRange || "13-17");
//     const [shareToTrending, setShareToTrending] = useState(location.state?.shareToTrending || false);
//     const [errorMessage, setErrorMessage] = useState("");

//     const ageRanges = ["13-17", "18-24", "25-34", "35-44", "45+"];
//     const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

//     const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
//     const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
//     const handleChangeOption = (index, value) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handlePreview = () => {
//         const trimmedQuestion = question.trim();
//         const filledOptions = options.filter(opt => opt.trim() !== "");

//         if (!trimmedQuestion) return setErrorMessage("Question is required.");
//         if (filledOptions.length < 2) return setErrorMessage("Please provide at least 2 options.");

//         setErrorMessage("");
//         navigate("/preview-text-poll", {
//             state: { question: trimmedQuestion, options: filledOptions, selectedDuration, selectedAgeRange, shareToTrending },
//         });
//     };

//     return (
//         <div className="font-sans bg-gray-50 dark:bg-pyngl-dark min-h-screen">
//               {isDesktop ? (
//                 // On Desktop, show the main sticky nav and breadcrumbs
//                 <>
//                     <DesktopNav />
//                     <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
//                         <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
//                         <span className="mx-2">/</span>
//                         <span>Text to poll</span>
//                     </div>
//                 </>
//             ) : (
//                 // On Mobile/Tablet, show the simple header
//                <div className="sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200 dark:border-gray-700">
//                 <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-6 h-6" /></button>
//                 <h1 className="text-lg font-semibold">Text to Poll</h1>
//                 <button onClick={() => navigate('/notifications')} className="p-1"><Bell className="w-6 h-6" /></button>
//             </div>
//             )}

//             {/* Sticky Header */}
           

//             {/* Centered Content Wrapper */}
//             <div className="p-4 max-w-2xl mx-auto pb-28">
//                 <Card title="Question" >
//                     <div className="relative">
//                         <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Enter your question..."
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             className="w-full rounded-full border border-gray-300 dark:border-gray-600 pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pyngl-pink"
//                         />
//                     </div>
//                 </Card>

//                 <Card title="Options">
//                     <div className="space-y-3">
//                         {options.map((opt, i) => (
//                             <div key={i} className="flex items-center gap-3">
//                                 <span className="w-8 h-8 flex items-center justify-center bg-pink-100 dark:bg-pink-900/50 text-pink-500 dark:text-pink-300 rounded-lg text-sm font-bold flex-shrink-0">{i + 1}</span>
//                                 <input
//                                     type="text"
//                                     placeholder={`Option ${i + 1}`}
//                                     value={opt}
//                                     onChange={(e) => handleChangeOption(i, e.target.value)}
//                                     className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pyngl-pink"
//                                 />
//                                 {options.length > 2 && (
//                                     <button onClick={() => handleRemoveOption(i)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1"><Trash2 className="w-5 h-5" /></button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                     {options.length < 6 && (
//                         <button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg py-2.5 text-pink-500 dark:text-pink-300 flex items-center justify-center gap-2 hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors">
//                             <Plus className="w-4 h-4" /> Add option
//                         </button>
//                     )}
//                     <p className="text-gray-400 dark:text-gray-500 text-xs mt-2 text-center">You can add up to 6 options.</p>
//                 </Card>

//                 <Card title="Audience Targeting" icon={<Users className="w-5 h-5 text-gray-400" />}>
//                     <div className="mb-6">
//                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Age range</p>
//                         <div className="flex flex-wrap gap-2">
//                             {ageRanges.map(range => (
//                                 <button key={range} onClick={() => setSelectedAgeRange(range)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedAgeRange === range ? 'bg-pyngl-purple text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
//                                     {range}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <div>
//                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Poll duration</p>
//                         <div className="flex flex-wrap gap-2">
//                             {durations.map(duration => (
//                                 <button key={duration} onClick={() => setSelectedDuration(duration)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDuration === duration ? 'bg-pyngl-purple text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
//                                     {duration}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <label className="flex items-center cursor-pointer mt-6">
//                         <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink" />
//                         <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">Also share to Trending polls</span>
//                     </label>
//                 </Card>
//             </div>

//             {/* Sticky Footer */}
//           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 lg:relative lg:p-0 lg:bg-transparent lg:dark:bg-transparent lg:border-none lg:mt-6">
//                 <div className="max-w-2xl mx-auto">
//                     <button
//                         onClick={handlePreview}
//                         className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
//                     >
//                         Preview Poll
//                     </button>
//                     {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Plus, Trash2, ArrowLeft, Bell, HelpCircle, Users } from "lucide-react";
import useBreakpoint from '../hooks/useBreakpoint';
import DesktopNav from '../components/layout/DesktopNav';

const Card = ({ title, children, icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
    </div>
);

export default function TextToPoll() {
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useBreakpoint();
    const [question, setQuestion] = useState(location.state?.question || "");
    const [options, setOptions] = useState(location.state?.options || ["", ""]);
    const [selectedDuration, setSelectedDuration] = useState(location.state?.selectedDuration || "1 hr");
    const [selectedAgeRange, setSelectedAgeRange] = useState(location.state?.selectedAgeRange || "13-17");
    const [shareToTrending, setShareToTrending] = useState(location.state?.shareToTrending || false);
    const [errorMessage, setErrorMessage] = useState("");

    const ageRanges = ["13-17", "18-24", "25-34", "35-44", "45+"];
    const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

    const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
    const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
    const handleChangeOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handlePreview = () => {
        const trimmedQuestion = question.trim();
        const filledOptions = options.filter(opt => opt.trim() !== "");
        if (!trimmedQuestion) return setErrorMessage("Question is required.");
        if (filledOptions.length < 2) return setErrorMessage("Please provide at least 2 options.");
        setErrorMessage("");
        navigate("/preview-text-poll", {
            state: { question: trimmedQuestion, options: filledOptions, selectedDuration, selectedAgeRange, shareToTrending },
        });
    };

    return (
        <div className="font-sans bg-gray-50 dark:bg-pyngl-dark min-h-screen">
            {isDesktop ? (
                <>
                    <DesktopNav />
                    <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
                        <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
                        <span className="mx-2">/</span>
                        <span>Text to poll</span>
                    </div>
                </>
            ) : (
                <div className="sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-white/80 dark:bg-gray-800/80 dark:text-white backdrop-blur-md border-gray-200 dark:border-gray-700">
                    <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-6 h-6" /></button>
                    <h1 className="text-lg font-semibold">Text to Poll</h1>
                    <button onClick={() => navigate('/notifications')} className="p-1"><Bell className="w-6 h-6" /></button>
                </div>
            )}

            {/* Centered Content Wrapper */}
            <div className="p-4 max-w-2xl mx-auto pb-28 lg:pb-8">
                <Card title="Question" >
                    <div className="relative">
                        <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter your question..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full rounded-full border border-gray-300 dark:border-gray-600 pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pyngl-pink"
                        />
                    </div>
                </Card>

                <Card title="Options">
                    <div className="space-y-3">
                        {options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-8 h-8 flex items-center justify-center bg-pink-100 dark:bg-pink-900/50 text-pink-500 dark:text-pink-300 rounded-lg text-sm font-bold flex-shrink-0">{i + 1}</span>
                                <input
                                    type="text"
                                    placeholder={`Option ${i + 1}`}
                                    value={opt}
                                    onChange={(e) => handleChangeOption(i, e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pyngl-pink"
                                />
                                {options.length > 2 && (
                                    <button onClick={() => handleRemoveOption(i)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1"><Trash2 className="w-5 h-5" /></button>
                                )}
                            </div>
                        ))}
                    </div>
                    {options.length < 6 && (
                        <button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg py-2.5 text-pink-500 dark:text-pink-300 flex items-center justify-center gap-2 hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors">
                            <Plus className="w-4 h-4" /> Add option
                        </button>
                    )}
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-2 text-center">You can add up to 6 options.</p>
                </Card>

                <Card title="Audience Targeting" icon={<Users className="w-5 h-5 text-gray-400" />}>
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Age range</p>
                        <div className="flex flex-wrap gap-2">
                            {ageRanges.map(range => (
                                <button key={range} onClick={() => setSelectedAgeRange(range)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedAgeRange === range ? 'bg-pyngl-pink text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Poll duration</p>
                        <div className="flex flex-wrap gap-2">
                            {durations.map(duration => (
                                <button key={duration} onClick={() => setSelectedDuration(duration)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDuration === duration ? 'bg-pyngl-pink text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                                    {duration}
                                </button>
                            ))}
                        </div>
                    </div>
                    <label className="flex items-center cursor-pointer mt-6">
                        <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">Also share to Trending polls</span>
                    </label>
                </Card>

                {/* --- THIS IS THE FIX --- */}
                {/* The Desktop button is now correctly placed INSIDE the content wrapper */}
                {isDesktop && (
                    <div className="mt-6">
                        <button
                            onClick={handlePreview}
                            className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Preview Poll
                        </button>
                        {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
                    </div>
                )}
            </div>
            
            {/* The Mobile sticky footer is now correctly placed INSIDE the main return div */}
            {!isDesktop && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-2xl mx-auto">
                        <button
                            onClick={handlePreview}
                            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Preview Poll
                        </button>
                        {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
                    </div>
                </div>
            )}
            
        </div>
    );
}

