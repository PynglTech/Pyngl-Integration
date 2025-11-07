// import React, { useEffect, useState } from "react";

// export default function InstallPrompt() {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [isIos, setIsIos] = useState(false);
//   const [isStandalone, setIsStandalone] = useState(false);

//   useEffect(() => {
//     const userAgent = window.navigator.userAgent.toLowerCase();
//     const iOS = /iphone|ipad|ipod/.test(userAgent);
//     const inStandalone = window.navigator.standalone === true;
//     setIsIos(iOS);
//     setIsStandalone(inStandalone);

//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       console.log("✅ beforeinstallprompt fired");
//       setDeferredPrompt(e);
//       setShowPrompt(true);

//       // If user ignores popup, auto-hide after 30 seconds
//       setTimeout(() => {
//         setDeferredPrompt(null);
//         setShowPrompt(false);
//       }, 30000);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//   }, []);

//   const handleInstallClick = async () => {
//     if (!deferredPrompt) return;
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;
//     console.log("User install choice:", outcome);
//     setDeferredPrompt(null);
//     setShowPrompt(false);
//   };

//   const isIosInstallable = isIos && !isStandalone;

//   if (!showPrompt && !isIosInstallable) return null;

//   return (
//     <div style={overlayStyle}>
//       <div style={sheetStyle}>
//         {isIosInstallable ? (
//           <>
//             <h3 style={titleStyle}>📱 Install Pyngl</h3>
//             <p style={descStyle}>
//               Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to install Pyngl on your device.
//             </p>
//           </>
//         ) : (
//           <>
//             <h3 style={titleStyle}>🚀 Install Pyngl App</h3>
//             <p style={descStyle}>
//               Add Pyngl to your Home Screen for a faster and full-screen experience.
//             </p>
//             <div style={buttonContainer}>
//               <button onClick={handleInstallClick} style={installButton}>
//                 Install
//               </button>
//               <button onClick={() => setShowPrompt(false)} style={cancelButton}>
//                 Not now
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* --- 💅 Styles --- */

// const overlayStyle = {
//   position: "fixed",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   top: 0,
//   background: "rgba(0, 0, 0, 0.4)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "flex-end",
//   zIndex: 9999,
//   animation: "fadeIn 0.3s ease-in-out",
// };

// const sheetStyle = {
//   background: "#ffffff",
//   width: "100%",
//   maxWidth: "480px",
//   borderTopLeftRadius: "16px",
//   borderTopRightRadius: "16px",
//   boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
//   padding: "20px 24px 30px",
//   margin: "0 auto",
//   textAlign: "center",
//   fontFamily: "system-ui, -apple-system, Roboto, sans-serif",
//   animation: "slideUp 0.3s ease-in-out",
// };

// const titleStyle = {
//   fontSize: "18px",
//   fontWeight: "600",
//   marginBottom: "8px",
//   color: "#111",
// };

// const descStyle = {
//   fontSize: "15px",
//   color: "#444",
//   marginBottom: "16px",
//   lineHeight: "1.4",
// };

// const buttonContainer = {
//   display: "flex",
//   justifyContent: "center",
//   gap: "12px",
//   flexWrap: "wrap",
// };

// const installButton = {
//   background: "#0078FF",
//   color: "#fff",
//   border: "none",
//   borderRadius: "10px",
//   padding: "10px 20px",
//   fontSize: "15px",
//   fontWeight: "600",
//   cursor: "pointer",
//   flex: "1 1 40%",
//   minWidth: "120px",
//   boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
// };

// const cancelButton = {
//   background: "#f3f3f3",
//   color: "#333",
//   border: "none",
//   borderRadius: "10px",
//   padding: "10px 20px",
//   fontSize: "15px",
//   cursor: "pointer",
//   flex: "1 1 40%",
//   minWidth: "120px",
// };

// /* Add animations globally */
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes slideUp {
//     from { transform: translateY(100%); }
//     to { transform: translateY(0); }
//   }

//   @media (prefers-color-scheme: dark) {
//     div[style*="background: rgba(0, 0, 0, 0.4)"] {
//       background: rgba(0, 0, 0, 0.6);
//     }
//     div[style*="background: #ffffff"] {
//       background: #1c1c1e !important;
//       color: #fff !important;
//     }
//   }
// `;
// document.head.appendChild(styleSheet);



// import React, { useEffect, useState } from "react";

// export default function InstallPrompt() {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [showFallback, setShowFallback] = useState(false);
//   const [isIos, setIsIos] = useState(false);
//   const [isStandalone, setIsStandalone] = useState(false);

//   useEffect(() => {
//     const userAgent = window.navigator.userAgent.toLowerCase();
//     const iOS = /iphone|ipad|ipod/.test(userAgent);
//     const standalone = window.navigator.standalone === true;
//     setIsIos(iOS);
//     setIsStandalone(standalone);

//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       console.log("✅ beforeinstallprompt fired");
//       setDeferredPrompt(e);
//       setShowPrompt(true);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     // Fallback if browser doesn’t fire the event (LAN/IP case)
//     const timer = setTimeout(() => {
//       if (!window.matchMedia("(display-mode: standalone)").matches) {
//         console.log("⚠️ Showing fallback install guide");
//         setShowFallback(true);
//       }
//     }, 5000);

//     return () => {
//       window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//       clearTimeout(timer);
//     };
//   }, []);

//   const handleInstallClick = async () => {
//     if (!deferredPrompt) return;
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;
//     console.log("User choice:", outcome);
//     setDeferredPrompt(null);
//     setShowPrompt(false);
//   };

//   // Hide if already installed
//   if (isStandalone) return null;

//   return (
//     <>
//       {/* ✅ Real Install Prompt (Chrome desktop/mobile) */}
//       {showPrompt && (
//         <div style={overlayStyle}>
//           <div style={sheetStyle}>
//             <h3 style={titleStyle}>🚀 Install Pyngl App</h3>
//             <p style={descStyle}>
//               Add Pyngl to your Home Screen for a faster, full-screen experience.
//             </p>
//             <div style={buttonContainer}>
//               <button onClick={handleInstallClick} style={installButton}>Install</button>
//               <button onClick={() => setShowPrompt(false)} style={cancelButton}>Later</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Fallback Prompt (iOS or when event fails on LAN/IP) */}
//       {showFallback && (
//         <div style={overlayStyle}>
//           <div style={sheetStyle}>
//             <h3 style={titleStyle}>📱 Add Pyngl to Home Screen</h3>
//             {isIos ? (
//               <p style={descStyle}>
//                 Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to install Pyngl.
//               </p>
//             ) : (
//               <p style={descStyle}>
//                 For the best experience, open in Chrome and tap the <strong>⋮ menu</strong> →{" "}
//                 <strong>Add to Home Screen</strong>.
//               </p>
//             )}
//             <button onClick={() => setShowFallback(false)} style={cancelButton}>
//               Got it
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /* --- Styles --- */
// const overlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: "rgba(0,0,0,0.45)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "flex-end",
//   zIndex: 9999,
// };

// const sheetStyle = {
//   background: "#fff",
//   width: "100%",
//   maxWidth: "480px",
//   borderTopLeftRadius: "16px",
//   borderTopRightRadius: "16px",
//   boxShadow: "0 -4px 16px rgba(0,0,0,0.3)",
//   padding: "22px 24px 28px",
//   margin: "0 auto",
//   textAlign: "center",
//   fontFamily: "system-ui, -apple-system, Roboto, sans-serif",
//   animation: "slideUp 0.3s ease-in-out",
// };

// const titleStyle = {
//   fontSize: "18px",
//   fontWeight: "600",
//   marginBottom: "8px",
//   color: "#111",
// };

// const descStyle = {
//   fontSize: "15px",
//   color: "#444",
//   marginBottom: "16px",
//   lineHeight: "1.4",
// };

// const buttonContainer = {
//   display: "flex",
//   justifyContent: "center",
//   gap: "10px",
//   flexWrap: "wrap",
// };

// const installButton = {
//   background: "#0078FF",
//   color: "#fff",
//   border: "none",
//   borderRadius: "10px",
//   padding: "10px 20px",
//   fontSize: "15px",
//   fontWeight: "600",
//   cursor: "pointer",
//   minWidth: "120px",
// };

// const cancelButton = {
//   background: "#f3f3f3",
//   color: "#333",
//   border: "none",
//   borderRadius: "10px",
//   padding: "10px 20px",
//   fontSize: "15px",
//   cursor: "pointer",
//   minWidth: "120px",
// };



import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const standalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    
    if (standalone) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(iOS);

    // Listen for beforeinstallprompt (Chrome on HTTPS/localhost)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("✅ beforeinstallprompt fired");
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Fallback: Show manual prompt after 3 seconds if event didn't fire
    const fallbackTimer = setTimeout(() => {
      // Only show if:
      // 1. Not already showing the native prompt
      // 2. Not on standalone mode
      // 3. Has a service worker (PWA is ready)
      if (!deferredPrompt && !standalone) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          if (registrations.length > 0) {
            console.log("⚠️ Showing fallback install prompt (LAN/HTTP mode)");
            setShowPrompt(true);
          }
        });
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // No native prompt available - this shouldn't happen if we hide the button
      return;
    }
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User choice:", outcome);
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error("Install prompt error:", error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed it (store in sessionStorage to not show again this session)
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // Don't show if already installed or user dismissed
  if (isStandalone || sessionStorage.getItem("pwa-prompt-dismissed")) {
    return null;
  }

  if (!showPrompt) return null;

  return (
    <div style={overlayStyle} onClick={handleDismiss}>
      <div style={sheetStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <span style={iconStyle}>📱</span>
          <h3 style={titleStyle}>Install Pyngl</h3>
        </div>

        {isIos ? (
          // iOS Instructions
          <div style={contentStyle}>
            <p style={descStyle}>
              Install this app on your iPhone:
            </p>
            <ol style={instructionsStyle}>
              <li>Tap the <strong>Share</strong> button <span style={iconTextStyle}>⎙</span></li>
              <li>Scroll and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong> to confirm</li>
            </ol>
          </div>
        ) : deferredPrompt ? (
          // Native Chrome prompt available
          <div style={contentStyle}>
            <p style={descStyle}>
              Get the full app experience with offline access and faster loading.
            </p>
            <div style={buttonContainer}>
              <button onClick={handleInstallClick} style={installButton}>
                Install App
              </button>
              <button onClick={handleDismiss} style={cancelButton}>
                Maybe Later
              </button>
            </div>
          </div>
        ) : (
          // Manual instructions for LAN/HTTP access
          <div style={contentStyle}>
            <p style={descStyle}>
              For the best experience, add Pyngl to your home screen:
            </p>
            <ol style={instructionsStyle}>
              <li>Tap the browser menu <strong>⋮</strong> (top right)</li>
              <li>Select <strong>"Add to Home screen"</strong></li>
              <li>Tap <strong>"Add"</strong> or <strong>"Install"</strong></li>
            </ol>
            <button onClick={handleDismiss} style={dismissButton}>
              Got it!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Styles --- */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  zIndex: 9999,
  animation: "fadeIn 0.3s ease-out",
};

const sheetStyle = {
  background: "#ffffff",
  width: "100%",
  maxWidth: "480px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.3)",
  padding: "24px",
  paddingBottom: "32px",
  margin: "0 auto",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "16px",
};

const iconStyle = {
  fontSize: "32px",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  margin: 0,
  color: "#111",
};

const contentStyle = {
  textAlign: "center",
};

const descStyle = {
  fontSize: "15px",
  color: "#555",
  marginBottom: "20px",
  lineHeight: "1.5",
};

const instructionsStyle = {
  textAlign: "left",
  paddingLeft: "24px",
  margin: "16px 0",
  fontSize: "14px",
  color: "#333",
  lineHeight: "1.8",
};

const iconTextStyle = {
  fontSize: "18px",
  fontWeight: "normal",
};

const buttonContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "20px",
};

const installButton = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 24px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const cancelButton = {
  background: "#f5f5f5",
  color: "#555",
  border: "none",
  borderRadius: "12px",
  padding: "14px 24px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "background 0.2s",
};

const dismissButton = {
  background: "#0078FF",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "14px 32px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "16px",
  boxShadow: "0 4px 12px rgba(0, 120, 255, 0.3)",
};

// Add CSS animations
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(100%); 
      }
      to { 
        opacity: 1;
        transform: translateY(0); 
      }
    }
  `;
  if (!document.querySelector('style[data-pwa-animations]')) {
    styleSheet.setAttribute('data-pwa-animations', 'true');
    document.head.appendChild(styleSheet);
  }
}