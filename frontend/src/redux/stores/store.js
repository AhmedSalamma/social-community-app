import { combineReducers, createStore } from "redux";
import postsReducer from "../reducer/postsReducer";

const appReducer = combineReducers({
  postReducer: postsReducer,
});
const store = createStore(appReducer);

export default store;
