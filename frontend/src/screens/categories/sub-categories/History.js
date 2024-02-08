import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../../redux/action/books";
import { getCategoriesAction } from "../../../redux/action/category";
import { Link } from "react-router-dom";

const History = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
    getCategories: { categories },
  } = useSelector((state) => state);

  console.log(books, "booksHistory");
  console.log(categories, "cat");

  // Find the category for "History"
  const historyCategory = Array.isArray(categories)
    ? categories.find((cat) => cat.category === "History")
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
    <>
    <div className="flex flex-wrap px-[70px] gap-[50px] items-center justify-center pt-[160px]">
      {filteredBooks &&
        filteredBooks.map((book) => (
          <div key={book._id} className="w-[200px] border text-[white] p-[5px]">
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
                <Link to={`/aboutBook/${book._id}`}><button className="border p-[10px] bg-[#2e5c2e]">About Book</button></Link>
                <a href={book.bookPDF}><button className="border p-[10px] bg-[#2e5c2e]">Read</button></a>
              </div>
          </div>
        ))}
      
    </div>
    <div>
      <img src="/images/black-history-month.png" className="w-[100px] absolute top-[290px] left-[110px] animate-bounce" alt=""/>
      <img src="/images/parchment.png" className="w-[100px] absolute top-[200px] right-[110px] animate-bounce" alt=""/>
      <img src="/images/black-history-month2.png" className="w-[100px] absolute top-[350px] left-[900px] animate-bounce" alt=""/>
      <img src="/images/indian.png" className="w-[100px] absolute top-[1090px] left-[50px] animate-bounce" alt=""/>
      <img src="/images/black-history-month4.png" className="w-[100px] absolute top-[1500px] right-[50px] animate-bounce" alt=""/>
    

     
    </div>
    </>
    
  );
};

export default History;
