import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddComment({ value, onChange, onClick }) {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="flex flex-direction-right gap-3">
      {user?.image ? (
        <Link to={`/home/profile/${user?.id}`}>
          <img
            src={user?.image}
            alt="avatar"
            alt="avatar"
            className="w-10 h-10 rounded-full bg-violet-700 object-cover"
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

      <div className="flex-1">
        <textarea
          value={value}
          onChange={onChange}
          rows={2}
          placeholder="أضف تعليقاً..."
          className="w-full rounded-2xl bg-violet-50 border border-violet-100 p-3 resize-none outline-none text-sm text-slate-700"
        />

        <div className="mt-3 space-y-3">
          <button
            type="button"
            onClick={onClick}
            className="bg-violet-600 text-white px-3 py-2 rounded-full text-xs font-sm cursor-pointer hover:bg-violet-700"
          >
            نشر التعليق
          </button>
        </div>
      </div>
    </div>
  );
}
