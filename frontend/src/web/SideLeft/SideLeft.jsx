import React from "react";
import {
  FiArrowDownLeft,
  FiMapPin,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SideLeft() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 my-6">
        <FiTrendingUp className="text-violet-500 text-2xl" />
        <h2 className="text-lg font-medium">المواضيع الرائجة</h2>
      </div>

      {/* Trend Item */}
      <div className="cursor-pointer mb-2 p-3">
        <h3 className="text-gray-800 text-sm font-medium mb-1">
          كيف تلاقي شغل بأسرع وقت
        </h3>

        <p className="text-gray-500 text-xs leading-5">
          لو عايز تلاقي شغل بأسرع وقت في بعض الخطوات اللي هتساعدك تبدأ بسرعة...
        </p>
        <span className="text-gray-400 text-xs">1.2K مشاهدة</span>
      </div>
      <div className="cursor-pointer mb-2 p-3">
        <h3 className="text-gray-800 text-sm font-medium mb-1">
          كيف تلاقي شغل بأسرع وقت
        </h3>

        <p className="text-gray-500 text-xs leading-5">
          لو عايز تلاقي شغل بأسرع وقت في بعض الخطوات اللي هتساعدك تبدأ بسرعة...
        </p>
        <span className="text-gray-400 text-xs">1.2K مشاهدة</span>
      </div>
      <div className="cursor-pointer mb-2 p-3">
        <h3 className="text-gray-800 text-sm font-medium mb-1">
          كيف تلاقي شغل بأسرع وقت
        </h3>

        <p className="text-gray-500 text-xs leading-5">
          لو عايز تلاقي شغل بأسرع وقت في بعض الخطوات اللي هتساعدك تبدأ بسرعة...
        </p>
        <span className="text-gray-400 text-xs">1.2K مشاهدة</span>
      </div>

      <div className="bg-violet-100 rounded-2xl p-4 w-full max-w-sm shadow-sm">
        {/* Header */}
        <h2 className="font-bold text-gray-900 mb-4">مجتمعات مقترحة</h2>

        {/* Item 1 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="bg-violet-200 text-violet-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                ع/ل
              </span>
              <span className="text-gray-700 text-sm">الأمن السيبراني</span>
            </div>
            <span className="text-violet-600 text-xs mr-10">+5K أعضاء</span>
          </div>

          <button className="text-xs border border-violet-500 text-violet-600 rounded-full px-3 py-1 hover:bg-violet-200 transition">
            الانضمام
          </button>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-violet-200 text-violet-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                ع/ل
              </span>
              <span className="text-gray-700 text-sm">الذكاء العاطفي</span>
            </div>
            <span className="text-violet-600 text-xs mr-10">+3K أعضاء</span>
          </div>
          <button className="text-xs border border-violet-500 text-violet-600 rounded-full px-3 py-1 hover:bg-violet-200 transition">
            الانضمام
          </button>
        </div>
        {/* Item 2 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-violet-200 text-violet-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                ع/ل
              </span>
              <span className="text-gray-700 text-sm">الذكاء العاطفي</span>
            </div>
            <span className="text-violet-600 text-xs mr-10">+3K أعضاء</span>
          </div>
          <button className="text-xs border border-violet-500 text-violet-600 rounded-full px-3 py-1 hover:bg-violet-200 transition">
            الانضمام
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm cursor-pointer hover:text-violet-700 transition">
          <Link to="communities"> عرض الكل</Link>

          <FiArrowDownLeft className="inline-block mr-1" />
        </div>
      </div>
      <div className="cursor-pointer mb-4 p-3"></div>
    </div>
  );
}
