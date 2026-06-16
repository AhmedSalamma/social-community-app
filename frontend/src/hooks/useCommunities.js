import { useEffect, useState } from "react";
import communitiesApi from "../api/community";
import { handleApiError } from "../utils/handleApiError";

export default function useCommunities() {
  const [communities, setCommunities] = useState([]);
  const [myCommunities, setMyCommunities] = useState([]);

  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  const [loadingCommunities, setLoadingCommunities] = useState(false);
  const [loadingMyCommunities, setLoadingMyCommunities] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [myCommunitiesPagination, setMyCommunitiesPagination] = useState(null);

  const handleError = (error) => {
    handleApiError(error, setErrors);
  };

  const getCommunities = async () => {
    try {
      setLoadingCommunities(true);
      setErrors(null);
      const res = await communitiesApi.all();
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setCommunities(Array.isArray(data) ? data : []);
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingCommunities(false);
    }
  };

  const addCommunity = async (data) => {
    setLoadingAdd(true);
    setErrors(null);
    setSuccess(null);

    try {
      const res = await communitiesApi.add(data);
      setSuccess(res.data.message);
      await getCommunities();
      await getMyCommunities();
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingAdd(false);
    }
  };

  const getMyCommunities = async (id) => {
    setLoadingMyCommunities(true);
    setErrors(null);

    try {
      const res = await communitiesApi.mine(id);
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setMyCommunities(Array.isArray(data) ? data : []);
      setMyCommunitiesPagination(res.data?.meta ?? null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingMyCommunities(false);
    }
  };

  return {
    communities,
    getCommunities,
    getMyCommunities,
    addCommunity,
    myCommunitiesPagination,
    errors,
    success,
    loadingCommunities,
    loadingMyCommunities,
    loading: loadingAdd,
    myCommunities,
  };
}
