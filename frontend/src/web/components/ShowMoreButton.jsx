import React from "react";

export default function ShowMoreButton({
  onClick,
  loading = false,
  hasMore = true,
  text = "Show More",
  loadingText = "Loading...",
}) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white transition 
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner />
            {loadingText}
          </span>
        ) : (
          text
        )}
      </button>
    </div>
  );
}

// Spinner component
function Spinner() {
  return (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}
