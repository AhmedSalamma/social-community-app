import { combineReducers, createStore } from "redux";
import postsReducer from "../reducer/postsReducer";
import userReducer from "../reducer/userReducer";
import notificationsReducer from "../reducer/notificationsReducer";

const appReducer = combineReducers({
  postReducer: postsReducer,
  userReducer: userReducer,
  notification: notificationsReducer,
});
const store = createStore(appReducer);

export default store;
