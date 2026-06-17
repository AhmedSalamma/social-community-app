import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import postsApi from "../../api/post";
import Post from "../post/post";
import usePosts from "../../hooks/usePosts";
import { ThreeDots } from "react-loader-spinner";

export default function ShowSinglePost() {
  const { id } = useParams();
  const { getSinglePost, loading, errors } = usePosts();
  const singlePost = useSelector((state) => state.postReducer.singlePost);

  useEffect(() => {
    getSinglePost(id);
  }, [id]);

  if (loading) {
    return (
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
    );
  }

  if (errors) {
    return (
      <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
        {errors}
      </div>
    );
  }

  if (!singlePost) {
    return (
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm text-slate-600">
        المنشور غير موجود.
      </div>
    );
  }

  return <Post post={singlePost} />;
}
