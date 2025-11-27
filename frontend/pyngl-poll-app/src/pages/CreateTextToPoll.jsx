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
                    <label className="flex items-center cursor-pointer mt-6 pb-10">
                        <input type="checkbox" checked={shareToTrending} onChange={(e) => setShareToTrending(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">Also share to Trending polls</span>
                    </label>
                </Card>

                {/* --- THIS IS THE FIX --- */}
                {/* The Desktop button is now correctly placed INSIDE the content wrapper */}
                {isDesktop && (
                    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-xl mx-auto">

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

