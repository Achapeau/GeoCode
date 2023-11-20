const {
  getById,
  insertOne,
  getStationData,
  getOne,
  getLastReservationData,
  removeOne,
} = require("../models/reservationManager");

const readOne = (req, res) => {
  const { latitude, longitude } = req.body;
  const { id } = req.params;

  getById(latitude, longitude, id)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getDataForReservation = (req, res) => {
  const { id } = req.body;
  getStationData(id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addOne = (req, res) => {
  const currentDate = new Date();
  const formatedDate = currentDate.toISOString().split("T")[0];

  const { vehiculeUserId, chargePointId, startTime, endTime, date, userId } =
    req.body;
  if (date >= formatedDate) {
    insertOne(vehiculeUserId, chargePointId, startTime, endTime, date, userId)
      .then(([rows]) => {
        if (rows[0] === null) {
          res.sendStatus(400);
        } else {
          res.status(201);
          getLastReservationData().then(([data]) => {
            if (data[0] === null) {
              res.sendStatus(404);
            } else {
              res.send(data[0]);
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
};

const getOneChargePoint = (req, res) => {
  const { stationId } = req.body;
  getOne(stationId)
    .then(([rows]) => {
      if (rows[0] === null) {
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deleteOne = (req, res) => {
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
module.exports = {
  readOne,
  addOne,
  getDataForReservation,
  getOneChargePoint,
  deleteOne,
};
