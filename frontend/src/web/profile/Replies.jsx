import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { ThreeDots } from "react-loader-spinner";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function Replies() {
  const { getAllUserComments, userComments, loading, meta } = useUser();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllUserComments(page);
  }, [page]);
  console.log(meta);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
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
  return (
    <section className="space-y-4">
      {userComments?.map((comment) => (
        <div className="bg-white shadow-sm p-4 rounded-lg flex gap-4 items-start hover:shadow-md transition">
          {/* Avatar */}
          <img
            className="w-9 h-9 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
            src={`${import.meta.env.VITE_API_URL_DOMAIN}/storage/${comment.user.avatar}`}
            alt="user avatar"
          />

          {/* Content */}

          <div key={comment.id} className="space-y-2 flex-1">
            <h3 className="text-base font-semibold text-gray-800 hover:text-violet-600 transition">
              <Link to={`/home/post/${comment.post_id}`}>
                {comment.post_title}{" "}
              </Link>
            </h3>

            <p className="bg-gray-100 text-gray-600 text-sm p-3 rounded-lg leading-relaxed">
              {comment.content}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span>👍</span>
                <span>{comment.likes_count}</span>
              </div>

              <div className="flex items-center gap-1">
                <span>👎</span>
                <span>{comment.dislikes_count}</span>
              </div>
              <span>{comment.created_at}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={meta?.current_page === 1}
          className={`px-6 py-2 rounded-lg transition ${
            meta?.current_page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          <FiArrowUp />
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={meta?.current_page === meta?.last_page}
          className={`px-6 py-2 rounded-lg transition ${
            meta?.current_page === meta?.last_page
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          <FiArrowDown />
        </button>
      </div>
    </section>
  );
}
