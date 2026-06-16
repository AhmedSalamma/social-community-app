import React, { useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import usePosts from "../../hooks/usePosts";

export default function CreatePost({ textarea, setTextarea, image }) {
  const [openWrite, setOpenWrite] = useState(false);
  const uplodeImage = useRef(null);

  return (
    <div className="mx-auto mt-6 flex items-start gap-4 p-4 bg-white shadow-sm rounded-xl border border-gray-100">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src="https://i.pravatar.cc/100"
        alt="user"
      />

      <div className="flex-1">
        <textarea
          value={textarea}
          onChange={setTextarea}
          onFocus={() => setOpenWrite(true)}
          className={`w-full bg-gray-50 px-4 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-200 ${
            openWrite ? "rounded-md h-28" : "rounded-full h-10"
          }`}
          rows={openWrite ? 4 : 1}
          placeholder="اكتب شيئاً..."
        />

        {openWrite && (
          <div className="flex justify-between items-center mt-3">
            <input onChange={image} ref={uplodeImage} hidden type="file" />
            <FiImage
              onClick={() => {
                uplodeImage.current.click();
              }}
              className="text-gray-500 cursor-pointer hover:text-violet-600 transition"
            />

            <button
              type="submit"
              className="bg-violet-600 text-white px-5 py-2 rounded-full text-sm hover:bg-violet-700 transition"
            >
              نشر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
