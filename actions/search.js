import { GET_WORD } from "../contants/actions";
import callApi from "../utils/apiCaller";

export const getWord = (dispatch, value) => {
  return callApi("GET", `api/search/single/?word=${value}`, null).then(res => {
    dispatch({
      type: GET_WORD,
      payload: res.data.result,
    });
  });
};
