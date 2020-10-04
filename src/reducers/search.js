import {
  GET_SINGLE_WORD_SUCCESS,
  GET_SINGLE_WORD_ERROR,
  GET_MULTIPLE_WORD,
  CLEAR_ERROR_SEARCH,
} from "../contants/actions";

const defaultStates = {
  data: {
    notFound: null,
    message: "",
    idx: null,
    word: "",
    words: [],
    detail: "",
  },
  error: null,
};

export default function search(state = defaultStates, action) {
  switch (action.type) {
    case GET_SINGLE_WORD_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
      };
    case GET_SINGLE_WORD_ERROR:
      return { ...state, error: action.payload };

    case GET_MULTIPLE_WORD:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
      };

    case CLEAR_ERROR_SEARCH:
      return { ...state, error: null };

    default:
      return state;
  }
}
