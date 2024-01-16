import { combineReducers } from "redux";
import { registerUserReducer } from "./reducers/user";
import { loginUserReducer } from "./reducers/user";
import { registerCategoryReducer } from "./reducers/category";
import { getCategoryReducer } from "./reducers/category";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  createdCategory: registerCategoryReducer,
  getCategories: getCategoryReducer,
});
