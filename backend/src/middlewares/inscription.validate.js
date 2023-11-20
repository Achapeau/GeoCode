const schemaInscription = require("../validators/inscription.validator");

const validateInscription = (req, res, next) => {
  const inscriptionForm = req.body;
  const { error } = schemaInscription.validate(inscriptionForm);
  if (error) {
    res.status(500).send(error.details[0].message);
  } else {
    next();
  }
};
module.exports = validateInscription;
