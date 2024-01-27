import express from "express";
const BookRouter = express.Router();

import {
  createBookList,
  updateBookList,
  deleteBookList,
  getBookLists,
  getBookList,
} from "../controllers/bookList/BookList.js";
import { createBookListSchema } from "../controllers/bookList/BookListSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";

BookRouter.route("/")
  .post(
    validationMiddleware(createBookListSchema),
    verifyUser,
    authorizeUser("admin"),
    createBookList
  )
  .get(verifyUser, getBookLists);

BookRouter.route("/:id")
  .get(verifyUser, authorizeUser(["admin, regular"]), getBookList)
  .patch(verifyUser, authorizeUser(["regular", "admin"]), updateBookList)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteBookList);

export default BookRouter;
