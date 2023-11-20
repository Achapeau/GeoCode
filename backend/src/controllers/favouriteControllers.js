const {
  getByUserId,
  postOne,
  removeOne,
} = require("../models/favouriteManager");

const read = async (req, res) => {
  try {
    const { longitude, latitude, userId } = req.params;
    const [result] = await getByUserId(longitude, latitude, userId);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const add = async (req, res) => {
  try {
    const { userId, stationId } = req.body;
    const [result] = await postOne(userId, stationId);
    res.status(201).send({ ...req.body, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const destroy = async (req, res) => {
  try {
    const { stationId, userId } = req.params;
    const [result] = await removeOne(stationId, userId);
    res.status(204).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = { read, add, destroy };
