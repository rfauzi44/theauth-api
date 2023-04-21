const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
valid = {};

valid.product = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().integer(),
  image: Joi.any(),
  id: Joi.any()
});

valid.register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().required().valid("male", "female"),
  password: joiPassword.string().min(5).noWhiteSpaces().required(),
});

valid.login = Joi.object({
  email: Joi.string().email().required(),
  password: joiPassword.string().min(5).noWhiteSpaces().required(),
});

module.exports = valid;
