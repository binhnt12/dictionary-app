import {
  GET_LIST_WORD,
  CLEAR_LIST_WORD,
  ADD_TO_LIST_WORD_SUCCESS,
  ADD_TO_LIST_WORD_ERROR,
  REMOVE_FROM_LIST_WORD_SUCCESS,
  REMOVE_FROM_LIST_WORD_ERROR,
  CLEAR_ERROR_WORD,
} from "../contants/actions";

const defaultStates = {
  // set error null
  error: null,
  refresh: false,
  listWord: {
    unknown: [],
    known: [],
  },
};

export default function word(state = defaultStates, action) {
  switch (action.type) {
    case GET_LIST_WORD:
      const unknown = action.payload.unknown || [];
      const known = action.payload.known || [];
      return { ...state, listWord: { unknown, known } };
    case CLEAR_LIST_WORD:
      return { ...state, listWord: { unknown: [], known: [] } };

    case ADD_TO_LIST_WORD_SUCCESS:
      return {
        ...state,
        listWord:
          action.payload.type === "unknown"
            ? {
                ...state.listWord,
                unknown: [...state.listWord.unknown, action.payload.data],
              }
            : {
                ...state.listWord,
                known: [...state.listWord.known, action.payload.data],
              },
        refresh: !state.refresh,
      };
    case ADD_TO_LIST_WORD_ERROR:
      return { ...state, error: action.payload, refresh: !state.refresh };

    case REMOVE_FROM_LIST_WORD_SUCCESS:
      const newListWord =
        action.payload.type === "unknown"
          ? state.listWord.unknown.filter(o => o.idx !== action.payload.idx)
          : state.listWord.known.filter(o => o.idx !== action.payload.idx);
      return {
        ...state,
        listWord:
          action.payload.type === "unknown"
            ? { ...state.listWord, unknown: newListWord }
            : { ...state.listWord, known: newListWord },
        refresh: !state.refresh,
      };
    case REMOVE_FROM_LIST_WORD_ERROR:
      return { ...state, error: action.payload, refresh: !state.refresh };

    case CLEAR_ERROR_WORD:
      return { ...state, error: null };

    default:
      return state;
  }
}
