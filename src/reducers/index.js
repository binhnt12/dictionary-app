import { combineReducers } from "redux";
import search from "./search";
import user from "./user";
import setting from "./setting";
import word from "./word";
import message from "./message";
import loading from "./loading";

const rootReducer = combineReducers({
  search,
  user,
  setting,
  word,
  message,
  loading,
});

export default rootReducer;
