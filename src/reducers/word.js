import {
  GET_LIST_WORD,
  CLEAR_LIST_WORD,
  ADD_TO_LIST_WORD_SUCCESS,
  ADD_TO_LIST_WORD_ERROR,
  REMOVE_FROM_LIST_WORD_SUCCESS,
  REMOVE_FROM_LIST_WORD_ERROR,
  CLEAR_ERROR_WORD,
  REFRESH_WORD,
} from "../contants/actions";

const defaultStates = {
  error: null,
  refresh: false,
  refresh2: false,
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
        listWord: {
          ...state.listWord,
          [action.payload.type]: [
            ...state.listWord[action.payload.type],
            action.payload.data,
          ],
        },
      };
    case ADD_TO_LIST_WORD_ERROR:
      return { ...state, error: action.payload, refresh: !state.refresh };

    case REMOVE_FROM_LIST_WORD_SUCCESS:
      const newListWord = state.listWord[action.payload.type].filter(
        o => o.idx !== action.payload.idx,
      );
      return {
        ...state,
        listWord: { ...state.listWord, [action.payload.type]: newListWord },
      };
    case REMOVE_FROM_LIST_WORD_ERROR:
      return { ...state, error: action.payload, refresh: !state.refresh };

    case CLEAR_ERROR_WORD:
      return { ...state, error: null };

    case REFRESH_WORD:
      return { ...state, refresh2: !state.refresh2 };

    default:
      return state;
  }
}
