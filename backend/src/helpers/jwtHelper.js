const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = process.env;

const signOptions = { expiresIn: "1h" };

const encodeJWT = (payload) => {
  return jwt.sign(payload, TOKEN_SECRET, signOptions);
};

const decodeJWT = (token) => {
  try {
    const decodedPayload = jwt.verify(token, TOKEN_SECRET);
    return decodedPayload;
  } catch (error) {
    return null;
  }
};

module.exports = {
  encodeJWT,
  decodeJWT,
};
