/**
 * Creates a branded banner image for a text poll using a canvas.
 * @param {object} poll The poll object containing the question.
 * @param {string} logoUrl The URL of the logo to overlay (e.g., '/pynglLogoImage.png').
 * @returns {Promise<File>} A new File object for the composite image.
 */
export const createTextPollBanner = (poll, logoUrl) => {
    return new Promise((resolve, reject) => {
        const logoImage = new Image();
        logoImage.crossOrigin = "Anonymous";

        logoImage.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1200; // Standard social media share image width
            canvas.height = 628; // Standard social media share image height
            const ctx = canvas.getContext('2d');

            // Create a background gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#6EE7B7'); // Light Teal
            gradient.addColorStop(1, '#A78BFA'); // Light Purple
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Write the poll question in the center
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 60px Inter, sans-serif'; // Use your app's font
            // Simple logic to wrap text
            const words = poll.question.split(' ');
            const lines = [];
            let currentLine = words[0];
            for (let i = 1; i < words.length; i++) {
                const word = words[i];
                const width = ctx.measureText(currentLine + " " + word).width;
                if (width < canvas.width - 100) {
                    currentLine += " " + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
            lines.forEach((line, i) => {
                ctx.fillText(line, canvas.width / 2, canvas.height / 2 + (i * 70) - (lines.length > 1 ? 35 : 0));
            });

            // Draw the logo in the bottom-right corner
            const logoWidth = 150;
            const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
            const margin = 30;
            ctx.drawImage(logoImage, canvas.width - logoWidth - margin, canvas.height - logoHeight - margin, logoWidth, logoHeight);
            
            // Convert canvas to a File object
            canvas.toBlob((blob) => {
                const newFile = new File([blob], "linkedin_banner.jpg", { type: 'image/jpeg' });
                resolve(newFile);
            }, 'image/jpeg', 0.9);
        };
        
        logoImage.onerror = reject;
        logoImage.src = logoUrl;
    });
};
export const generateBrandedVariant = (masterImageSrc, logoSrc, options) => {
    return new Promise((resolve, reject) => {
        const masterImage = new Image();
        const logoImage = new Image();
        
        masterImage.crossOrigin = "Anonymous";
        logoImage.crossOrigin = "Anonymous";

        let loadedCount = 0;
        const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === 2) {
                const canvas = document.createElement('canvas');
                canvas.width = options.width;
                canvas.height = options.height;
                const ctx = canvas.getContext('2d');

                // --- Smart Center-Crop Logic ---
                const masterRatio = masterImage.width / masterImage.height;
                const targetRatio = options.width / options.height;
                let sourceX = 0, sourceY = 0, sourceWidth = masterImage.width, sourceHeight = masterImage.height;

                if (masterRatio > targetRatio) { // Master is wider than target
                    sourceWidth = masterImage.height * targetRatio;
                    sourceX = (masterImage.width - sourceWidth) / 2;
                } else { // Master is taller than target
                    sourceHeight = masterImage.width / targetRatio;
                    sourceY = (masterImage.height - sourceHeight) / 2;
                }
                
                ctx.drawImage(masterImage, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, options.width, options.height);
                
                // --- Branding Overlay Logic ---
                const logoMargin = 40; // 40px margin from the edges
                const logoWidth = canvas.width * 0.15; // Logo is 15% of the banner width
                const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
                ctx.drawImage(logoImage, canvas.width - logoWidth - logoMargin, canvas.height - logoHeight - logoMargin, logoWidth, logoHeight);
                
                // Convert canvas to a File object
                canvas.toBlob((blob) => {
                    const newFile = new File([blob], `pyngl_share_${options.width}x${options.height}.jpg`, { type: 'image/jpeg' });
                    resolve(newFile);
                }, 'image/jpeg', 0.92); // High-quality JPEG
            }
        };

        masterImage.onload = onImageLoad;
        logoImage.onload = onImageLoad;
        masterImage.onerror = reject;
        logoImage.onerror = reject;

        masterImage.src = masterImageSrc;
        logoImage.src = logoSrc;
    });
};
