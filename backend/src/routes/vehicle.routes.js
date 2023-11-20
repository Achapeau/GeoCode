const express = require("express");

const vehicleRoutes = express.Router();

const vehicleControllers = require("../controllers/vehicleControllers");

vehicleRoutes.get("/vehicle-brands", vehicleControllers.browseBrands);
vehicleRoutes.get(
  "/vehicle-models/:brandId",
  vehicleControllers.readModelsByBrand
);
vehicleRoutes.get("/owned-vehicles/:id", vehicleControllers.readUserVehicles);
vehicleRoutes.delete("/:vehicleUserId", vehicleControllers.destroyUserVehicle);
vehicleRoutes.post("/", vehicleControllers.addUserVehicle);

module.exports = vehicleRoutes;
