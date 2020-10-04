import AsyncStorage from "@react-native-community/async-storage";
import callApi from "../utils/apiCaller";
import {
  GET_LIST_WORD,
  CLEAR_LIST_WORD,
  ADD_TO_LIST_WORD_SUCCESS,
  ADD_TO_LIST_WORD_ERROR,
  REMOVE_FROM_LIST_WORD_SUCCESS,
  REMOVE_FROM_LIST_WORD_ERROR,
  CLEAR_ERROR_WORD,
} from "../contants/actions";

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

export const addToListWord = async (dispatch, type, data, cb) => {
  if (data.words && data.words.length > 0) {
    delete data.words;
  }
  let token;
  try {
    token = await AsyncStorage.getItem("token");
    return callApi(
      "POST",
      `api/protect/addWord/?type=${type}`,
      data,
      token,
    ).then(res => {
      if (res && res.status === 200) {
        dispatch({
          type: ADD_TO_LIST_WORD_SUCCESS,
          payload: { type, data },
        });
        dispatch({
          type: CLEAR_ERROR_WORD,
        });
        cb && cb(false);
      } else {
        dispatch({
          type: ADD_TO_LIST_WORD_ERROR,
          payload: "e0",
        });
        cb && cb(true);
      }
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    }
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
    ).then(res => {
      if (res && res.status === 200) {
        dispatch({
          type: REMOVE_FROM_LIST_WORD_SUCCESS,
          payload: { type, idx },
        });
        dispatch({
          type: CLEAR_ERROR_WORD,
        });
      } else {
        dispatch({
          type: REMOVE_FROM_LIST_WORD_ERROR,
          payload: "e0",
        });
      }
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    }
  }
};
