const schemaConnexion = require("../validators/connexion.validator");

const validateConnexion = (req, res, next) => {
  const connexionForm = req.body;
  const { error } = schemaConnexion.validate(connexionForm);
  if (error) {
    res.status(500).send(error.details[0].message);
  } else {
    next();
  }
};
module.exports = validateConnexion;
