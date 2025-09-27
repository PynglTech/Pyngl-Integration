    import React from "react";
    import { X } from "lucide-react";

    export default function InstagramPreview({ poll, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50">
        <div className="bg-white w-full rounded-t-3xl shadow-xl animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3 className="font-semibold text-lg text-gray-900 text-center">Preview</h3>
            <button onClick={onClose} className="p-1">
                <X size={22} className="text-gray-600" />
            </button>
            </div>

            {/* Content */}
            <div className="p-5">
            <p className="text-sm text-green-600 mb-2">
                ● Auto-crop confidence: 90%
            </p>

            <div className="rounded-2xl overflow-hidden border shadow-sm bg-white">
                {/* Question */}
                <div className="p-3 text-base font-medium text-gray-900">
                {poll.question}
                </div>

                {/* Image */}
                <img
                src={poll.image || "https://placehold.co/400x300"}
                alt="Poll Preview"
                className="w-full object-cover"
                />

                {/* Options */}
                <div className="p-3 space-y-2">
                {poll.options?.map((opt, idx) => (
                    <div
                    key={opt._id || idx}
                    className="w-full py-2 px-3 border rounded-xl text-gray-800 text-sm"
                    >
                    {opt.text || String(opt)}
                    </div>
                ))}
                </div>

                <div className="text-xs text-gray-500 px-3 pb-3">
                Reels - 9:16 &nbsp; | &nbsp; 1080 × 1920
                </div>
            </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-6">
            <button
                onClick={onConfirm}
                className="w-full py-3 bg-pink-500 text-white rounded-full font-semibold text-base shadow-md hover:bg-pink-600"
            >
                Share
            </button>
            </div>
        </div>
        </div>
    );
    }
        