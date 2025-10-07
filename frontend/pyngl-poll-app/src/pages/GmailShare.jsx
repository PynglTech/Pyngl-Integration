import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api/axiosConfig"; // ✅ use apiClient
import Papa from "papaparse";

export default function SharePage() {
  const [searchParams] = useSearchParams();
  const pollId = searchParams.get("pollId");
  const connectedEmail = searchParams.get("connectedEmail");

  const [poll, setPoll] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [manualEmails, setManualEmails] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvEmails, setCsvEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch poll details
  useEffect(() => {
    if (pollId) {
      apiClient
        .get(`api/polls/${pollId}`)
        .then((res) => setPoll(res.data))
        .catch((err) => console.error("Error fetching poll:", err));
    }
  }, [pollId]);

  // Fetch Gmail contacts
  useEffect(() => {
    if (connectedEmail) {
      apiClient
        .get(`auth/contacts?email=${connectedEmail}`)
        .then((res) => {
          const fetchedContacts = res.data.contacts || [];
          console.log("🚀 ~ SharePage ~ res.data:", res.data);
          console.log("🚀 ~ fetchedContacts:", fetchedContacts);

          // Normalize: make sure email and name always exist
          const mapped = fetchedContacts
            .filter((c) => c.email) // remove empty emails
            .map((c) => ({
              name: c.name || "Unknown",
              email: c.email,
              avatar: null, // backend doesn’t send avatar yet
            }));

          setContacts(mapped);
          setFilteredContacts(mapped);
        })
        .catch((err) => console.error("Error fetching contacts:", err));
    }
  }, [connectedEmail]);

  // Filter contacts
  useEffect(() => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter(
          (c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, contacts]);

  const toggleContact = (email) => {
    if (selectedContacts.includes(email)) {
      setSelectedContacts(selectedContacts.filter((e) => e !== email));
    } else {
      setSelectedContacts([...selectedContacts, email]);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    if (!file) return;

    Papa.parse(file, {
      header: true, // auto-detects headers if they exist
      skipEmptyLines: true,
      complete: (results) => {
        let emails = [];

        // If headers were detected (e.g., "Name,Email")
        if (
          results.meta.fields.some((f) => f.toLowerCase().includes("email"))
        ) {
          const emailField = results.meta.fields.find((f) =>
            f.toLowerCase().includes("email")
          );
          emails = results.data
            .map((row) => row[emailField]?.trim())
            .filter((email) => email && email.includes("@"));
        } else {
          // No header row → assume one email per line
          emails = results.data
            .map((row) => Object.values(row)[0]?.trim())
            .filter((email) => email && email.includes("@"));
        }

        setCsvEmails(emails);
      },
      error: (error) => {
        console.error("CSV parse error:", error);
      },
    });
  };

  const handleShare = async () => {
    if (isSending) return; // Prevent double click
    setIsSending(true);

    // Split manually entered emails (support comma, space, semicolon, newline)
    const emailsFromManual = manualEmails
      .split(/[\s,;]+/)
      .map((e) => e.trim())
      .filter((e) => e && e.includes("@"));

    // Merge all sources
    let finalRecipients = [
      ...selectedContacts,
      ...emailsFromManual,
      ...(csvEmails || []),
    ];

    // Remove duplicates
    finalRecipients = [...new Set(finalRecipients)];

    if (finalRecipients.length === 0) {
      alert("⚠️ Please select or enter at least one valid email address.");
      return;
    }

    try {
      const response = await apiClient.post("api/polls/send-poll", {
        pollId,
        recipients: finalRecipients,
        userEmail: connectedEmail,
      });

      console.log("✅ Poll shared successfully:", response.data);
      setShowSuccessModal(true);

      // Reset UI
      setSelectedContacts([]);
      setManualEmails("");
      setCsvFile(null);
      setCsvEmails([]);
    } catch (err) {
      console.error("❌ Error sharing poll:", err);
      alert("❌ Failed to share poll. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const removeSelectedEmail = (email) => {
    if (selectedContacts.includes(email)) {
      setSelectedContacts(selectedContacts.filter((e) => e !== email));
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Image to poll shared successfully!
              </h3>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
              >
                Thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button> */}
          <h1 className="text-lg text-center font-semibold text-gray-800">
            Share via Gmail
          </h1>
        </div>
        {/* <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 5H4l5-5v5z" />
          </svg>
        </button> */}
      </header>

      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Connected Account */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-sm text-gray-600">Connected:</span>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">S</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {connectedEmail}
            </span>
          </div>
        </div>

        {/* Available Gmail Accounts Section */}
        {/* Available Gmail Accounts Section */}
        <div className="space-y-4">
          <h2 className="text-base font-medium text-gray-700">
            Available Gmail Accounts
          </h2>

          {/* Search contacts */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Gmail accounts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            />
            <svg
              className="absolute right-4 top-3.5 w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Scrollable Contact list */}
          <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-xl p-2 space-y-1 bg-white">
            {filteredContacts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                No contacts found
              </p>
            ) : (
              filteredContacts.map((c, idx) => (
                <div
                  key={c.email || `contact-${idx}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.name || "Unknown"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">
                          {(c.name || c.email || "?").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-800">
                        {c.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {c.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(c.email)}
                    onChange={() => toggleContact(c.email)}
                    className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Manual Email Section */}
        <div className="space-y-4">
          <h2 className="text-base font-medium text-gray-700">
            Add email manually
          </h2>
          <textarea
            value={manualEmails}
            onChange={(e) => setManualEmails(e.target.value)}
            placeholder="Type email addresses, separated by commas"
            className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm resize-none"
            rows="4"
          />

          {/* Selected emails tags */}
          {selectedContacts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedContacts.map((email) => (
                <span
                  key={email}
                  className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                >
                  {email}
                  <button
                    onClick={() => removeSelectedEmail(email)}
                    className="ml-2 text-pink-500 hover:text-pink-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Upload CSV Section */}
        <div className="space-y-4">
          <h2 className="text-base font-medium text-gray-700">
            Upload CSV file
          </h2>
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm text-gray-600">
                {csvFile ? csvFile.name : "No file chosen"}
              </span>
              <span className="text-sm text-gray-500">
                {csvFile ? `${csvEmails.length} emails` : "Choose file"}
              </span>
            </label>
          </div>
        </div>

        <div className="p-6">
          <button
            onClick={handleShare}
            disabled={isSending}
            className={`w-full py-4 rounded-full text-white font-medium text-lg ${
              isSending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            }`}
          >
            {isSending ? "Sending..." : "Share poll"}
          </button>
        </div>
      </main>
    </div>
  );
}
