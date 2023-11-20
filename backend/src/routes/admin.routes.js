const express = require("express");

const router = express.Router();

const adminData = require("../controllers/adminController");
const authorization = require("../middlewares/authorization");
const checkRoles = require("../middlewares/checkRoles");
const upload = require("../middlewares/multer");
const importCsv = require("../middlewares/importCsv");

router.get("/dbversion", adminData.getLatestDbVersion);
router.get("/sevenDayUser", adminData.getNumberOfUsersLast7Days);
router.get("/stations", adminData.browseStation);
router.get("/totalStation", adminData.getTotalNumberOfStations);
router.get("/totalUser", adminData.getTotalNumberOfUsers);
router.get("/totalVehicle", adminData.getTotalNumberOfVehicles);
router.get("/user-list", adminData.getUserList);
router.get("/vehicle-list", adminData.getVehicleList);

router.post("/dbversion", adminData.insertDbVersion);
router.post(
  "/import-csv",
  authorization,
  checkRoles("admin"),
  upload.single("csv-File"),
  importCsv
);
router.post("/stations", adminData.browseFilteredStations);
router.post("/user-vehicle", adminData.getUserVehicles);

router.put("/stations", adminData.updateStationsById);
router.put("/update-vehicle", adminData.updateOneVehicle);
router.put("/update-user", adminData.updateOneUser);

router.delete("/remove-vehicle/:id", adminData.removeOneVehicle);
router.delete("/stations/:id", adminData.deleteStationById);
router.delete("/remove-user", adminData.removeUserOne);

module.exports = router;
