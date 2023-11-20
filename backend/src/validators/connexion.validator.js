const Joi = require("joi");

const schemaConnexion = Joi.object({
  nickname: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(8).required(),
});
module.exports = schemaConnexion;
