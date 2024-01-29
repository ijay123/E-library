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
      <p className="text-[60px] text-[#9e3636] flex justify-center mb-[100px] mt-[70px]">All Books</p>
      <div className="flex flex-wrap gap-[50px] px-[100px] items-center justify-center">
        {books &&
          books.map((books, id) => (
            <div className="flex w-[250px] " key={id}>
              <img src={books.bookImage} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
