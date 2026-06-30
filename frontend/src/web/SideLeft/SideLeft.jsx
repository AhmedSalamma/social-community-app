import React, { useEffect } from "react";
import {
  FiArrowDownLeft,
  FiChevronUp,
  FiMapPin,
  FiMessageSquare,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useCommunity from "../../hooks/useCommunity";
import { useSelector } from "react-redux";
import usePosts from "../../hooks/usePosts";

export default function SideLeft() {
  const { pupularCommunity, getPupularCommunities, joinCommunity } =
    useCommunity();

  const { getPopularPosts, pupularPosts } = usePosts();
  useEffect(() => {
    getPupularCommunities();
    getPopularPosts();
  }, []);

  const user = useSelector((state) => state.userReducer.user);
  const isMember = pupularCommunity?.some((u) => u.id === user?.id);
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 my-2">
        <FiTrendingUp className="text-violet-500 text-2xl" />
        <h2 className="text-lg font-medium">المواضيع الرائجة</h2>
      </div>

      {/* Trend Item */}
      {pupularPosts?.map((post) => (
        <Link key={post.id} to={`/home/post/${post.id}`}>
          <div className="cursor-pointer p-2">
            <h3 className="text-gray-800 text-sm font-medium mb-1">
              {post.title}
            </h3>

            <p className="text-gray-500 text-xs">
              {post.content.length > 100
                ? post.content.slice(0, 100) + "..."
                : post.content}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-400 text-xs">544 مشاهدة</span>

              <span className="text-gray-400 text-xs flex items-center gap-1.5">
                <FiChevronUp />
                {post.likes_count}
              </span>

              <span className="text-gray-400 text-xs flex items-center gap-1.5">
                <FiMessageSquare />
                {post.comments_count}
              </span>
            </div>
          </div>
        </Link>
      ))}

      <div className="bg-violet-100 rounded-2xl p-4 w-full max-w-sm shadow-sm">
        {/* Header */}
        <h2 className="font-bold text-gray-900 mb-4">مجتمعات مقترحة</h2>

        {/* Item 1 */}
        {pupularCommunity?.map((community, index) => (
          <div key={index} className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="bg-violet-200 text-violet-600 w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold">
                  ع/ل
                </span>
                <span className="text-gray-700 text-sm">
                  <Link to={`/home/community/${community.id}`}>
                    {" "}
                    {community.name}
                  </Link>
                </span>
              </div>
              <div className="flex items-center ">
                <span className="text-violet-600 text-xs mr-10">
                  عدد الإعضاء: {community.users_count}
                </span>
                <span className="text-violet-600 text-xs mr-10">
                  عدد المنشورات: {community.posts_count}
                </span>
              </div>
            </div>
            {!isMember && (
              <button
                onClick={() => joinCommunity(community.id)}
                className="text-xs border border-violet-500 text-violet-600 rounded-full px-3 py-1 hover:bg-violet-200 transition"
              >
                الانضمام
              </button>
            )}
          </div>
        ))}

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm cursor-pointer hover:text-violet-700 transition">
          <Link to="communities"> عرض الكل</Link>

          <FiArrowDownLeft className="inline-block mr-1" />
        </div>
      </div>
      <div className="cursor-pointer mb-4 p-3"></div>
    </div>
  );
}
