import api from "./client";

const notification = {
  all: () => {
    return api.get("notifications");
  },
};
export default notification;
