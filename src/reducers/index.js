import { combineReducers } from "redux";
import search from "./search";
import user from "./user";
import setting from "./setting";
import word from "./word";
import message from "./message";

const rootReducer = combineReducers({
  search,
  user,
  setting,
  word,
  message,
});

export default rootReducer;
