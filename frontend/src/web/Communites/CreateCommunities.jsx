import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useCommunities from "../../hooks/useCommunities";
import CommunityForm from "../components/CommunityForm ";

export default function CreateCommunities() {
  const [community, setCommunity] = useState({
    name: "",
    desc: "",
    image: null,
  });

  const { addCommunity, errors, success, loading } = useCommunities();

  useEffect(() => {
    if (success) {
      setCommunity({ name: "", desc: "", image: null });
      toast.success(success);
    }

    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((message) => toast.error(message));
      } else {
        toast.error(errors);
      }
    }
  }, [errors, success]);

  const handleChange = (field, value) => {
    setCommunity((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", community.name);
    formData.append("desc", community.desc);
    if (community.image) formData.append("image", community.image);

    addCommunity(formData);
  };

  return (
    <section className="p-6">
      <h1 className="text-xl font-semibold text-slate-900 mb-6">
        إنشاء مجتمع جديد
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div className="p-4 rounded-md bg-green-100 border border-green-300 text-green-800 flex items-center justify-between">
            <p>{success}</p>
            <Link
              to="/communities"
              className="text-green-700 font-semibold underline hover:text-green-900"
            >
              عرض المجتمعات
            </Link>
          </div>
        )}

        <CommunityForm community={community} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          className="bg-violet-600 text-white px-6 py-2 rounded-full text-sm hover:bg-violet-700 transition disabled:opacity-60"
        >
          {loading ? "جاري الإنشاء..." : "إنشاء المجتمع"}
        </button>
      </form>
    </section>
  );
}
