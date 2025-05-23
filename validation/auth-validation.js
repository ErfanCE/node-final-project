const Joi = require('joi');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;

const userSignupValidationSchema = Joi.object({
  firstname: Joi.string().required().min(3).max(30).trim(),
  lastname: Joi.string().required().min(3).max(30).trim(),
  username: Joi.string().required().email().lowercase().trim(),
  password: Joi.string().required().min(8).pattern(passwordRegex),
  phoneNumber: Joi.string().trim(),
  address: Joi.string().trim(),
  role: Joi.string().valid('ADMIN', 'USER').uppercase().trim()
});

const userLoginValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = { userSignupValidationSchema, userLoginValidationSchema };
