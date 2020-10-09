import { TOGGLE_THEME, TOGGLE_HIDE } from "../contants/actions";

export const toggleTheme = (dispatch, value) => {
  dispatch({
    type: TOGGLE_THEME,
    payload: value,
  });
};

export const toggleHide = (dispatch, value) => {
  dispatch({
    type: TOGGLE_HIDE,
    payload: value,
  });
};
