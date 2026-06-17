import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CommunityCard from "./CommunityCard";
import useCommunities from "../../hooks/useCommunities";
import { ThreeDots } from "react-loader-spinner";

export default function Communities() {
  const { communities, getCommunities, loadingCommunities, errors } =
    useCommunities();

  useEffect(() => {
    getCommunities();
  }, []);
  return (
    <section className="mt-4">
      {loadingCommunities && (
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
      )}

      {errors && !loadingCommunities && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errors}
        </div>
      )}

      {!loadingCommunities && !errors && communities.length === 0 && (
        <div className="p-4 bg-white rounded-xl shadow-sm text-slate-600">
          لا توجد مجتمعات حالياً.
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-slate-900">المجتمعات</h1>

        <Link
          to="/communities/create"
          className="bg-violet-600 text-white px-5 py-2 rounded-full text-sm hover:bg-violet-700 transition"
        >
          + إنشاء مجتمع
        </Link>
      </div>

      {!loadingCommunities && !errors && communities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      )}
    </section>
  );
}
