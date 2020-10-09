import { TOGGLE_HIDE, TOGGLE_THEME } from "../contants/actions";

const defaultStates = {
  darkMode: false,
  hide: false,
};

export default function setting(state = defaultStates, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, darkMode: action.payload };

    case TOGGLE_HIDE:
      return { ...state, hide: action.payload };
    default:
      return state;
  }
}
