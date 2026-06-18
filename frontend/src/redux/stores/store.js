import { combineReducers, createStore } from "redux";
import postsReducer from "../reducer/postsReducer";
import userReducer from "../reducer/userReducer";

const appReducer = combineReducers({
  postReducer: postsReducer,
  userReducer: userReducer,
});
const store = createStore(appReducer);

export default store;
