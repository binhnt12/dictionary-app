import { GET_SINGLE_WORD, GET_MULTIPLE_WORD } from "../contants/actions";

const defaultStates = {
  data: {
    notFound: null,
    message: "",
    idx: null,
    word: "",
    words: [],
    detail: {
      splitTwo: [],
    },
  },
};

export default function search(state = defaultStates, action) {
  switch (action.type) {
    case GET_SINGLE_WORD:
      return { ...state, data: { ...state.data, ...action.payload.data } };
    case GET_MULTIPLE_WORD:
      return { ...state, data: { ...state.data, ...action.payload.data } };
    default:
      return state;
  }
}
