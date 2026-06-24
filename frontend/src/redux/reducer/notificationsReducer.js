const init = {
  notification: [],
};

export default function notificationsReducer(state = init, action) {
  switch (action.type) {
    case "ADD_NOTIFICATIONS":
      return {
        ...state,
        notification: action.payload,
      };

    case "PUSH_NOTIFICATION":
      return {
        ...state,
        notification: [action.payload, ...state.notification],
      };

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notification: state.notification.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n,
        ),
      };

    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notification: state.notification.map((n) => ({
          ...n,
          read: true,
        })),
      };

    default:
      return state;
  }
}
