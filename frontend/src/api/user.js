import api from "./client";

const userApi = {
  profile: () => api.get("user/profile"),
  update: (data) =>
    api.put("user/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default userApi;
