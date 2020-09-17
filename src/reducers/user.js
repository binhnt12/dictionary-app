import AsyncStorage from "@react-native-community/async-storage";

import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  GET_TOKEN,
  GET_LIST_WORD,
  CLEAR_LIST_WORD,
  ADD_TO_LIST_WORD,
  REMOVE_FROM_LIST_WORD,
} from "../contants/actions";

const defaultStates = {
  message: "",
  username: "",
  token: null,
  userId: null,
  error: null,
  listWord: {
    unknown: [],
    known: [],
  },
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

    case GET_LIST_WORD:
      const unknown = action.payload.unknown || [];
      const known = action.payload.known || [];
      return { ...state, listWord: { unknown, known } };
    case CLEAR_LIST_WORD:
      return { ...state, listWord: { unknown: [], known: [] } };

    case ADD_TO_LIST_WORD:
      console.log("ADD_TO_LIST_WORD:", action.payload);
      console.log("ADD_TO_LIST_WORD_2:", state.listWord);
      return {
        ...state,
        listWord:
          action.payload.type === "unknown"
            ? {
                ...state.listWord,
                unknown: [...state.listWord.unknown, action.payload.data],
              }
            : {
                ...state.listWord,
                known: [...state.listWord.known, action.payload.data],
              },
      };
    case REMOVE_FROM_LIST_WORD:
      console.log("REMOVE_FROM_LIST_WORD:", state.listWord);
      const newListWord =
        action.payload.type === "unknown"
          ? state.listWord.unknown.filter(o => o.idx !== action.payload.idx)
          : state.listWord.known.filter(o => o.idx !== action.payload.idx);
      console.log(newListWord);
      return {
        ...state,
        listWord:
          action.payload.type === "unknown"
            ? { ...state.listWord, unknown: newListWord }
            : { ...state.listWord, known: newListWord },
      };

    default:
      return state;
  }
}
