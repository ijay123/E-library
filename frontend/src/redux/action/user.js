import axios from "axios";

import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  LOGIN_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_RESET,
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_ERROR,
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../constants/user";
import { toast } from "react-toastify";

const baseUrl = "https://e-library-backend-gy7e.onrender.com";

const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
  ? JSON.parse(localStorage.getItem("libraryUserInfo"))
  : null;

export const createUserAction =
  ({ email, password, username, gender }) =>
  async (dispatch, state) => {
    //1. before the API call
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //make API call
      const { data } = await axios.post(
        `${baseUrl}/users`,
        { email, password, username, gender },
        config
      );
      //2. after the API call success
      console.log(data, "data");
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: data.data,
      });
      console.log(data);
      localStorage.setItem(
        "libraryUserInfo",
        JSON.stringify({ data: data.data, token: data.token })
      );
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
        type: CREATE_USER_ERROR,
        payload: message,
      });
    }
  };

export const loginUserAction =
  ({ email, password }) =>
  async (dispatch, state) => {
    //1. before the API call
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //make API call
      const { data } = await axios.post(
        `${baseUrl}/users/login`,
        { email, password },
        config
      );
      //2. after the API call success
      console.log(data, "data");
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { data: data.data, token: data.token },
      });
      console.log(data);
      localStorage.setItem(
        "libraryUserInfo",
        JSON.stringify({ data: data.data, token: data.token })
      );
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
        type: LOGIN_USER_ERROR,
        payload: message,
      });
    }
  };

export const logout = () => async (dispatch, state) => {
  console.log("logged out");
  dispatch({ type: LOGIN_USER_RESET });
  localStorage.removeItem("libraryUserInfo"); // This line is changed
  toast.success("logged out");
};

export const getUsersAction = () => async (dispatch, state) => {
  // const {
  //   loggedInUser: { user },
  // } = state();

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_USERS_REQUEST,
    });
    // make the call
    const { data } = await axios.get(
      `${baseUrl}/users?id=${userInfoFromLocalStorage.data?._id}`,
      config
    );
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log(error, "error");
    // if (message.toLowerCase().includes("jwt")) {
    //   dispatch(logout());
    // }
    dispatch({
      type: GET_USERS_ERROR,
      payload: message,
    });
  }
};

export const getUserAction = (id) => async (dispatch, state) => {
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
      type: GET_USER_REQUEST,
    });
    // make the call
    const { data } = await axios.get(`${baseUrl}/users/${id}`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data.data,
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
      type: GET_USER_ERROR,
      payload: message,
    });
  }
};
