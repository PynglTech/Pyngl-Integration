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
        <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center gap-4 shadow-sm">
            {/* QR Code */}
            <div ref={qrRef} /> 

            {/* Conditionally hide link when downloading */}
            {!hideLinkForScreenshot && (
                <>
                    {/* <p className="font-semibold text-gray-800">Shareable Link</p> */}
                    <div className="flex items-center w-full bg-pink-50 border border-pink-200 text-pink-700 rounded-full pl-4 pr-2 py-2" id="shareable-link">
                        <span className="flex-1 text-sm font-medium truncate">{pollUrl.replace('https://', '')}</span>
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-white rounded-full shadow-sm"
                        >
                            {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}