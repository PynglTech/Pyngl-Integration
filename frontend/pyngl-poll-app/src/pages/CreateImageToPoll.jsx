// // // import React, { useState, useRef } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { toast } from 'react-hot-toast';
// // // import apiClient from "../api/axiosConfig";
// // // import imageCompression from 'browser-image-compression';
// // // import { Plus, Trash2, Upload, Camera, Sparkles, X } from "lucide-react";

// // // export default function CreateImagePoll() {
// // //     // MERGED: State from both files
// // //     const [question, setQuestion] = useState("");
// // //     const [options, setOptions] = useState(["", ""]);
// // //     const [duration, setDuration] = useState("24h");
// // //     const [ageRange, setAgeRange] = useState("13-17"); // New from partner
// // //     const [shareToTrending, setShareToTrending] = useState(false); // New from partner
// // //     const [imageFile, setImageFile] = useState(null);
// // //     const [imagePreview, setImagePreview] = useState(null);
// // //     const [status, setStatus] = useState("idle");
// // //     const [errorMessage, setErrorMessage] = useState("");
// // //     const navigate = useNavigate();
// // //     const fileInputRef = useRef(null);
// // //     const cameraInputRef = useRef(null);

// // //     // MERGED: Constants from both files
// // //     const DURATION_OPTIONS = ["1h", "2h", "12h", "24h", "36h", "48h"];
// // //     const AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45+"];

// // //     // Your image handling functions are preserved (Unchanged)
// // //     const handleFileUpload = async (file) => {
// // //         if (!file) return;
// // //         setStatus("compressing");
// // //         setErrorMessage("");
// // //         try {
// // //             const compressedFile = await imageCompression(file, {
// // //                 maxSizeMB: 2,
// // //                 maxWidthOrHeight: 1920,
// // //                 useWebWorker: true,
// // //             });
// // //             setImageFile(compressedFile);
// // //             setImagePreview(URL.createObjectURL(compressedFile));
// // //             setStatus("ready");
// // //         } catch (error) {
// // //             console.error("Error compressing image:", error);
// // //             setErrorMessage("Could not process the image.");
// // //             setStatus("error");
// // //         }
// // //     };
// // //     const handleFileChange = (e) => handleFileUpload(e.target.files[0]);
    
// // //     // Your option handling functions are preserved (Unchanged)
// // //     const handleAddOption = () => { if (options.length < 6) setOptions([...options, ""]); };
// // //     const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
// // //     const handleChangeOption = (index, value) => {
// // //         const newOptions = [...options];
// // //         newOptions[index] = value;
// // //         setOptions(newOptions);
// // //     };

// // //     // Your robust preview handler is preserved and updated
// // //     const handlePreview = async () => {
// // //         if (!question.trim()) return setErrorMessage("⚠️ Question is required.");
// // //         if (options.filter(opt => opt.trim()).length < 2) return setErrorMessage("⚠️ Please provide at least 2 options.");
// // //         if (!imageFile) return setErrorMessage("⚠️ Please add an image.");
        
// // //         setStatus("uploading");
// // //         const toastId = toast.loading('Uploading image...');
        
// // //         try {
// // //             const formData = new FormData();
// // //             formData.append('image', imageFile);

// // //             const response = await apiClient.post("/api/polls/upload-image", formData, {
// // //                 headers: { 'Content-Type': 'multipart/form-data' }
// // //             });

// // //             toast.dismiss(toastId);
// // //             setErrorMessage("");

// // //             // UPDATED: Pass all new data to the preview page
// // //             navigate("/preview-image-poll", {
// // //                 state: {
// // //                     question: question.trim(),
// // //                     options: options.filter(opt => opt.trim()),
// // //                     duration,
// // //                     ageRange, // New
// // //                     shareToTrending, // New
// // //                     imageUrl: response.data.imageUrl,
// // //                     imagePublicId: response.data.imagePublicId,
// // //                     focalPoint: response.data.focalPoint 
// // //                 },
// // //             });
// // //         } catch (error) {
// // //             console.error("Upload failed:", error);
// // //             toast.error(error.response?.data?.error || "Upload failed.", { id: toastId });
// // //             setStatus("error");
// // //         }
// // //     };

// // //     return (
// // //         <div className="p-4 font-sans">
// // //             <div className="mb-6">
// // //                 <label className="block font-medium mb-2">Question</label>
// // //                 <input type="text" placeholder="e.g., Which logo do you prefer?" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400" />
// // //             </div>

// // //             <div className="mb-6">
// // //                 <label className="block font-medium mb-2">Image</label>
// // //                 <div className="rounded-xl border border-gray-300 p-4 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
// // //                     {status === 'idle' && (
// // //                         <div className="grid grid-cols-3 gap-3 w-full">
// // //                             <button onClick={() => fileInputRef.current.click()} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Upload className="w-5 h-5 mb-1" /> Upload</button>
// // //                             <button onClick={() => cameraInputRef.current.click()} className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"><Camera className="w-5 h-5 mb-1" /> Take Photo</button>
// // //                             <button disabled className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-400 cursor-not-allowed"><Sparkles className="w-5 h-5 mb-1 text-pink-300" /> AI (Soon)</button>
// // //                             <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
// // //                             <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
// // //                         </div>
// // //                     )}
// // //                     {(status === 'compressing' || status === 'uploading') && (
// // //                         <div className="text-center">
// // //                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
// // //                             <p>{status === 'compressing' ? 'Compressing...' : 'Uploading...'}</p>
// // //                         </div>
// // //                     )}
// // //                     {(status === 'ready' || status === 'error') && imagePreview && (
// // //                         <div className="relative w-full h-full">
// // //                             <img src={imagePreview} alt="Poll Preview" className="rounded-md max-h-48 object-contain" />
// // //                             <button onClick={() => { setImageFile(null); setImagePreview(null); setStatus('idle'); }} className="absolute top-2 right-2 bg-white/70 rounded-full p-1 shadow-md backdrop-blur-sm"><X className="w-4 h-4" /></button>
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             </div>

// // //             <div className="mb-6">
// // //                 <label className="block font-medium mb-2">Options</label>
// // //                 <div className="space-y-3">
// // //                     {options.map((opt, i) => (
// // //                         <div key={i} className="flex items-center gap-2">
// // //                             <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium">{i + 1}</span>
// // //                             <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleChangeOption(i, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
// // //                             {options.length > 2 && (
// // //                                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500"><Trash2 className="w-5 h-5" /></button>
// // //                             )}
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //                 {options.length < 6 && (
// // //                     <button onClick={handleAddOption} className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1 hover:bg-pink-50"><Plus className="w-4 h-4" /> Add option</button>
// // //                 )}
// // //             </div>

// // //             <div className="mb-6">
// // //                 <label className="block font-medium mb-2">Poll Duration</label>
// // //                 <div className="flex flex-wrap gap-2">
// // //                     {DURATION_OPTIONS.map((d) => (
// // //                         <button key={d} onClick={() => setDuration(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${duration === d ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-pink-100"}`}>
// // //                             {d.replace("h", " Hours")}
// // //                         </button>
// // //                     ))}
// // //                 </div>
// // //             </div>
// // //                         <div>
// // //                 <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Targeting</h3>
// // //                 <div className="mb-4">
// // //                     <p className="text-sm text-gray-600 mb-3">Age range</p>
// // //                     <div className="flex flex-wrap gap-2">
// // //                         {AGE_RANGES.map((range) => (
// // //                             <button key={range} onClick={() => setAgeRange(range)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${ageRange === range ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
// // //                                 {range}
// // //                             </button>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* --- NEW: Trending Polls Checkbox --- */}
// // //             <div className="flex items-center gap-3">
// // //                 <label className="flex items-center cursor-pointer">
// // //                     <div className="relative">
// // //                         <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="sr-only" />
// // //                         <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${shareToTrending ? "bg-pink-500 border-pink-500" : "bg-white border-gray-300"}`}>
// // //                             {shareToTrending && (<svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>)}
// // //                         </div>
// // //                     </div>
// // //                     <span className="text-sm text-gray-600 ml-2">Also share to Trending polls</span>
// // //                 </label>
// // //             </div>
// // //             <button onClick={handlePreview} disabled={status === 'uploading' || status === 'compressing'} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 disabled:opacity-50">
// // //                 {status === 'uploading' ? 'Uploading...' : 'Preview Poll'}
// // //             </button>

// // //             {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
// // //         </div>
// // //     );
// // // }

// // import React, { useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-hot-toast";
// // import apiClient from "../api/axiosConfig";
// // import imageCompression from "browser-image-compression";
// // import { Plus, Trash2, Upload, Camera, Sparkles, X } from "lucide-react";

// // export default function CreateImagePoll() {
// //     const [question, setQuestion] = useState("");
// //     const [options, setOptions] = useState(["", ""]);
// //     const [selectedDuration, setSelectedDuration] = useState("24 hr");
// //     const [selectedAgeRange, setSelectedAgeRange] = useState("13-17");
// //     const [shareToTrending, setShareToTrending] = useState(false);
// //     const [imageFile, setImageFile] = useState(null);
// //     const [imagePreview, setImagePreview] = useState(null);
// //     const [status, setStatus] = useState("idle");
// //     const [errorMessage, setErrorMessage] = useState("");
// //     const navigate = useNavigate();
// //     const fileInputRef = useRef(null);
// //     const cameraInputRef = useRef(null);

// //     const ageRanges = ["13-17", "18-24", "25-34", "35-44"];
// //     const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

// //     // All your existing functions (handleFileUpload, handleFileChange, handleAddOption, etc.)
// //     // remain exactly the same.
// //     // ...

// //     const handleFileUpload = async (file) => {
// //         if (!file) return;
// //         setStatus("compressing");
// //         setErrorMessage("");
// //         try {
// //             const compressedFile = await imageCompression(file, {
// //                 maxSizeMB: 2,
// //                 maxWidthOrHeight: 1920,
// //                 useWebWorker: true,
// //             });
// //             setImageFile(compressedFile);
// //             setImagePreview(URL.createObjectURL(compressedFile));
// //             setStatus("ready");
// //         } catch (error) {
// //             console.error("Error compressing image:", error);
// //             setErrorMessage("Could not process the image.");
// //             setStatus("error");
// //         }
// //     };

// //     const handleFileChange = (e) => handleFileUpload(e.target.files[0]);
// //     const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
// //     const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
// //     const handleChangeOption = (index, value) => {
// //         const newOptions = [...options];
// //         newOptions[index] = value;
// //         setOptions(newOptions);
// //     };

// //     const handlePreview = async () => {
// //         if (!question.trim()) return setErrorMessage("⚠️ Question is required.");
// //         if (options.filter((opt) => opt.trim()).length < 2)
// //             return setErrorMessage("⚠️ Please provide at least 2 options.");
// //         if (!imageFile) return setErrorMessage("⚠️ Please add an image.");

// //         setStatus("uploading");
// //         const toastId = toast.loading("Saving poll...");

// //         try {
// //             const formData = new FormData();
// //             formData.append("image", imageFile);

// //             const uploadRes = await apiClient.post("/api/polls/upload-image", formData, {
// //                 headers: { "Content-Type": "multipart/form-data" },
// //             });

// //             const pollData = {
// //                 question: question.trim(),
// //                 options: options.filter((opt) => opt.trim()),
// //                 type: "image",
// //                 duration: selectedDuration,
// //                 ageRange: selectedAgeRange,
// //                 imageUrl: uploadRes.data.imageUrl,
// //                 imagePublicId: uploadRes.data.imagePublicId,
// //                 focalPoint: uploadRes.data.focalPoint,
// //                 shareToTrending,
// //             };

// //             const createRes = await apiClient.post("/api/polls/create-poll", pollData);

// //             toast.dismiss(toastId);
// //             setErrorMessage("");

// //             navigate("/preview-image-poll", { state: { createdPoll: createRes.data } });
// //         } catch (error) {
// //             console.error("Poll creation failed:", error);
// //             toast.error(error.response?.data?.error || "Poll creation failed.", { id: toastId });
// //             setStatus("error");
// //         }
// //     };

// //   return (
// //     <div className="p-4 font-sans min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
// //             {/* Question */}
// //             <div className="mb-6">
// //                 <label className="block font-medium mb-2">Question</label>
// //                 <input
// //                     type="text"
// //                     placeholder="e.g., Which logo do you prefer?"
// //                     value={question}
// //                     onChange={(e) => setQuestion(e.target.value)}
// //                     className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
// //                 />
// //             </div>

// //        <div className="mb-6">
// //                 <label className="block font-medium mb-2">Image</label>
// //                  <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden bg-white dark:bg-gray-800">
// //             {status === "idle" && (
// //             <div className="grid grid-cols-3 gap-3 w-full">
// //               <button
// //                 onClick={() => fileInputRef.current.click()}
// //                 className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"
// //               >
// //                 <Upload className="w-5 h-5 mb-1" /> Upload
// //               </button>
// //               <button
// //                 onClick={() => cameraInputRef.current.click()}
// //                 className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 hover:bg-gray-50"
// //               >
// //                 <Camera className="w-5 h-5 mb-1" /> Take Photo
// //               </button>
// //               <button
// //                 disabled
// //                 className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-400 cursor-not-allowed"
// //               >
// //                 <Sparkles className="w-5 h-5 mb-1 text-pink-300" /> AI (Soon)
// //               </button>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 ref={fileInputRef}
// //                 onChange={handleFileChange}
// //                 className="hidden"
// //               />
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 capture="environment"
// //                 ref={cameraInputRef}
// //                 onChange={handleFileChange}
// //                 className="hidden"
// //               />
// //             </div>
// //           )}
// //           {(status === "compressing" || status === "uploading") && (
// //             <div className="text-center">
// //               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
// //               <p>
// //                 {status === "compressing" ? "Compressing..." : "Uploading..."}
// //               </p>
// //             </div>
// //           )}
// //           {(status === "ready" || status === "error") && imagePreview && (
// //             <div className="relative w-full h-full">
// //               <img
// //                 src={imagePreview}
// //                 alt="Poll Preview"
// //                 className="rounded-md max-h-48 object-contain"
// //               />
// //               <button
// //                 onClick={() => {
// //                   setImageFile(null);
// //                   setImagePreview(null);
// //                   setStatus("idle");
// //                 }}
// //                 className="absolute top-2 right-2 bg-white/70 rounded-full p-1 shadow-md backdrop-blur-sm"
// //               >
// //                 <X className="w-4 h-4" />
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //   <div className="mb-6">
// //                 <label className="block font-medium mb-2">Options</label>
// //                 <div className="space-y-3">
// //                     {options.map((opt, i) => (
// //                         <div key={i} className="flex items-center gap-2">
// //                             <span className="w-6 h-6 flex items-center justify-center bg-pink-100 dark:bg-pink-800 text-pink-500 dark:text-pink-300 rounded-full text-sm font-medium flex-shrink-0">{i + 1}</span>
// //                             <input
// //                                 type="text"
// //                                 placeholder={`Option ${i + 1}`}
// //                                 value={opt}
// //                                 onChange={(e) => handleChangeOption(i, e.target.value)}
// //                                 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
// //                             />
// //                             {options.length > 2 && (
// //                                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500 dark:text-pink-400 p-1">
// //                                     <Trash2 className="w-5 h-5" />
// //                                 </button>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //                 {options.length < 6 && (
// //                     <button
// //                         onClick={handleAddOption}
// //                         className="mt-4 w-full border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg py-2 text-pink-500 dark:text-pink-300 flex items-center justify-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
// //                     >
// //                         <Plus className="w-4 h-4" /> Add option
// //                     </button>
// //                 )}
// //             </div>

// //       <div className="mb-6">
// //                 <h3 className="text-lg font-medium mb-4">Audience Targeting</h3>
// //                 {/* Age Range */}
// //                 <div className="mb-4">
// //                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Age range</p>
// //                     <div className="flex flex-wrap gap-2">
// //                         {ageRanges.map((range) => (
// //                             <button
// //                                 key={range}
// //                                 onClick={() => setSelectedAgeRange(range)}
// //                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                                     selectedAgeRange === range
// //                                         ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
// //                                         : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
// //                                 }`}
// //                             >
// //                                 {range}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* Poll Duration */}
// //                 <div className="mb-4">
// //                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Poll duration</p>
// //                     <div className="flex flex-wrap gap-2">
// //                         {durations.map((duration) => (
// //                             <button
// //                                 key={duration}
// //                                 onClick={() => setSelectedDuration(duration)}
// //                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                                     selectedDuration === duration
// //                                         ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
// //                                         : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
// //                                 }`}
// //                             >
// //                                 {duration}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* Trending Checkbox */}
// //                 <div className="flex items-center gap-3">
// //                     <label className="flex items-center cursor-pointer">
// //                         <div className="relative">
// //                             <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="sr-only" />
// //                             <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
// //                                 shareToTrending
// //                                     ? "bg-pink-500 border-pink-500"
// //                                     : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
// //                             }`}>
// //                                 {shareToTrending && (
// //                                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
// //                                         <path
// //                                             fillRule="evenodd"
// //                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                                             clipRule="evenodd"
// //                                         />
// //                                     </svg>
// //                                 )}
// //                             </div>
// //                         </div>
// //                         <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Also share to Trending polls</span>
// //                     </label>
// //                 </div>
// //             </div>

// //             <button
// //                 onClick={handlePreview}
// //                 disabled={status === "compressing" || status === "uploading"}
// //                 className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 transition-colors"
// //             >
// //                 Preview poll
// //             </button>

// //             {errorMessage && (
// //                 <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
// //             )}
// //         </div>
// //     );
// // }
// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import apiClient from "../api/axiosConfig";
// import imageCompression from "browser-image-compression";
// import { Plus, Trash2, Upload, Camera, Sparkles, X } from "lucide-react";

// export default function CreateImagePoll() {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", ""]);
//   const [selectedDuration, setSelectedDuration] = useState("24 hr");
//   const [selectedAgeRange, setSelectedAgeRange] = useState("13-17");
//   const [shareToTrending, setShareToTrending] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [status, setStatus] = useState("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const cameraInputRef = useRef(null);

//   const ageRanges = ["13-17", "18-24", "25-34", "35-44"];
//   const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setStatus("compressing");
//     setErrorMessage("");
//     try {
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 2,
//         maxWidthOrHeight: 1920,
//         useWebWorker: true,
//       });

//       setImageFile(compressedFile);
//       setImagePreview(URL.createObjectURL(compressedFile));
//       setStatus("ready");
//     } catch (error) {
//       console.error("Error compressing image:", error);
//       setErrorMessage("Could not process the image.");
//       setStatus("error");
//     }
//   };

//   const handleFileChange = (e) => handleFileUpload(e.target.files[0]);
//   const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
//   const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
//   const handleChangeOption = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handlePreview = async () => {
//     if (!question.trim()) return setErrorMessage("⚠️ Question is required.");
//     if (options.filter((opt) => opt.trim()).length < 2)
//       return setErrorMessage("⚠️ Please provide at least 2 options.");
//     if (!imageFile) return setErrorMessage("⚠️ Please add an image.");

//     setStatus("uploading");
//     const toastId = toast.loading("Saving poll...");

//     try {
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const uploadRes = await apiClient.post("/api/polls/upload-image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const pollData = {
//         question: question.trim(),
//         options: options.filter((opt) => opt.trim()),
//         type: "image",
//         duration: selectedDuration,
//         ageRange: selectedAgeRange,
//         imageUrl: uploadRes.data.imageUrl,
//         imagePublicId: uploadRes.data.imagePublicId,
//         focalPoint: uploadRes.data.focalPoint,
//         shareToTrending,
//       };

//       const createRes = await apiClient.post("/api/polls/create-poll", pollData);

//       toast.dismiss(toastId);
//       setErrorMessage("");

//       navigate("/preview-image-poll", { state: { createdPoll: createRes.data } });
//     } catch (error) {
//       console.error("Poll creation failed:", error);
//       toast.error(error.response?.data?.error || "Poll creation failed.", { id: toastId });
//       setStatus("error");
//     }
//   };

//   return (
//     <div className="font-sans bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 m-auto w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">

//     {/* ✅ Sticky Header */}
//   <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
//     <button
//       className="text-gray-600 text-lg"
//       onClick={() => navigate("/dashboard")}
//     >
//       ←
//     </button>
//     <h1 className="flex-1 text-center font-semibold">Image to poll</h1>
//     <button className="text-gray-600">
//       <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
//     </button>
//   </div>
//       <div className="bg-gray-100 dark:bg-gray-800 m-auto p-4 w-full md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-32 pt-4">
//       {/* Question */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Question</label>
//         <input
//           type="text"
//           placeholder="e.g., Which logo do you prefer?"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
//         />
//       </div>

//       {/* Image Upload */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Image</label>
//         <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden bg-white dark:bg-gray-800">
//           {status === "idle" && (
//             <div className="grid grid-cols-3 gap-3 w-full">
//               <button
//                 onClick={() => fileInputRef.current.click()}
//                 className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <Upload className="w-5 h-5 mb-1" /> Upload
//               </button>
//               <button
//                 onClick={() => cameraInputRef.current.click()}
//                 className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <Camera className="w-5 h-5 mb-1" /> Take Photo
//               </button>
//               <button
//                 disabled
//                 className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed"
//               >
//                 <Sparkles className="w-5 h-5 mb-1 text-pink-300" /> AI (Soon)
//               </button>
//               <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
//               <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
//             </div>
//           )}
//           {(status === "compressing" || status === "uploading") && (
//             <div className="text-center text-gray-700 dark:text-gray-300">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
//               <p>{status === "compressing" ? "Compressing..." : "Uploading..."}</p>
//             </div>
//           )}
//           {(status === "ready" || status === "error") && imagePreview && (
//             <div className="relative w-full h-full">
//               <img src={imagePreview} alt="Poll Preview" className="rounded-md max-h-48 object-contain" />
//               <button
//                 onClick={() => { setImageFile(null); setImagePreview(null); setStatus("idle"); }}
//                 className="absolute top-2 right-2 bg-white/70 dark:bg-gray-700/70 rounded-full p-1 shadow-md backdrop-blur-sm"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Options */}
//       <div className="mb-6">
//         <label className="block font-medium mb-2">Options</label>
//         <div className="space-y-3">
//           {options.map((opt, i) => (
//             <div key={i} className="flex items-center gap-2">
//               <span className="w-6 h-6 flex items-center justify-center bg-pink-100 dark:bg-pink-800 text-pink-500 dark:text-pink-300 rounded-full text-sm font-medium flex-shrink-0">{i + 1}</span>
//               <input
//                 type="text"
//                 placeholder={`Option ${i + 1}`}
//                 value={opt}
//                 onChange={(e) => handleChangeOption(i, e.target.value)}
//                 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
//               />
//               {options.length > 2 && (
//                 <button onClick={() => handleRemoveOption(i)} className="text-pink-500 dark:text-pink-400 p-1">
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         {options.length < 6 && (
//           <button
//             onClick={handleAddOption}
//             className="mt-4 w-full border-2 border-dashed border-pink-300 dark:border-pink-700 rounded-lg py-2 text-pink-500 dark:text-pink-300 flex items-center justify-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
//           >
//             <Plus className="w-4 h-4" /> Add option
//           </button>
//         )}
//       </div>

//       {/* Audience Targeting */}
//       <div className="mb-6">
//         <h3 className="text-lg font-medium mb-4">Audience Targeting</h3>
//         {/* Age Range */}
//         <div className="mb-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Age range</p>
//           <div className="flex flex-wrap gap-2">
//             {ageRanges.map((range) => (
//               <button
//                 key={range}
//                 onClick={() => setSelectedAgeRange(range)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   selectedAgeRange === range
//                     ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
//                     : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {range}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Poll Duration */}
//         <div className="mb-4">
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Poll duration</p>
//           <div className="flex flex-wrap gap-2">
//             {durations.map((duration) => (
//               <button
//                 key={duration}
//                 onClick={() => setSelectedDuration(duration)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   selectedDuration === duration
//                     ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
//                     : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {duration}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Trending Checkbox */}
//         <div className="flex items-center gap-3">
//           <label className="flex items-center cursor-pointer">
//             <div className="relative">
//               <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="sr-only" />
//               <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
//                 shareToTrending
//                   ? "bg-pink-500 border-pink-500"
//                   : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//               }`}>
//                 {shareToTrending && (
//                   <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 )}
//               </div>
//             </div>
//             <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Also share to Trending polls</span>
//           </label>
//         </div>
//       </div>

//       {/* Preview Button */}
//       <button
//         onClick={handlePreview}
//         disabled={status === "compressing" || status === "uploading"}
//         className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 transition-colors"
//       >
//         Preview poll
//       </button>

//       {/* Error Message */}
//       {errorMessage && (
//         <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
//       )}
//     </div>
//     </div>
//   );
// }
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiClient from "../api/axiosConfig";
import imageCompression from "browser-image-compression";
import { Plus, Trash2, Upload, Camera, Sparkles, X, HelpCircle, ArrowLeft, Users, Loader, Bell } from "lucide-react";
import useBreakpoint from '../hooks/useBreakpoint';
import DesktopNav from '../components/layout/DesktopNav'; 
// Reusable Card component for the new layout
const Card = ({ title, children, icon }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
    </div>
);

export default function CreateImagePoll() {
    const navigate = useNavigate();
      const isDesktop = useBreakpoint();
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [selectedDuration, setSelectedDuration] = useState("1 hr");
    const [selectedAgeRange, setSelectedAgeRange] = useState("13-17");
    const [shareToTrending, setShareToTrending] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    const ageRanges = ["13-17", "18-24", "25-34", "35-44", "45+"];
    const durations = ["1 hr", "2 hr", "24 hr", "36 hr", "48 hr"];

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
    const handleAddOption = () => options.length < 6 && setOptions([...options, ""]);
    const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
    const handleChangeOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handlePreview = async () => {
        if (!question.trim()) return setErrorMessage("⚠️ Question is required.");
        if (options.filter((opt) => opt.trim()).length < 2) return setErrorMessage("⚠️ Please provide at least 2 options.");
        if (!imageFile) return setErrorMessage("⚠️ Please add an image.");
        setStatus("uploading");
        const toastId = toast.loading("Saving poll...");
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            const uploadRes = await apiClient.post("/api/polls/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const pollData = {
                question: question.trim(),
                options: options.filter((opt) => opt.trim()),
                type: "image",
                duration: selectedDuration,
                ageRange: selectedAgeRange,
                imageUrl: uploadRes.data.imageUrl,
                imagePublicId: uploadRes.data.imagePublicId,
                focalPoint: uploadRes.data.focalPoint,
                shareToTrending,
            };
            const createRes = await apiClient.post("/api/polls/create-poll", pollData);
            toast.dismiss(toastId);
            setErrorMessage("");
            navigate("/preview-image-poll", { state: { createdPoll: createRes.data } });
        } catch (error) {
            console.error("Poll creation failed:", error);
            toast.error(error.response?.data?.error || "Poll creation failed.", { id: toastId });
            setStatus("error");
        }
    };

return (
    <div className="font-sans bg-gray-50 dark:bg-pyngl-dark min-h-screen">
         {isDesktop ? (
                // On Desktop, show the main sticky nav and breadcrumbs
                <>
                    <DesktopNav />
                    <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
                        <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
                        <span className="mx-2">/</span>
                        <span>Image to poll</span>
                    </div>
                </>
            ) : (
                // On Mobile/Tablet, show the simple header
               <div className="sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200 dark:border-gray-700">
                <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-6 h-6" /></button>
                <h1 className="text-lg font-semibold">Image to Poll</h1>
                <button onClick={() => navigate('/notifications')} className="p-1"><Bell className="w-6 h-6" /></button>
            </div>
            )}
        {/* Sticky Header */}
       

        {/* Centered Content Wrapper */}
         <div className="p-4 max-w-2xl mx-auto pb-28 lg:pb-12">
            <Card title="Question" icon={<HelpCircle className="w-5 h-5 text-gray-400" />}>
                <div className="relative">
                    <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Which meeting time works best?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full rounded-full border border-gray-300 dark:border-gray-600 pl-12 pr-4 py-3 bg-gray-100 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pyngl-pink"
                    />
                </div>
            </Card>

            <Card title="Images" icon={<Camera className="w-5 h-5 text-gray-400" />}>
                <div className="rounded-xl flex flex-col items-center justify-center min-h-[150px] relative">
                    {status === "idle" && (
                        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                            <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <Upload className="w-4 h-4" /> Upload Image
                            </button>
                            <button onClick={() => cameraInputRef.current.click()} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <Camera className="w-4 h-4" /> Take Photo
                            </button>
                            <button disabled className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed">
                                <Sparkles className="w-4 h-4 text-pink-300 dark:text-pink-600" /> AI image gen
                            </button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
                        </div>
                    )}
                    {(status === "compressing" || status === "uploading") && (
                        <div className="flex flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300">
                            <Loader className="animate-spin h-8 w-8 text-pyngl-pink mx-auto mb-2" />
                            <p>{status === "compressing" ? "Compressing..." : "Uploading..."}</p>
                        </div>
                    )}
                    {imagePreview && (
                        <div className="relative w-full flex items-center justify-center">
                            <img src={imagePreview} alt="Poll Preview" className="rounded-lg max-h-48 object-contain" />
                            <button onClick={() => { setImageFile(null); setImagePreview(null); setStatus("idle"); }} className="absolute top-0 right-14 bg-white/70 dark:bg-gray-900/70 rounded-full p-1.5 shadow-md hover:scale-110 transition-transform">
                                <X className="w-4 h-4 dark:text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </Card>

            <Card title="Options" icon={<Plus className="w-5 h-5 text-gray-400" />}>
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
          {/* Desktop-only button, part of the normal flow */}
                {isDesktop && (
                    <div className="mt-6">
                        <button
                            onClick={handlePreview}
                            disabled={status === "compressing" || status === "uploading"}
                            className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Preview Poll
                        </button>
                        {errorMessage && <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>}
                    </div>
                )}
            </div>

            {/* Mobile-only sticky footer */}
            {!isDesktop && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-2xl mx-auto">
                        <button
                            onClick={handlePreview}
                            disabled={status === "compressing" || status === "uploading"}
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
