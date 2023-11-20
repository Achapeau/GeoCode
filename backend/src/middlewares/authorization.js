const { decodeJWT } = require("../helpers/jwtHelper");

const authorization = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) res.sendStatus(500);

  const data = decodeJWT(token);
  req.user = data;

  next();
};

module.exports = authorization;
