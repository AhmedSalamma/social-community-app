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
    return api.post("posts/add", data);
  },
  update: (id, data) => {
    return api.post(`posts/${id}`, data);
  },
  delete: (id) => {
    return api.delete(`posts/${id}`);
  },
};

export default postsApi;
