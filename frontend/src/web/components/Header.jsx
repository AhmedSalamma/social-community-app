import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import {
  FiHome,
  FiSearch,
  FiSettings,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useSelector } from "react-redux";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const user = useSelector((state) => state.userReducer.user);

  return (
    <header className="bg-white text-primary border-b border-gray-200 h-16">
      <div className="hidden  md:flex lg:flex w-[70%] mx-auto flex items-center justify-between h-full gap-4">
        {/* Logo */}
        <h1 className="font-bold text-lg">سكون</h1>

        {/* Search */}
        <form className="flex-1">
          <input
            type="text"
            placeholder="ابحث"
            className="w-full h-10 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </form>

        {/* User */}
        <div className="flex items-center gap-6">
          {/* User */}
          <Link to={`/home/profile/${user?.id}`}>
            <div className="flex items-center gap-6">
              {isLogin ? (
                <>
                  {/* Notification */}
                  <button className="relative p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition cursor-pointer">
                    <FaBell size={18} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  {user?.image ? (
                    <Link to={`/home/profile/${user?.id}`}>
                      <img
                        src={user?.image}
                        alt="user"
                        className="w-9 h-9 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
                      />
                    </Link>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                      <Link to={`/home/profile/${user?.id}`}>
                        <span className="text-gray-500 font-bold">
                          {user?.name?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <button className="bg-violet-600 text-white px-5 py-2 rounded-full text-sm">
                  تسجيل الدخول
                </button>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      {openSearch ? (
        <>
          {/* Search */}
          <div className="block md:hidden lg:hidden w-[70%] mx-auto flex items-center justify-between h-full gap-4">
            <form className="flex-1">
              <input
                type="text"
                placeholder="ابحث"
                className="w-full h-10 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </form>

            <FiX
              onClick={() => {
                setOpenSearch(false);
              }}
              className="hover:text-violet-700 cursor-pointer transition ease-in-out"
              size={22}
            />
          </div>
        </>
      ) : (
        <div className="block md:hidden lg:hidden w-[70%] mx-auto flex items-center justify-between h-full gap-4">
          {/* Logo */}
          <h1 className="font-bold text-lg">سكون</h1>

          <div className="flex items-center gap-6">
            {/* Notification */}
            <button className="relative p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition cursor-pointer">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Search */}
            <button
              onClick={() => {
                setOpenSearch((prev) => !prev);
              }}
              className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition cursor-pointer"
            >
              <FiSearch size={20} />
            </button>

            {/* User */}
            <button className="lex items-center">
              {user?.image ? (
                <Link to={`/home/profile/${user?.id}`}>
                  <img
                    onClick={() => {
                      setOpenMobileNav(true);
                    }}
                    src={user?.image}
                    alt="user"
                    className="w-9 h-9 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
                  />
                </Link>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                  <Link to={`/home/profile/${user?.id}`}>
                    <span className="text-gray-500 font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </Link>
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Nav */}
      {openMobileNav && (
        <>
          <div className="absolute top-0 left-0 bg-white shadow-sm h-screen w-full block md:hidden lg:hidden p-4">
            {/* Close button */}
            <div
              onClick={() => {
                setOpenMobileNav(false);
              }}
              className="flex justify-end mb-4"
            >
              <FiX
                className="hover:text-violet-700 cursor-pointer transition"
                size={22}
              />
            </div>

            {/* Menu */}
            <ul className="space-y-2 text-md font-medium">
              <li className="hover:bg-gray-100 flex gap-3 p-4 rounded-2xl transition ease-in-out cursor-pointer">
                <FiHome size={18} />
                <Link to="">الرئسية</Link>
              </li>

              <li className="hover:bg-gray-100 flex gap-3 p-4 rounded-2xl transition ease-in-out cursor-pointer">
                <FiUser size={18} />
                <Link
                  onClick={() => {
                    setOpenMobileNav(false);
                  }}
                  to={`/home/profile/${user?.id}`}
                >
                  الملف الشخصي
                </Link>
              </li>

              <li className="hover:bg-gray-100 flex gap-3 p-4 rounded-2xl transition ease-in-out cursor-pointer">
                <FiUsers size={18} />
                <Link to="">المجتمعات</Link>
              </li>

              <li className="hover:bg-gray-100 flex gap-3 p-4 rounded-2xl transition ease-in-out cursor-pointer">
                <FiSettings size={18} />
                <Link to="">الإعدادات</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
