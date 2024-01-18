import httpStatus from "http-status";
import BookList from "../../model/bookList/bookList.js";

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


const createbookImage = async (req, res) => {
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
    const filePresent = await readText(`public/${foundUser.bookImage}`);
    if (filePresent) {
      await deleteText(`public/${foundUser.bookImage}`);
    }
  } catch (error) {
    console.log(error, "errorr");
  }

  const bookWithImageCreated = await BookList.create(
    { _id: userId },
    { bookImage: req.file.filename },
  
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: bookWithImageCreated,
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

const bookImageUpload = async (req, res) => {
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
    const filePresent = await readText(`public/${foundUser.avatar}`);
    if (filePresent) {
      await deleteText(`public/${foundUser.avatar}`);
    }
  } catch (error) {
    console.log(error, "errorr");
  }

  const bookWithImageUpload = await BookList.findByIdAndUpdate(
    { _id: userId },
    { bookImage: req.file.filename },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: bookWithImageUpload,
  });
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
