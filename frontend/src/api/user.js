import api from "./client";

const userApi = {
  profile: () => api.get("user/profile"),
  update: (data) => api.post("user/profile", data),
};

export default userApi;
