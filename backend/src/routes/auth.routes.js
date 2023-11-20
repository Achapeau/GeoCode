const express = require("express");

const router = express.Router();

const {
  signIn,
  signUp,
  logout,
} = require("../controllers/connexionControllers");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const checkUserExists = require("../middlewares/checkUserExist");
const validateConnexion = require("../middlewares/connexion.validate");
const validateInscription = require("../middlewares/inscription.validate");
const hashPassword = require("../middlewares/hashPassword");

router.post("/signin", validateConnexion, checkUserExists, signIn);
router.post(
  "/signup",
  validateInscription,
  checkUserDoesntExists,
  hashPassword,
  signUp
);

router.get("/logout", logout);

module.exports = router;
