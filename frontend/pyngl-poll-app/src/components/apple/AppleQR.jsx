import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function AppleQR({ pollId }) {
  // 1. Your Apple Business ID (BCID)
  const BUSINESS_ID = "urn:biz:539765e3-16f4-4441-95f5-9b984f5617e5";
  
  // 2. Construct the hidden trigger text
  const triggerText = `Start Poll #${pollId}`;
  
  // 3. Create the Deep Link
  // Format: https://bcrw.apple.com/urn:biz:{id}?body={encoded_text}
  const qrUrl = `https://bcrw.apple.com/${BUSINESS_ID}?body=${encodeURIComponent(triggerText)}`;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Vote via Apple Messages</h3>
      
      {/* The QR Code */}
      <div className="p-2 bg-white rounded-lg border-2 border-gray-100">
        <QRCodeSVG 
          value={qrUrl} 
          size={200}
          level={"H"} // High error correction
          includeMargin={true}
          imageSettings={{
            src: "/icons/apple-icon.svg", // Optional: Apple Logo in center
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center max-w-[200px]">
        Scan with your iPhone camera to start the poll.
      </p>
    </div>
  );
}