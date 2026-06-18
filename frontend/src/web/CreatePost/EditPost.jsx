import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import usePosts from "../../hooks/usePosts";
import useCommunities from "../../hooks/useCommunities";
import PostForm from "../components/PostForm";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const singlePost = useSelector((state) => state.postReducer.singlePost);
  const { getSinglePost, updatePost, loading, errors, success } = usePosts();
  const { communities, getCommunities } = useCommunities();

  const [post, setPost] = useState({
    title: "",
    content: "",
    community_id: "",
    image: null,
  });

  useEffect(() => {
    getCommunities();
  }, []);

  useEffect(() => {
    getSinglePost(id);
  }, [id]);

  useEffect(() => {
    if (singlePost) {
      setPost({
        title: singlePost.title || "",
        content: singlePost.content || "",
        community_id: singlePost.community_id || "",
        image: null,
      });
    }
  }, [singlePost]);

  useEffect(() => {
    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((message) => toast.error(message));
      } else {
        toast.error(errors);
      }
    }

    if (success) {
      toast.success(success);
    }
  }, [errors, success]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("community_id", post.community_id);
    if (post.image) {
      formData.append("image", post.image);
    }

    const updated = await updatePost(id, formData);
    if (updated?.id) {
      navigate(`/home/post/${updated.id}`);
    }
  };

  if (loading && !singlePost) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#5856d6"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!singlePost) {
    return (
      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm text-slate-600">
        المنشور غير موجود أو لا يمكنك التعديل عليه.
      </div>
    );
  }

  return (
    <section className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">تعديل المنشور</h1>
          <p className="text-sm text-slate-500 mt-1">
            يمكنك تعديل عنوان المنشور، المحتوى، والمجتمع.
          </p>
        </div>
        <Link
          to={`/home/post/${id}`}
          className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
        >
          عودة إلى المنشور
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            اختر المجتمع
          </label>

          <select
            value={post.community_id}
            onChange={(e) => {
              setPost((prev) => ({
                ...prev,
                community_id: e.target.value,
              }));
            }}
            name="community_id"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          >
            <option value="">اختر المجتمع</option>
            {communities.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>

        <label>عنوان المنشور</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) =>
            setPost((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className="w-full mt-2 mb-6 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
        />

        <PostForm
          loading={loading}
          textarea={post.content}
          setTextarea={(e) =>
            setPost((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          image={(e) => {
            if (e.target.files[0]) {
              setPost((prev) => ({ ...prev, image: e.target.files[0] }));
            }
          }}
          submitLabel="تحديث"
        />
      </form>
    </section>
  );
}
