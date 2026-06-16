import React, { useState } from "react";
import { FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const { handleRegister, handleLogin, success, loading, errors } = useAuth();
  // Register state
  const [register, setRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Login state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(login);
    } else {
      handleRegister(register);
    }
  };

  // handle register change
  const handleRegisterChange = (e) => {
    setRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // handle login change
  const handleLoginChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f6f6fb] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-indigo-600">سُكون</h1>
        <p className="text-gray-600 mt-2">
          ابدأ رحلتك المجهولة في فضائك الرقمي الخاص
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="grid grid-cols-2 bg-[#f3f4fc]">
          <button
            onClick={() => setIsLogin(false)}
            className={`h-14 font-medium transition-colors ${
              !isLogin
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            إنشاء حساب
          </button>

          <button
            onClick={() => setIsLogin(true)}
            className={
              isLogin &&
              `h-14 text-indigo-600 border-b-2 border-indigo-600 font-medium`
            }
          >
            تسجيل الدخول
          </button>
        </div>

        {/* Content */}
        <div className="p-10 text-center">
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          {errors && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {typeof errors === "object" && errors !== null
                ? Object.values(errors)
                    .flat()
                    .map((msg, i) => <p key={i}>{msg}</p>)
                : errors}
            </div>
          )}
          <form onSubmit={(e) => handelSubmit(e)}>
            {isLogin ? (
              <>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  تسجيل الدخول
                </h2>

                <p className="text-gray-500 text-lg">
                  يتم توليد الأشكال الهندسية لتمثيلك دون الكشف عن ملامحك
                </p>

                {/* LOGIN FORM */}
                <div className="mt-10 space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={login.email}
                      onChange={handleLoginChange}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      كلمة المرور
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={login.password}
                      onChange={handleLoginChange}
                      placeholder="أدخل كلمة المرور"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  إنشاء حساب
                </h2>

                <p className="text-gray-500 text-lg">
                  يتم توليد الأشكال الهندسية لتمثيلك دون الكشف عن ملامحك
                </p>

                {/* REGISTER FORM */}
                <div className="mt-10 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      الاسم
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={register.name}
                      onChange={handleRegisterChange}
                      placeholder="أدخل اسمك"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      اسم المستخدم
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={register.username}
                      onChange={handleRegisterChange}
                      placeholder="أدخل اسم المستخدم"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={register.email}
                      onChange={handleRegisterChange}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      كلمة المرور
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={register.password}
                      onChange={handleRegisterChange}
                      placeholder="أدخل كلمة المرور"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password_confirmation"
                      className="block text-sm font-medium text-gray-700 mb-2 text-right"
                    >
                      تأكيد كلمة المرور
                    </label>
                    <input
                      id="password_confirmation"
                      type="password"
                      value={register.password_confirmation}
                      onChange={handleRegisterChange}
                      placeholder="أعد إدخال كلمة المرور"
                      className="w-full h-14 border border-gray-200 bg-[#f7f7fd] rounded-lg px-5 text-right outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full h-14 mt-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition shadow-md disabled:opacity-50"
            >
              <FiArrowLeft size={20} />

              {loading
                ? "جاري الإرسال..."
                : isLogin
                  ? "تسجيل الدخول"
                  : "تسجيل حساب"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-3xl flex justify-between mt-8 text-gray-600 text-sm">
        <div className="flex gap-8">
          <button>عن المنصة</button>
          <button>الشروط</button>
          <button>اتصل بنا</button>
        </div>

        <p>© 2025 سكون. الخصوصية أولاً.</p>
      </div>
    </div>
  );
}
