import React from "react";

const ValidationMessage = ({ text, type = "error" }) => {
  if (type === "error") {
    return (
      <div className="bg-pink-50 dark:bg-[rgba(255,77,116,0.06)] text-pink-600 dark:text-[#ffb3c0] 
                      border border-pink-100 dark:border-[rgba(255,77,116,0.12)]
                      p-3 rounded-lg flex items-start mt-2">
        <span className="mr-2 text-lg leading-tight">😒</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-[rgba(84,103,254,0.06)] text-blue-600 dark:text-[#cfe0ff] 
                    border border-blue-100 dark:border-[rgba(84,103,254,0.12)]
                    p-3 rounded-lg flex items-start mt-2">
      <span className="mr-2 text-lg leading-tight">•</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default ValidationMessage;
