import api from "./client";

const auth = {
  login: (data) => {
    return api.post("/login", data);
  },
  register: (data) => {
    return api.post("/register", data);
  },
};

export default auth;
