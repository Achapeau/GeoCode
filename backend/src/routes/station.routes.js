const express = require("express");

const router = express.Router();

const stationControllers = require("../controllers/stationControllers");

router.post("/station-list", stationControllers.browse);
router.post("/bornes-list", stationControllers.browseBorne);

module.exports = router;
