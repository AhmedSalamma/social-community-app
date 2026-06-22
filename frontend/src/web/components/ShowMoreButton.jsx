import React from "react";
import { FiArrowDown } from "react-icons/fi";

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
        type="button"
        onClick={onClick}
        disabled={loading}
        className={`px-4 py-2 rounded-full text-white transition 
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-violet-500 hover:bg-violet-700 cursor-pointer"}
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <FiArrowDown className="animate-spin" />
            {loadingText}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <FiArrowDown />
            {text}
          </span>
        )}
      </button>
    </div>
  );
}
