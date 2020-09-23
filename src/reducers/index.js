import { combineReducers } from "redux";
import search from "./search";
import user from "./user";
import setting from "./setting";

const rootReducer = combineReducers({
  search,
  user,
  setting,
});

export default rootReducer;
