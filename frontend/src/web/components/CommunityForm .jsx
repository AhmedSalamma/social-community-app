import React, { useRef } from "react";
import { FiImage } from "react-icons/fi";

export default function CommunityForm({ community, onChange }) {
  const uploadImage = useRef(null);

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          اسم المجتمع
        </label>
        <input
          type="text"
          value={community.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="مثال: العقول التقنية"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          وصف المجتمع
        </label>
        <textarea
          value={community.desc}
          onChange={(e) => onChange("desc", e.target.value)}
          rows={5}
          placeholder="اكتب وصفاً مختصراً عن المجتمع..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition resize-none"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          صورة المجتمع
        </label>

        <input
          ref={uploadImage}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              onChange("image", e.target.files[0]);
            }
          }}
        />

        <button
          type="button"
          onClick={() => uploadImage.current.click()}
          className="flex items-center gap-2 text-gray-500 hover:text-violet-600 transition"
        >
          <FiImage size={20} />
          <span className="text-sm">اختر صورة</span>
        </button>

        {community.image && (
          <img
            src={URL.createObjectURL(community.image)}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover mt-4 border border-gray-200"
          />
        )}
      </div>
    </div>
  );
}
