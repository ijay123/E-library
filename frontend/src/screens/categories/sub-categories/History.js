import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../../redux/action/books";
import { getCategoriesAction } from "../../../redux/action/category";

const History = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
    getCategories: { categories },
  } = useSelector((state) => state);

  console.log(books, "books");
  console.log(categories, "cat");

  const filteredBooks = books.filter((book) =>
    book.categoryId === categories._id ? book.categoryId : ""
  );
  console.log(filteredBooks, 'filter');
  useEffect(() => {
    dispatch(getBooksAction());
    dispatch(getCategoriesAction());
    
  }, [dispatch]);

  return (
    <div>
      {filteredBooks.map((book) => (
        <div key={book._id}>
          <img src={book.bookImage} alt={`Cover of ${book.title}`} />
        </div>
      ))}
    </div>
  );
};

export default History;
