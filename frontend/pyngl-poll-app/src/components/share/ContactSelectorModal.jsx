import React, { useState, useEffect } from "react";

export default function ContactSelectorModal({
  contacts = [],
  onCancel,
  onConfirm,
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = contacts.filter((c) =>
    (c.name + c.phone).toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (contact) => {
    if (selected.some((s) => s.phone === contact.phone)) {
      setSelected(selected.filter((s) => s.phone !== contact.phone));
    } else {
      setSelected([...selected, contact]);
    }
  };

  const selectAll = () => {
    setSelected(filtered);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-lg">
        
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Select WhatsApp Contacts
        </h2>

        <input
          className="w-full px-3 py-2 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="max-h-64 overflow-y-auto space-y-2">
          {filtered.map((c) => (
            <label
              key={c.phone}
              className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <input
                type="checkbox"
                checked={selected.some((s) => s.phone === c.phone)}
                onChange={() => toggleSelect(c)}
              />
              <div>
                <div className="font-medium">{c.name || "Unnamed"}</div>
                <div className="text-sm text-gray-500">{c.phone}</div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={selectAll}
            className="px-4 py-2 rounded-lg bg-gray-300"
          >
            Select All
          </button>

          <button
            onClick={() => onConfirm(selected)}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg"
          >
            Send ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}
