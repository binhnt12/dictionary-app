import AsyncStorage from "@react-native-community/async-storage";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_TOKEN,
  GET_LIST_WORD,
  CLEAR_LIST_WORD,
  ADD_TO_LIST_WORD,
  REMOVE_FROM_LIST_WORD,
} from "../contants/actions";
import callApi from "../utils/apiCaller";

export const signUp = (dispatch, values) => {
  return callApi("POST", "api/user/signUp", values)
    .then(res => {
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: SIGN_UP_FAILURE,
          payload: error.response.data,
        });
      }
      console.error(error.response.data);
    });
};

export const login = (dispatch, values) => {
  return callApi("POST", "api/user/login", values)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: LOGIN_FAILURE,
          payload: error.response.data,
        });
      }
      console.error(error.response.data);
    });
};

export const logout = dispatch => {
  return callApi("GET", "api/user/logout")
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: {
          username: res.data,
        },
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: error.response.data,
        });
      }
      console.error(error.response.data);
    });
};

export const getToken = dispatch => {
  dispatch({
    type: GET_TOKEN,
  });
};

export const getListWord = (dispatch, value) => {
  return callApi("GET", `api/search/single/?word=${value}`, null).then(res => {
    dispatch({
      type: GET_LIST_WORD,
      payload: res.data,
    });
  });
};

export const clearListWord = dispatch => {
  dispatch({
    type: CLEAR_LIST_WORD,
  });
};

export const addToListWord = async (dispatch, data) => {
  if (data.words && data.words.length > 0) {
    delete data.words;
  }
  let token;
  try {
    token = await AsyncStorage.getItem("token");
    return callApi("POST", "api/protect/addWord", data, token)
      .then(res => {
        dispatch({
          type: ADD_TO_LIST_WORD,
          payload: data,
        });
      })
      .catch(error => {
        console.error(error.response.data);
      });
  } catch (e) {
    console.log({ e });
  }
};

export const removeFromListWord = (dispatch, word) => {
  dispatch({
    type: REMOVE_FROM_LIST_WORD,
    payload: word,
  });
};
