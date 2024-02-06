import axios from "axios";

import {
  CREATE_BOOKS_SUCCESS,
  CREATE_BOOKS_ERROR,
  CREATE_BOOKS_REQUEST,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  GET_BOOKS_ERROR,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOK_ERROR,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
} from "../constants/books";

const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
  ? JSON.parse(localStorage.getItem("libraryUserInfo"))
  : null;

const baseUrl = "https://e-library-backend-gy7e.onrender.com";

export const createBookAction = (formData) => async (dispatch, state) => {
  dispatch({
    type: CREATE_BOOKS_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  // const formBookData = new FormData()

  //      formBookData.append('title', formData.title)
  //      formBookData.append('bookImage', 'image file')
  try {
    //make API call
    const { data } = await axios.post(`${baseUrl}/books`, formData, config);
    //2. after the API call success
    console.log(data, "data");
    dispatch({
      type: CREATE_BOOKS_SUCCESS,
      payload: data.data,
    });
    console.log(data);
  } catch (error) {
    //3. after the API call failure
    console.log(error);
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_BOOKS_ERROR,
      payload: message,
    });
  }
};

export const imageUploadAction = (formData) => async (dispatch, state) => {
  dispatch({
    type: UPLOAD_IMAGE_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  try {
    const formBookData = new FormData();
    formBookData.append("title", formData.title);
    formBookData.append("bookImage", formData.bookImage);

    const response = await axios.patch(
      `${baseUrl}/upload-image`,
      formBookData,
      config
    );

    dispatch(UPLOAD_IMAGE_SUCCESS(response.data.url));
  } catch (error) {
    dispatch(UPLOAD_IMAGE_ERROR(error.message));
  }
};

export const getBooksAction = () => async (dispatch, state) => {
  const {
    loggedInUser: { user },
  } = state();

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_BOOKS_REQUEST,
    });
    // make the call
    const { data } = await axios.get(
      `${baseUrl}/books?id=${userInfoFromLocalStorage.data?._id}`,
      config
    );
    console.log(data.data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_BOOKS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    // console.log(error, "error");
    // if (message.toLowerCase().includes("jwt")) {
    //   dispatch(logout());
    // }
    dispatch({
      type: GET_BOOKS_ERROR,
      payload: message,
    });
  }
};


export const getBookAction = (id) => async (dispatch, state) => {
  const {
    loggedInUser: { user },
  } = state();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_BOOK_REQUEST,
    });
    // make the call
    const { data } = await axios.get(`${baseUrl}/users/${id}`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_BOOK_SUCCESS,
      payload: data.payload,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: GET_BOOK_ERROR,
      payload: message,
    });
  }
};
