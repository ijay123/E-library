import Category from "../../model/category/categoryList.js";
import httpStatus from "http-status";

const createCategory = async (req, res) => {
  //collect the data from req body
  const data = req.body;
  const userId = req.user.id;

  const categoryExist = await Category.findOne({
    category: data.category,
    userId: data.userId,
  });
  console.log(categoryExist);
  if (categoryExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "category already exist",
    });
    return;
  }

  const createdCategory = await Category.create({
    category: data.category,
    userId: data.userId,
  });

  // const user = await Category.findOne({ _id: userId });
  //   user.tasks.push(task._id);
  //   await user.save();
  //   res.status(httpStatus.CREATED).json({
  //     status: "success",
  //     payload: task,
  //   });

  const newCategory = await Category.findOne({
    _id: createdCategory._id,
  }).populate("userId");

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: newCategory,
  });
};

const getCategories = async (req, res) => {
  const getCategory = await Category.find({});

  res.status(httpStatus.OK).json({
    status: "success",
    data: getCategory,
  });
};

// updated Category

const updateCategory = async (req, res) => {
  const { categoryTitle } = req.body;
  const { id } = req.params;
  const foundCategory = await Category.findOne({ _id: id });
  if (!foundCategory) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Category not found",
    });
  }
  const CategoryExist = await Category.findOne({ category: categoryTitle });
  if (CategoryExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Category already exist",
    });
    return;
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: id },
    { category: categoryTitle },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedCategory,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const foundCategory = await Category.findOne({ _id: id });
  if (!foundCategory) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "category not found",
    });
    return;
  }

  await Category.findByIdAndDelete({_id:id});

  res.status(httpStatus.OK).json({
    status: "success",
    data: `Category with ID ${id} is deleted`,
  });
};

export { createCategory, getCategories, updateCategory, deleteCategory };
