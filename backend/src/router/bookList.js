import express from "express";
const BookRouter = express.Router();

import {
  createBookList,
  updateBookList,
  deleteBookList,
  getBookLists,
  bookImageUpload
  
} from "../controllers/bookList/BookList.js";
import { createBookListSchema } from "../controllers/bookList/BookListSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";
import { upload } from "../util/multer.js";

BookRouter.route("/")
  .post(
    validationMiddleware(createBookListSchema),
    verifyUser,
    authorizeUser("admin"),
    createBookList
  )
  .get(verifyUser, authorizeUser(["admin, regular"]), getBookLists);

  BookRouter
  .route("/upload-image")
  .patch(verifyUser, upload.single("bookImage"), bookImageUpload);

BookRouter.route("/:id")
  .patch(verifyUser, authorizeUser(["regular", "admin"]), updateBookList)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteBookList);

export default BookRouter;

