import api from "./client";

const commentAction = {
  disLike: (id) => {
    return api.post(`comments/${id}/dislike`);
  },

  like: (id) => {
    return api.post(`comments/${id}/like`);
  },

  reply: (id, data) => {
    return api.post(`comments/${id}/reply`, data);
  },
};

export default commentAction;
