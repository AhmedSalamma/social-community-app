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
    "flex items-center w-full p-4 gap-6 text-xl font-light transition-all duration-200 hover:bg-violet-50";
  const activeClass = ({ isActive }) =>
    `${baseClass} ${
      isActive
        ? "text-violet-500 border-r-4 border-violet-500 bg-violet-100"
        : "text-gray-500"
    }`;

  const communityClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 flex-1 transition-all duration-200 ${
      isActive
        ? "text-violet-500 bg-violet-100"
        : "text-gray-500 hover:bg-violet-50"
    }`;

  return (
    <div>
      {/* Create Post */}
      <div className="my-4 space-y-3">
        <Link
          to="/home/create"
          className="mx-auto flex items-center justify-center gap-2 w-[80%] rounded-lg p-3 shadow-3xl bg-violet-500 hover:bg-violet-600 text-white transition"
        >
          <FiPlus size={18} />
          إنشاء منشور
        </Link>

        <Link
          to="/home/communities/create"
          className="mx-auto flex items-center justify-center gap-2 w-[80%] rounded-lg p-3 shadow-sm border border-violet-500 text-violet-600 hover:bg-violet-50 transition"
        >
          <FiUsers size={18} />
          إنشاء مجتمع
        </Link>
      </div>

      {/* Menu */}
      <div>
        <h2 className="text-md font-medium mb-2">الأقسام</h2>

        <ul className="space-y-2">
          <li>
            <NavLink to="/home" className={activeClass}>
              <FiHome size={18} />
              الرئيسية
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/communities" className={activeClass}>
              <FiUsers size={18} />
              المجتمعات
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/chat" className={activeClass}>
              <FiMessageCircle size={18} />
              الدردشات
            </NavLink>
          </li>

          <li>
            <NavLink to="/home/settings" className={activeClass}>
              <FiSettings size={18} />
              الإعدادات
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Communities */}
      <div>
        <h2 className="text-md font-medium mb-2 mt-6">مجتمعاتي</h2>

        <ul className="space-y-2 w-full">
          {myCommunities.map((community) => (
            <li
              key={community.id}
              className="flex items-center rounded-md overflow-hidden"
            >
              <NavLink
                to={`/home/community/${community.id}`}
                className={communityClass}
              >
                {community.image ? (
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="bg-violet-100 text-violet-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                    {initials(community.name)}
                  </span>
                )}
                {community.name}
                <span className="text-xs text-gray-400 px-2 shrink-0">
                  {community.posts_count} منشور
                </span>
              </NavLink>
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
