import AsyncStorage from "@react-native-community/async-storage";

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

export default function user(state = defaultStates, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      const setTokenSignUp = async () => {
        try {
          await AsyncStorage.setItem("token", action.payload.token);
        } catch (e) {
          console.log({ e });
        }
      };
      setTokenSignUp();
      return { ...state, ...action.payload, error: null };
    case SIGN_UP_FAILURE:
      return { ...state, error: action.payload };

    case LOGIN_SUCCESS:
      const setTokenLogin = async () => {
        try {
          await AsyncStorage.setItem("token", action.payload.token);
        } catch (e) {
          console.log({ e });
        }
      };
      setTokenLogin();
      return { ...state, ...action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload };

    case LOGOUT_SUCCESS:
      const removeToken = async () => {
        try {
          await AsyncStorage.removeItem("token");
        } catch (e) {
          console.log({ e });
        }
      };
      removeToken();
      return { ...state, token: null, message: action.payload };
    case LOGOUT_FAILURE:
      return state;

    case CLEAR_INFO_USER:
      return defaultStates;

    case GET_TOKEN:
      let token;
      const getToken = async () => {
        try {
          token = await AsyncStorage.getItem("token");
        } catch (e) {
          console.log({ e });
        }
      };
      getToken();
      return { ...state, token };

    default:
      return state;
  }
}
