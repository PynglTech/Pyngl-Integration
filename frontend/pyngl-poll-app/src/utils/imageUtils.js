// // // /**
// // //  * Creates a branded banner image for a text poll using a canvas.
// // //  * @param {object} poll The poll object containing the question.
// // //  * @param {string} logoUrl The URL of the logo to overlay (e.g., '/pynglLogoImage.png').
// // //  * @returns {Promise<File>} A new File object for the composite image.
// // //  */
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             canvas.width = 1200; // Standard social media share image width
// // // //             canvas.height = 628; // Standard social media share image height
// // // //             const ctx = canvas.getContext('2d');

// // // //             // Create a background gradient
// // // //             const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// // // //             gradient.addColorStop(0, '#6EE7B7'); // Light Teal
// // // //             gradient.addColorStop(1, '#A78BFA'); // Light Purple
// // // //             ctx.fillStyle = gradient;
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);
            
// // // //             // Write the poll question in the center
// // // //             ctx.fillStyle = 'white';
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'middle';
// // // //             ctx.font = 'bold 60px Inter, sans-serif'; // Use your app's font
// // // //             // Simple logic to wrap text
// // // //             const words = poll.question.split(' ');
// // // //             const lines = [];
// // // //             let currentLine = words[0];
// // // //             for (let i = 1; i < words.length; i++) {
// // // //                 const word = words[i];
// // // //                 const width = ctx.measureText(currentLine + " " + word).width;
// // // //                 if (width < canvas.width - 100) {
// // // //                     currentLine += " " + word;
// // // //                 } else {
// // // //                     lines.push(currentLine);
// // // //                     currentLine = word;
// // // //                 }
// // // //             }
// // // //             lines.push(currentLine);
// // // //             lines.forEach((line, i) => {
// // // //                 ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (i * 70) - (lines.length > 1 ? 35 : 0));
// // // //             });

// // // //             // Draw the logo in the bottom-right corner
// // // //             const logoWidth = 150;
// // // //             const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
// // // //             const margin = 30;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             // Convert canvas to a File object
// // // //             canvas.toBlob((blob) => {
// // // //                 const newFile = new File([blob], "linkedin_banner.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.9);
// // // //         };
        
// // // //         logoImage.onerror = reject;
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             const ctx = canvas.getContext('2d');

// // // //             // --- Canvas and Background Setup ---
// // // //             canvas.width = 1200; // Standard 1.91:1 aspect ratio for link previews
// // // //             canvas.height = 630;
// // // //             // A clean, white background for the card
// // // //             ctx.fillStyle = '#FFFFFF';
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             // --- Helper function to draw rounded rectangles ---
// // // //             const drawRoundRect = (x, y, width, height, radius) => {
// // // //                 ctx.beginPath();
// // // //                 ctx.moveTo(x + radius, y);
// // // //                 ctx.lineTo(x + width - radius, y);
// // // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // // //                 ctx.lineTo(x + width, y + height - radius);
// // // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // // //                 ctx.lineTo(x + radius, y + height);
// // // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // // //                 ctx.lineTo(x, y + radius);
// // // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // // //                 ctx.closePath();
// // // //                 ctx.fill();
// // // //             };
            
// // // //             // --- Draw Poll Question ---
// // // //             ctx.fillStyle = '#1F2937'; // Dark gray text
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'top';
// // // //             ctx.font = 'bold 52px Inter, sans-serif';
// // // //             // Simple text wrapping for the question
// // // //             const questionWords = poll.question.split(' ');
// // // //             let line = '';
// // // //             const questionLines = [];
// // // //             for(let n = 0; n < questionWords.length; n++) {
// // // //                 const testLine = line + questionWords[n] + ' ';
// // // //                 const metrics = ctx.measureText(testLine);
// // // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // // //                     questionLines.push(line);
// // // //                     line = questionWords[n] + ' ';
// // // //                 } else {
// // // //                     line = testLine;
// // // //                 }
// // // //             }
// // // //             questionLines.push(line);
// // // //             questionLines.forEach((line, i) => {
// // // //                 ctx.fillText(line.trim(), canvas.width / 2, 80 + (i * 60));
// // // //             });

// // // //             // --- Draw Poll Options ---
// // // //             ctx.font = '500 42px Inter, sans-serif'; // Medium weight for options
// // // //             const optionsYStart = 220;
// // // //             const optionHeight = 70;
// // // //             const optionMargin = 20;
// // // //             const optionWidth = canvas.width - 200; // Add padding

// // // //             poll.options.forEach((option, index) => {
// // // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // // //                 // Draw the rounded rectangle for the option background
// // // //                 ctx.fillStyle = '#F3F4F6'; // Light gray background
// // // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // // //                 // Draw the option text inside the rectangle
// // // //                 ctx.fillStyle = '#374151'; // Medium gray text
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.textBaseline = 'middle';
// // // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // // //             });

// // // //             // --- Draw Pyngl Logo ---
// // // //             const logoHeight = 45;
// // // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //             const margin = 40;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             // --- Convert canvas to a File object ---
// // // //             canvas.toBlob((blob) => {
// // // //                 if (!blob) {
// // // //                     return reject(new Error('Canvas is empty'));
// // // //                 }
// // // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.95); // High-quality JPEG
// // // //         };
        
// // // //         logoImage.onerror = (err) => reject(new Error('Failed to load the logo image. Check the path in SharePage.jsx.'));
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             const ctx = canvas.getContext('2d');

// // // //             // --- Canvas and Background Setup ---
// // // //             canvas.width = 1200; // Standard 1.91:1 aspect ratio for social media link previews
// // // //             canvas.height = 630;
// // // //             ctx.fillStyle = '#FFFFFF'; // Clean, white background for the card
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             // --- Helper function to draw rectangles with rounded corners ---
// // // //             const drawRoundRect = (x, y, width, height, radius) => {
// // // //                 ctx.beginPath();
// // // //                 ctx.moveTo(x + radius, y);
// // // //                 ctx.lineTo(x + width - radius, y);
// // // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // // //                 ctx.lineTo(x + width, y + height - radius);
// // // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // // //                 ctx.lineTo(x + radius, y + height);
// // // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // // //                 ctx.lineTo(x, y + radius);
// // // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // // //                 ctx.closePath();
// // // //                 ctx.fill();
// // // //             };
            
// // // //             // --- Draw Poll Question ---
// // // //             ctx.fillStyle = '#1F2937'; // Dark gray text
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'top';
// // // //             ctx.font = 'bold 52px Inter, sans-serif';

// // // //             // Simple text wrapping logic for the question
// // // //             const words = poll.question.split(' ');
// // // //             let line = '';
// // // //             const questionLines = [];
// // // //             for(let n = 0; n < words.length; n++) {
// // // //                 const testLine = line + words[n] + ' ';
// // // //                 const metrics = ctx.measureText(testLine);
// // // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // // //                     questionLines.push(line);
// // // //                     line = words[n] + ' ';
// // // //                 } else {
// // // //                     line = testLine;
// // // //                 }
// // // //             }
// // // //             questionLines.push(line);
// // // //             questionLines.forEach((lineText, i) => {
// // // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // // //             });

// // // //             // --- Draw Poll Options ---
// // // //             ctx.font = '500 42px Inter, sans-serif';
// // // //             const optionsYStart = 220;
// // // //             const optionHeight = 70;
// // // //             const optionMargin = 20;
// // // //             const optionWidth = canvas.width - 200;

// // // //             poll.options.forEach((option, index) => {
// // // //                 if (index >= 3) return; // Limit to 3 options to avoid overflow
// // // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // // //                 ctx.fillStyle = '#F3F4F6'; // Light gray background for option box
// // // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // // //                 ctx.fillStyle = '#374151'; // Medium gray text for option
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.textBaseline = 'middle';
// // // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // // //             });

// // // //             // --- Draw Pyngl Logo ---
// // // //             const logoHeight = 45;
// // // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //             const margin = 40;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             // --- Convert canvas to a File object ---
// // // //             canvas.toBlob((blob) => {
// // // //                 if (!blob) {
// // // //                     return reject(new Error('Canvas is empty'));
// // // //                 }
// // // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.95);
// // // //         };
        
// // // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };
// // // // import QRCodeStyling from 'qr-code-styling';
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             const ctx = canvas.getContext('2d');

// // // //             // --- Canvas and Background Setup ---
// // // //             canvas.width = 1200; // Standard 1.91:1 aspect ratio for social media link previews
// // // //             canvas.height = 630;
// // // //             ctx.fillStyle = '#FFFFFF'; // Clean, white background for the card
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             // --- Helper function to draw rectangles with rounded corners ---
// // // //             const drawRoundRect = (x, y, width, height, radius) => {
// // // //                 ctx.beginPath();
// // // //                 ctx.moveTo(x + radius, y);
// // // //                 ctx.lineTo(x + width - radius, y);
// // // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // // //                 ctx.lineTo(x + width, y + height - radius);
// // // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // // //                 ctx.lineTo(x + radius, y + height);
// // // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // // //                 ctx.lineTo(x, y + radius);
// // // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // // //                 ctx.closePath();
// // // //                 ctx.fill();
// // // //             };
            
// // // //             // --- Draw Poll Question ---
// // // //             ctx.fillStyle = '#1F2937'; // Dark gray text
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'top';
// // // //             ctx.font = 'bold 52px Inter, sans-serif';

// // // //             // Simple text wrapping logic for the question
// // // //             const words = poll.question.split(' ');
// // // //             let line = '';
// // // //             const questionLines = [];
// // // //             for(let n = 0; n < words.length; n++) {
// // // //                 const testLine = line + words[n] + ' ';
// // // //                 const metrics = ctx.measureText(testLine);
// // // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // // //                     questionLines.push(line);
// // // //                     line = words[n] + ' ';
// // // //                 } else {
// // // //                     line = testLine;
// // // //                 }
// // // //             }
// // // //             questionLines.push(line);
// // // //             questionLines.forEach((lineText, i) => {
// // // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // // //             });

// // // //             // --- Draw Poll Options ---
// // // //             ctx.font = '500 42px Inter, sans-serif';
// // // //             const optionsYStart = 220;
// // // //             const optionHeight = 70;
// // // //             const optionMargin = 20;
// // // //             const optionWidth = canvas.width - 200;

// // // //             poll.options.forEach((option, index) => {
// // // //                 if (index >= 3) return; // Limit to 3 options to avoid overflow
// // // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // // //                 ctx.fillStyle = '#F3F4F6'; // Light gray background for option box
// // // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // // //                 ctx.fillStyle = '#374151'; // Medium gray text for option
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.textBaseline = 'middle';
// // // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // // //             });

// // // //             // --- Draw Pyngl Logo ---
// // // //             const logoHeight = 45;
// // // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //             const margin = 40;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             // --- Convert canvas to a File object ---
// // // //             canvas.toBlob((blob) => {
// // // //                 if (!blob) {
// // // //                     return reject(new Error('Canvas is empty'));
// // // //                 }
// // // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.95);
// // // //         };
        
// // // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };
// // // // export const createImagePollShareable = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         // --- 1. Create the QR Code as an Image ---
// // // //         const pollLink = `${window.location.origin}/poll/${poll._id}`;
// // // //         const qrCode = new QRCodeStyling({
// // // //             width: 300,
// // // //             height: 300,
// // // //             data: pollLink,
// // // //             image: '/LogoPyngl.png', // Logo from your /public folder for the QR center
// // // //             dotsOptions: { color: "#4a044e", type: "dots" },
// // // //             backgroundOptions: { color: "#ffffff" },
// // // //             cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// // // //             imageOptions: { imageSize: 0.4, margin: 4 }
// // // //         });

// // // //         // --- 2. Load all necessary images ---
// // // //         const pollImage = new Image();
// // // //         const logoImage = new Image();
// // // //         const qrImage = new Image();
        
// // // //         pollImage.crossOrigin = "Anonymous";
// // // //         logoImage.crossOrigin = "Anonymous";
// // // //         qrImage.crossOrigin = "Anonymous";

// // // //         let loadedCount = 0;
// // // //         const onAllImagesLoaded = () => {
// // // //             loadedCount++;
// // // //             if (loadedCount === 3) {
// // // //                 // --- 3. Create the Canvas and Draw the final image ---
// // // //                 const canvas = document.createElement('canvas');
// // // //                 canvas.width = 1080;  // Instagram Story dimensions
// // // //                 canvas.height = 1920;
// // // //                 const ctx = canvas.getContext('2d');

// // // //                 // Fill background
// // // //                 ctx.fillStyle = '#1F2937'; // Dark background
// // // //                 ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //                 // Draw the main poll image at the top
// // // //                 ctx.drawImage(pollImage, 0, 0, 1080, 1350); // 4:5 aspect ratio for the image part

// // // //                 // Draw the QR code in the bottom section
// // // //                 ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// // // //                 // Add "Scan to Vote" text
// // // //                 ctx.fillStyle = 'white';
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.font = 'bold 48px Inter, sans-serif';
// // // //                 ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// // // //                 // Add Pyngl logo at the very bottom
// // // //                 const logoHeight = 50;
// // // //                 const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //                 ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
                
// // // //                 // --- 4. Export Canvas as a File ---
// // // //                 canvas.toBlob((blob) => {
// // // //                     const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
// // // //                     resolve(newFile);
// // // //                 }, 'image/jpeg', 0.95);
// // // //             }
// // // //         };

// // // //         pollImage.onload = onAllImagesLoaded;
// // // //         logoImage.onload = onAllImagesLoaded;
// // // //         qrImage.onload = onAllImagesLoaded;
        
// // // //         pollImage.onerror = reject;
// // // //         logoImage.onerror = reject;
// // // //         qrImage.onerror = reject;

// // // //         pollImage.src = poll.imageUrl; // The Cloudinary URL
// // // //         logoImage.src = logoUrl;
// // // //         qrCode.getImageUrl("png").then(url => {
// // // //             qrImage.src = url;
// // // //         });
// // // //     });
// // // // };
// // // // import QRCodeStyling from 'qr-code-styling';

// // // // /**
// // // //  * Creates a branded, shareable image for an IMAGE poll by combining the poll's
// // // //  * image with a generated QR code and branding.
// // // //  * @param {object} poll The poll object containing the image URL and ID.
// // // //  * @param {string} logoUrl The path to the Pyngl logo.
// // // //  * @returns {Promise<File>} A new File object for the composite image.
// // // //  */
// // // // export const createImagePollShareable = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         // --- 1. Create the QR Code as an Image ---
// // // //         const pollLink = `${window.location.origin}/poll/${poll._id}`;
// // // //         const qrCode = new QRCodeStyling({
// // // //             width: 300,
// // // //             height: 300,
// // // //             data: pollLink,
// // // //             image: '/LogoPyngl.png', // Logo from your /public folder for the QR center
// // // //             dotsOptions: { color: "#4a044e", type: "dots" },
// // // //             backgroundOptions: { color: "#ffffff" },
// // // //             cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// // // //             imageOptions: { imageSize: 0.4, margin: 4 }
// // // //         });

// // // //         // --- 2. Load all necessary images ---
// // // //         const pollImage = new Image();
// // // //         const logoImage = new Image();
// // // //         const qrImage = new Image();
        
// // // //         pollImage.crossOrigin = "Anonymous";
// // // //         logoImage.crossOrigin = "Anonymous";
// // // //         qrImage.crossOrigin = "Anonymous";

// // // //         let loadedCount = 0;
// // // //         const onAllImagesLoaded = () => {
// // // //             loadedCount++;
// // // //             if (loadedCount === 3) {
// // // //                 // --- 3. Create the Canvas and Draw the final image ---
// // // //                 const canvas = document.createElement('canvas');
// // // //                 canvas.width = 1080;  // Instagram Story dimensions
// // // //                 canvas.height = 1920;
// // // //                 const ctx = canvas.getContext('2d');

// // // //                 // Fill background
// // // //                 ctx.fillStyle = '#1F2937'; // Dark background
// // // //                 ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //                 // Draw the main poll image at the top
// // // //                 ctx.drawImage(pollImage, 0, 0, 1080, 1350); // 4:5 aspect ratio for the image part

// // // //                 // Draw the QR code in the bottom section
// // // //                 ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// // // //                 // Add "Scan to Vote" text
// // // //                 ctx.fillStyle = 'white';
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.font = 'bold 48px Inter, sans-serif';
// // // //                 ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// // // //                 // Add Pyngl logo at the very bottom
// // // //                 const logoHeight = 50;
// // // //                 const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //                 ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
                
// // // //                 // --- 4. Export Canvas as a File ---
// // // //                 canvas.toBlob((blob) => {
// // // //                     const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
// // // //                     resolve(newFile);
// // // //                 }, 'image/jpeg', 0.95);
// // // //             }
// // // //         };

// // // //         pollImage.onload = onAllImagesLoaded;
// // // //         logoImage.onload = onAllImagesLoaded;
// // // //         qrImage.onload = onAllImagesLoaded;
        
// // // //         pollImage.onerror = reject;
// // // //         logoImage.onerror = reject;
// // // //         qrImage.onerror = reject;

// // // //         pollImage.src = poll.imageUrl; // The Cloudinary URL
// // // //         logoImage.src = logoUrl;
// // // //         qrCode.getImageUrl("png").then(url => {
// // // //             qrImage.src = url;
// // // //         });
// // // //     });
// // // // };

// // // // /**
// // // //  * Creates a branded banner image that visually replicates a TEXT poll card UI.
// // // //  * @param {object} poll The poll object containing the question and options.
// // // //  * @param {string} logoUrl The URL of the logo to overlay (e.g., '/pynglLogoImage.png').
// // // //  * @returns {Promise<File>} A new File object for the composite image.
// // // //  */
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             const ctx = canvas.getContext('2d');

// // // //             // --- Canvas and Background Setup ---
// // // //             canvas.width = 1200;
// // // //             canvas.height = 630;
// // // //             ctx.fillStyle = '#FFFFFF';
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             const drawRoundRect = (x, y, width, height, radius) => {
// // // //                 ctx.beginPath();
// // // //                 ctx.moveTo(x + radius, y);
// // // //                 ctx.lineTo(x + width - radius, y);
// // // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // // //                 ctx.lineTo(x + width, y + height - radius);
// // // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // // //                 ctx.lineTo(x + radius, y + height);
// // // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // // //                 ctx.lineTo(x, y + radius);
// // // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // // //                 ctx.closePath();
// // // //                 ctx.fill();
// // // //             };
            
// // // //             ctx.fillStyle = '#1F2937';
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'top';
// // // //             ctx.font = 'bold 52px Inter, sans-serif';

// // // //             const words = poll.question.split(' ');
// // // //             let line = '';
// // // //             const questionLines = [];
// // // //             for(let n = 0; n < words.length; n++) {
// // // //                 const testLine = line + words[n] + ' ';
// // // //                 const metrics = ctx.measureText(testLine);
// // // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // // //                     questionLines.push(line);
// // // //                     line = words[n] + ' ';
// // // //                 } else {
// // // //                     line = testLine;
// // // //                 }
// // // //             }
// // // //             questionLines.push(line);
// // // //             questionLines.forEach((lineText, i) => {
// // // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // // //             });

// // // //             ctx.font = '500 42px Inter, sans-serif';
// // // //             const optionsYStart = 220;
// // // //             const optionHeight = 70;
// // // //             const optionMargin = 20;
// // // //             const optionWidth = canvas.width - 200;

// // // //             poll.options.forEach((option, index) => {
// // // //                 if (index >= 3) return;
// // // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // // //                 ctx.fillStyle = '#F3F4F6';
// // // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // // //                 ctx.fillStyle = '#374151';
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.textBaseline = 'middle';
// // // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // // //             });

// // // //             const logoHeight = 45;
// // // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //             const margin = 40;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             canvas.toBlob((blob) => {
// // // //                 if (!blob) {
// // // //                     return reject(new Error('Canvas is empty'));
// // // //                 }
// // // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.95);
// // // //         };
        
// // // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };

// // // // export const generateBrandedVariant = (masterImageSrc, logoSrc, options) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const masterImage = new Image();
// // // //         const logoImage = new Image();
        
// // // //         masterImage.crossOrigin = "Anonymous";
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         let loadedCount = 0;
// // // //         const onImageLoad = () => {
// // // //             loadedCount++;
// // // //             if (loadedCount === 2) {
// // // //                 const canvas = document.createElement('canvas');
// // // //                 canvas.width = options.width;
// // // //                 canvas.height = options.height;
// // // //                 const ctx = canvas.getContext('2d');

// // // //                 // --- Smart Center-Crop Logic ---
// // // //                 const masterRatio = masterImage.width / masterImage.height;
// // // //                 const targetRatio = options.width / options.height;
// // // //                 let sourceX = 0, sourceY = 0, sourceWidth = masterImage.width, sourceHeight = masterImage.height;

// // // //                 if (masterRatio > targetRatio) { // Master is wider than target
// // // //                     sourceWidth = masterImage.height * targetRatio;
// // // //                     sourceX = (masterImage.width - sourceWidth) / 2;
// // // //                 } else { // Master is taller than target
// // // //                     sourceHeight = masterImage.width / targetRatio;
// // // //                     sourceY = (masterImage.height - sourceHeight) / 2;
// // // //                 }
                
// // // //                 ctx.drawImage(masterImage, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, options.width, options.height);
                
// // // //                 // --- Branding Overlay Logic ---
// // // //                 const logoMargin = 40; // 40px margin from the edges
// // // //                 const logoWidth = canvas.width * 0.15; // Logo is 15% of the banner width
// // // //                 const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
// // // //                 ctx.drawImage(logoImage, canvas.width - logoWidth - logoMargin, canvas.height - logoHeight - logoMargin, logoWidth, logoHeight);
                
// // // //                 // Convert canvas to a File object
// // // //                 canvas.toBlob((blob) => {
// // // //                     const newFile = new File([blob], `pyngl_share_${options.width}x${options.height}.jpg`, { type: 'image/jpeg' });
// // // //                     resolve(newFile);
// // // //                 }, 'image/jpeg', 0.92); // High-quality JPEG
// // // //             }
// // // //         };

// // // //         masterImage.onload = onImageLoad;
// // // //         logoImage.onload = onImageLoad;
// // // //         masterImage.onerror = reject;
// // // //         logoImage.onerror = reject;

// // // //         masterImage.src = masterImageSrc;
// // // //         logoImage.src = logoSrc;
// // // //     });
// // // // };


// // // // import QRCodeStyling from 'qr-code-styling';

// // // // /**
// // // //  * Creates a branded, shareable image for an IMAGE poll by combining the poll's
// // // //  * main image with a generated QR code and branding.
// // // //  * @param {object} poll The poll object containing the imageUrl and ID.
// // // //  * @param {string} logoUrl The path to the Pyngl logo (e.g., '/pynglLogoImage.png').
// // // //  * @returns {Promise<File>} A new File object for the composite image.
// // // //  */
// // // // export const createImagePollShareable = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         // --- 1. Create the QR Code as an Image ---
// // // //         const pollLink = `${window.location.origin}/poll/${poll._id}`;
// // // //         const qrCode = new QRCodeStyling({
// // // //             width: 300,
// // // //             height: 300,
// // // //             data: pollLink,
// // // //             image: '/LogoPyngl.png', // Logo from your /public folder for the QR center
// // // //             dotsOptions: { color: "#4a044e", type: "dots" },
// // // //             backgroundOptions: { color: "#ffffff" },
// // // //             cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// // // //             imageOptions: { imageSize: 0.4, margin: 4 }
// // // //         });

// // // //         // --- 2. Load all necessary images ---
// // // //         const pollImage = new Image();
// // // //         const logoImage = new Image();
// // // //         const qrImage = new Image();
        
// // // //         pollImage.crossOrigin = "Anonymous"; // Important for loading images from Cloudinary
// // // //         logoImage.crossOrigin = "Anonymous";
// // // //         qrImage.crossOrigin = "Anonymous";

// // // //         let loadedCount = 0;
// // // //         const onAllImagesLoaded = () => {
// // // //             loadedCount++;
// // // //             if (loadedCount === 3) {
// // // //                 // --- 3. Create the Canvas and Draw the final composite image ---
// // // //                 const canvas = document.createElement('canvas');
// // // //                 canvas.width = 1080;  // Standard Instagram Story dimensions (9:16)
// // // //                 canvas.height = 1920;
// // // //                 const ctx = canvas.getContext('2d');

// // // //                 // Fill background with a dark color
// // // //                 ctx.fillStyle = '#1F2937'; 
// // // //                 ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //                 // Draw the main poll image at the top, cropped to a 4:5 aspect ratio
// // // //                 ctx.drawImage(pollImage, 0, 0, 1080, 1350); 

// // // //                 // Draw the QR code in the bottom section
// // // //                 ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// // // //                 // Add "Scan to Vote" text below the QR code
// // // //                 ctx.fillStyle = 'white';
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.font = 'bold 48px Inter, sans-serif';
// // // //                 ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// // // //                 // Add the Pyngl logo at the very bottom
// // // //                 const logoHeight = 50;
// // // //                 const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //                 ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
                
// // // //                 // --- 4. Export the entire canvas as a single File object ---
// // // //                 canvas.toBlob((blob) => {
// // // //                     if (!blob) return reject(new Error('Canvas to Blob conversion failed'));
// // // //                     const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
// // // //                     resolve(newFile);
// // // //                 }, 'image/jpeg', 0.95);
// // // //             }
// // // //         };

// // // //         pollImage.onload = onAllImagesLoaded;
// // // //         logoImage.onload = onAllImagesLoaded;
        
// // // //         pollImage.onerror = (err) => reject(new Error('Failed to load poll image.'));
// // // //         logoImage.onerror = (err) => reject(new Error('Failed to load logo image.'));
// // // //         qrImage.onerror = (err) => reject(new Error('Failed to load QR code image.'));

// // // //         pollImage.src = poll.imageUrl; // The Cloudinary URL of the poll image
// // // //         logoImage.src = logoUrl;
        
// // // //         qrCode.getImageUrl("png").then(url => {
// // // //             qrImage.src = url;
// // // //         }).catch(reject);
// // // //     });
// // // // };

// // // // /**
// // // //  * Creates a branded banner image that visually replicates the poll card UI for sharing.
// // // //  * @param {object} poll The poll object containing the question and options.
// // // //  * @param {string} logoUrl The path to the logo to overlay (e.g., '/pynglLogoImage.png').
// // // //  * @returns {Promise<File>} A new File object for the composite image, ready for sharing.
// // // //  */
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             const ctx = canvas.getContext('2d');

// // // //             // --- Canvas and Background Setup ---
// // // //             canvas.width = 1200;
// // // //             canvas.height = 630;
// // // //             ctx.fillStyle = '#FFFFFF';
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             const drawRoundRect = (x, y, width, height, radius) => {
// // // //                 ctx.beginPath();
// // // //                 ctx.moveTo(x + radius, y);
// // // //                 ctx.lineTo(x + width - radius, y);
// // // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // // //                 ctx.lineTo(x + width, y + height - radius);
// // // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // // //                 ctx.lineTo(x + radius, y + height);
// // // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // // //                 ctx.lineTo(x, y + radius);
// // // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // // //                 ctx.closePath();
// // // //                 ctx.fill();
// // // //             };
            
// // // //             ctx.fillStyle = '#1F2937';
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'top';
// // // //             ctx.font = 'bold 52px Inter, sans-serif';

// // // //             const words = poll.question.split(' ');
// // // //             let line = '';
// // // //             const questionLines = [];
// // // //             for(let n = 0; n < words.length; n++) {
// // // //                 const testLine = line + words[n] + ' ';
// // // //                 const metrics = ctx.measureText(testLine);
// // // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // // //                     questionLines.push(line);
// // // //                     line = words[n] + ' ';
// // // //                 } else {
// // // //                     line = testLine;
// // // //                 }
// // // //             }
// // // //             questionLines.push(line);
// // // //             questionLines.forEach((lineText, i) => {
// // // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // // //             });

// // // //             ctx.font = '500 42px Inter, sans-serif';
// // // //             const optionsYStart = 220;
// // // //             const optionHeight = 70;
// // // //             const optionMargin = 20;
// // // //             const optionWidth = canvas.width - 200;

// // // //             poll.options.forEach((option, index) => {
// // // //                 if (index >= 3) return;
// // // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // // //                 ctx.fillStyle = '#F3F4F6';
// // // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // // //                 ctx.fillStyle = '#374151';
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.textBaseline = 'middle';
// // // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // // //             });

// // // //             const logoHeight = 45;
// // // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //             const margin = 40;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             canvas.toBlob((blob) => {
// // // //                 if (!blob) {
// // // //                     return reject(new Error('Canvas is empty'));
// // // //                 }
// // // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.95);
// // // //         };
        
// // // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };

// // // // import QRCodeStyling from 'qr-code-styling';

// // // // /**
// // // //  * Creates a branded banner image that visually replicates a TEXT poll card for sharing.
// // // //  * @param {object} poll The poll object containing the question and options.
// // // //  * @param {string} logoUrl The path to the logo to overlay (e.g., '/pynglLogoImage.png').
// // // //  * @returns {Promise<File>} A new File object for the composite image, ready for sharing.
// // // //  */
// // // // export const createTextPollBanner = (poll, logoUrl) => {
// // // //     return new Promise((resolve, reject) => {
// // // //         const logoImage = new Image();
// // // //         logoImage.crossOrigin = "Anonymous";

// // // //         logoImage.onload = () => {
// // // //             const canvas = document.createElement('canvas');
// // // //             const ctx = canvas.getContext('2d');

// // // //             canvas.width = 1200;
// // // //             canvas.height = 630;
// // // //             ctx.fillStyle = '#FFFFFF';
// // // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //             const drawRoundRect = (x, y, width, height, radius) => {
// // // //                 ctx.beginPath();
// // // //                 ctx.moveTo(x + radius, y);
// // // //                 ctx.lineTo(x + width - radius, y);
// // // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // // //                 ctx.lineTo(x + width, y + height - radius);
// // // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // // //                 ctx.lineTo(x + radius, y + height);
// // // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // // //                 ctx.lineTo(x, y + radius);
// // // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // // //                 ctx.closePath();
// // // //                 ctx.fill();
// // // //             };
            
// // // //             ctx.fillStyle = '#1F2937';
// // // //             ctx.textAlign = 'center';
// // // //             ctx.textBaseline = 'top';
// // // //             ctx.font = 'bold 52px Inter, sans-serif';

// // // //             const words = poll.question.split(' ');
// // // //             let line = '';
// // // //             const questionLines = [];
// // // //             for(let n = 0; n < words.length; n++) {
// // // //                 const testLine = line + words[n] + ' ';
// // // //                 const metrics = ctx.measureText(testLine);
// // // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // // //                     questionLines.push(line);
// // // //                     line = words[n] + ' ';
// // // //                 } else {
// // // //                     line = testLine;
// // // //                 }
// // // //             }
// // // //             questionLines.push(line);
// // // //             questionLines.forEach((lineText, i) => {
// // // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // // //             });

// // // //             ctx.font = '500 42px Inter, sans-serif';
// // // //             const optionsYStart = 220;
// // // //             const optionHeight = 70;
// // // //             const optionMargin = 20;
// // // //             const optionWidth = canvas.width - 200;

// // // //             poll.options.forEach((option, index) => {
// // // //                 if (index >= 3) return;
// // // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // // //                 ctx.fillStyle = '#F3F4F6';
// // // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // // //                 ctx.fillStyle = '#374151';
// // // //                 ctx.textAlign = 'center';
// // // //                 ctx.textBaseline = 'middle';
// // // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // // //             });

// // // //             const logoHeight = 45;
// // // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //             const margin = 40;
// // // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // // //             canvas.toBlob((blob) => {
// // // //                 if (!blob) {
// // // //                     return reject(new Error('Canvas is empty'));
// // // //                 }
// // // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // // //                 resolve(newFile);
// // // //             }, 'image/jpeg', 0.95);
// // // //         };
        
// // // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // // //         logoImage.src = logoUrl;
// // // //     });
// // // // };

// // // // /**
// // // //  * Creates a branded, shareable image for an IMAGE poll by combining the poll's
// // // //  * main image with a generated QR code and branding.
// // // //  * @param {object} poll The poll object containing the imageUrl and ID.
// // // //  * @param {string} logoUrl The path to the Pyngl logo (e.g., '/pynglLogoImage.png').
// // // //  * @returns {Promise<File>} A new File object for the composite image.
// // // //  */
// // // // export const createImagePollShareable = async (poll, logoUrl) => {
// // // //     // Helper function to load an image and return a promise
// // // //     const loadImage = (src) => {
// // // //         return new Promise((resolve, reject) => {
// // // //             const img = new Image();
// // // //             img.crossOrigin = "Anonymous";
// // // //             img.onload = () => resolve(img);
// // // //             img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
// // // //             img.src = src;
// // // //         });
// // // //     };

// // // //     // 1. Create the QR Code instance
// // // //     const pollLink = `${window.location.origin}/poll/${poll._id}`;
// // // //     const qrCode = new QRCodeStyling({
// // // //         width: 300,
// // // //         height: 300,
// // // //         data: pollLink,
// // // //         image: '/LogoPyngl.png',
// // // //         dotsOptions: { color: "#4a044e", type: "dots" },
// // // //         backgroundOptions: { color: "#ffffff" },
// // // //         cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// // // //         imageOptions: { imageSize: 0.4, margin: 4 }
// // // //     });

// // // //     // 2. Get the QR code as a data URL
// // // //     const qrCodeUrl = await qrCode.getImageUrl("png");

// // // //     // 3. Load all images concurrently and wait for them to be ready
// // // //     const [pollImage, logoImage, qrImage] = await Promise.all([
// // // //         loadImage(poll.imageUrl),
// // // //         loadImage(logoUrl),
// // // //         loadImage(qrCodeUrl)
// // // //     ]);

// // // //     // 4. Once all images are loaded, draw them onto the canvas
// // // //     const canvas = document.createElement('canvas');
// // // //     canvas.width = 1080;  // Instagram Story dimensions
// // // //     canvas.height = 1920;
// // // //     const ctx = canvas.getContext('2d');

// // // //     ctx.fillStyle = '#1F2937'; 
// // // //     ctx.fillRect(0, 0, canvas.width, canvas.height);
// // // //     ctx.drawImage(pollImage, 0, 0, 1080, 1350); 
// // // //     ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// // // //     ctx.fillStyle = 'white';
// // // //     ctx.textAlign = 'center';
// // // //     ctx.font = 'bold 48px Inter, sans-serif';
// // // //     ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// // // //     const logoHeight = 50;
// // // //     const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // // //     ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
    
// // // //     // 5. Export the final canvas as a File object
// // // //     return new Promise((resolve, reject) => {
// // // //         canvas.toBlob((blob) => {
// // // //             if (!blob) return reject(new Error('Canvas to Blob conversion failed'));
// // // //             const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
// // // //             resolve(newFile);
// // // //         }, 'image/jpeg', 0.95);
// // // //     });
// // // // };

// // // import QRCodeStyling from 'qr-code-styling';

// // // /**
// // //  * Creates a branded banner image that visually replicates a TEXT poll card for sharing.
// // //  * @param {object} poll The poll object containing the question and options.
// // //  * @param {string} logoUrl The path to the logo to overlay (e.g., '/pynglLogoImage.png').
// // //  * @returns {Promise<File>} A new File object for the composite image, ready for sharing.
// // //  */
// // // export const createTextPollBanner = (poll, logoUrl) => {
// // //     return new Promise((resolve, reject) => {
// // //         const logoImage = new Image();
// // //         logoImage.crossOrigin = "Anonymous";

// // //         logoImage.onload = () => {
// // //             const canvas = document.createElement('canvas');
// // //             const ctx = canvas.getContext('2d');

// // //             canvas.width = 1200;
// // //             canvas.height = 630;
// // //             ctx.fillStyle = '#FFFFFF';
// // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // //             const drawRoundRect = (x, y, width, height, radius) => {
// // //                 ctx.beginPath();
// // //                 ctx.moveTo(x + radius, y);
// // //                 ctx.lineTo(x + width - radius, y);
// // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // //                 ctx.lineTo(x + width, y + height - radius);
// // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // //                 ctx.lineTo(x + radius, y + height);
// // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // //                 ctx.lineTo(x, y + radius);
// // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // //                 ctx.closePath();
// // //                 ctx.fill();
// // //             };
            
// // //             ctx.fillStyle = '#1F2937';
// // //             ctx.textAlign = 'center';
// // //             ctx.textBaseline = 'top';
// // //             ctx.font = 'bold 52px Inter, sans-serif';

// // //             const words = poll.question.split(' ');
// // //             let line = '';
// // //             const questionLines = [];
// // //             for(let n = 0; n < words.length; n++) {
// // //                 const testLine = line + words[n] + ' ';
// // //                 const metrics = ctx.measureText(testLine);
// // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // //                     questionLines.push(line);
// // //                     line = words[n] + ' ';
// // //                 } else {
// // //                     line = testLine;
// // //                 }
// // //             }
// // //             questionLines.push(line);
// // //             questionLines.forEach((lineText, i) => {
// // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // //             });

// // //             ctx.font = '500 42px Inter, sans-serif';
// // //             const optionsYStart = 220;
// // //             const optionHeight = 70;
// // //             const optionMargin = 20;
// // //             const optionWidth = canvas.width - 200;

// // //             poll.options.forEach((option, index) => {
// // //                 if (index >= 3) return;
// // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // //                 ctx.fillStyle = '#F3F4F6';
// // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // //                 ctx.fillStyle = '#374151';
// // //                 ctx.textAlign = 'center';
// // //                 ctx.textBaseline = 'middle';
// // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // //             });

// // //             const logoHeight = 45;
// // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // //             const margin = 40;
// // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // //             canvas.toBlob((blob) => {
// // //                 if (!blob) {
// // //                     return reject(new Error('Canvas is empty'));
// // //                 }
// // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // //                 resolve(newFile);
// // //             }, 'image/jpeg', 0.95);
// // //         };
        
// // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // //         logoImage.src = logoUrl;
// // //     });
// // // };

// // // /**
// // //  * Creates a branded, shareable image for an IMAGE poll by combining the poll's
// // //  * main image with a generated QR code and branding.
// // //  * @param {object} poll The poll object containing the imageUrl and ID.
// // //  * @param {string} logoUrl The path to the Pyngl logo (e.g., '/pynglLogoImage.png').
// // //  * @returns {Promise<File>} A new File object for the composite image.
// // //  */
// // // export const createImagePollShareable = async (poll, logoUrl) => {
// // //     // Helper function to load an image and return a promise
// // //     const loadImage = (src) => {
// // //         return new Promise((resolve, reject) => {
// // //             const img = new Image();
// // //             img.crossOrigin = "Anonymous";
// // //             img.onload = () => resolve(img);
// // //             img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
// // //             img.src = src;
// // //         });
// // //     };

// // //     // 1. Create the QR Code instance
// // //     const pollLink = `${window.location.origin}/poll/${poll._id}`;
// // //     const qrCode = new QRCodeStyling({
// // //         width: 300,
// // //         height: 300,
// // //         data: pollLink,
// // //         image: logoUrl, // ✅ FIX: Use the passed logoUrl for consistency
// // //         dotsOptions: { color: "#4a044e", type: "dots" },
// // //         backgroundOptions: { color: "#ffffff" },
// // //         cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// // //         imageOptions: { imageSize: 0.4, margin: 4 }
// // //     });

// // //     // 2. Get the QR code as a data URL
// // //     const qrCodeUrl = await qrCode.getImageUrl("png");

// // //     // 3. Load all images concurrently and wait for them to be ready
// // //     const [pollImage, logoImage, qrImage] = await Promise.all([
// // //         loadImage(poll.imageUrl),
// // //         loadImage(logoUrl),
// // //         loadImage(qrCodeUrl)
// // //     ]);

// // //     // 4. Once all images are loaded, draw them onto the canvas
// // //     const canvas = document.createElement('canvas');
// // //     canvas.width = 1080;  // Instagram Story dimensions
// // //     canvas.height = 1920;
// // //     const ctx = canvas.getContext('2d');

// // //     ctx.fillStyle = '#1F2937'; 
// // //     ctx.fillRect(0, 0, canvas.width, canvas.height);
// // //     ctx.drawImage(pollImage, 0, 0, 1080, 1350); 
// // //     ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// // //     ctx.fillStyle = 'white';
// // //     ctx.textAlign = 'center';
// // //     ctx.font = 'bold 48px Inter, sans-serif';
// // //     ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// // //     const logoHeight = 50;
// // //     const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // //     ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
    
// // //     // 5. Export the final canvas as a File object
// // //     return new Promise((resolve, reject) => {
// // //         canvas.toBlob((blob) => {
// // //             if (!blob) return reject(new Error('Canvas to Blob conversion failed'));
// // //             const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
// // //             resolve(newFile);
// // //         }, 'image/jpeg', 0.95);
// // //     });
// // // };

// // // import QRCodeStyling from 'qr-code-styling';

// // // /**
// // //  * Creates a branded banner image that visually replicates a TEXT poll card for sharing.
// // //  * @param {object} poll The poll object containing the question and options.
// // //  * @param {string} logoUrl The path to the logo to overlay (e.g., '/pynglLogoImage.png').
// // //  * @returns {Promise<File>} A new File object for the composite image, ready for sharing.
// // //  */
// // // export const createTextPollBanner = (poll, logoUrl) => {
// // //     return new Promise((resolve, reject) => {
// // //         const logoImage = new Image();
// // //         logoImage.crossOrigin = "Anonymous";

// // //         logoImage.onload = () => {
// // //             const canvas = document.createElement('canvas');
// // //             const ctx = canvas.getContext('2d');

// // //             canvas.width = 1200; // Standard 1.91:1 aspect ratio for social media link previews
// // //             canvas.height = 630;
// // //             ctx.fillStyle = '#FFFFFF'; // Clean, white background for the card
// // //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// // //             const drawRoundRect = (x, y, width, height, radius) => {
// // //                 ctx.beginPath();
// // //                 ctx.moveTo(x + radius, y);
// // //                 ctx.lineTo(x + width - radius, y);
// // //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// // //                 ctx.lineTo(x + width, y + height - radius);
// // //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// // //                 ctx.lineTo(x + radius, y + height);
// // //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// // //                 ctx.lineTo(x, y + radius);
// // //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// // //                 ctx.closePath();
// // //                 ctx.fill();
// // //             };
            
// // //             ctx.fillStyle = '#1F2937';
// // //             ctx.textAlign = 'center';
// // //             ctx.textBaseline = 'top';
// // //             ctx.font = 'bold 52px Inter, sans-serif';

// // //             const words = poll.question.split(' ');
// // //             let line = '';
// // //             const questionLines = [];
// // //             for(let n = 0; n < words.length; n++) {
// // //                 const testLine = line + words[n] + ' ';
// // //                 const metrics = ctx.measureText(testLine);
// // //                 if (metrics.width > canvas.width - 100 && n > 0) {
// // //                     questionLines.push(line);
// // //                     line = words[n] + ' ';
// // //                 } else {
// // //                     line = testLine;
// // //                 }
// // //             }
// // //             questionLines.push(line);
// // //             questionLines.forEach((lineText, i) => {
// // //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// // //             });

// // //             ctx.font = '500 42px Inter, sans-serif';
// // //             const optionsYStart = 220;
// // //             const optionHeight = 70;
// // //             const optionMargin = 20;
// // //             const optionWidth = canvas.width - 200;

// // //             poll.options.forEach((option, index) => {
// // //                 if (index >= 3) return;
// // //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// // //                 ctx.fillStyle = '#F3F4F6';
// // //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// // //                 ctx.fillStyle = '#374151';
// // //                 ctx.textAlign = 'center';
// // //                 ctx.textBaseline = 'middle';
// // //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// // //             });

// // //             const logoHeight = 45;
// // //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // //             const margin = 40;
// // //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// // //             canvas.toBlob((blob) => {
// // //                 if (!blob) {
// // //                     return reject(new Error('Canvas is empty'));
// // //                 }
// // //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// // //                 resolve(newFile);
// // //             }, 'image/jpeg', 0.95);
// // //         };
        
// // //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// // //         logoImage.src = logoUrl;
// // //     });
// // // };
// // // export const createImagePollShareable = async (poll, logoUrl) => {
// // //     const loadImage = (src) => new Promise((resolve, reject) => {
// // //         const img = new Image();
// // //         img.crossOrigin = "Anonymous";
// // //         img.onload = () => resolve(img);
// // //         img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
// // //         img.src = src;
// // //     });

// // //     const pollLink = `${window.location.origin}/poll/${poll._id}`;
// // //     const qrCode = new QRCodeStyling({
// // //         width: 300, height: 300, data: pollLink,
// // //         image: '/LogoPyngl.png', // Logo for the QR center
// // //         dotsOptions: { color: "#4a044e" },
// // //         backgroundOptions: { color: "#ffffff" },
// // //         cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// // //         imageOptions: { imageSize: 0.4, margin: 4 }
// // //     });

// // //     const qrCodeUrl = await qrCode.getImageUrl("png");

// // //     const [pollImage, logoImage, qrImage] = await Promise.all([
// // //         loadImage(poll.imageUrl),
// // //         loadImage(logoUrl),
// // //         loadImage(qrCodeUrl)
// // //     ]);

// // //     const canvas = document.createElement('canvas');
// // //     canvas.width = 1080;
// // //     canvas.height = 1920;
// // //     const ctx = canvas.getContext('2d');

// // //     ctx.fillStyle = '#1F2937';
// // //     ctx.fillRect(0, 0, canvas.width, canvas.height);
// // //     ctx.drawImage(pollImage, 0, 0, 1080, 1350);
// // //     ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// // //     ctx.fillStyle = 'white';
// // //     ctx.textAlign = 'center';
// // //     ctx.font = 'bold 48px Inter, sans-serif';
// // //     ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// // //     const logoHeight = 50;
// // //     const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// // //     ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
    
// // //     return new Promise((resolve, reject) => {
// // //         canvas.toBlob((blob) => {
// // //             if (!blob) return reject(new Error('Canvas to Blob failed'));
// // //             resolve(new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' }));
// // //         }, 'image/jpeg', 0.95);
// // //     });
// // // };



// // import QRCodeStyling from 'qr-code-styling';

// // /**
// //  * Creates a branded banner that visually replicates a TEXT poll card for sharing.
// //  * @param {object} poll The poll object.
// //  * @param {string} logoUrl Path to the Pyngl logo.
// //  * @returns {Promise<File>} A new File object for the image.
// //  */
// // export const createTextPollBanner = (poll, logoUrl) => {
// //     return new Promise((resolve, reject) => {
// //         const logoImage = new Image();
// //         logoImage.crossOrigin = "Anonymous";

// //         logoImage.onload = () => {
// //             const canvas = document.createElement('canvas');
// //             const ctx = canvas.getContext('2d');

// //             canvas.width = 1200;
// //             canvas.height = 630;
// //             ctx.fillStyle = '#FFFFFF';
// //             ctx.fillRect(0, 0, canvas.width, canvas.height);

// //             const drawRoundRect = (x, y, width, height, radius) => {
// //                 ctx.beginPath();
// //                 ctx.moveTo(x + radius, y);
// //                 ctx.lineTo(x + width - radius, y);
// //                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// //                 ctx.lineTo(x + width, y + height - radius);
// //                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// //                 ctx.lineTo(x + radius, y + height);
// //                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// //                 ctx.lineTo(x, y + radius);
// //                 ctx.quadraticCurveTo(x, y, x + radius, y);
// //                 ctx.closePath();
// //                 ctx.fill();
// //             };
            
// //             ctx.fillStyle = '#1F2937';
// //             ctx.textAlign = 'center';
// //             ctx.textBaseline = 'top';
// //             ctx.font = 'bold 52px Inter, sans-serif';

// //             const words = poll.question.split(' ');
// //             let line = '';
// //             const questionLines = [];
// //             for(let n = 0; n < words.length; n++) {
// //                 const testLine = line + words[n] + ' ';
// //                 const metrics = ctx.measureText(testLine);
// //                 if (metrics.width > canvas.width - 100 && n > 0) {
// //                     questionLines.push(line);
// //                     line = words[n] + ' ';
// //                 } else {
// //                     line = testLine;
// //                 }
// //             }
// //             questionLines.push(line);
// //             questionLines.forEach((lineText, i) => {
// //                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
// //             });

// //             ctx.font = '500 42px Inter, sans-serif';
// //             const optionsYStart = 220;
// //             const optionHeight = 70;
// //             const optionMargin = 20;
// //             const optionWidth = canvas.width - 200;

// //             poll.options.forEach((option, index) => {
// //                 if (index >= 3) return;
// //                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
// //                 ctx.fillStyle = '#F3F4F6';
// //                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

// //                 ctx.fillStyle = '#374151';
// //                 ctx.textAlign = 'center';
// //                 ctx.textBaseline = 'middle';
// //                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
// //             });

// //             const logoHeight = 45;
// //             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// //             const margin = 40;
// //             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
// //             canvas.toBlob((blob) => {
// //                 if (!blob) {
// //                     return reject(new Error('Canvas is empty'));
// //                 }
// //                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
// //                 resolve(newFile);
// //             }, 'image/jpeg', 0.95);
// //         };
        
// //         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
// //         logoImage.src = logoUrl;
// //     });
// // };

// // /**
// //  * Creates a branded, shareable image for an IMAGE poll by combining the poll's
// //  * main image with a generated QR code and branding.
// //  * @param {object} poll The poll object containing the imageUrl and ID.
// //  * @param {string} logoUrl The path to the Pyngl logo for the main branding.
// //  * @returns {Promise<File>} A new File object for the composite image.
// //  */
// // export const createImagePollShareable = async (poll, logoUrl) => {
// //     // Helper function to load an image and return a promise, ensuring it's ready to be drawn.
// //     const loadImage = (src) => {
// //         return new Promise((resolve, reject) => {
// //             const img = new Image();
// //             img.crossOrigin = "Anonymous"; // This is crucial for images from other domains (like Cloudinary)
// //             img.onload = () => resolve(img);
// //             img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
// //             img.src = src;
// //         });
// //     };

// //     // 1. Create the QR Code instance
// //     const pollLink = `${window.location.origin}/poll/${poll._id}`;
// //     const qrCode = new QRCodeStyling({
// //         width: 300,
// //         height: 300,
// //         data: pollLink,
// //         image: '/LogoPyngl.png', // Uses the specific logo for the QR code center
// //         dotsOptions: { color: "#4a044e", type: "dots" },
// //         backgroundOptions: { color: "#ffffff" },
// //         cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
// //         imageOptions: { imageSize: 0.4, margin: 4 }
// //     });

// //     // 2. Get the QR code as a data URL, which is a string representation of the image
// //     const qrCodeUrl = await qrCode.getImageUrl("png");

// //     // 3. Load all three images concurrently and wait for them ALL to be ready
// //     const [pollImage, logoImage, qrImage] = await Promise.all([
// //         loadImage(poll.imageUrl), // The main image from Cloudinary
// //         loadImage(logoUrl),       // The main Pyngl logo for branding
// //         loadImage(qrCodeUrl)      // The generated QR code image
// //     ]);

// //     // 4. Once all images are loaded, create the canvas and draw everything
// //     const canvas = document.createElement('canvas');
// //     canvas.width = 1080;  // Instagram Story dimensions (9:16)
// //     canvas.height = 1920;
// //     const ctx = canvas.getContext('2d');

// //     // Draw the dark background
// //     ctx.fillStyle = '#1F2937'; 
// //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
// //     // Draw the main poll image at the top (in a 4:5 aspect ratio box)
// //     ctx.drawImage(pollImage, 0, 0, 1080, 1350); 
    
// //     // Draw the generated QR code in the bottom section
// //     ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

// //     // Add "Scan to Vote!" text below the QR code
// //     ctx.fillStyle = 'white';
// //     ctx.textAlign = 'center';
// //     ctx.font = 'bold 48px Inter, sans-serif';
// //     ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

// //     // Add the main Pyngl logo at the very bottom for branding
// //     const logoHeight = 50;
// //     const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
// //     ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
    
// //     // 5. Export the final, composite image as a File object
// //     return new Promise((resolve, reject) => {
// //         canvas.toBlob((blob) => {
// //             if (!blob) return reject(new Error('Canvas to Blob conversion failed'));
// //             const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
// //             resolve(newFile);
// //         }, 'image/jpeg', 0.95);
// //     });
// // };

// import QRCodeStyling from 'qr-code-styling';

// /**
//  * Creates a branded banner image that visually replicates a TEXT poll card for sharing.
//  * @param {object} poll The poll object.
//  * @param {string} logoUrl Path to the Pyngl logo.
//  * @returns {Promise<File>} A new File object for the image.
//  */
// export const createTextPollBanner = (poll, logoUrl) => {
//     return new Promise((resolve, reject) => {
//         const logoImage = new Image();
//         logoImage.crossOrigin = "Anonymous";

//         logoImage.onload = () => {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');

//             canvas.width = 1200; // Standard 1.91:1 aspect ratio for social media link previews
//             canvas.height = 630;
//             ctx.fillStyle = '#FFFFFF';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             // Helper function to draw rectangles with rounded corners
//             const drawRoundRect = (x, y, width, height, radius) => {
//                 ctx.beginPath();
//                 ctx.moveTo(x + radius, y);
//                 ctx.lineTo(x + width - radius, y);
//                 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
//                 ctx.lineTo(x + width, y + height - radius);
//                 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//                 ctx.lineTo(x + radius, y + height);
//                 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
//                 ctx.lineTo(x, y + radius);
//                 ctx.quadraticCurveTo(x, y, x + radius, y);
//                 ctx.closePath();
//                 ctx.fill();
//             };
            
//             ctx.fillStyle = '#1F2937';
//             ctx.textAlign = 'center';
//             ctx.textBaseline = 'top';
//             ctx.font = 'bold 52px Inter, sans-serif';

//             // Simple text wrapping logic for the question
//             const words = poll.question.split(' ');
//             let line = '';
//             const questionLines = [];
//             for(let n = 0; n < words.length; n++) {
//                 const testLine = line + words[n] + ' ';
//                 const metrics = ctx.measureText(testLine);
//                 if (metrics.width > canvas.width - 100 && n > 0) {
//                     questionLines.push(line);
//                     line = words[n] + ' ';
//                 } else {
//                     line = testLine;
//                 }
//             }
//             questionLines.push(line);
//             questionLines.forEach((lineText, i) => {
//                 ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
//             });

//             ctx.font = '500 42px Inter, sans-serif';
//             const optionsYStart = 220;
//             const optionHeight = 70;
//             const optionMargin = 20;
//             const optionWidth = canvas.width - 200;

//             poll.options.forEach((option, index) => {
//                 if (index >= 3) return; // Limit to 3 options to avoid overflow
//                 const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
//                 ctx.fillStyle = '#F3F4F6';
//                 drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

//                 ctx.fillStyle = '#374151';
//                 ctx.textAlign = 'center';
//                 ctx.textBaseline = 'middle';
//                 ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
//             });

//             const logoHeight = 45;
//             const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
//             const margin = 40;
//             ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
//             canvas.toBlob((blob) => {
//                 if (!blob) {
//                     return reject(new Error('Canvas is empty'));
//                 }
//                 const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
//                 resolve(newFile);
//             }, 'image/jpeg', 0.95);
//         };
        
//         logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
//         logoImage.src = logoUrl;
//     });
// };

// /**
//  * Creates a branded, shareable image for an IMAGE poll by combining the poll's
//  * main image with a generated QR code and branding.
//  * @param {object} poll The poll object containing the imageUrl and ID.
//  * @param {string} logoUrl The path to the Pyngl logo for the main branding.
//  * @returns {Promise<File>} A new File object for the composite image.
//  */
// export const createImagePollShareable = async (poll, logoUrl) => {
//     // Helper function to load an image and return a promise.
//     const loadImage = (src) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.onload = () => resolve(img);
//             img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
//             img.src = src;
//         });
//     };

//     // 1. Create the QR Code instance
//     const pollLink = `${window.location.origin}/poll/${poll._id}`;
//     const qrCode = new QRCodeStyling({
//         width: 300,
//         height: 300,
//         data: pollLink,
//         image: '/LogoPyngl.png',
//         dotsOptions: { color: "#4a044e", type: "dots" },
//         backgroundOptions: { color: "#ffffff" },
//         cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
//         imageOptions: { imageSize: 0.4, margin: 4 }
//     });

//     const qrCodeUrl = await qrCode.getImageUrl("png");

//     const [pollImage, logoImage, qrImage] = await Promise.all([
//         loadImage(poll.imageUrl),
//         loadImage(logoUrl),
//         loadImage(qrCodeUrl)
//     ]);

//     const canvas = document.createElement('canvas');
//     canvas.width = 1080;
//     canvas.height = 1920;
//     const ctx = canvas.getContext('2d');

//     ctx.fillStyle = '#1F2937'; 
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(pollImage, 0, 0, 1080, 1350); 
//     ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

//     ctx.fillStyle = 'white';
//     ctx.textAlign = 'center';
//     ctx.font = 'bold 48px Inter, sans-serif';
//     ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

//     const logoHeight = 50;
//     const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
//     ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
    
//     return new Promise((resolve, reject) => {
//         canvas.toBlob((blob) => {
//             if (!blob) return reject(new Error('Canvas to Blob conversion failed'));
//             const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
//             resolve(newFile);
//         }, 'image/jpeg', 0.95);
//     });
// };

import QRCodeStyling from 'qr-code-styling';

/**
 * Creates a branded banner image that visually replicates a TEXT poll card for sharing.
 * @param {object} poll The poll object.
 * @param {string} logoUrl Path to the Pyngl logo.
 * @returns {Promise<File>} A new File object for the image.
 */
export const createTextPollBanner = (poll, logoUrl) => {
    return new Promise((resolve, reject) => {
        const logoImage = new Image();
        logoImage.crossOrigin = "Anonymous";

        logoImage.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = 1200; // Standard 1.91:1 aspect ratio
            canvas.height = 630;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const drawRoundRect = (x, y, width, height, radius) => {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();
            };
            
            ctx.fillStyle = '#1F2937';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.font = 'bold 52px Inter, sans-serif';

            const words = poll.question.split(' ');
            let line = '';
            const questionLines = [];
            for(let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > canvas.width - 100 && n > 0) {
                    questionLines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            questionLines.push(line);
            questionLines.forEach((lineText, i) => {
                ctx.fillText(lineText.trim(), canvas.width / 2, 80 + (i * 60));
            });

            ctx.font = '500 42px Inter, sans-serif';
            const optionsYStart = 220;
            const optionHeight = 70;
            const optionMargin = 20;
            const optionWidth = canvas.width - 200;

            poll.options.forEach((option, index) => {
                if (index >= 3) return; // Limit to 3 options to avoid overflow
                const yPos = optionsYStart + index * (optionHeight + optionMargin);
                
                ctx.fillStyle = '#F3F4F6';
                drawRoundRect(100, yPos, optionWidth, optionHeight, 35);

                ctx.fillStyle = '#374151';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(option.text, canvas.width / 2, yPos + optionHeight / 2);
            });

            const logoHeight = 45;
            const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
            const margin = 40;
            ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
            canvas.toBlob((blob) => {
                if (!blob) {
                    return reject(new Error('Canvas is empty'));
                }
                const newFile = new File([blob], "pyngl_share_card.jpg", { type: 'image/jpeg' });
                resolve(newFile);
            }, 'image/jpeg', 0.95);
        };
        
        logoImage.onerror = () => reject(new Error('Failed to load the logo image.'));
        logoImage.src = logoUrl;
    });
};

/**
 * Creates a branded, shareable image for an IMAGE poll by combining the poll's
 * main image with a generated QR code and branding.
 * @param {object} poll The poll object containing the imageUrl and ID.
 * @param {string} logoUrl The path to the Pyngl logo for the main branding.
 * @returns {Promise<File>} A new File object for the composite image.
 */
export const createImagePollShareable = async (poll, logoUrl) => {
    // Helper function to load an image and return a promise, ensuring it's ready to be drawn.
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Crucial for images from Cloudinary
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    };

    // 1. Create the QR Code instance
    const pollLink = `${window.location.origin}/poll/${poll._id}`;
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: pollLink,
        image: '/LogoPyngl.png', // Logo from your /public folder for the QR center
        dotsOptions: { color: "#4a044e", type: "dots" },
        backgroundOptions: { color: "#ffffff" },
        cornersSquareOptions: { color: "#701a75", type: "extra-rounded" },
        imageOptions: { imageSize: 0.4, margin: 4 }
    });

    // 2. Get the QR code as a data URL (a string representation of the image)
    const qrCodeUrl = await qrCode.getImageUrl("png");

    // 3. Load all three images concurrently and wait for them ALL to be ready
    const [pollImage, logoImage, qrImage] = await Promise.all([
        loadImage(poll.imageUrl), // The main poll image from Cloudinary
        loadImage(logoUrl),       // The main Pyngl logo for branding
        loadImage(qrCodeUrl)      // The generated QR code image
    ]);

    // 4. Once all images are loaded, create the canvas and draw everything
    const canvas = document.createElement('canvas');
    canvas.width = 1080;  // Instagram Story dimensions (9:16)
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    // Draw a dark background
    ctx.fillStyle = '#1F2937'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the main poll image at the top (in a 4:5 aspect ratio box)
    ctx.drawImage(pollImage, 0, 0, 1080, 1350); 
    
    // Draw the generated QR code in the bottom section
    ctx.drawImage(qrImage, (canvas.width - 300) / 2, 1420, 300, 300);

    // Add "Scan to Vote!" text below the QR code
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.fillText('Scan to Vote!', canvas.width / 2, 1780);

    // Add the main Pyngl logo at the very bottom for branding
    const logoHeight = 50;
    const logoWidth = (logoImage.width / logoImage.height) * logoHeight;
    ctx.drawImage(logoImage, (canvas.width - logoWidth) / 2, 1840, logoWidth, logoHeight);
    
    // 5. Export the final, composite image as a File object
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Canvas to Blob conversion failed'));
            const newFile = new File([blob], "pyngl_image_poll_share.jpg", { type: 'image/jpeg' });
            resolve(newFile);
        }, 'image/jpeg', 0.95);
    });
};

