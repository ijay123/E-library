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



  useEffect(() => {
    if (!books) {
      dispatch(getBooksAction());
    }
  }, [dispatch, books]);

  const singleBook = books ? books.find((book) => book._id === id) : "";

  if (!singleBook) {
    return <div>Loading book details...</div>;
  }

  console.log(singleBook, "book");

  return (
    <div className="bg-[grey] text-[25px]">
     <h1 className="pt-[180px] text-[30px] flex justify-center text-[#a54b4b]">About Book</h1>
      <div className="flex pt-[100px]  text-white mx-[100px] pb-[50px]">
        <div className=" w-[300px] text-[20px]">
          <img src={singleBook.bookImage} className="flex justify-center mx-auto w-[100%]" alt="" />

          <p className="flex gap-[20px]">
            <span className="text-[green]">Title:</span> {singleBook.title}
          </p>
          <p className="flex gap-[20px]">
            <span className="text-[green]">Author:</span>
            {singleBook.author}
          </p>
          <p className="flex gap-[20px]">
            <span className="text-[green]">Publisher:</span>
            {singleBook.publisher}
          </p>
        </div>
        <div className="flex gap-[20px] pl-[150px]">
          <span className="text-[green]">Description:</span>
          {singleBook.desc}
        </div>
      </div>
    </div>
  );
};

export default AboutBook;
