import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TextToPoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Add new option
  const handleAddOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  // Remove option
  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // Change option text
  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Preview poll
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
    navigate("/preview-text-to-poll", {
      state: { question: trimmedQuestion, options: filledOptions },
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button className="text-gray-600 text-lg">←</button>
        <h1 className="flex-1 text-center font-semibold">Text to poll</h1>
        <button className="text-gray-600">
          <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
        </button>
      </div>

      {/* Question Input */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Question</label>
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Options */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Options</label>
        <div className="space-y-3">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-sm font-medium">
                {i + 1}
              </span>
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleChangeOption(i, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {options.length > 2 && (
                <button
                  onClick={() => handleRemoveOption(i)}
                  className="text-pink-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {options.length < 6 && (
          <button
            onClick={handleAddOption}
            className="mt-4 w-full border-2 border-dashed border-pink-300 rounded-lg py-2 text-pink-500 flex items-center justify-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add option
          </button>
        )}
        <p className="text-gray-400 text-xs mt-2">
          You can add up to 6 options.
        </p>
      </div>

      {/* Preview Button */}
      <button
        onClick={handlePreview}
        className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500"
      >
        Preview poll
      </button>

      {errorMessage && (
        <p className="text-sm text-red-500 mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
