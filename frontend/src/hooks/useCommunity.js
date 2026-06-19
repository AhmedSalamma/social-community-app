import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import communitiesApi from "../api/community";
import { handleApiError } from "../utils/handleApiError";

export default function useCommunity() {
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [meta, setMeta] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pupularCommunity, setPupularCommunity] = useState(null);

  const handleError = (error) => {
    handleApiError(error, setErrors);
  };

  const getCommunity = async (communityId) => {
    try {
      setLoading(true);
      setErrors(null);
      const res = await communitiesApi.show(communityId);
      setCommunity(res.data?.data ?? null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const joinCommunity = async (id) => {
    try {
      setErrors(null);
      const res = await communitiesApi.join(id);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const getPupularCommunities = async () => {
    try {
      setErrors(null);
      const res = await communitiesApi.getPupular();
      setPupularCommunity(res.data?.data ?? null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getPupularCommunities,
    pupularCommunity,
    joinCommunity,
    community,
    loading,
    errors,
    hasMore,
    meta,
    getCommunity,
  };
}
