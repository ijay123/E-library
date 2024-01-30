import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../redux/action/category";
import { getBooksAction } from "../../../redux/action/books";

const Romance = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
    getCategories: { categories },
  } = useSelector((state) => state);

  console.log(books, "booksLove");
  console.log(categories, "cat");

  // Find the category for "History"
  const historyCategory = Array.isArray(categories)
    ? categories.find((cat) => cat.category === "Love and Romance")
    : "";

  // Filter books by the "History" category
  const filteredBooks = historyCategory
    ? books.filter((book) => book.categoryId === historyCategory._id)
    : [];

  console.log(filteredBooks, "filter");

  useEffect(() => {
    dispatch(getBooksAction());
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap px-[70px] gap-[50px] items-center justify-center pt-[160px]">
      {filteredBooks &&
        filteredBooks.map((book) => (
          <div key={book._id} className="w-[200px] border text-[white] p-[5px]">
            <img src={book.bookImage} alt={`Cover of ${book.title}`} />
            <p>
                <span className="text-[#a54b4b] text-[ 20px]">Author(s):</span>{" "}
                {book.author}
              </p>
              <p>
                <span className="text-[#a54b4b] text-[20px]">Title: </span>
                {book.title}
              </p>
              <div className="flex gap-[10px]">
                <button className="border p-[10px] bg-[#2e5c2e]">About Book</button>
                <a href={book.bookPDF}><button className="border p-[10px] bg-[#2e5c2e]">Read</button></a>
              </div>
          </div>
        ))}
    </div>
  );
};

export default Romance;
