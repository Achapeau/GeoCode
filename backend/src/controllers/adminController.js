const {
  numberOfUser,
  numberOfVehicle,
  numberOfSation,
  numberOfUsersLast7Days,
  insertVersion,
  lastDbVersion,
  findStations,
  findFilteredStations,
  updateStation,
  vehiclesList,
  updateVehicle,
  removeOne,
  destroyStationById,
  findFilteredStationsWithoutPrise,
  usersList,
  userVehicle,
  updateUser,
  removeOneUser,
} = require("../models/adminManager");

const getTotalNumberOfUsers = async (req, res) => {
  try {
    const [[result]] = await numberOfUser();
    res.json(result.c);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite au niveau du controlleur et des utilisateurs(all)",
    });
  }
};

const getTotalNumberOfVehicles = async (req, res) => {
  try {
    const [[result]] = await numberOfVehicle();
    res.json(result.c);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite au niveau du controlleur et des vehicules(all)",
    });
  }
};

const getTotalNumberOfStations = async (req, res) => {
  try {
    const [[result]] = await numberOfSation();
    res.json(result.c);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite au niveau du controlleur et des stations(all)",
    });
  }
};

const getNumberOfUsersLast7Days = async (req, res) => {
  try {
    const [[result]] = await numberOfUsersLast7Days();

    res.json(result.c);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite au niveau du controlleur et des utilisateurs(7)",
    });
  }
};

const insertDbVersion = (req, res) => {
  insertVersion(req.body.version)
    .then(() => {
      res.status(201).send("Insertion réussie");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur d'insertion");
    });
};

const getLatestDbVersion = async (req, res) => {
  try {
    const [result] = await lastDbVersion();
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite au niveau du controlleur et de la latest deb version",
    });
  }
};

const browseStation = async (req, res) => {
  try {
    const [result] = await findStations();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseFilteredStations = async (req, res) => {
  try {
    const priseAtZero = (currentValue) => currentValue === 0;
    const prise = [
      req.body.priseType2,
      req.body.priseTypeEF,
      req.body.priseTypeComboCCS,
      req.body.priseTypeChademo,
      req.body.priseTypeAutre,
    ];
    if (prise.every(priseAtZero)) {
      try {
        const [result] = await findFilteredStationsWithoutPrise(req.body);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    } else {
      const [result] = await findFilteredStations(req.body);
      res.send(result);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateStationsById = async (req, res) => {
  try {
    const data = req.body;
    await updateStation(data);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const deleteStationById = async (req, res) => {
  try {
    const { id } = req.params;
    await destroyStationById(id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getVehicleList = (req, res) => {
  vehiclesList()
    .then(([rows]) => {
      if (rows === null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur d'insertion");
    });
};

const updateOneVehicle = (req, res) => {
  const data = req.body;
  updateVehicle(data)
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(200);
      } else {
        res.status(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const removeOneVehicle = (req, res) => {
  removeOne(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getUserList = (req, res) => {
  usersList()
    .then(([rows]) => {
      if (rows === null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur d'insertion");
    });
};
const getUserVehicles = (req, res) => {
  const id = req.body;
  userVehicle(id)
    .then(([rows]) => {
      if (rows === null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur d'insertion");
    });
};
const updateOneUser = (req, res) => {
  const data = req.body;
  updateUser(data)
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(200);
      } else {
        res.status(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};
const removeUserOne = (req, res) => {
  removeOneUser(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getTotalNumberOfUsers,
  getTotalNumberOfVehicles,
  getTotalNumberOfStations,
  getNumberOfUsersLast7Days,
  insertDbVersion,
  getLatestDbVersion,
  browseStation,
  browseFilteredStations,
  updateStationsById,
  deleteStationById,
  getVehicleList,
  updateOneVehicle,
  removeOneVehicle,
  getUserList,
  getUserVehicles,
  updateOneUser,
  removeUserOne,
};
