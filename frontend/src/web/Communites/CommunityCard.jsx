import React from "react";
import { Link } from "react-router-dom";

export default function CommunityCard({ community }) {
  if (!community) return null;

  const initials = community.name
    ?.split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  const imageUrl = community.image
    ? `${import.meta.env.VITE_API_URL_DOMAIN}/storage/${community.image}`
    : null;

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={community.name}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <span className="bg-violet-100 text-violet-600 w-16 h-16 flex items-center justify-center rounded-full text-lg font-semibold">
            {initials || "م"}
          </span>
        )}

        <Link
          to={`/community/${community.id}`}
          className="bg-violet-600 text-white px-5 py-2 rounded-full text-sm hover:bg-violet-700 transition"
        >
          + انضمام
        </Link>
      </div>

      <h3 className="text-lg font-medium mt-4">{community.name}</h3>

      <p className="text-gray-600 mt-2">{community.desc}</p>

      <div className="flex gap-4 mt-3 text-sm">
        <span className="text-gray-400">
          {community.posts_count ?? 0} منشور
        </span>
      </div>
    </div>
  );
}
