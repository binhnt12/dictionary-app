import { GET_SINGLE_WORD, GET_MULTIPLE_WORD } from "../contants/actions";
import callApi from "../utils/apiCaller";

export const getSingleWord = (dispatch, value) => {
  return callApi("GET", `api/search/single/?word=${value}`, null).then(res => {
    dispatch({
      type: GET_SINGLE_WORD,
      payload: res.data,
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
