export default function PollPreview({ poll, croppedImage, aspect = 9 / 16 }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md w-full max-w-[300px] flex flex-col p-3"
      style={{ aspectRatio: aspect }}
    >
      {/* Question */}
      <h2 className="font-semibold mt-3 text-gray-900 text-base line-clamp-2 mb-1">
        {poll.question}
      </h2>

      {/* Image only for non-text polls */}
      {poll.type !== "text" && (
        <div
          className="relative w-full rounded-xl overflow-hidden bg-gray-100"
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
            className="w-full border rounded-full px-4 py-2 text-center text-gray-700 text-sm truncate"
          >
            {opt.text}
          </div>
        ))}
      </div>

      {/* Branding */}
      <div className="text-right mt-2">
        <img src="/pynglLogoImage.png" alt="logo" className="inline-block h-4" />
      </div>
    </div>
  );
}