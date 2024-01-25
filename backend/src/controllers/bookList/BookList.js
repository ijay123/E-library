import httpStatus from "http-status";
import BookList from "../../model/bookList/bookList.js";
import { deleteText, readText } from '../../util/FsUtils.js';
import { uploadToCloudinary, uploadSIngleOrMultiImagesToCloudinary} from '../../util/cloudinary.js';

const createBookList = async (req, res) => {
  //collect the data from req body
  const data = req.body;

  const titleExist = await BookList.findOne({
    title: data.title,
  });
  if (!titleExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "title must not be empty",
    });
    return;
  }

  const publisherExist = await BookList.findOne({
    publisher: data.publisher,
  });
  if (!publisherExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "publisher must not be empty",
    });
    return;
  }

  const authorExist = await BookList.findOne({
    author: data.author,
  });
  if (!authorExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "author must not be empty",
    });
    return;
  }

  const createdBookList = await BookList.create({
    title: data.title,
    publisher: data.publisher,
    author: data.author,
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

const bookImageUpload = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.book.id
  console.log(req.file, "req.file");

  const config = {
    cloudinary_cloud_name: process.env.cloudinary_cloud_name,
    cloudinary_api_key: process.env.cloudinary_api_key,
    cloudinary_api_secret: process.env.cloudinary_api_secret,
  };

    const response = await uploadSingleOrMultiImagesToCloudinary(
      req.files,
      "image",
      config
    );

  const foundBook = await BookList.findOne({ _id: bookId });
  if (!foundBook) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Book not found",
    });
    return;
  }

  //remove old file from server
  try {
    const filePresent = await readText(`public/${foundBook.bookImage}`);
    console.log(filePresent, "filePresent");
    if (filePresent) {
      await deleteText(`public/${foundBook.bookImage}`);
    }

    const bookWithImageUpload = await BookList.findByIdAndUpdate(
      id,
      { bookImage: req.file.filename },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      status: "success",
      data: bookWithImageUpload,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      data: error,
    });
  }
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


const bookPdfUpload = async (req, res) => {
  // const userId = req.user.id;
  // console.log(req.file, "req.file");

  // const foundUser = await User.findOne({ _id: userId });
  // if (!foundUser) {
  //   res.status(httpStatus.NOT_FOUND).json({
  //     status: "error",
  //     message: "User not found",
  //   });
  //   return;
  // }

  //remove old file from server
  try {
    const filePresent = await readText(`public/${foundUser.bookPDF}`);
    if (filePresent) {
      await deleteText(`public/${foundUser.bookPDF}`);
    }
  } catch (error) {
    console.log(error, "errorr");
  }

  const bookWithPdfUpload = await BookList.findByIdAndUpdate(
    { _id: userId },
    { bookPDF: req.file.filename },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: bookWithPdfUpload,
  });
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
  updateBookList,
  deleteBookList,
  bookImageUpload,
};
