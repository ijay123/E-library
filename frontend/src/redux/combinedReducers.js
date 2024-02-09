import { combineReducers } from "redux";
import {
  registerUserReducer,
  loginUserReducer,
  getUsersReducer,
  getUserReducer,
} from "./reducers/user";

import {
  registerCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/category";

import {
  registerBookReducer,
  imageUploadReducer,
  getBooksReducer,
  getBookReducer,
  updateBooksReducer,
  deleteBooksReducer,
} from "./reducers/books";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  allUsers: getUsersReducer,
  singleUser: getUserReducer,
  createdCategory: registerCategoryReducer,
  getCategories: getCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  createdBook: registerBookReducer,
  getBooks: getBooksReducer,
  getBook: getBookReducer,
  imageUpload: imageUploadReducer,
  updateBook: updateBooksReducer,
  deleteBook: deleteBooksReducer,
});
