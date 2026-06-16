import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import CreatePost from "../components/CreatePost";

export default function Community() {
  const navClass = ({ isActive }) =>
    `pb-3 transition ${
      isActive
        ? "text-violet-600 border-b-2 border-violet-600 font-medium"
        : "text-gray-500 hover:text-violet-600"
    }`;

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
          <img
            src="https://i.pravatar.cc/100"
            alt="community"
            className="w-16 h-16 rounded-full border-2 border-white shadow"
          />

          <div>
            <h3 className="text-lg font-semibold">العوالم التقنية</h3>

            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span>12K عضو</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>مجتمع تقني</span>
            </div>
          </div>
        </div>

        <button className="bg-violet-600 text-white px-5 py-2 rounded-full text-sm">
          + إنضمام
        </button>
      </div>

      {/* Write Post */}
      <CreatePost />

      {/* Navigation */}
      <div className="flex items-center gap-8 bg-white shadow-sm rounded-xl mt-4 p-3">
        <NavLink end to="." className={navClass}>
          المنشورات
        </NavLink>

        <NavLink to="members" className={navClass}>
          الأعضاء
        </NavLink>

        <NavLink to="about" className={navClass}>
          عن المجتمع
        </NavLink>
      </div>

      {/* Nested Routes */}
      <div className="mt-4">
        <Outlet />
      </div>
    </section>
  );
}
