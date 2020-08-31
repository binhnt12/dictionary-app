import { GET_WORD } from "../contants/actions";

const defaultStates = {
  data: null,
};

export default function search(state = defaultStates, action) {
  switch (action.type) {
    case GET_WORD:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
