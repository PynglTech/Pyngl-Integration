import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

export default function StyledQRCode({ pollUrl, hideLinkForScreenshot = false }) {
    const [isCopied, setIsCopied] = useState(false);
    const qrRef = useRef(null);

    // Create and style QR code
    useEffect(() => {
        if (!pollUrl || !qrRef.current) return;

        const qrCode = new QRCodeStyling({
            width: 150,
            height: 150,
            data: pollUrl,
            image: '/Logo.jpg',
            dotsOptions: {
                color: "#4a044e",
                type: "dots"
            },
            backgroundOptions: {
                color: "#ffffff",
            },
            cornersSquareOptions: {
                color: "#701a75",
                type: "extra-rounded"
            },
            imageOptions: {
                imageSize: 0.4,
                margin: 4
            }
        });

        qrRef.current.innerHTML = "";
        qrCode.append(qrRef.current);

    }, [pollUrl]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pollUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col items-center gap-4 shadow-sm transition-colors">
            {/* QR Code */}
            <div ref={qrRef} /> 

            {/* Conditionally hide link when downloading */}
            {!hideLinkForScreenshot && (
                <div 
                    className="flex items-center w-full border rounded-full pl-4 pr-2 py-2 bg-pink-50 dark:bg-gray-700 border-pink-200 dark:border-gray-600 text-pink-700 dark:text-gray-200 transition-colors" 
                    id="shareable-link"
                >
                    <span className="flex-1 text-sm font-medium truncate">{pollUrl.replace('https://', '')}</span>
                    <button
                        onClick={copyToClipboard}
                        className="p-2 bg-white dark:bg-gray-600 rounded-full shadow-sm transition-colors"
                    >
                        {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>
            )}
        </div>
    );
}
