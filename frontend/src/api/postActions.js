import api from "./client";

const postActions = {
  like: (id) => {
    return api.post(`posts/${id}/like`);
  },

  Comment: (id, comment) => {
    return api.post(`posts/${id}/comment`, comment);
  },
};

export default postActions;
