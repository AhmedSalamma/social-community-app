import api from "./client";

const userApi = {
  profile: () => api.get("user/profile"),
  update: (data) => api.post("user/profile", data),
  comments: (page) => api.get(`user/comments?page=${page}`),
};

export default userApi;
