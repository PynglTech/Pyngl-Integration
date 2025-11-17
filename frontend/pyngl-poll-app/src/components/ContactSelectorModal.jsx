// import React, { useState } from "react";

// export default function ContactSelectorModal({ contacts, onCancel, onConfirm }) {
//   const [selected, setSelected] = useState([]);

//   const toggle = (c) => {
//     setSelected((prev) =>
//       prev.includes(c)
//         ? prev.filter((x) => x !== c)
//         : [...prev, c]
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
//         <h2 className="text-lg font-semibold mb-4">Select Contacts</h2>

//         <div className="space-y-3">
//           {contacts.map((c, idx) => (
//             <div
//               key={idx}
//               className="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
//               onClick={() => toggle(c)}
//             >
//               <div>
//                 <p className="font-medium">{c.name || "Unnamed"}</p>
//                 <p className="text-sm text-gray-500">{c.phone}</p>
//               </div>

//               <input
//                 type="checkbox"
//                 checked={selected.includes(c)}
//                 readOnly
//               />
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-4 mt-6">
//           <button
//             className="flex-1 py-2 rounded-lg border"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>

//           <button
//             className="flex-1 py-2 rounded-lg bg-green-600 text-white"
//             onClick={() => onConfirm(selected)}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo } from "react";

export default function ContactSelectorModal({ contacts, onCancel, onConfirm }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const filteredContacts = useMemo(() => {
    return contacts.filter(c =>
      (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || "").includes(search)
    );
  }, [contacts, search]);

  const toggle = (c) => {
    setSelected((prev) =>
      prev.includes(c)
        ? prev.filter((x) => x !== c)
        : [...prev, c]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700 max-h-[85vh] flex flex-col">

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select Contacts
        </h2>

        {/* Search Box */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by name or number..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 outline-none focus:ring-2 focus:ring-pink-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* Contact List */}
        <div className="overflow-y-auto pr-1 flex-1 custom-scroll space-y-3">

          {filteredContacts.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-6">
              No contacts found.
            </p>
          )}

          {filteredContacts.map((c, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer
              transition-transform hover:scale-[1.02]
              ${selected.includes(c)
                ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              }`}
              onClick={() => toggle(c)}
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {c.name || "Unnamed"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.phone}</p>
              </div>

              <input
                type="checkbox"
                checked={selected.includes(c)}
                className="h-5 w-5 accent-pink-500 cursor-pointer"
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="flex-1 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
            onClick={() => onConfirm(selected)}
          >
            Send ({selected.length})
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>
        {`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #d946ef;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        `}
      </style>
    </div>
  );
}
