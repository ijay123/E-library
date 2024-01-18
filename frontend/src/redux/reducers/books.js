import {
  CREATE_BOOKS_CLEAR_ERROR,
  CREATE_BOOKS_ERROR,
  CREATE_BOOKS_REQUEST,
  CREATE_BOOKS_RESET,
  CREATE_BOOKS_SUCCESS,
} from "../constants/books";

export const registerBookReducer = (
  state = { book: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case CREATE_BOOKS_RESET:
      return {
        loading: false,
        success: false,
        book: null,
        error: null,
      };

    case CREATE_BOOKS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CREATE_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
