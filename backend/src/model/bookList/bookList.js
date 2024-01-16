import mongoose from "mongoose";

const bookListSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    publisher: { type: String, unique: true, required: true },
    author: { type: String, unique: true, required: true },
    bookImage: { type: String },
    bookPDF: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const BookList = mongoose.model("BookList", bookListSchema);

export default BookList;
