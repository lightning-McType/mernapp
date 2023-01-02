const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(406).json(error);
  } else {
    next();
  }
};

module.exports = validate;