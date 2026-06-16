import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import usePosts from "../../hooks/usePosts";
import useCommunities from "../../hooks/useCommunities";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function CreatePostes() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    community_id: "",
    image: null,
  });
  const [createdPostId, setCreatedPostId] = useState(null);

  const { addPost, errors, success, loading } = usePosts();
  const { communities, getCommunities } = useCommunities();

  useEffect(() => {
    getCommunities();
  }, []);
  useEffect(() => {
    if (success) {
      setPost({
        title: "",
        content: "",
        community_id: "",
        image: null,
      });
    }
    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((element) => {
          toast.error(element);
        });
      } else {
        toast.error(errors);
      }
    }
  }, [errors, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("community_id", post.community_id);
    if (post.image) formData.append("image", post.image);

    const createdPost = await addPost(formData);
    if (createdPost?.id) setCreatedPostId(createdPost.id);
  };
  return (
    <section className=" p-6">
      <form onSubmit={handleSubmit}>
        {success && createdPostId && (
          <div className="p-4 rounded-md bg-green-100 border border-green-300 text-green-800 flex items-center justify-between">
            <p>{success} 🎉</p>

            <Link
              to={`/post/${createdPostId}`}
              className="text-green-700 font-semibold underline hover:text-green-900"
            >
              عرض المنشور
            </Link>
          </div>
        )}
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
        <CreatePost
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
        />
      </form>
      {post.image && (
        <img
          src={URL.createObjectURL(post.image)}
          alt="Preview"
          className="w-64 rounded-lg mt-4"
        />
      )}
    </section>
  );
}
