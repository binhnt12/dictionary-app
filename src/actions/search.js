import {
  GET_SINGLE_WORD_SUCCESS,
  GET_SINGLE_WORD_ERROR,
  GET_MULTIPLE_WORD,
  LOADING,
} from "../contants/actions";
import callApi from "../utils/apiCaller";

export const getSingleWord = (dispatch, value) => {
  dispatch({ type: LOADING });
  return new Promise((resolve, reject) => {
    return callApi("GET", `api/search/single/?word=${value}`, null)
      .then(res => {
        dispatch({
          type: GET_SINGLE_WORD_SUCCESS,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data);
          dispatch({
            type: GET_SINGLE_WORD_ERROR,
            payload: "e4",
          });
        } else {
          dispatch({
            type: GET_SINGLE_WORD_ERROR,
            payload: "e0",
          });
        }
        throw error;
      });
  });
};

export const getMultipleWord = (dispatch, value) => {
  return callApi("GET", `api/search/multiple/?word=${value}`, null).then(
    res => {
      dispatch({
        type: GET_MULTIPLE_WORD,
        payload: res.data,
      });
    },
  );
};
