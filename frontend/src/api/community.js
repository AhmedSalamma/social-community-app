import api from "./client";

const communitiesApi = {
  all: () => {
    return api.get("communities");
  },
  mine: (id) => {
    return api.get(`communities/user?page=${id}`);
  },
  show: (id) => {
    return api.get(`communities/${id}`);
  },
  add: (data) => {
    return api.post("communities/add", data);
  },
};

export default communitiesApi;
