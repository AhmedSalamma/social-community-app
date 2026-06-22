import React, { useEffect, useState } from "react";
import {
  FiBookmark,
  FiShare2,
  FiMessageSquare,
  FiMoreVertical,
  FiChevronUp,
  FiEdit,
  FiTrash,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import usePosts from "../../hooks/usePosts";
import { toast } from "react-toastify";
import useCommentAction from "../../hooks/useCommentAction";
import Comments from "./Comments";
import { Link } from "react-router-dom";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

export default function Post({ post }) {
  const [showMore, setShowMore] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const user = useSelector((state) => state.userReducer.user);
  const {
    deletePost,
    success: deleteSuccess,
    errors: deleteErrors,
    loading: deleteLoading,
  } = usePosts();
  const {
    makeLike,
    makeComment,
    success: postSuccess,
    setSuccess: setPostSuccess,
    errors: postErrors,
    setErrors: setPostErrors,
  } = useAction();
  const {
    makeDisLikeOnComment,
    makeLikeOnComment,
    success: commentSuccess,
    setSuccess: setCommentSuccess,
    errors: commentErrors,
    setErrors: setCommentErrors,
    replyComment,
  } = useCommentAction();

  useEffect(() => {
    if (postSuccess) toast.success(postSuccess);
    if (postErrors) toast.error(postErrors);
    if (postSuccess || postErrors) {
      const timer = setTimeout(() => {
        setPostSuccess(null);
        setPostErrors(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [postSuccess, postErrors, setPostSuccess, setPostErrors]);

  useEffect(() => {
    if (commentSuccess) toast.success(commentSuccess);
    if (commentErrors) toast.error(commentErrors);
    if (commentSuccess || commentErrors) {
      const timer = setTimeout(() => {
        setCommentSuccess(null);
        setCommentErrors(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [commentSuccess, commentErrors, setCommentSuccess, setCommentErrors]);

  useEffect(() => {
    if (deleteSuccess) toast.success(deleteSuccess);
    if (deleteErrors) toast.error(deleteErrors);
  }, [deleteSuccess, deleteErrors]);

  const handleDelete = async () => {
    if (!user || user.id !== post.author.id) return;
    const confirmed = window.confirm("هل أنت متأكد من حذف المنشور؟");
    if (!confirmed) return;
    await deletePost(post.id);
    setShowMore(false);
  };

  const handelLikeNotify = () => {
    window.Pusher = Pusher;

    //   window.Echo = new Echo({
    //     broadcaster: "reverb",
    //     key: import.meta.env.VITE_REVERB_APP_KEY,
    //     wsHost: import.meta.env.VITE_REVERB_HOST,
    //     wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    //     wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    //     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    //     enabledTransports: ["ws", "wss"],
    //   });
    // };
  };

  if (!post) return null;

  return (
    <div className="mt-4">
      <article className="relative bg-white rounded-xl border border-slate-200 overflow-hidden mt-4">
        {/* Header */}
        <div className="px-4 pt-4 sm:px-6 sm:pt-5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-700 sm:text-sm">
              <Link to={`/home/community/${post.community_id}`}>
                {post.community_name}
              </Link>
            </span>
            <span className="text-xs sm:text-sm text-slate-500 flex gap-1 flex-wrap items-center">
              <Link to={`/home/profile/${post.author.id}`}>
                {post.author.name}
              </Link>
              •<span>{new Date(post.created_at).toLocaleString("ar-EG")}</span>
            </span>
          </div>

          {user?.id === post.author.id && (
            <button type="button" onClick={() => setShowMore((p) => !p)}>
              <FiMoreVertical className="text-slate-500 cursor-pointer hover:text-violet-700 transition" />
            </button>
          )}
        </div>

        {/* Menu */}
        {showMore && user?.id === post.author.id && (
          <div className="absolute left-0 top-10 z-50 w-32 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <button
              type="button"
              className="w-full px-4 py-2 text-right text-sm hover:bg-slate-100 transition"
            >
              <FiEdit className="inline-block mr-1" /> تعديل
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteLoading}
              className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50"
            >
              <FiTrash className="inline-block mr-1" /> حذف
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            <Link to={`/home/post/${post.id}`}>{post.title}</Link>
          </h1>

          {post.image && (
            <img
              className="rounded-md mt-3 w-full"
              src={`${import.meta.env.VITE_API_URL_DOMAIN}/storage/${post.image}`}
              alt="post"
            />
          )}

          <p className="mt-4 text-slate-600 leading-8">{post.content}</p>

          <div className="flex items-center justify-between gap-4 mt-6 text-slate-600">
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <button
                type="button"
                onClick={() => makeLike(post.id)}
                className="cursor-pointer flex items-center gap-2 hover:text-violet-700 transition text-sm sm:text-base"
              >
                <FiChevronUp />({post.likes_count}) أعجبني
              </button>
              <button
                onClick={() => setOpenComments((prev) => !prev)}
                type="button"
                className="cursor-pointer flex items-center gap-2 text-sm sm:text-base"
              >
                <FiMessageSquare /> ({post.comments_count}) تعليقات
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <FiShare2 /> ({post.share_count}) مشاركة
              </button>
            </div>
            <button type="button">
              <FiBookmark />
            </button>
          </div>
        </div>

        {openComments && (
          <Comments
            user={user}
            post={post}
            makeComment={makeComment}
            replyComment={replyComment}
            makeLikeOnComment={makeLikeOnComment}
            makeDisLikeOnComment={makeDisLikeOnComment}
          />
        )}
      </article>
    </div>
  );
}
