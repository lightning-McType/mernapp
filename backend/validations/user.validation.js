const Joi = require("joi");

const validateUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().required(),
  location: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  validateUserSchema,
  loginUserSchema,
};
