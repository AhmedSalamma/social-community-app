import React, { useEffect, useState } from "react";
import postsApi from "../../api/post";
import usePosts from "../../hooks/usePosts";
import { useSelector } from "react-redux";
import Post from "../post/Post";
import { ThreeDots } from "react-loader-spinner";

export default function ProfilePosts() {
  const { getUserPosts, singlePost, loading, errors } = usePosts();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    getUserPosts();
  }, []);

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

  if (errors) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
        {errors}
      </div>
    );
  }

  if (posts.userPosts.length === 0) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-slate-600">
        لا توجد منشورات حالياً.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.userPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
