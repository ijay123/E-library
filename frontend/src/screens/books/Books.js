import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../../redux/action/books";

const Books = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
  } = useSelector((state) => state);

  console.log(books, "books");

  useEffect(() => {
    dispatch(getBooksAction());
  }, [dispatch]);

  return (
    <div className="pt-[100px] bg-[#959393]">
      <p className="text-[60px] text-[#9e3636] flex justify-center mb-[100px] mt-[70px]">
        All Books
      </p>
      <div className="flex flex-wrap gap-[50px] px-[100px] items-center justify-center">
        {books &&
          books.map((books, id) => (
            <div className=" w-[250px] text-[white] border p-[5px]" key={id}>
              <img src={books.bookImage} alt="" />
              <p>
                <span className="text-[#a54b4b] text-[20px]">Author(s):</span>{" "}
                {books.author}
              </p>
              <p>
                <span className="text-[#a54b4b] text-[20px]">Title: </span>
                {books.title}
              </p>
              <div className="flex gap-[10px]">
                <button className="border p-[10px] bg-[#2e5c2e]">About Book</button>
                <a href={books.bookPDF}><button className="border p-[10px] bg-[#2e5c2e]">Read</button></a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
