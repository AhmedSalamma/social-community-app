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
      dispatch({ type: "ADD_NOTIFICATIONS", payload: res?.data.data ?? [] });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const markAsRead = async (id) => {
    try {
      await notification.markAsRead(id);

      dispatch({
        type: "MARK_NOTIFICATION_READ",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notification.markAllAsRead();

      dispatch({
        type: "MARK_ALL_NOTIFICATIONS_READ",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    markAllAsRead,
    markAsRead,
    getNotification,
    loading,
  };
}
