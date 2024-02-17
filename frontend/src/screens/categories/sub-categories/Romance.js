import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../redux/action/category";
import { getBooksAction } from "../../../redux/action/books";
import { Link } from "react-router-dom";

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

  const [showFullAuthor, setShowFullAuthor] = useState(false);

  // Toggles between showing the full author name and the truncated version
  const toggleAuthorDisplay = () => {
    setShowFullAuthor(!showFullAuthor);
  };

  return (
    <>
    <div className="flex flex-wrap px-[70px] gap-[50px] items-center justify-center pt-[160px]">
      {filteredBooks &&
        filteredBooks.map((book) => (
          <div key={book._id} className="w-[200px] border text-[white] p-[5px]">
            <img src={book.bookImage} alt={`Cover of ${book.title}`} />
            <p>
      <span className="text-[#a54b4b] text-[20px]">Author(s):</span> 
      {/* Show either the full author name or the truncated version based on showFullAuthor state */}
      {showFullAuthor ? book.author : `${book.author.slice(0, 15)}...`}
      {/* Only show the clickable "..." when the full author name is not being displayed */}
      {!showFullAuthor && (
        <span onClick={toggleAuthorDisplay} className="cursor-pointer">
          more
        </span>
      )}
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
    <div className="">
    <img src="/images/balloons.png" className="w-[130px] absolute top-[200px] left-[50px] animate-bounce" alt=""/>

    <img src="/images/kiss.png" className="w-[130px] absolute top-[250px] right-[50px] animate-bounce" alt=""/>
    <img src="/images/gift.png" className="w-[130px] absolute top-[350px] right-[650px] animate-bounce" alt=""/>
    <img src="/images/bouquet.png" className="w-[130px] absolute top-[1050px] right-[50px] animate-bounce" alt=""/>
    </div>

    </>
    
  );
};

export default Romance;
