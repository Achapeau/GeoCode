const Joi = require("joi");

const schemaConnexion = Joi.object({
  subject: Joi.required(),
  userId: Joi.number().required(),
  message: Joi.string().min(4).required(),
});
module.exports = schemaConnexion;
