export default function PollPreview({ poll, croppedImage, aspect = 9 / 16 }) {
  return (
    <div
      className="bg-white dark:bg-[#131526] rounded-2xl shadow-md w-full max-w-[300px] flex flex-col p-3 transition-colors duration-300 border border-gray-200 dark:border-gray-700"
      style={{ aspectRatio: aspect }}
    >
      {/* Question */}
      <h2 className="font-semibold mt-3 text-gray-900 dark:text-gray-100 text-base line-clamp-2 mb-3">
        {poll.question}
      </h2>

      {/* Image only for non-text polls */}
      {poll.type !== "text" && (
        <div
          className="relative w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
          style={{ aspectRatio: aspect }}
        >
          <img
            src={croppedImage || poll.imageUrl}
            alt="Poll"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Options */}
      <div className="mt-3 space-y-2">
        {poll.options.map((opt, i) => (
          <div
            key={opt._id || i}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-300 text-sm truncate bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          >
            {opt.text}
          </div>
        ))}
      </div>

      {/* Branding */}
      <div className="text-right mt-2">
        {/* Light mode logo */}
        <img
          src="/assets/pynglLogoImage.png"
          alt="logo"
          className="inline-block h-4 dark:hidden"
        />

        {/* Dark mode logo */}
        <img
          src="/assets/logo_dark.svg"
          alt="logo"
          className="hidden dark:inline-block h-4"
        />
      </div>
    </div>
  );
}
