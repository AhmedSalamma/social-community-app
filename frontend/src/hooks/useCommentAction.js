import { useDispatch } from "react-redux";
import commentAction from "../api/commentAction";
import { useState } from "react";

export default function useCommentAction() {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const makeDisLikeOnComment = async (id) => {
    setErrors("");
    setSuccess("");

    try {
      const res = await commentAction.disLike(id);
      const removed = res.status === 200;
      dispatch({
        type: "ADD_DISLIKE_ON_COMMENT",
        payload: { id, removed },
      });
      setSuccess(res.data.message);
    } catch (error) {
      setErrors(
        error.response?.data?.message || error.response?.message || "حدث خطأ.",
      );
      console.log(error);
    }
  };

  const makeLikeOnComment = async (id) => {
    setErrors("");
    setSuccess("");

    try {
      const res = await commentAction.like(id);
      const removed = res.status === 200;
      dispatch({
        type: "ADD_LIKE_ON_COMMENT",
        payload: { id, removed },
      });
      setSuccess(res.data.message);
    } catch (error) {
      console.log(error);
      setErrors(
        error.response?.data?.message || error.response?.message || "حدث خطأ.",
      );
    }
  };

  const replyComment = async (id, data) => {
    try {
      const res = await commentAction.reply(id, data);
      console.log(res.data.data);
    } catch (errors) {
      console.error(errors);
    }
  };

  return {
    replyComment,
    makeLikeOnComment,
    makeDisLikeOnComment,
    success,
    errors,
    setErrors,
    setSuccess,
  };
}
