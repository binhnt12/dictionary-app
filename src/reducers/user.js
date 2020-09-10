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
  words: ["make", "line", "active", "made", "in"],
  listWord: [],
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
      return { ...state, listWord: [...state.listWord, action.payload] };
    case CLEAR_LIST_WORD:
      return { ...state, listWord: [] };

    case ADD_TO_LIST_WORD:
      console.log("ADD_TO_LIST_WORD:", action.payload);
      return {
        ...state,
        listWord: [...state.listWord, { data: action.payload }],
        words: [...state.words, action.payload.word],
      };
    case REMOVE_FROM_LIST_WORD:
      console.log("REMOVE_FROM_LIST_WORD:", state.listWord);
      const newListWord = state.listWord.filter(
        o => o.data.word !== action.payload,
      );
      const newWords = state.words.filter(e => e !== action.payload);
      return { ...state, listWord: newListWord, words: newWords };

    default:
      return state;
  }
}
