import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../redux/action/category";
import { getBooksAction } from "../../../redux/action/books";

const Science = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
    getCategories: { categories },
  } = useSelector((state) => state);

  console.log(books, "booksScience");
  console.log(categories, "cat");

  // Find the category for "History"
  const historyCategory = Array.isArray(categories)
    ? categories.find((cat) => cat.category === "Science fiction")
    : "";

  // Filter books by the "History" category
  const filteredBooks = historyCategory
    ? books.filter((book) => book.categoryId === historyCategory._id)
    : [];

  console.log(filteredBooks, "filterscience");

  useEffect(() => {
    dispatch(getBooksAction());
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <>
    
    <div className="flex flex-wrap px-[70px] gap-[50px] items-center justify-center pt-[160px]">
      {filteredBooks &&
        filteredBooks.map((book) => (
          <div
            key={book._id}
            className="w-[200px] text-[white] border  p-[5px]"
          >
            <img src={book.bookImage} alt={`Cover of ${book.title}`} />
            <p>
              <span className="text-[#a54b4b] text-[20px]">Author(s):</span>{" "}
              {book.author}
            </p>
            <p>
              <span className="text-[#a54b4b] text-[20px]">Title: </span>
              {book.title}
            </p>
            <div className="flex gap-[10px]">
              <button className="border p-[10px] bg-[#2e5c2e]">
                About Book
              </button>
              <a href={book.bookPDF}>
                <button className="border p-[10px] bg-[#2e5c2e]">Read</button>
              </a>
            </div>
          </div>
        ))}
    </div>
    <div>
      <img src="/images/laser-gun.png" alt="" className="w-[100px] absolute top-[350px] left-[70px] animate-bounce"/>
    <img src="/images/space.png" alt="" className="w-[100px] absolute top-[240px] right-[70px] animate-bounce"/>
    <img src="/images/laser-gun2.png" alt="" className="w-[100px] absolute top-[980px] right-[700px] animate-bounce"/>
    <img src="/images/laser-gun3.png" alt="" className="w-[100px] absolute top-[1500px] right-[40px] animate-bounce"/>
    <img src="/images/sci-fi.png" alt="" className="w-[100px] absolute top-[1900px] left-[40px] animate-bounce"/>
  
    </div>
    
   
    </>
   
  );
};

export default Science;
