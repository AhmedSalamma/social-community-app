import React, { useEffect } from "react";
import useCommunity from "../../hooks/useCommunity";
import Post from "../post/Post";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function CommunityPosts() {
  const { loading, errors, posts, getCommunity, community } = useCommunity();
  const { id } = useParams();
  useEffect(() => {
    getCommunity(id);
  }, [id]);
  if (loading) {
    return (
      <div className="flex justify-center items-center ">
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

  if (community?.posts.length === 0) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-slate-600">
        لا توجد منشورات حالياً.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {community?.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
