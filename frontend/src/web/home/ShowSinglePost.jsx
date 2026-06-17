import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import postsApi from "../../api/Post";
import Post from "../post/post";
import usePosts from "../../hooks/usePosts";

export default function ShowSinglePost() {
  const { id } = useParams();
  const { getSinglePost, loading, errors } = usePosts();
  const singlePost = useSelector((state) => state.postReducer.singlePost);

  useEffect(() => {
    getSinglePost(id);
  }, [id]);

  if (loading) {
    return (
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm text-slate-600">
        جاري تحميل المنشور...
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
