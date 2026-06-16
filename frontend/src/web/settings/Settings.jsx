import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import userApi from "../../api/user";
import { handleApiError } from "../../utils/handleApiError";

export default function Settings() {
  const { user, loading, getProfile } = useUser();
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    image: null,
    password: "",
    password_confirmation: "",
  });
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(null);

    const data = new FormData();
    data.append("name", form.name);
    data.append("username", form.username);
    data.append("bio", form.bio);
    if (form.image) {
      data.append("image", form.image);
    }
    if (form.password) {
      data.append("password", form.password);
      data.append("password_confirmation", form.password_confirmation);
    }

    try {
      setSubmitting(true);
      const res = await userApi.update(data);
      setSuccess(res.data?.message || "تم حفظ الإعدادات بنجاح");
      getProfile();
    } catch (error) {
      handleApiError(error, setErrors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">الإعدادات</h2>

      {loading && <div>جارٍ تحميل بيانات المستخدم...</div>}
      {errors && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {typeof errors === "object"
            ? Object.values(errors).flat().map((msg, i) => <p key={i}>{msg}</p>)
            : errors}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">الاسم</span>
            <input
              id="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="الاسم"
            />
          </label>

          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">اسم المستخدم</span>
            <input
              id="username"
              value={form.username}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="اسم المستخدم"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">الصورة</span>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-2 w-full"
            />
          </label>

          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">السيرة الذاتية</span>
            <textarea
              id="bio"
              value={form.bio}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="اكتب شيئًا عنك"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">كلمة المرور الجديدة</span>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="كلمة المرور الجديدة"
            />
          </label>

          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">تأكيد كلمة المرور</span>
            <input
              id="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg px-4 py-3"
              placeholder="تأكيد كلمة المرور"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
}
