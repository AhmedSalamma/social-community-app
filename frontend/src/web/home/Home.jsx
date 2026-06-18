import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import usePosts from "../../hooks/usePosts";
import { useSelector } from "react-redux";
import ShowMoreButton from "../components/ShowMoreButton";
import { Oval, TailSpin, ThreeDots } from "react-loader-spinner";
import Post from "../post/Post";
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const { getPosts, loading, errors, meta, hasMore } = usePosts();
  const allposts = useSelector((state) => state.postReducer.posts);

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <section>
      <div className=" flex items-center bg-white shadow-sm rounded-md  gap-4 p-4 ">
        <div className="border-b-3 border-primary ">
          <NavLink to="/about" className="text-primary text-text">
            الأحدث
          </NavLink>
        </div>

        <NavLink to="" className="text-primary text-text hover:underline">
          الأكثر تفاعلاً
        </NavLink>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-screen">
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
      )}

      {errors && !loading && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errors}
        </div>
      )}

      {!loading && !errors && allposts.length === 0 && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm text-slate-600">
          لا توجد منشورات حالياً.
        </div>
      )}

      {!loading && !errors && allposts.length > 0 && (
        <div className="mt-6 space-y-6">
          {allposts.map((post) => (
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
