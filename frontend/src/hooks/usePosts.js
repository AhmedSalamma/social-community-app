import { useEffect, useState } from "react";
import postsApi from "../api/post";
import { usePostContext } from "../context/PostContext";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";

export default function usePosts() {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const handleError = (error) => handleApiError(error, setErrors);

  const getPosts = async (currentPage) => {
    try {
      setLoading(true);
      const res = await postsApi.all(currentPage);
      dispatch({ type: "ADD_POSTS", payload: res.data?.data || [] });
      setMeta(res.data.meta);
      setHasMore(res.data.links.next !== null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSinglePost = async (id) => {
    try {
      setLoading(true);
      const res = await postsApi.single(id);
      dispatch({ type: "ADD_SINGLE_POST", payload: res.data?.data ?? null });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (data) => {
    setErrors(null);
    setSuccess(null);
    try {
      setLoading(true);
      const res = await postsApi.add(data);
      setSuccess(res.data.message);
      return res.data?.data ?? null;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPosts = async () => {
    setErrors(null);
    try {
      setLoading(true);
      const res = await postsApi.userPosts();
      dispatch({ type: "ADD_USER_POSTS", payload: res.data?.data || [] });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getUserPosts,
    getSinglePost,
    meta,
    hasMore,
    addPost,
    errors,
    success,
    loading,
    getPosts,
  };
}
