import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_CLEAR_ERROR,
} from "../../../redux/constants/category";
import {
  createCategoryAction,
  getCategoriesAction,
} from "../../../redux/action/category";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner/CustomSpinner";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const {
    createdCategory: { error, category, success, loading },
    getCategories: {categories}
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;

console.log(categories, 'category')

  const [value, setValue] = useState({
    category: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  const handleChange = (event) => {
    const { name } = event.target;
    setValue({ ...value, [name]: event.target.value });
    console.log(event.target?.value);
  };

  useEffect(() => {
    if (success) {
      toast.success(`successfully added category ${category.category}`);
      dispatch({ type: CREATE_CATEGORY_RESET });
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_CATEGORY_CLEAR_ERROR);
      }, 3000);
    }

    dispatch(getCategoriesAction());

  }, [success, error, dispatch, category]);

  async function categoryHandler() {
    dispatch(createCategoryAction(value));
  }

  return (
    <div className="w-[70vw] h-[100vh] top-[5vw] absolute right-0 bg-[grey] justify-center pt-[200px] flex gap-[70px]">
      <div>
        <form className="border w-[400px] flex flex-col m-auto p-[20px] rounded-[7px]">
          <div className="mb-[40px]">
            {" "}
            <p className="mb-[20px] text-[#591d1d]">Input Category</p>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Category"
              className="w-[100%] p-[10px]"
            />
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              onClick={categoryHandler}
              className="text-white p-[5px] rounded-[5px] bg-[green]"
            >
              Add Category
            </button>
          )}
        </form>
      </div>

      {/* display screen */}
      <div className="bg-white w-[300px] h-[300px] rounded-[7px] p-[30px]">
        <p className="text-[25px] text-[red]">All Categories</p>
        {categories
          ? categories.map((catList, id) => (
              <ul key={id} className="list-disc text-[20px]">
                <li>{catList.category}</li>
              </ul>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AdminCategory;
