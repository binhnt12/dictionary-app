import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_INFO_USER,
  GET_TOKEN,
  LOADING,
} from "../contants/actions";
import callApi from "../utils/apiCaller";

export const signUp = (dispatch, values) => {
  dispatch({ type: LOADING });
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
  dispatch({ type: LOADING });
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
  dispatch({ type: LOADING });
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

export const clearInfoUser = dispatch => {
  dispatch({
    type: CLEAR_INFO_USER,
  });
};

export const getToken = dispatch => {
  dispatch({
    type: GET_TOKEN,
  });
};
