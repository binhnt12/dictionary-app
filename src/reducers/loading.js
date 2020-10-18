import {
  LOADING,
  LOADING_2,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_LIST_WORD,
  ADD_TO_LIST_WORD_SUCCESS,
  ADD_TO_LIST_WORD_ERROR,
  REMOVE_FROM_LIST_WORD_SUCCESS,
  REMOVE_FROM_LIST_WORD_ERROR,
  GET_SINGLE_WORD_SUCCESS,
  GET_SINGLE_WORD_ERROR,
} from "../contants/actions";

const defaultStates = {
  loading: false,
  loading2: false,
};

export default function loading(state = defaultStates, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOADING_2:
      return { ...state, loading2: true };

    case SIGN_UP_SUCCESS:
    case SIGN_UP_FAILURE:
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
    case GET_LIST_WORD:
    case ADD_TO_LIST_WORD_SUCCESS:
    case ADD_TO_LIST_WORD_ERROR:
    case REMOVE_FROM_LIST_WORD_SUCCESS:
    case REMOVE_FROM_LIST_WORD_ERROR:
    case GET_SINGLE_WORD_SUCCESS:
    case GET_SINGLE_WORD_ERROR:
      return { ...state, loading: false, loading2: false };

    default:
      return state;
  }
}
