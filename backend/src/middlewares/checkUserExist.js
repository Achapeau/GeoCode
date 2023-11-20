const { findOneByUser } = require("../models/userManager");

const checkUserExists = async (req, res, next) => {
  const [user] = await findOneByUser(req.body.nickname);

  if (!user.length) {
    return res.status(400).json({ message: "User doesn't exists" });
  }
  [req.user] = user;
  return next();
};

module.exports = checkUserExists;
