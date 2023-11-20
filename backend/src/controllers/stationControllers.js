const {
  findDistance,
  findBorneWithDistance,
} = require("../models/stationManager");

const browse = async (req, res) => {
  const { distance, latitude, longitude } = req.body;

  await findDistance(latitude, longitude, distance)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const browseBorne = (req, res) => {
  const [currentLatitude] = req.body;
  const [, currentLongitude] = req.body;

  findBorneWithDistance(currentLatitude, currentLongitude)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseBorne,
};
