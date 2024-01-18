import axios from "axios";

import {
  CREATE_BOOKS_SUCCESS,
  CREATE_BOOKS_ERROR,
  CREATE_BOOKS_REQUEST,
} from "../constants/books";

const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
  ? JSON.parse(localStorage.getItem("libraryUserInfo"))
  : null;

const baseUrl = "http://localhost:6600";

export const createBookAction = (formData) => async (dispatch, state) => {
  // const {
  //   loggedInUser: { user},
  // } = state();
  //1. before the API call
  dispatch({
    type: CREATE_BOOKS_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  const formBookData = new FormData()

       formBookData.append('title', formData.title)
       formBookData.append('bookImage', 'image file')
  try {
    //make API call
    const { data } = await axios.post(
      `${baseUrl}/books`,
      formData,
      config
    );
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


