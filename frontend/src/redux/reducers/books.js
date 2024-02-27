import {
  CREATE_BOOKS_CLEAR_ERROR,
  CREATE_BOOKS_ERROR,
  CREATE_BOOKS_REQUEST,
  CREATE_BOOKS_RESET,
  CREATE_BOOKS_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  GET_BOOKS_CLEAR_ERROR,
  GET_BOOKS_ERROR,
  GET_BOOKS_REQUEST,
  GET_BOOKS_RESET,
  GET_BOOKS_SUCCESS,
  GET_BOOK_CLEAR_ERROR,
  GET_BOOK_ERROR,
  GET_BOOK_REQUEST,
  GET_BOOK_RESET,
  GET_BOOK_SUCCESS,
  UPDATE_BOOKS_REQUEST,
  UPDATE_BOOKS_SUCCESS,
  UPDATE_BOOKS_RESET,
  UPDATE_BOOKS_CLEAR_ERROR,
  UPDATE_BOOKS_ERROR,
  DELETE_BOOKS_REQUEST,
  DELETE_BOOKS_SUCCESS,
  DELETE_BOOKS_RESET,
  DELETE_BOOKS_CLEAR_ERROR,
  DELETE_BOOKS_ERROR,
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

export const imageUploadReducer = (
  state = { ImageUrl: "", loading: false, error: null },
  action
) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        imageUrl: action.payload,
      };

    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getBooksReducer = (
  state = { books: [], loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        books: action.payload,
      };

    case GET_BOOKS_RESET:
      return {
        loading: false,
        success: false,
        books: [],
        error: null,
      };

    case GET_BOOKS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getBookReducer = (
  state = { book: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case GET_BOOK_RESET:
      return {
        loading: false,
        success: false,
        book: null,
        error: null,
      };

    case GET_BOOK_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateBooksReducer = (
  state = { books: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        books: action.payload,
      };

    case UPDATE_BOOKS_RESET:
      return {
        loading: false,
        success: false,
        books: null,
        error: null,
      };

    case UPDATE_BOOKS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case UPDATE_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteBooksReducer = (
  state = { books: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case DELETE_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        books: action.payload,
      };

    case DELETE_BOOKS_RESET:
      return {
        loading: false,
        success: false,
        books: null,
        error: null,
      };

    case DELETE_BOOKS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case DELETE_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
