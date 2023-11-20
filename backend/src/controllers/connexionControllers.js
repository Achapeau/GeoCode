const { createOne } = require("../models/userManager");
const { verify } = require("../helpers/hashingHelper");
const { encodeJWT } = require("../helpers/jwtHelper");

const signIn = async (req, res) => {
  const passwordVerif = await verify(req.user.password, req.body.password);

  if (!passwordVerif) {
    res.sendStatus(404);
  } else {
    delete req.user.password;

    const token = encodeJWT(req.user);

    res.cookie("auth_token", token, { httpOnly: true, secure: false });
    res.status(200).json(req.user);
  }
};

const signUp = async (req, res) => {
  createOne(req.body)
    .then(([result]) => {
      if (result.affectedRows) {
        delete req.body.password;
        delete req.body.passwordConfirm;

        req.body.id = result.insertId;
        const token = encodeJWT(req.body);
        res.cookie("auth_token", token, { httpOnly: true, secure: false });

        res.status(201).json({ id: result.insertId, ...req.body });
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("controlleur");
    });
};

const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = {
  signIn,
  signUp,
  logout,
};
