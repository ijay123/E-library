import { combineReducers } from "redux";
import { registerUserReducer, loginUserReducer } from "./reducers/user";

import {
  registerCategoryReducer,
  getCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/category";

import { registerBookReducer } from "./reducers/books";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  createdCategory: registerCategoryReducer,
  getCategories: getCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  createdBook: registerBookReducer,
});
