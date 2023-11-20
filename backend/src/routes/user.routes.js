const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userControllers");
const hashPassword = require("../middlewares/hashPassword");

router.put("/newpassword", hashPassword, userControllers.updatePassword);
router.put("/update", userControllers.update);
router.delete("/:userId", userControllers.removeOneUser);

module.exports = router;
