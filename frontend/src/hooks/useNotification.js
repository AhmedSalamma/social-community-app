import React, { useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import notification from "../api/notification";
import { useDispatch } from "react-redux";

export default function useNotification() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const getNotification = async () => {
    try {
      setLoading(true);
      const res = await notification.all();
      dispatch({ type: "ADD_NOTIFICATIONS", payload: res?.data ?? [] });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    getNotification,
    loading,
  };
}
