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
  const id = req.params.id;
  const type = req.query.type;

  const title = req.query.title;
  const publisher = req.query.publisher;
  const author = req.query.author;
  const categoryId = req.query.categoryId;
  const bookImage = req.query.bookImage;
  const bookPDF = req.query.bookPDF;
  const userId = req.query.userId;

  console.log(type, email, "type");

  let book;
  switch (type) {
    case "ID":
      book = await BookList.findById(id);
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with id not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    case "TITLE":
      book = await BookList.findOne({ title: title });
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with title not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    case "DESC":
      book = await BookList.findOne({ title: title });
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with DESC not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    case "PUBLISHER":
      book = await BookList.findOne({ publisher: publisher });
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with publisher not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    case "AUTHOR":
      book = await BookList.findOne({ author: author });
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with author not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    case "BOOKIMAGE":
      book = await BookList.findOne({ bookImage: bookImage });
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with bookImage not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    case "BOOKPDF":
      book = await BookList.findOne({ bookPDF: bookPDF });
      if (!book) {
        res.status(httpStatus.NOT_FOUND).json({
          status: "error",
          message: "book with bookPDF not found",
        });
        break;
      }

      res.status(httpStatus.OK).json({
        status: "success",
        data: book,
      });
      break;

    // case "TITLE":
    //   book = await BookList.findOne({ title: title });
    //   if (!book) {
    //     res.status(httpStatus.NOT_FOUND).json({
    //       status: "error",
    //       message: "book with title not found",
    //     });
    //     break;
    //   }

    //   res.status(httpStatus.OK).json({
    //     status: "success",
    //     data: book,
    //   });
    //   break;

    default:
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "book not found",
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
