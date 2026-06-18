import React, { useEffect, useState, useRef } from "react";
import useUser from "../../hooks/useUser";
import { handleApiError } from "../../utils/handleApiError";
import { useSelector } from "react-redux";

export default function Settings() {
  const { loading, getProfile, updateProfile } = useUser();
  const user = useSelector((state) => state.userReducer.user);
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
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    }));
  }, [user]);

  useEffect(() => {
    if (!form.image) return;

    const url = URL.createObjectURL(form.image);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [form.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.password_confirmation) {
      setErrors({ password: ["كلمة المرور وتأكيدها غير متطابقين"] });
      return;
    }

    setSubmitting(true);
    setErrors(null);
    setSuccess(null);

    try {
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

      await updateProfile(data);
      setSuccess("تم تحديث البيانات بنجاح");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setErrors(handleApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">الإعدادات</h2>

      {errors && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {typeof errors === "object"
            ? Object.values(errors)
                .flat()
                .map((msg, i) => <p key={i}>{msg}</p>)
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
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-2 w-full border border-gray-300  rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="الاسم"
            />
          </label>

          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">
              اسم المستخدم
            </span>
            <input
              id="username"
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="mt-2 w-full border border-gray-300  rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="اسم المستخدم"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">الصورة</span>
            <input
              id="image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, image: e.target.files[0] }));
              }}
              className="hidden mt-2 w-full border border-gray-300  rounded-lg px-4 py-3"
            />
            {/* Image preview */}

            {user.image || preview ? (
              <img
                src={preview || user?.image}
                alt="معاينة الصورة"
                className="mt-2 w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="mt-2 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center border">
                <span className="text-gray-500 font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            )}
          </label>

          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">
              السيرة الذاتية
            </span>
            <textarea
              id="bio"
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="اكتب شيئًا عنك"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">
              كلمة المرور الجديدة
            </span>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              className="mt-2 w-full border border-gray-300  rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="كلمة المرور الجديدة"
            />
          </label>

          <label className="block text-right">
            <span className="text-sm font-medium text-gray-700">
              تأكيد كلمة المرور
            </span>
            <input
              id="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password_confirmation: e.target.value,
                }))
              }
              className="mt-2 w-full border border-gray-300  rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="تأكيد كلمة المرور"
            />
          </label>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 rounded-lg p-3 shadow-3xl bg-violet-500 hover:bg-violet-600 text-white cursor-pointer transition"
        >
          {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        </button>
      </form>
    </div>
  );
}
