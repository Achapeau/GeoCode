const { hash } = require("../helpers/hashingHelper");

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password);

    req.body.password = hashedPassword;

    next();
  } catch (e) {
    res.status(500).send("hash");
  }
};

module.exports = hashPassword;
