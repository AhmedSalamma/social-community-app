const initialState = {
  posts: [],
  userPosts: [],
  singlePost: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "ADD_LIKE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? {
                ...post,
                is_liked: !post.is_liked,
                likes_count: post.is_liked
                  ? post.likes_count - 1
                  : post.likes_count + 1,
              }
            : post,
        ),
        userPosts: state.userPosts.map((post) =>
          post.id === action.payload
            ? {
                ...post,
                is_liked: !post.is_liked,
                likes_count: post.is_liked
                  ? post.likes_count - 1
                  : post.likes_count + 1,
              }
            : post,
        ),
        singlePost:
          state.singlePost && state.singlePost.id === action.payload
            ? {
                ...state.singlePost,
                is_liked: !state.singlePost.is_liked,
                likes_count: state.singlePost.is_liked
                  ? state.singlePost.likes_count - 1
                  : state.singlePost.likes_count + 1,
              }
            : state.singlePost,
      };

    case "ADD_USER_POSTS":
      return {
        ...state,
        userPosts: action.payload,
      };

    case "ADD_SINGLE_POST":
      return {
        ...state,
        singlePost: action.payload,
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        userPosts: state.userPosts.filter((post) => post.id !== action.payload),
        singlePost:
          state.singlePost && state.singlePost.id === action.payload
            ? null
            : state.singlePost,
      };

    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
        userPosts: state.userPosts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
        singlePost:
          state.singlePost && state.singlePost.id === action.payload.id
            ? action.payload
            : state.singlePost,
      };

    case "ADD_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...(post.comments ?? []), action.payload.comment],
                comments_count:
                  (post.comments_count || (post.comments || []).length || 0) +
                  1,
              }
            : post,
        ),
        userPosts: state.userPosts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...(post.comments ?? []), action.payload.comment],
                comments_count:
                  (post.comments_count || (post.comments || []).length || 0) +
                  1,
              }
            : post,
        ),
        singlePost:
          state.singlePost && state.singlePost.id === action.payload.postId
            ? {
                ...state.singlePost,
                comments: [
                  ...(state.singlePost.comments ?? []),
                  action.payload.comment,
                ],
                comments_count:
                  (state.singlePost.comments_count ||
                    (state.singlePost.comments || []).length ||
                    0) + 1,
              }
            : state.singlePost,
      };

    case "ADD_REPLY":
      return {
        ...state,
        posts: state.posts.map((post) => ({
          ...post,
          comments: (post.comments ?? []).map((comment) =>
            comment.id === action.payload.commentId
              ? {
                  ...comment,
                  replies: [...(comment.replies ?? []), action.payload.reply],
                  replies_count:
                    (comment.replies_count ||
                      (comment.replies || []).length ||
                      0) + 1,
                }
              : comment,
          ),
        })),
        userPosts: state.userPosts.map((post) => ({
          ...post,
          comments: (post.comments ?? []).map((comment) =>
            comment.id === action.payload.commentId
              ? {
                  ...comment,
                  replies: [...(comment.replies ?? []), action.payload.reply],
                  replies_count:
                    (comment.replies_count ||
                      (comment.replies || []).length ||
                      0) + 1,
                }
              : comment,
          ),
        })),
        singlePost: state.singlePost
          ? {
              ...state.singlePost,
              comments: (state.singlePost.comments ?? []).map((comment) =>
                comment.id === action.payload.commentId
                  ? {
                      ...comment,
                      replies: [
                        ...(comment.replies ?? []),
                        action.payload.reply,
                      ],
                      replies_count:
                        (comment.replies_count ||
                          (comment.replies || []).length ||
                          0) + 1,
                    }
                  : comment,
              ),
            }
          : state.singlePost,
      };

    case "ADD_LIKE_ON_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  is_liked: !comment.is_liked,
                  likes_count: comment.is_liked
                    ? comment.likes_count - 1
                    : comment.likes_count + 1,
                }
              : comment,
          ),
        })),
        userPosts: state.userPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  is_liked: !comment.is_liked,
                  likes_count: comment.is_liked
                    ? comment.likes_count - 1
                    : comment.likes_count + 1,
                }
              : comment,
          ),
        })),
        singlePost: state.singlePost
          ? {
              ...state.singlePost,
              comments: state.singlePost.comments.map((comment) =>
                comment.id === action.payload.id
                  ? {
                      ...comment,
                      is_liked: !comment.is_liked,
                      likes_count: comment.is_liked
                        ? comment.likes_count - 1
                        : comment.likes_count + 1,
                    }
                  : comment,
              ),
            }
          : state.singlePost,
      };

    case "ADD_DISLIKE_ON_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  disLike_count: action.payload.removed
                    ? Math.max(0, (comment.disLike_count || 1) - 1)
                    : (comment.disLike_count || 0) + 1,
                }
              : comment,
          ),
        })),
        userPosts: state.userPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  disLike_count: action.payload.removed
                    ? Math.max(0, (comment.disLike_count || 1) - 1)
                    : (comment.disLike_count || 0) + 1,
                }
              : comment,
          ),
        })),
        singlePost: state.singlePost
          ? {
              ...state.singlePost,
              comments: state.singlePost.comments.map((comment) =>
                comment.id === action.payload.id
                  ? {
                      ...comment,
                      disLike_count: action.payload.removed
                        ? Math.max(0, (comment.disLike_count || 1) - 1)
                        : (comment.disLike_count || 0) + 1,
                    }
                  : comment,
              ),
            }
          : state.singlePost,
      };

    default:
      return state;
  }
}
