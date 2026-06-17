import { useEffect, useState } from "react";
import userApi from "../api/user";
import { handleApiError } from "../utils/handleApiError";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  const getProfile = async () => {
    setErrors(null);
    try {
      setLoading(true);
      const res = await userApi.profile();
      setUser(res.data?.data ?? null);
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
      setUser(res.data?.data ?? null);
      setSuccess(res.data?.message || "تم حفظ الإعدادات بنجاح");
      return res;
    } catch (error) {
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    errors,
    success,
    getProfile,
    updateProfile,
  };
}
