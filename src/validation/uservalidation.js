const joi = require('joi');

const registerValidation = joi.object({
  firstname: joi.string().empty().min(4).max(50)
    .required(),
  lastname: joi.string().empty().min(4).max(50)
    .required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'co'] } }).empty().min(4)
    .max(50)
    .empty()
    .required(),
  username: joi.string().empty().alphanum().min(4)
    .max(50)
    .required(),
  password: joi.string().empty().min(4).max(70)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const loginValidation = joi.object({
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'co'] } }).empty().min(4)
    .max(50)
    .required(),
  username: joi.string().empty().alphanum().min(4)
    .max(50)
    .required(),
  password: joi.string().empty().min(4).max(70)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

module.exports = {
  registerValidation,
  loginValidation,
};
