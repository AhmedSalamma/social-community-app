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
import useAction from "../../hooks/useAction";
import { toast } from "react-toastify";
import useCommentAction from "../../hooks/useCommentAction";
import Comments from "./Comments";
export default function Post({ post }) {
  const [showMore, setShowMore] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [showMoreComments, setShowMoreComments] = useState(null);

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

  if (!post) return null;

  return (
    <div className="mt-4">
      <article className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden mt-4">
        {/* Header */}
        <div className="px-6 pt-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs px-2 py-1 rounded-full bg-violet-100 text-violet-700">
              {post.community_name}
            </span>

            <span className="text-sm text-slate-500 flex gap-2">
              <span>{post.author.name}</span>•
              <span>{new Date(post.created_at).toLocaleString("ar-EG")}</span>
            </span>
          </div>

          <button type="button" onClick={() => setShowMore((p) => !p)}>
            <FiMoreVertical className="text-slate-500 cursor-pointer hover:text-violet-700 transition" />
          </button>
        </div>

        {/* Menu */}
        {showMore && (
          <div className="absolute left-0 top-10 z-50 w-32 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <button
              type="button"
              className="w-full px-4 py-2 text-right text-sm hover:bg-slate-100 transition"
            >
              <FiEdit className="inline-block mr-1" />
              تعديل
            </button>

            <button
              type="button"
              className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 transition"
            >
              <FiTrash className="inline-block mr-1" />
              حذف
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5">
          <h1 className="text-xl font-bold text-slate-900 leading-relaxed">
            {post.title}
          </h1>

          {post.image && (
            <img
              className="rounded-md mt-3"
              src={`${import.meta.env.VITE_API_URL_DOMAIN}/storage/${post.image}`}
              alt="post"
            />
          )}

          <p className="mt-4 text-slate-600 leading-8">{post.content}</p>

          <div className="flex items-center justify-between gap-8 mt-6 text-slate-600">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => makeLike(post.id)}
                className=" cursor-pointer flex items-center gap-2 hover:text-violet-700 transitionr"
              >
                <FiChevronUp />({post.likes_count}) أعجبني
              </button>

              <button
                onClick={() => setOpenComments((prev) => !prev)}
                type="button"
                className="cursor-pointer flex items-center gap-2"
              >
                <FiMessageSquare /> ({post.comments_count}) تعليقات
              </button>

              <button type="button" className="flex items-center gap-2">
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
