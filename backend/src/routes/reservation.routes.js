const express = require("express");

const reservationControllers = require("../controllers/reservationControllers");

const router = express.Router();

router.post("/station-data", reservationControllers.getDataForReservation);
router.post("/create-reservation", reservationControllers.addOne);
router.post("/charge-point", reservationControllers.getOneChargePoint);
router.delete("/remove-reservation/:id", reservationControllers.deleteOne);
router.post("/:id", reservationControllers.readOne);

module.exports = router;
