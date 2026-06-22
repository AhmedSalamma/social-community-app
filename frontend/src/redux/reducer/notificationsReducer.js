const init = {
  notification: null,
};

export default function notificationsReducer(state = init, action) {
  switch (action.type) {
    case "ADD_NOTIFICATIONS":
      return {
        ...state,
        notification: action.payload,
      };

    default:
      return state;
  }
}
