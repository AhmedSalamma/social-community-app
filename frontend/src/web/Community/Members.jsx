import React, { useEffect } from "react";
import useCommunity from "../../hooks/useCommunity";
import { Link, useParams } from "react-router-dom";

function Members() {
  const { community, getCommunity, loading } = useCommunity();
  const users = community?.community?.users ?? [];
  const { id } = useParams();
  useEffect(() => {
    getCommunity(id);
  }, [id]);
  return (
    <section className="mt-4">
      {users?.map((user) => (
        <div
          key={user.id}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                className="rounded-full h-16 w-16 object-cover"
                src={user.image}
                alt="member"
              />
            ) : (
              <span className="bg-violet-100 text-violet-600 w-16 h-16 flex items-center justify-center rounded-full text-lg font-semibold">
                {user.name.charAt(0) || "م"}
              </span>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
            <Link to={`/home/profile/${user.id}`}>عرض الحساب</Link>
          </button>
        </div>
      ))}
    </section>
  );
}

export default Members;
