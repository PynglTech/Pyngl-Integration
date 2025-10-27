// // import React, {useState} from 'react';
// // import { Copy, Check } from 'lucide-react';

// // export default function StyledQRCode({ pollUrl }) {
// //     const [isCopied, setIsCopied] = useState(false);
    
// //     // This is a more robust way to copy to clipboard that works in more environments
// //     const copyToClipboard = () => {
// //         const textField = document.createElement('textarea');
// //         textField.innerText = pollUrl;
// //         document.body.appendChild(textField);
// //         textField.select();
// //         document.execCommand('copy');
// //         textField.remove();
        
// //         setIsCopied(true);
// //         setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
// //     };

// //     // This URL generates the custom QR code with your logo in the middle
// //     const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pollUrl)}&logo=https://i.imgur.com/your-logo-id.png`; // Replace with your logo URL hosted online

// //     return (
// //         <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center gap-4 shadow-sm">
// //             {/* QR Code with Logo */}
// //             <div className="relative">
// //                 <img src={qrCodeUrl} alt="Poll QR Code" className="w-36 h-36" />
// //             </div>
            
// //             <p className="font-semibold text-gray-800">Shareable Link</p>
            
// //             {/* Custom Link Button */}
// //             <div className="flex items-center w-full bg-pink-50 border border-pink-200 text-pink-700 rounded-full pl-4 pr-2 py-2">
// //                 <span className="flex-1 text-sm font-medium truncate">{pollUrl.replace('https://', '')}</span>
// //                 <button 
// //                     onClick={copyToClipboard}
// //                     className="p-2 bg-white rounded-full shadow-sm"
// //                 >
// //                     {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }
// import React, { useState, useEffect, useRef } from 'react';
// import { Copy, Check } from 'lucide-react';
// import QRCodeStyling from 'qr-code-styling';

// export default function StyledQRCode({ pollUrl }) {
//     const [isCopied, setIsCopied] = useState(false);
//     const qrRef = useRef(null);

//     // This effect creates and styles the QR code
//     useEffect(() => {
//         if (!pollUrl || !qrRef.current) return;

//         const qrCode = new QRCodeStyling({
//             width: 150,
//             height: 150,
//             data: pollUrl,
//             image: '/PynglSingleLogo.jpg', // Logo from your /public folder
//             dotsOptions: {
//                 color: "#4a044e", // Dark purple for the dots
//                 type: "dots"
//             },
//             backgroundOptions: {
//                 color: "#ffffff", // White background
//             },
//             cornersSquareOptions: {
//                 color: "#701a75", // Lighter purple for corners
//                 type: "extra-rounded"
//             },
//             imageOptions: {
//                 imageSize: 0.4, // Logo takes up 40% of the QR code
//                 margin: 4
//             }
//         });

//         // Clear the container and append the new QR code
//         qrRef.current.innerHTML = "";
//         qrCode.append(qrRef.current);

//     }, [pollUrl]);
    
//     const copyToClipboard = () => {
//         // ... (copyToClipboard function remains the same)
//     };

//     return (
//         <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center gap-4 shadow-sm">
//             {/* The QR code will be rendered into this div */}
//             <div ref={qrRef} />
            
//             <p className="font-semibold text-gray-800">Shareable Link</p>
            
//             <div className="flex items-center w-full bg-pink-50 border border-pink-200 text-pink-700 rounded-full pl-4 pr-2 py-2">
//                 <span className="flex-1 text-sm font-medium truncate">{pollUrl.replace('https://', '')}</span>
//                 <button 
//                     onClick={copyToClipboard}
//                     className="p-2 bg-white rounded-full shadow-sm"
//                 >
//                     {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
//                 </button>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

export default function StyledQRCode({ pollUrl, hideLinkForScreenshot = false }) {
    const [isCopied, setIsCopied] = useState(false);
    const qrRef = useRef(null);

    // This effect creates and styles the QR code
    useEffect(() => {
        if (!pollUrl || !qrRef.current) return;

        const qrCode = new QRCodeStyling({
            width: 150,
            height: 150,
            data: pollUrl,
            image: '/PynglSingleLogo.jpg', // Kept your original logo path
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
    
    // Updated with the complete function
    const copyToClipboard = () => {
        navigator.clipboard.writeText(pollUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Increased timeout slightly for better UX
    };

    return (
        // Updated with dark mode classes
        <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-6 flex flex-col items-center gap-4 shadow-sm transition-colors">
            {/* The QR code will be rendered into this div */}
            <div ref={qrRef} />
            
            {/* Updated with conditional rendering and dark mode classes */}
            {!hideLinkForScreenshot && (
                <div
                    className="flex items-center w-full border rounded-full pl-4 pr-2 py-2 bg-pink-50 dark:bg-gray-700 border-pink-200 dark:border-gray-600 text-pink-700 dark:text-gray-200 transition-colors"
                    id="shareable-link"
                >
                    <span className="flex-1 text-sm font-medium truncate">{pollUrl.replace('https://', '')}</span>
                    <button 
                        onClick={copyToClipboard}
                        // Updated with dark mode class
                        className="p-2 bg-white dark:bg-gray-600 rounded-full shadow-sm transition-colors"
                    >
                        {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-600 dark:text-gray-300" />}
                    </button>
                </div>
            )}
        </div>
    );
}