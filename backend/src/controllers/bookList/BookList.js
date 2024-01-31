import httpStatus from "http-status";
import BookList from "../../model/bookList/bookList.js";
import path from "path";

const createBookList = async (req, res) => {
  //collect the data from req body
  const data = req.body;
  console.log(data.title);

  const titleExist = await BookList.findOne({
    title: data.title,
  });
  if (titleExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "title already exists",
    });
    return;
  }

  const createdBookList = await BookList.create({
    title: data.title,
    publisher: data.publisher,
    author: data.author,
    desc: data.desc,
    categoryId: data.categoryId,
    bookImage: data.bookImage,
    bookPDF: data.bookPDF,
    userId: data.userId,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdBookList,
  });
};

const getBookLists = async (req, res) => {
  const getBook = await BookList.find({});

  res.status(httpStatus.OK).json({
    status: "success",
    data: getBook,
  });
};

const updateBookList = async (req, res) => {
  const { bookList } = req.body;
  const { id } = req.params;
  const foundBookList = await BookList.findOne({ _id: id });
  if (!foundBookList) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Book not found",
    });
  }

  const BookListExist = await BookList.findOne({ bookList: bookList });
  if (BookListExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Book already exist",
    });
    return;
  }
  const updatedBookList = await BookList.findByIdAndUpdate(
    id,
    { bookList: bookList },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedBookList,
  });
};

const getBookList = async (req, res) => {
  const { id } = req.params;
  console.log("here");
  try {
    const book = await BookList.findById({ _id: id });
    if (!book) {
      console.log("not found");
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: "book not found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      status: "success",
      payload: book,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};

const deleteBookList = async (req, res) => {
  const { id } = req.params;
  const foundBookList = await BookList.findOne({ _id: id });
  if (!foundBookList) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Book not found",
    });
  }

  await BookList.findByIdAndDelete(id);

  res.status(httpStatus.OK).json({
    status: "success",
    data: `Book with ID ${id} is deleted`,
  });
};

export {
  createBookList,
  getBookLists,
  getBookList,
  updateBookList,
  deleteBookList,
};
