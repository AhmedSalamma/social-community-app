import React, { useEffect } from "react";
import { FiImage, FiSettings } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function Profile() {
  const { loading, errors, getProfile } = useUser();
  const user = useSelector((state) => state.userReducer.user);

  const navClass = ({ isActive }) =>
    `pb-3 transition ${
      isActive
        ? "text-violet-600 border-b-2 border-violet-600 font-medium"
        : "text-gray-500 hover:text-violet-600"
    }`;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#5856d6"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (errors) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
        {errors}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-primary">
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src="https://i.pravatar.cc/1200"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <div className="relative -mt-10 mx-auto w-[95%] md:w-[80%] bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img
              src={user.image}
              alt="community"
              className="w-16 h-16 rounded-full border-2 border-white shadow  object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <span className="text-sm font-light">
              {user?.username && `@${user.username}`}
            </span>

            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span>منذ </span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>
                {user?.created_at
                  ? new Date(user.created_at).getFullYear()
                  : "2026"}
              </span>
            </div>
            <p className="text-sm text-gray-500 ]">
              {user?.bio?.slice(0, 100) ?? "لا يوجد سيرة ذاتية"}
              ...
            </p>
          </div>
        </div>

        <NavLink
          to="/home/settings"
          className="flex gap-2 border border-violet-600 text-violet-600 px-5 py-2 rounded-full text-sm hover:bg-violet-50 transition"
        >
          <FiSettings size={20} />
          الإعدادات
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8 bg-white shadow-sm rounded-xl mt-4 p-3">
        <NavLink end to="." className={navClass}>
          المنشورات
        </NavLink>

        <NavLink to="replies" className={navClass}>
          التعليقات
        </NavLink>

        <NavLink to="saves" className={navClass}>
          المحفوظات
        </NavLink>
      </div>

      {/* Nested Routes */}
      <div className="mt-4">
        <Outlet />
      </div>
    </section>
  );
}
