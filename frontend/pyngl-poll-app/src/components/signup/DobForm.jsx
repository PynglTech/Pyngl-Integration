import React, { useEffect, useRef, useState, useMemo } from "react";
import { ArrowLeft, Calendar } from "lucide-react";

const DOB_MIN_AGE = 15;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Wheel Component
const DatePickerWheel = ({ value, onChange, options }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const index = options.indexOf(value);
    if (index === -1) return;

    const itemHeight = containerRef.current.children[3]?.offsetHeight || 40;

    const scrollTo =
      (index + 3) * itemHeight -
      containerRef.current.offsetHeight / 2 +
      itemHeight / 2;

    containerRef.current.scrollTop = scrollTo;
  }, [value, options]);

  // Snap scrolling
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (container.scrollTimeout) clearTimeout(container.scrollTimeout);

    container.scrollTimeout = setTimeout(() => {
      const itemHeight = container.children[3]?.offsetHeight || 40;
      const midScroll = container.scrollTop + container.offsetHeight / 2;

      const closestFullIndex = Math.round(midScroll / itemHeight - 0.5);
      const closest = Math.min(
        Math.max(0, closestFullIndex - 3),
        options.length - 1
      );

      const snap =
        (closest + 3) * itemHeight -
        container.offsetHeight / 2 +
        itemHeight / 2;

      container.scrollTop = snap;

      const newValue = options[closest];
      if (newValue !== value) onChange(newValue);
    }, 120);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-60 overflow-y-scroll text-center py-20 scroll-smooth no-scrollbar"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {[1, 2, 3].map((i) => (
        <div key={`pad-t-${i}`} className="py-2 text-2xl opacity-0">.</div>
      ))}

      {options.map((opt, index) => (
        <div
          key={index}
          className={`py-2 text-2xl font-semibold transition-colors duration-200 ${
            opt === value 
              ? "text-gray-900 dark:text-white scale-110" 
              : "text-gray-300 dark:text-gray-600"
          }`}
        >
          {opt}
        </div>
      ))}

      {[1, 2, 3].map((i) => (
        <div key={`pad-b-${i}`} className="py-2 text-2xl opacity-0">.</div>
      ))}
    </div>
  );
};

const DobForm = ({ onBack, onContinue }) => {
  const today = new Date();

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - DOB_MIN_AGE);

    return {
      month: MONTHS[d.getMonth()],
      day: d.getDate(),
      year: d.getFullYear(),
    };
  });

  const [showPicker, setShowPicker] = useState(false);

  // Day & year options
  const daysInMonth = useMemo(
    () => new Date(date.year, MONTHS.indexOf(date.month) + 1, 0).getDate(),
    [date.month, date.year]
  );

  const dayOptions = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth]
  );

  const yearOptions = useMemo(
    () => Array.from({ length: 120 }, (_, i) => today.getFullYear() - i),
    [today]
  );

  // Eligibility check
  const isEligible = useMemo(() => {
    const selected = new Date(
      date.year,
      MONTHS.indexOf(date.month),
      date.day
    );

    const limit = new Date();
    limit.setFullYear(limit.getFullYear() - DOB_MIN_AGE);
    // Set to end of day to include the cutoff date
    limit.setHours(23, 59, 59, 999);

    return selected <= limit;
  }, [date]);

  useEffect(() => {
    if (date.day > daysInMonth) {
      setDate((prev) => ({ ...prev, day: daysInMonth }));
    }
  }, [daysInMonth, date.day]);

  const dobDisplay = `${date.month} ${date.day}, ${date.year}`;

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">

      {/* Header */}
      <div className="shrink-0 w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
        </button>

        <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">Create account</h1>

        {/* Spacer for alignment */}
        <div className="w-9"></div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 text-center font-medium">
            Step 3 of 3
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-8 text-center md:text-left">
            Birthday
          </h2>

          {/* DOB input */}
          <div className="relative">
            <input
              type="text"
              readOnly
              value={dobDisplay}
              onClick={() => setShowPicker(true)}
              className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-[#2D3148] rounded-lg text-lg font-medium cursor-pointer focus:outline-none focus:border-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] transition-colors"
            />

            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9aa4b2] pointer-events-none" />
          </div>

          {!isEligible && (
            <p className="mt-3 text-sm text-red-500 dark:text-[#ffb3c0] font-medium flex items-center bg-red-50 dark:bg-[rgba(255,0,0,0.06)] p-3 rounded-lg">
              😔 Users under {DOB_MIN_AGE} are not eligible to create a Pyngl account
            </p>
          )}

          {/* Continue Button */}
          <div className="pt-8">
            <button
              onClick={() => isEligible && onContinue(dobDisplay)}
              disabled={!isEligible}
              className={`w-full py-3.5 px-4 text-white rounded-full font-semibold shadow-lg transition-all flex items-center justify-center ${
                isEligible
                  ? "bg-pyngl-pink hover:bg-pyngl-pink-dark"
                  : "bg-gray-300 dark:bg-[#2D3148] dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Picker Bottom Sheet */}
      {showPicker && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
          onClick={() => setShowPicker(false)}
        >
          <div 
            className="bg-white dark:bg-[#1B1F33] w-full max-w-md rounded-t-2xl pb-6 shadow-2xl transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between px-6 pt-4 pb-3 border-b border-gray-100 dark:border-[#2D3148]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-[#F1F1F1]">Select Birthday</h3>
              <button
                onClick={() => setShowPicker(false)}
                className="text-blue-600 dark:text-[#5467FE] font-semibold hover:opacity-80"
              >
                Done
              </button>
            </div>

            <div className="flex justify-around pt-3 relative">
              {/* Highlight Bar */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gray-100 dark:bg-[#2D3148] mx-4 rounded-lg pointer-events-none"></div>

              <div className="w-1/3 z-10">
                <DatePickerWheel
                  value={date.month}
                  onChange={(v) => setDate((prev) => ({ ...prev, month: v }))}
                  options={MONTHS}
                />
              </div>

              <div className="w-1/3 z-10">
                <DatePickerWheel
                  value={date.day}
                  onChange={(v) => setDate((prev) => ({ ...prev, day: v }))}
                  options={dayOptions}
                />
              </div>

              <div className="w-1/3 z-10">
                <DatePickerWheel
                  value={date.year}
                  onChange={(v) => setDate((prev) => ({ ...prev, year: v }))}
                  options={yearOptions}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DobForm;