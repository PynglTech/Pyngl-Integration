import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api/axiosConfig";
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
          const mapped = fetchedContacts
            .filter((c) => c.email)
            .map((c) => ({
              name: c.name || "Unknown",
              email: c.email,
              avatar: null,
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
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let emails = [];
        if (results.meta.fields.some((f) => f.toLowerCase().includes("email"))) {
          const emailField = results.meta.fields.find((f) =>
            f.toLowerCase().includes("email")
          );
          emails = results.data
            .map((row) => row[emailField]?.trim())
            .filter((email) => email && email.includes("@"));
        } else {
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
    if (isSending) return;
    setIsSending(true);

    const emailsFromManual = manualEmails
      .split(/[\s,;]+/)
      .map((e) => e.trim())
      .filter((e) => e && e.includes("@"));

    let finalRecipients = [
      ...selectedContacts,
      ...emailsFromManual,
      ...(csvEmails || []),
    ];

    finalRecipients = [...new Set(finalRecipients)];

    if (finalRecipients.length === 0) {
      alert("⚠️ Please select or enter at least one valid email address.");
      setIsSending(false);
      return;
    }

    try {
      const response = await apiClient.post("api/polls/send-gmail-poll", {
        pollId,
        recipients: finalRecipients,
        userEmail: connectedEmail,
      });
      console.log("✅ Poll shared successfully:", response.data);
      setShowSuccessModal(true);
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
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mx-4 max-w-sm w-full relative shadow-lg">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold mb-6">
                Image to poll shared successfully!
              </h3>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium transition-colors"
              >
                Thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Header */}
      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-center space-x-3">
          <h1 className="text-md font-semibold text-gray-800 dark:text-gray-100">
            Share via Gmail
          </h1>
        </div>
      </header>

      {/* ✅ Main */}
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Connected Account */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">Connected:</span>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">S</span>
            </div>
            <span className="text-sm font-medium">{connectedEmail}</span>
          </div>
        </div>

        {/* Contacts */}
        <div className="space-y-4">
          <h2 className="text-base font-medium">Available Gmail Accounts</h2>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Gmail accounts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
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

          {/* Contact List */}
          <div className="max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-xl p-2 space-y-1 bg-white dark:bg-gray-800">
            {filteredContacts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No contacts found</p>
            ) : (
              filteredContacts.map((c, idx) => (
                <div
                  key={c.email || `contact-${idx}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.name || "Unknown"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {(c.name || c.email || "?").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {c.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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
          <h2 className="text-base font-medium">Add email manually</h2>
          <textarea
            value={manualEmails}
            onChange={(e) => setManualEmails(e.target.value)}
            placeholder="Type email addresses, separated by commas"
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm resize-none"
            rows="4"
          />

          {selectedContacts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedContacts.map((email) => (
                <span
                  key={email}
                  className="inline-flex items-center px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-sm"
                >
                  {email}
                  <button
                    onClick={() => removeSelectedEmail(email)}
                    className="ml-2 text-pink-500 dark:text-pink-300 hover:text-pink-700 dark:hover:text-pink-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CSV Upload */}
        <div className="space-y-4 pb-28">
          <h2 className="text-base font-medium">Upload CSV file</h2>
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
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {csvFile ? csvFile.name : "No file chosen"}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {csvFile ? `${csvEmails.length} emails` : "Choose file"}
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-2xl mx-auto">
          <button
            onClick={handleShare}
            disabled={isSending}
            className={`w-full py-4 rounded-full text-white font-medium text-lg transition-colors ${
              isSending
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            }`}
          >
            {isSending ? "Sending..." : "Share poll"}
          </button>
          </div>
        </div>
      </main>
    </div>
  );
}
