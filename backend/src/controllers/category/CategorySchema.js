import Joi from "joi";

export const createCategorySchema = Joi.object({
  category: Joi.string(),
  userId: Joi.string().required(),
});
