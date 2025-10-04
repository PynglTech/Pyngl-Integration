import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X } from "lucide-react";
import { getCroppedImg } from "../../utils/cropUtils";

export default function ImageEditPreview({ imageSrc, onSave, onClose, aspect = 9 / 16 }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImageUrl);
    } catch (err) {
      console.error("Crop failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Crop Preview
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X size={22} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Crop Area */}
      <div className="flex-1 flex items-center justify-center bg-black dark:bg-gray-950">
        <div className="relative w-full h-[65vh]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect} // dynamic crop ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={true}
            showGrid={false}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          className="w-full py-3 bg-pink-500 text-white rounded-full font-semibold text-base shadow hover:bg-pink-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
