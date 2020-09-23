import { TOGGLE_THEME } from "../contants/actions";

const defaultStates = {
  darkMode: false,
};

export default function setting(state = defaultStates, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
}
