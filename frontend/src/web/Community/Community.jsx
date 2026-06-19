import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { NavLink, Outlet, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import useCommunity from "../../hooks/useCommunity";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function Community() {
  const { community, getCommunity, loading, joinCommunity } = useCommunity();
  const [isJoin, setIsJoin] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const isMember = community?.community?.users.some((u) => (u.id = user.id));

  const { id } = useParams();

  useEffect(() => {
    getCommunity(id);
  }, [id]);

  const handleJoin = async () => {
    const res = await joinCommunity(community?.community.id);
    setIsJoin("تم الإنضمام إلى المجتمع بنجاح");

    if (res) {
      toast.success(setIsJoin);
    }
  };
  if (loading) {
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
  const navClass = ({ isActive }) =>
    `pb-3 transition ${
      isActive
        ? "text-violet-600 border-b-2 border-violet-600 font-medium"
        : "text-gray-500 hover:text-violet-600"
    }`;

  return (
    <section className="min-h-screen bg-primary">
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden">
        {community?.community.image ? (
          <img
            src={community.community.image}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-violet-400 to-violet-600" />
        )}

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <div className="relative -mt-10 mx-auto w-[95%] md:w-[80%] bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {community?.community.image ? (
            <img
              src={community?.community.image}
              alt="community"
              className="w-16 h-16 rounded-full border-2 border-white shadow"
            />
          ) : (
            <span className="bg-violet-100 text-violet-600 w-16 h-16 flex items-center justify-center rounded-full text-lg font-semibold">
              {community?.community.name.charAt(0) || "م"}
            </span>
          )}

          <div>
            <h3 className="text-lg font-semibold">
              {community?.community.name || "Community Name"}
            </h3>

            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span>
                {new Date(
                  community?.community.created_at || "Created at",
                ).toLocaleDateString() || "Created at"}
              </span>
              <span>{community?.community.posts_count || 0} منشور </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 w-[90%] md:w-[80%]">
              {community?.community.desc
                ? community.community.desc.length > 100
                  ? community.community.desc.slice(0, 100) + "..."
                  : community.community.desc
                : "Community description"}
            </p>
          </div>
        </div>
        {isMember ? (
          <button
            onClick={handleJoin}
            type="button"
            className=" border border-violet-600 text-violet-600 px-5 py-2 rounded-full text-sm hover:bg-violet-700 hover:text-white transition cursor-pointer w-[30%]"
          >
            خروج
          </button>
        ) : (
          <button
            onClick={handleJoin}
            type="button"
            className="bg-violet-600 text-white px-5 py-2 rounded-full text-sm hover:bg-violet-700 transition cursor-pointer w-[30%]"
          >
            + إنضمام
          </button>
        )}
      </div>

      {/* Write Post */}
      <PostForm />

      {/* Navigation */}
      <div className="flex items-center gap-8 bg-white shadow-sm rounded-xl mt-4 p-3">
        <NavLink end to="." className={navClass}>
          المنشورات
        </NavLink>

        <NavLink to="members" className={navClass}>
          الأعضاء
        </NavLink>

        <NavLink to="about" className={navClass}>
          عن المجتمع
        </NavLink>
      </div>

      {/* Nested Routes */}
      <div className="mt-4">
        <Outlet />
      </div>
    </section>
  );
}
