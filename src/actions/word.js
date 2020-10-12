import callApi from "../utils/apiCaller";
import {
  GET_LIST_WORD,
  CLEAR_LIST_WORD,
  ADD_TO_LIST_WORD_SUCCESS,
  ADD_TO_LIST_WORD_ERROR,
  REMOVE_FROM_LIST_WORD_SUCCESS,
  REMOVE_FROM_LIST_WORD_ERROR,
  CLEAR_ERROR_WORD,
  LOADING,
  REFRESH_WORD,
} from "../contants/actions";

export const getListWord = (dispatch, token) => {
  dispatch({ type: LOADING });
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
};

export const clearListWord = dispatch => {
  dispatch({
    type: CLEAR_LIST_WORD,
  });
};

export const addToListWord = async (dispatch, type, data, token, cb, user) => {
  dispatch({ type: LOADING });

  if (data.words && data.words.length > 0) {
    delete data.words;
  }

  return callApi("POST", `api/protect/addWord/?type=${type}`, data, token).then(
    res => {
      if (res && res.status === 200) {
        dispatch({
          type: ADD_TO_LIST_WORD_SUCCESS,
          payload: { type, data },
        });
        dispatch({
          type: CLEAR_ERROR_WORD,
        });
        cb && cb(false);
        // !user && dispatch({ type: REFRESH_WORD });
      } else {
        dispatch({
          type: ADD_TO_LIST_WORD_ERROR,
          payload: "e0",
        });
        cb && cb(true);
      }
    },
  );
};

export const removeFromListWord = async (dispatch, type, idx, token, user) => {
  dispatch({ type: LOADING });

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
      // !user && dispatch({ type: REFRESH_WORD });
    } else {
      dispatch({
        type: REMOVE_FROM_LIST_WORD_ERROR,
        payload: "e0",
      });
    }
  });
};
