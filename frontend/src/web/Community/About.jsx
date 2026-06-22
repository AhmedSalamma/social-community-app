import React, { useEffect } from "react";
import useCommunity from "../../hooks/useCommunity";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
export default function About() {
  const { community, getCommunity, loading } = useCommunity();
  const { id } = useParams();
  useEffect(() => {
    getCommunity(id);
  }, [id]);

  return (
    <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 ">
      <h1 className="text-xl font-bold mb-4 text-gray-800">عن المجتمع</h1>
      {loading ? (
        <div className="flex justify-center items-center ">
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
      ) : (
        <>
          <p className="text-gray-600">
            {community?.community.desc || "No description available."}
          </p>
          <span>
            {new Date(
              community?.community.created_at || "Created at",
            ).toLocaleDateString() || "Created at"}
          </span>
        </>
      )}
    </section>
  );
}
