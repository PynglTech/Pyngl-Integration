export default function PollPreview({ poll, croppedImage, aspect = 9 / 16 }) {
  // Don't constrain the container height - let content flow naturally
  return (
    <div
      className="bg-white dark:bg-[#131526] rounded-2xl shadow-md w-full max-w-[300px] flex flex-col p-4 transition-colors duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Question */}
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-3 break-words">
        {poll.question}
      </h2>

      {/* Image only for non-text polls */}
      {poll.type !== "text" && (
        <div
          className="relative w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3"
          style={{ 
            paddingBottom: `${(1 / aspect) * 100}%`, // Intrinsic ratio technique
            position: 'relative'
          }}
        >
          <img
            src={croppedImage || poll.imageUrl}
            alt="Poll"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Options */}
      <div className="space-y-2 mb-3">
        {poll.options.map((opt, i) => (
          <div
            key={opt._id || i}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2.5 text-center text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          >
            <span className="truncate block">{opt.text}</span>
          </div>
        ))}
      </div>

      {/* Branding */}
      <div className="text-right mt-auto">
        {/* Light mode logo */}
        <img
          src="/assets/pynglLogoImage.png"
          alt="logo"
          className="inline-block h-4 dark:hidden"
        />

        {/* Dark mode logo */}
        <img
          src="/assets/logo_dark.png"
          alt="logo"
          className="hidden dark:inline-block h-4"
        />
      </div>
    </div>
  );
}