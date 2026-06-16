import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import usePosts from "../../hooks/usePosts";
import { useSelector } from "react-redux";
import Post from "../post/post";
import ShowMoreButton from "../components/ShowMoreButton";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const { getPosts, loading, errors, meta, hasMore } = usePosts();
  const allposts = useSelector((state) => state.postReducer);

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <section className="mt-4">
      <div className=" flex items-center bg-white shadow-sm  gap-4 p-4 ">
        <div className="border-b-3 border-primary ">
          <NavLink to="/about" className="text-primary text-text">
            الأحدث
          </NavLink>
        </div>

        <NavLink to="/about" className="text-primary text-text hover:underline">
          الأكثر تفاعلاً
        </NavLink>

        <NavLink to="/about" className="text-primary text-text hover:underline">
          من المجتمعات
        </NavLink>
      </div>

      {loading && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm text-slate-600">
          جاري تحميل المنشورات...
        </div>
      )}

      {errors && !loading && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errors}
        </div>
      )}

      {!loading && !errors && allposts.posts.length === 0 && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm text-slate-600">
          لا توجد منشورات حالياً.
        </div>
      )}

      {!loading && !errors && allposts.posts.length > 0 && (
        <div className="mt-6 space-y-6">
          {allposts.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          <ShowMoreButton
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            loading={loading}
            hasMore={hasMore}
            text="المزيد"
          />
        </div>
      )}
    </section>
  );
}
