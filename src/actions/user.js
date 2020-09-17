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
      throw error;
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
      throw error;
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
      throw error;
    });
};

export const getToken = dispatch => {
  dispatch({
    type: GET_TOKEN,
  });
};

export const getListWord = async (dispatch, type) => {
  let token;
  try {
    token = await AsyncStorage.getItem("token");
    return callApi("GET", `api/protect/getListWord`, null, token)
      .then(res => {
        dispatch({
          type: GET_LIST_WORD,
          payload: res.data,
        });
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
        }
        throw error;
      });
  } catch (e) {
    console.log({ e });
  }
};

export const clearListWord = dispatch => {
  dispatch({
    type: CLEAR_LIST_WORD,
  });
};

export const addToListWord = async (dispatch, type, data) => {
  console.log("addToListWord", data);
  if (data.words && data.words.length > 0) {
    delete data.words;
  }
  let token;
  try {
    token = await AsyncStorage.getItem("token");
    return callApi("POST", `api/protect/addWord/?type=${type}`, data, token)
      .then(res => {
        dispatch({
          type: ADD_TO_LIST_WORD,
          payload: { type, data },
        });
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
        }
        throw error;
      });
  } catch (e) {
    console.log({ e });
  }
};

export const removeFromListWord = async (dispatch, type, idx) => {
  let token;
  try {
    // 58693
    token = await AsyncStorage.getItem("token");
    return callApi(
      "GET",
      `api/protect/removeFromListWord/?type=${type}&idx=${idx}`,
      null,
      token,
    )
      .then(res => {
        dispatch({
          type: REMOVE_FROM_LIST_WORD,
          payload: { type, idx },
        });
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
        }
        throw error;
      });
  } catch (e) {
    console.log({ e });
  }
};
