import { useState } from "react";
import auth from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      setErrors(null);
      setSuccess("");

      const res = await auth.register(data);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setSuccess(res.data.message);
      setTimeout(() => setSuccess(""), 3000);
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(error.response?.data?.message || "حدث خطأ");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      setErrors(null);
      setSuccess("");

      const res = await auth.login(data);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors(error.response?.data?.message || "بيانات الدخول غير صحيحة");
      } else {
        setErrors(error.response?.data?.message || "حدث خطأ");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    errors,
    success,
    loading,
    handleRegister,
    handleLogin,
  };
}
