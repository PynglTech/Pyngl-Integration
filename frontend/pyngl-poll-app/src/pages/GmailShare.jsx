import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api/axiosConfig"; // ✅ use apiClient

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
        .get(`/auth/contacts?email=${connectedEmail}`)
        .then((res) => {
          const fetchedContacts = res.data.contacts || [];
          setContacts(fetchedContacts);
          setFilteredContacts(fetchedContacts);
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

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const emails = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.includes("@"));
      setCsvEmails(emails);
    };
    reader.readAsText(file);
  };

  const handleShare = async () => {
    const emailsFromManual = manualEmails
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const finalRecipients = [
      ...selectedContacts,
      ...emailsFromManual,
      ...(csvEmails || []),
    ];

    if (finalRecipients.length === 0) {
      alert("Please select or enter at least one recipient.");
      return;
    }

    try {
      await apiClient.post("api/polls/send-poll", {
        pollId,
        recipients: finalRecipients,
        userEmail: connectedEmail,
      });

      alert("✅ Poll shared successfully!");

      setSelectedContacts([]);
      setManualEmails("");
      setCsvFile(null);
      setCsvEmails([]);
    } catch (err) {
      console.error("Error sharing poll:", err);
      alert("❌ Failed to share poll.");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Share Poll</h1>
        <span className="text-sm">
          {connectedEmail ? `Connected: ${connectedEmail}` : ""}
        </span>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        {/* Search contacts */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* Contact list */}
        <div className="space-y-3 max-h-[40vh] overflow-y-auto mb-6">
          {filteredContacts.map((c, idx) => (
            <div
              key={c.email || `contact-${idx}`}
              className="flex items-center justify-between border rounded-xl p-2 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={c.avatar || "/default-avatar.png"}
                  alt={c.name || "Unknown"}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{c.name || "Unknown"}</p>
                  <p className="text-sm text-gray-500">
                    {c.email || "No email"}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={selectedContacts.includes(c.email)}
                onChange={() => toggleContact(c.email)}
                className="w-5 h-5 accent-pink-500"
              />
            </div>
          ))}
        </div>

        {/* Manual emails */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Add emails manually
          </label>
          <input
            type="text"
            value={manualEmails}
            onChange={(e) => setManualEmails(e.target.value)}
            placeholder="Type emails separated by commas"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        {/* Upload CSV */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Upload CSV file
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="w-full px-3 py-2 border rounded-xl"
          />
          {csvFile && (
            <p className="text-sm text-gray-500 mt-1">
              Selected file: {csvFile.name} ({csvEmails.length} emails)
            </p>
          )}
        </div>
      </main>

      <footer className="p-4 bg-white border-t">
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-pink-500 to-purple-500"
        >
          Share poll
        </button>
      </footer>
    </div>
  );
}