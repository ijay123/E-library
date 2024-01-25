import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../Spinner/CustomSpinner";
import { toast } from "react-toastify";
import {
  CREATE_BOOKS_CLEAR_ERROR,
  CREATE_BOOKS_RESET,
} from "../../../redux/constants/books";
import {
  createBookAction,
  imageUploadAction,
} from "../../../redux/action/books";
import { getCategoriesAction } from "../../../redux/action/category";

const AdminBooks = () => {
  const dispatch = useDispatch();
  const {
    createdCategory: { error, book, success, loading },
    getCategories: { categories },
    imageUpload: { imageUrl, success: imageSuccess, loading: imageLoading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;
  const [selectedFile, setSelectedFile] = useState(null);

  const [value, setValue] = useState({
    title: "",
    author: "",
    categoryId: "",
    bookImage: selectedFile,
    publisher: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  const handleChange = (event) => {
    const { name } = event.target;
    setValue({ ...value, [name]: event.target.value });
    console.log(event.target?.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    if (success) {
      toast.success(`successfully added book`);
      dispatch({ type: CREATE_BOOKS_RESET });
    }

    if (imageSuccess) {
      toast.success(`successfully added image`);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_BOOKS_CLEAR_ERROR);
      }, 3000);
    }
    dispatch(getCategoriesAction());
  }, [success, error, dispatch, imageSuccess]);

  async function bookHandler() {
    dispatch(createBookAction(value), imageUploadAction(selectedFile));
  }

  return (
    <div className="w-[70vw] h-[100vh] top-[5vw] absolute right-0 bg-[grey]">
      <form className="border w-[450px] p-[30px] text-[#591d1d] m-auto mt-[100px] rounded-[10px]">
        <p className="text-[green] text-[40px] mb-[50px]"> Create Book List</p>

        <p>Title</p>
        <input
          type="text"
          onChange={handleChange}
          placeholder=""
          className="w-[100%] p-[10px] mb-[20px] outline-none"
        />
        <p>Publisher</p>
        <input
          type="text"
          onChange={handleChange}
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />
        <p>Author</p>
        <input
          type="text"
          onChange={handleChange}
          className="w-[100%] p-[10px]  mb-[20px] outline-none"
        />

        <p>Select Category</p>
        <select className="mb-[30px] w-[50%] p-[5px]">
          {categories
            ? categories.map((cat, id) => (
                <option key={id} value={cat.id}>
                  {cat.category}
                </option>
              ))
            : ""}
        </select>

        <input
          type="file"
          name="bookImage"
          onChange={handleFileChange}
          placeholder="Search books..."
        />

        {loading && imageLoading ? (
          <Spinner />
        ) : (
          <button
            onClick={bookHandler}
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
// title: data.title,
// publisher: data.publisher,
// author: data.author,
// categoryId: data.categoryId,
// bookImage: data.bookImage,
// bookPDF: data.bookPDF,
// userId: data.userId,
