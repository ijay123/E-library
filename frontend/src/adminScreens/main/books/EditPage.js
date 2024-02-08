import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBooksAction } from "../../../redux/action/books";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner/CustomSpinner";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const dispatch = useDispatch();
  const {
    getBooks: { books },
  } = useSelector((state) => state);

  console.log(books, 'editbooks')
  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
  ? JSON.parse(localStorage.getItem("libraryUserInfo"))
  : null;

  const { id } = useParams();
  console.log(id, typeof id);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    desc: "",
    publisher: "",
    categoryId: "",
    bookImage: "",
    bookPDF: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  useEffect(() => {
    if (!books) {
      dispatch(getBooksAction());
    } else {
      const singleBook = books.find((book) => book._id === id);
      console.log(singleBook, 'singlebook')
      if (singleBook) {
        setFormData({
          title: singleBook.title ,
          author: singleBook.author ,
          desc: singleBook.desc ,
          publisher: singleBook.publisher,
          categoryId: singleBook.categoryId,
          bookImage: singleBook.bookImage,
          bookPDF: singleBook.bookPDF,
          userId: singleBook.userInfoFromLocalStorage?.data?._id,
        });
      }
    }
    console.log(books, 'sbook')
  }, [dispatch, books, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  return (
    <div className="w-[100vw] top-[5vw] absolute right-0 bg-[grey] justify-center pt-[60px] flex gap-[70px]">
      <form className="border w-[450px] mb-[50px] p-[30px] text-[#591d1d] m-auto mt-[50px] rounded-[10px]">
        <p className="text-[green] text-[40px] mb-[30px]"> Edit Book List</p>

        <p>Title</p>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-[100%] p-[10px] mb-[20px] outline-none"
        />

        <p>Author</p>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Description</p>
        <input
          type="text"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />
        <p>Publisher</p>
        <input
          type="text"
          value={formData.publisher}
          onChange={handleChange}
          name="publisher"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Category</p>
        <input
          type="text"
          value={formData.categoryId}
          onChange={handleChange}
          name="categoryId"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Add Image URL</p>
        <input
          type="text"
          name="bookImage"
          value={formData.bookImage}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Add Book PDF</p>
        <input
          type="text"
          name="bookPDF"
          value={formData.bookPDF}
          onChange={handleChange}
          placeholder="book URL"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        {/* <div className="flex gap-[20px]">
          <button className="border bg-[green] text-white px-[20px] py-[5px]">
            Edit
          </button>
          <button className="border bg-[green] text-white px-[20px] py-[5px]">
            Delete
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default EditPage;
