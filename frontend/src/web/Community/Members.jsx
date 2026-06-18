import React from "react";

function Members() {
  return (
    <section className="mt-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="rounded-full h-16 w-16 object-cover"
            src="https://i.pravatar.cc/100"
            alt="member"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">أحمد سلامة</h3>

            <p className="text-sm text-gray-500">عضو منذ 2026</p>
          </div>
        </div>

        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
          عرض الحساب
        </button>
      </div>
    </section>
  );
}

export default Members;
