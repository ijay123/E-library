import Joi from "joi";

export const createBookListSchema = Joi.object({
  title: Joi.string().required(),
  publisher: Joi.string().required(),
  author: Joi.string().required(),
  categoryId: Joi.string().required(),
  desc: Joi.string(),
  bookImage: Joi.string(),
  bookPDF: Joi.string(),
  userId: Joi.string().required(),
});


