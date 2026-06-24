import api from "./client";

const notification = {
  all: (page = 1) => {
    return api.get(`notifications?page=${page}`);
  },

  markAsRead: (id) => {
    return api.post(`notifications/${id}/read`);
  },

  markAllAsRead: () => {
    return api.post(`notifications/read-all`);
  },
};

export default notification;
