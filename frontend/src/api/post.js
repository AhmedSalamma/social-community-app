import api from "./client";

const postsApi = {
  all: (page) => {
    return api.get(`posts?page=${page}`);
  },
  single: (id) => {
    return api.get(`posts/${id}`);
  },
  userPosts: () => {
    return api.get("posts/user");
  },
  add: (data) => {
    return api.post("posts/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default postsApi;
