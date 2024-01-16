import Joi from "joi";

export const createBookListSchema = Joi.object({
  title: Joi.string().required(),
  publisher: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  userId: Joi.string().required(),
});
