const {
  getBrands,
  getVehicleByBrandId,
  getVehicleByUserId,
  postVehicle,
  removeVehicle,
} = require("../models/vehicleManager");

const browseBrands = (req, res) => {
  getBrands()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readModelsByBrand = async (req, res) => {
  const { brandId } = req.params;

  await getVehicleByBrandId(brandId)
    .then(([rows]) => {
      if (rows.length) res.send(rows);
      else res.status(404).send({ message: "not found" });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readUserVehicles = async (req, res) => {
  const { id } = req.params;

  await getVehicleByUserId(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addUserVehicle = async (req, res) => {
  const { userId, vehicleId, serial } = req.body;

  await postVehicle(userId, vehicleId, serial)
    .then((rows) => {
      res.status(201).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroyUserVehicle = async (req, res) => {
  const { vehicleUserId } = req.params;

  await removeVehicle(vehicleUserId)
    .then((rows) => {
      res.status(204).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseBrands,
  readModelsByBrand,
  readUserVehicles,
  addUserVehicle,
  destroyUserVehicle,
};
