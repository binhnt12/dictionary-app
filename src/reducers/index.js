import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

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

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "setting"],
  blacklist: ["search", "word", "message", "loading"],
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
