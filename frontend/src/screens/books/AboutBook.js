import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../redux/action/books";
import { useParams } from "react-router-dom";

const AboutBook = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
  } = useSelector((state) => state);

  const { id } = useParams();

  // const singleBook = Array.isArray(books)? books.filter((book) => {
  //   if (book._id === +id) {
  //     console.log(book.id === id);
  //     console.log(book.id);
  //     console.log(book);
  //     console.log(+id);
  //     return book;
  //   }
  // }):""

  useEffect(() => {
    if (!books) {
      dispatch(getBooksAction());
    }
  }, [dispatch, books]);

  const singleBook = books ? books.find((book) => book._id === id) : null;

  if (!singleBook) {
    return <div>Loading book details...</div>;
  }

  console.log(singleBook, "book");



  return (
    <div>
    <p>{singleBook.title}</p>
    <p><img src={singleBook.bookImage} alt=""/></p>
    <p>Author: {singleBook.author}</p>
      <p>Publisher: {singleBook.publisher}</p>
    </div>
  );
};

export default AboutBook;
