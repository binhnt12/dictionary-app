import { TOGGLE_THEME } from "../contants/actions";

export const toggleTheme = (dispatch, value) => {
  dispatch({
    type: TOGGLE_THEME,
    payload: value,
  });
};
