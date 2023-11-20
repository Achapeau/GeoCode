const schemaConnexion = require("../validators/message.validator");

const validateMessage = (req, res, next) => {
  const { error } = schemaConnexion.validate(req.body);
  if (error) {
    res.status(500).send(error.details[0].message);
  } else {
    next();
  }
};
module.exports = validateMessage;
