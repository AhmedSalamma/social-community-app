import { useState } from "react";
import AddComment from "./AddComment";
import { FiChevronUp, FiChevronDown, FiCornerUpLeft } from "react-icons/fi";
import Reply from "./Reply";

export default function Comments({
  post,
  makeComment,
  replyComment,
  makeLikeOnComment,
  makeDisLikeOnComment,
}) {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [openReply, setOpenReply] = useState(null);
  const [showMore, setShowMore] = useState(4);
  const [showMoreReplies, setShowMoreReplies] = useState({});

  const rootComments = post.comments?.filter((c) => c.parent_id === null) ?? [];

  return (
    <div className="bg-slate-50 border-t border-slate-200 p-5">
      <AddComment
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onClick={() => {
          makeComment(post.id, { content: comment });
          setComment("");
        }}
      />

      {rootComments.length > 0 && (
        <div className="mt-8">
          <div className="flex gap-3">
            <div className="flex-1">
              {rootComments.slice(0, showMore).map((comment) => (
                <div key={comment.id} className="bg-white p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://i.pravatar.cc/100"
                        alt="avatar"
                        className="w-10 h-10 rounded-full bg-slate-300"
                      />

                      <h4 className="font-semibold text-slate-900">
                        {comment.user_name}
                      </h4>

                      <span className="text-xs text-slate-500">
                        {new Date(comment.created_at).toLocaleString("ar-EG")}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-slate-700 leading-7">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() =>
                        setOpenReply(
                          openReply === comment.id ? null : comment.id,
                        )
                      }
                      className="flex items-center gap-1.5 text-sm text-slate-700 hover:text-violet-700 cursor-pointer transition"
                    >
                      <FiCornerUpLeft />
                      <span>رد</span>
                    </button>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => makeLikeOnComment(comment.id)}
                        className="flex items-center gap-1 text-sm text-slate-500 hover:text-violet-700 transition cursor-pointer"
                      >
                        <FiChevronUp size={16} />
                        <span>({comment.likes_count})</span>
                        <span>أعجبني</span>
                      </button>

                      <button
                        onClick={() => makeDisLikeOnComment(comment.id)}
                        className="flex items-center gap-1 text-sm text-slate-500 hover:text-violet-700 transition cursor-pointer"
                      >
                        <FiChevronDown size={16} />
                        <span>({comment.disLike_count})</span>
                        <span>لم يعجبني</span>
                      </button>
                    </div>
                  </div>

                  {openReply === comment.id && (
                    <AddComment
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      onClick={() => {
                        replyComment(post.id, {
                          content: reply,
                          parent_id: comment.id,
                        });
                        setReply("");
                        setOpenReply(null);
                      }}
                    />
                  )}

                  {(() => {
                    const replies = post.comments.filter(
                      (rep) => rep.parent_id === comment.id,
                    );
                    const limit = showMoreReplies[comment.id] ?? 1;

                    return (
                      <>
                        {replies.slice(0, limit).map((rep) => (
                          <Reply
                            key={rep.id}
                            rep={rep}
                            makeDisLike={() => makeDisLikeOnComment(rep.id)}
                            makeLike={() => makeLikeOnComment(rep.id)}
                          />
                        ))}

                        {replies.length > limit && (
                          <span
                            className="cursor-pointer text-sm text-blue-500"
                            onClick={() =>
                              setShowMoreReplies((prev) => ({
                                ...prev,
                                [comment.id]: (prev[comment.id] ?? 3) + 3,
                              }))
                            }
                          >
                            عرض المزيد
                          </span>
                        )}
                      </>
                    );
                  })()}

                  {}
                </div>
              ))}

              {rootComments.length > showMore && (
                <span
                  className="cursor-pointer text-sm text-blue-500"
                  onClick={() => setShowMore((prev) => prev + 5)}
                >
                  عرض المزيد
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
