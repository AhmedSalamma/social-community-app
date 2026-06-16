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
    case "ADD_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, action.payload.comment],
              }
            : post,
        ),
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
      };

    default:
      return state;
  }
}
