import mongoose from "mongoose";

const bookListSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    publisher: { type: String, required: true },
    author: { type: String, required: true },
    desc: { type: String, required: true },
    bookImage: { type: String },
    bookPDF: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const BookList = mongoose.model("BookList", bookListSchema);

export default BookList;
