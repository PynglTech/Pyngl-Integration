import React, { useState, useRef } from "react";
import { Plus, Trash2, Upload, Camera, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  // Image states
  const [imageUrl, setImageUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | generated | uploaded | error
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const navigate = useNavigate();

  const handlePreview = () => {
    // Trim values
    const trimmedQuestion = question.trim();
    const filledOptions = options.filter((opt) => opt.trim() !== "");

    // Validation checks
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

    // If all good → clear error and navigate
    setErrorMessage("");
    navigate("/preview-image-to-poll", {
      state: { question: trimmedQuestion, options: filledOptions, imageUrl },
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

  // Handle file/image change
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

  // AI image generation
  const handleGenerateImage = async () => {
    if (!question.trim()) {
      setErrorMessage("⚠️ Please enter a question.");
      return;
    }

    const filledOptions = options.filter((o) => o.trim());
    if (filledOptions.length < 2) {
      setErrorMessage("⚠️ Please add at least 2 options.");
      return;
    }

    setErrorMessage("");
    const prompt = `Poll: ${question}. Options: ${filledOptions.join(", ")}`;

    setStatus("loading");
    setImageUrl(null);

    try {
      const response = await fetch("http://192.168.1.4:8000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
        setStatus("generated");
      } else {
        setStatus("error");
        setErrorMessage("❌ Failed to generate image.");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
      setErrorMessage("❌ Something went wrong. Please try again.");
    }
  };

  // Remove uploaded/taken image
  const handleRemoveImage = () => {
    setImageUrl(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button className="text-gray-600 text-lg">←</button>
        <h1 className="flex-1 text-center font-semibold">Image to poll</h1>
        <button className="text-gray-600">
          <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
        </button>
      </div>

      {/* Question */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Question</label>
        <input
          type="text"
          placeholder="⏰ Which meeting time works best?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Images */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Images</label>
        <div className="rounded-xl border border-gray-300 p-4 flex flex-col items-center justify-center min-h-[300px] h-[300px] relative overflow-hidden">
          {status === "idle" && (
            <div className="grid grid-cols-3 gap-3 w-full">
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600"
              >
                <Upload className="w-5 h-5 mb-1" /> Upload
              </button>
              <button
                onClick={() => cameraInputRef.current.click()}
                className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600"
              >
                <Camera className="w-5 h-5 mb-1" /> Take Photo
              </button>
              <button
                onClick={handleGenerateImage}
                className="flex flex-col items-center justify-center border rounded-lg py-4 text-sm text-gray-600"
              >
                <Sparkles className="w-5 h-5 mb-1 text-pink-500" /> AI image gen
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-pink-400 border-t-transparent mb-3"></div>
              <p className="text-sm text-gray-500">Getting your Image ready…</p>
            </div>
          )}

          {(status === "generated" || status === "uploaded") && imageUrl && (
            <div className="relative w-full h-full">
              <img
                src={imageUrl}
                alt="Generated"
                className="rounded-xl w-full h-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          {errorMessage && status === "idle" && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        {status === "generated" && (
          <button
            onClick={handleGenerateImage}
            className="mt-3 w-full py-2 rounded-full text-white font-medium bg-gradient-to-r from-pink-500 to-purple-500"
          >
            Re-generate
          </button>
        )}
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
