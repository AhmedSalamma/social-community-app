import React from "react";
import { Link } from "react-router-dom";

export default function Replies() {
  return (
    <section className="space-y-4">
      <div className="bg-white shadow-sm p-4 rounded-lg flex gap-4 items-start hover:shadow-md transition">
        {/* Avatar */}
        <img
          className="w-12 h-full rounded-lg object-cover"
          src="https://i.pravatar.cc/60"
          alt="user avatar"
        />

        {/* Content */}
        <div className="space-y-2 flex-1">
          <h3 className="text-base font-semibold text-gray-800 hover:text-violet-600 transition">
            <Link to="">لماذا اصبح العالم هكذا</Link>
          </h3>

          <p className="bg-gray-100 text-gray-600 text-sm p-3 rounded-lg leading-relaxed">
            أنا في رأيي الموضوع دا معتمد على كل واحد ...
          </p>
        </div>
      </div>
    </section>
  );
}
