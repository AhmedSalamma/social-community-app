import { useEffect, useState } from "react";
import postsApi from "../api/post";
import { useDispatch } from "react-redux";
import { handleApiError } from "../utils/handleApiError";

export default function usePosts() {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pupularPosts, setPupularPosts] = useState();
  const dispatch = useDispatch();

  const handleError = (error) => handleApiError(error, setErrors);

  const getPosts = async (currentPage) => {
    try {
      setLoading(true);
      const res = await postsApi.all(currentPage);
      dispatch({ type: "ADD_POSTS", payload: res.data?.data ?? [] });
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

  const updatePost = async (id, data) => {
    setErrors(null);
    setSuccess(null);
    try {
      setLoading(true);
      const res = await postsApi.update(id, data);
      setSuccess(res.data.message);
      const updatedPost = res.data?.data ?? null;

      if (updatedPost) {
        dispatch({ type: "ADD_SINGLE_POST", payload: updatedPost });
        dispatch({ type: "UPDATE_POST", payload: updatedPost });
      }

      return updatedPost;
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

  const getPopularPosts = async () => {
    setErrors(null);
    try {
      setLoading(true);
      const res = await postsApi.Popular();
      setPupularPosts(res.data?.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setErrors(null);
    setSuccess(null);
    try {
      setLoading(true);
      const res = await postsApi.delete(id);
      setSuccess(res.data.message);
      dispatch({ type: "DELETE_POST", payload: id });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    pupularPosts,
    getPopularPosts,
    getUserPosts,
    getSinglePost,
    meta,
    hasMore,
    addPost,
    updatePost,
    deletePost,
    errors,
    success,
    loading,
    getPosts,
  };
}
