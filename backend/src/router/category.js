import express from "express";
const CategoryRouter = express.Router();

import {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category/Category.js";
import { createCategorySchema } from "../controllers/category/CategorySchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";

CategoryRouter.route("/")
  .post(
    verifyUser,
    validationMiddleware(createCategorySchema),
    authorizeUser(["admin"]),
    createCategory
  )
  .get(verifyUser, getCategories);

CategoryRouter.route("/:id")
  .patch(verifyUser, authorizeUser(["regular", "admin"]), updateCategory)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteCategory);

export default CategoryRouter;
