import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function Reply({ rep, makeLike, makeDisLike }) {
  const [reply, setReply] = useState("");

  return (
    <div className="mr-5 mt-4 border-r-2 border-slate-200 pr-4">
      <div className="bg-white p-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-slate-900">
              {rep.user_name || "مجهول"}
            </h4>

            <span className="text-xs text-slate-500">
              {new Date(rep.created_at).toLocaleString("ar-EG")}
            </span>
          </div>
        </div>

        <p className="mt-3 text-slate-700">{rep.content}</p>

        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={makeLike}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-violet-700 transition cursor-pointer"
          >
            <FiChevronUp size={16} />
            <span>({rep.likes_count})</span>
            <span>أعجبني</span>
          </button>

          <button
            onClick={makeDisLike}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-violet-700 transition cursor-pointer"
          >
            <FiChevronDown size={16} />
            <span>({rep.disLike_count})</span>
            <span>لم يعجبني</span>
          </button>
        </div>
      </div>
    </div>
  );
}
