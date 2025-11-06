import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    const inStandalone = window.navigator.standalone === true;
    setIsIos(iOS);
    setIsStandalone(inStandalone);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("✅ beforeinstallprompt fired");
      setDeferredPrompt(e);
      setShowPrompt(true);

      // If user ignores popup, auto-hide after 30 seconds
      setTimeout(() => {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }, 30000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User install choice:", outcome);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const isIosInstallable = isIos && !isStandalone;

  if (!showPrompt && !isIosInstallable) return null;

  return (
    <div style={overlayStyle}>
      <div style={sheetStyle}>
        {isIosInstallable ? (
          <>
            <h3 style={titleStyle}>📱 Install Pyngl</h3>
            <p style={descStyle}>
              Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to install Pyngl on your device.
            </p>
          </>
        ) : (
          <>
            <h3 style={titleStyle}>🚀 Install Pyngl App</h3>
            <p style={descStyle}>
              Add Pyngl to your Home Screen for a faster and full-screen experience.
            </p>
            <div style={buttonContainer}>
              <button onClick={handleInstallClick} style={installButton}>
                Install
              </button>
              <button onClick={() => setShowPrompt(false)} style={cancelButton}>
                Not now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* --- 💅 Styles --- */

const overlayStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  zIndex: 9999,
  animation: "fadeIn 0.3s ease-in-out",
};

const sheetStyle = {
  background: "#ffffff",
  width: "100%",
  maxWidth: "480px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
  padding: "20px 24px 30px",
  margin: "0 auto",
  textAlign: "center",
  fontFamily: "system-ui, -apple-system, Roboto, sans-serif",
  animation: "slideUp 0.3s ease-in-out",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#111",
};

const descStyle = {
  fontSize: "15px",
  color: "#444",
  marginBottom: "16px",
  lineHeight: "1.4",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const installButton = {
  background: "#0078FF",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "10px 20px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  flex: "1 1 40%",
  minWidth: "120px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};

const cancelButton = {
  background: "#f3f3f3",
  color: "#333",
  border: "none",
  borderRadius: "10px",
  padding: "10px 20px",
  fontSize: "15px",
  cursor: "pointer",
  flex: "1 1 40%",
  minWidth: "120px",
};

/* Add animations globally */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @media (prefers-color-scheme: dark) {
    div[style*="background: rgba(0, 0, 0, 0.4)"] {
      background: rgba(0, 0, 0, 0.6);
    }
    div[style*="background: #ffffff"] {
      background: #1c1c1e !important;
      color: #fff !important;
    }
  }
`;
document.head.appendChild(styleSheet);
