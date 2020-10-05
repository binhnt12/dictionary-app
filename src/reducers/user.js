import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer } from "redux-persist";

import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  GET_TOKEN,
  CLEAR_INFO_USER,
} from "../contants/actions";

const defaultStates = {
  message: "",
  username: "",
  token: null,
  userId: null,
  error: null,
  refresh: false,
};

function user(state = defaultStates, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return { ...state, ...action.payload, error: null };
    case SIGN_UP_FAILURE:
      return { ...state, error: action.payload };

    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload };

    case LOGOUT_SUCCESS:
      return { ...state, token: null, message: action.payload };
    case LOGOUT_FAILURE:
      return state;

    case CLEAR_INFO_USER:
      return defaultStates;

    default:
      return state;
  }
}

export default user;
