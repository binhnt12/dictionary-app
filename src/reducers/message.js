import { SET_MESSAGE } from "../contants/actions";

const defaultStates = {
  message: "",
};

export default function setting(state = defaultStates, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
