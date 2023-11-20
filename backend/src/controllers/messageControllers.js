const {
  getAllTypes,
  getAllMessages,
  postOne,
  updateRead,
  removeOne,
} = require("../models/messageManager");

const browseTypes = async (req, res) => {
  try {
    const [result] = await getAllTypes();
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const browseMessages = async (req, res) => {
  try {
    const [result] = await getAllMessages();
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const add = async (req, res) => {
  try {
    const { userId, subject, message } = req.body;
    const [result] = await postOne(userId, subject, message);

    res.status(201).send({ ...req.body, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const editRead = async (req, res) => {
  try {
    const { opened } = req.body;
    const { id } = req.params;

    const [result] = await updateRead(opened ? 1 : 0, id);
    res.status(201).send({ ...req.body, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await removeOne(id);
    res.status(201).send({ ...req.body, insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
module.exports = { browseTypes, browseMessages, add, editRead, destroy };
