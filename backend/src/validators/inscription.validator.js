const Joi = require("joi");

const schemaInscription = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(8).required(),

  passwordConfirm: Joi.ref("password"),

  birthdate: Joi.date().required(),

  email: Joi.string().email().required(),
});
module.exports = schemaInscription;
