export default function AddComment({ value, onChange, onClick }) {
  return (
    <div className="flex flex-direction-right gap-3">
      <img
        src="https://i.pravatar.cc/100"
        alt="avatar"
        className="w-10 h-10 rounded-full bg-violet-700"
      />

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
            className="bg-violet-700 text-white px-3 py-2 rounded-full text-sm"
          >
            نشر التعليق
          </button>
        </div>
      </div>
    </div>
  );
}
