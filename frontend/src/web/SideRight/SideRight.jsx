import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiPlus,
  FiUsers,
  FiMessageCircle,
  FiSettings,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import useCommunities from "../../hooks/useCommunities";

export default function SideRight() {
  const [currentPage, setCurrentPage] = useState(1);
  const { myCommunities, getMyCommunities, myCommunitiesPagination } =
    useCommunities();

  useEffect(() => {
    getMyCommunities(currentPage);
  }, [currentPage]);

  const initials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const baseClass =
    "flex items-center p-4 gap-6 text-xl font-light transition-all duration-200";

  const activeClass = ({ isActive }) =>
    isActive
      ? `${baseClass} text-violet-500 border-r-4 border-violet-500 bg-violet-100`
      : `${baseClass} text-gray-500 hover:bg-violet-50`;

  const communityClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
      isActive
        ? "text-violet-500 bg-violet-100"
        : "text-gray-500 hover:bg-violet-50"
    }`;

  return (
    <div>
      {/* Create Post */}
      <div className="my-4 space-y-3">
        <button className="mx-auto flex items-center justify-center gap-2 w-[80%] rounded-lg p-3 shadow-3xl bg-violet-500 hover:bg-violet-600 text-white cursor-pointer transition">
          <FiPlus size={18} />
          <Link to="create"> إنشاء منشور</Link>
        </button>

        <button className="mx-auto flex items-center justify-center gap-2 w-[80%] rounded-lg p-3 shadow-sm border border-violet-500 text-violet-600 hover:bg-violet-50 cursor-pointer transition">
          <FiUsers size={18} />
          <Link to="communities/create"> إنشاء مجتمع</Link>
        </button>
      </div>

      {/* Menu */}
      <div>
        <h2 className="text-md font-medium mb-2">الأقسام</h2>

        <ul className="space-y-2">
          <li>
            <NavLink to="/" className={activeClass}>
              <FiHome size={18} />
              الرئيسية
            </NavLink>
          </li>

          <li>
            <NavLink to="/communities" className={activeClass}>
              <FiUsers size={18} />
              المجتمعات
            </NavLink>
          </li>

          <li>
            <NavLink to="/chat" className={activeClass}>
              <FiMessageCircle size={18} />
              الدردشات
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className={activeClass}>
              <FiSettings size={18} />
              الإعدادات
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Communities */}
      <div>
        <h2 className="text-md font-medium mb-2 mt-6">مجتمعاتي</h2>

        <ul className="space-y-2">
          {myCommunities.map((community) => (
            <li
              className="flex gap-1.5 justify-between items-center"
              key={community.id}
            >
              <NavLink
                to={`/community/${community.id}`}
                className={communityClass}
              >
                {community.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL_DOMAIN}/storage/${community.image}`}
                    alt={community.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="bg-violet-100 text-violet-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                    {initials(community.name)}
                  </span>
                )}

                {community.name}
              </NavLink>
              <span className="text-xs text-gray-400 ml-10">
                {community.posts_count} منشور
              </span>
            </li>
          ))}
        </ul>

        {myCommunitiesPagination?.last_page > currentPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="mx-auto flex items-center justify-center gap-2 w-[80%] rounded-lg p-3 shadow-sm border border-violet-500 text-violet-600 hover:bg-violet-50 cursor-pointer transition"
          >
            تحميل المزيد
          </button>
        )}
      </div>
    </div>
  );
}
