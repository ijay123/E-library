import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_CLEAR_ERROR,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
} from "../../../redux/constants/category";
import {
  createCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "../../../redux/action/category";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner/CustomSpinner";

const AdminCategory = () => {
  const dispatch = useDispatch();
  const {
    createdCategory: { error, category, success, loading },
    getCategories: { categories },
    updateCategory: {
      category: updatedCat,
      success: updatedSuccess,
      loading: updatedLoading,
    },
    deleteCategory: { success: successDelete, loading: loadingDelete },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
    ? JSON.parse(localStorage.getItem("libraryUserInfo"))
    : null;

  console.log(categories, "category");

  const [value, setValue] = useState({
    category: "",
    userId: userInfoFromLocalStorage?.data?._id,
  });

  const [editCategory, setEditCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openEditCategory, setOpenEditCategory] = useState(false);

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

    if (updatedSuccess) {
      //reset
      dispatch({ type: UPDATE_CATEGORY_RESET });
      dispatch(getCategoriesAction());
      setCategoryId("");
      setOpenEditCategory(false);
      setEditCategory("");
    }
    if (successDelete) {
      dispatch({ type: DELETE_CATEGORY_RESET });
      dispatch(getCategoriesAction());
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch(CREATE_CATEGORY_CLEAR_ERROR);
      }, 3000);
    }

    dispatch(getCategoriesAction());
  }, [success, updatedSuccess, successDelete, error, dispatch, category]);

  async function categoryHandler() {
    dispatch(createCategoryAction(value));
  }
  async function updateHandler(id) {
    dispatch(updateCategoryAction(id, editCategory));
  }
  async function deleteHandler(id) {
    setCategoryId(id);
    dispatch(deleteCategoryAction(id));
  }

  const toggleEditHandler = (id) => {
    setCategoryId(id);
    setOpenEditCategory(true);
  };

  const canceUpdateHandler = () => {
    setCategoryId("");
    setOpenEditCategory(false);
    setEditCategory("");
  };

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
      <div className="bg-white w-[400px]  rounded-[7px] p-[30px]">
        <p className="text-[25px] text-[red]">All Categories</p>
        {categories
          ? categories.map((catList, id) => (
              <ul key={id} className="list-disc text-[20px]">
                <li className="mb-[30px]">
                  {catList.category}
                  {openEditCategory && categoryId === catList._id && (
                    <div>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      />
                      {updatedLoading ? (
                        <span>Loading...</span>
                      ) : (
                        <button onClick={() => updateHandler(catList._id)}>
                          Save
                        </button>
                      )}

                      <button onClick={() => canceUpdateHandler()}>
                        cancel
                      </button>
                    </div>
                  )}

                  {!openEditCategory && (
                    <button
                      onClick={() => toggleEditHandler(catList._id)}
                      className=" p-[4px] bg-[green] text-white rounded-[4px] text-[18px] ml-[40px] mr-[10px]"
                    >
                      Update
                    </button>
                  )}
                  {loadingDelete && categoryId === catList._id ? (
                    <Spinner />
                  ) : (
                    <button
                      onClick={() => deleteHandler(catList._id)}
                      className=" p-[4px] bg-[green] text-white rounded-[4px] text-[18px]"
                    >
                      Delete
                    </button>
                  )}
                </li>
              </ul>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AdminCategory;
