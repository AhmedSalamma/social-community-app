import { useEffect, useState } from "react";
import userApi from "../api/user";
import { handleApiError } from "../utils/handleApiError";
import { useDispatch } from "react-redux";

export default function useUser() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const [meta, setMeta] = useState(null);

  const dispatch = useDispatch();

  const getProfile = async () => {
    setErrors(null);
    setMeta(null);

    try {
      setLoading(true);
      const res = await userApi.profile();
      dispatch({ type: "SET_USER", payload: res.data?.data ?? null });
    } catch (error) {
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    setErrors(null);

    setSuccess(null);
    try {
      setLoading(true);
      const res = await userApi.update(data);
      dispatch({ type: "SET_USER", payload: res.data?.data ?? null });
      setSuccess(res.data?.message || "تم حفظ الإعدادات بنجاح");
      return res;
    } catch (error) {
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
    }
  };

  const getAllUserComments = async (page) => {
    setErrors(null);
    setMeta(null);
    try {
      setLoading(true);
      const res = await userApi.comments(page);
      setUserComments(res.data?.data);
      setMeta(res.data?.meta);
    } catch (error) {
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
    }
  };

  return {
    meta,
    getAllUserComments,
    userComments,
    loading,
    errors,
    success,
    getProfile,
    updateProfile,
  };
}
