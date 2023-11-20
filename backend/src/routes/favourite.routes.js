const express = require("express");

const router = express.Router();

const favouriteControllers = require("../controllers/favouriteControllers");

router.get("/:longitude/:latitude/:userId", favouriteControllers.read);
router.delete("/:stationId/:userId", favouriteControllers.destroy);
router.post("/", favouriteControllers.add);

module.exports = router;
