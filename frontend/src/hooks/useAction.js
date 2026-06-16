import { usePostContext } from "../context/PostContext";
import postActions from "../api/postActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function useAction() {
  const { setPosts } = usePostContext();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const makeLike = async (id) => {
    let oldPost;

    setErrors("");
    setSuccess("");

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          oldPost = post;

          return {
            ...post,
            is_liked: !post.is_liked,
            likes_count: post.is_liked
              ? post.likes_count - 1
              : post.likes_count + 1,
          };
        }

        return post;
      }),
    );

    try {
      dispatch({
        type: "ADD_LIKE",
        payload: id,
      });
      await postActions.like(id);
    } catch (error) {
      setPosts((prev) => prev.map((post) => (post.id === id ? oldPost : post)));
    }
  };

  const makeComment = async (id, data) => {
    setErrors("");
    setSuccess("");

    try {
      const res = await postActions.Comment(id, data);
      setSuccess(res.data.message);
      dispatch({
        type: "ADD_COMMENT",
        payload: {
          postId: id,
          comment: res.data.data,
        },
      });
      console.log(res.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.status === 422
          ? Object.values(error.response?.data?.errors).flat().join("-")
          : "حدث خطأ أثناء إرسال التعليق.");

      setErrors(errorMessage);
      console.error(error);
    }
  };

  return { makeLike, makeComment, success, errors, setErrors, setSuccess };
}
