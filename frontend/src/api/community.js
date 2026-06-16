import api from "./client";

const communitiesApi = {
  all: () => {
    return api.get("communities");
  },
  mine: (id) => {
    return api.get(`communities/user?page=${id}`);
  },
  add: (data) => {
    return api.post("communities/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default communitiesApi;
