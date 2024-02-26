import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../Spinner/CustomSpinner";
import { toast } from "react-toastify";
import {
  CREATE_BOOKS_CLEAR_ERROR,
  CREATE_BOOKS_RESET,
} from "../../../redux/constants/books";
import { createBookAction } from "../../../redux/action/books";
import { getCategoryAction } from "../../../redux/action/category";

const AdminBooks = () => {
  const dispatch = useDispatch();
  const {
    createdBook: { error, book, success, loading },
    getCategories: { categories },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;
  // const selectedId = () => {
  //   if (!!value.categoryId && value.categoryId !== "") {
  //     return categories.filter((cat) => cat._id === value.categoryId)[0].name;
  //   } else {
  //     return "";
  //   }
  // };

  const [value, setValue] = useState({
    title: "",
    author: "",
    categoryId: "",
    bookImage: "",
    bookPDF: "",
    desc: "",
    publisher: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (success) {
      toast.success(`successfully added book`);
      dispatch({ type: CREATE_BOOKS_RESET });
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_BOOKS_CLEAR_ERROR);
      }, 3000);
    }
    dispatch(getCategoryAction());
  }, [success, error, dispatch]);

  async function bookHandler(e) {
    e.preventDefault()
    dispatch(createBookAction(value));
  }

  return (
    <div className="w-[80vw] min-h-[100vh] top-[5vw] absolute right-0 bg-[grey]">
      <form className="border w-[450px] p-[30px] text-[#591d1d] m-auto mt-[50px] mb-[40px] rounded-[10px]">
        <p className="text-[green] text-[40px] mb-[30px]"> Create Book List</p>

        <p>Title</p>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="w-[100%] p-[10px] mb-[20px] outline-none"
        />

        <p>Author</p>
        <input
          type="text"
          name="author"
          placeholder="Author"
          onChange={handleChange}
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Description</p>
        <input
          type="text"
          name="desc"
          placeholder="Description"
          onChange={handleChange}
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />
        <p>Publisher</p>
        <input
          type="text"
          name="publisher"
          onChange={handleChange}
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Add Category</p>
        <select
          onChange={handleChange}
          value={value.categoryId}
          name="categoryId"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
        </select>

        <p>Add Image URL</p>
        <input
          type="text"
          name="bookImage"
          onChange={handleChange}
          placeholder="Image URL"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Add Book PDF</p>
        <input
          type="text"
          name="bookPDF"
          onChange={handleChange}
          placeholder="book URL"
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        {loading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            onClick={(e) => bookHandler(e)}
            className="p-[15px] w-[100%] bg-[green] rounded-[8px] text-white mt-[30px]"
          >
            Add Book
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminBooks;
