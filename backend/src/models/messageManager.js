const database = require("./index");

const getAllTypes = () => {
  const query = `SELECT id, name FROM message_type`;

  return database.query(query);
};

const getAllMessages = () => {
  const query = `SELECT m.id messageId, m.user_id userId, m.type_id typeId, m.content, m.opened , m.received, u.nickname authorNickname, u.email authorEmail, mt.name type FROM message m JOIN user u ON u.id = m.user_id JOIN message_type mt ON mt.id = m.type_id ORDER BY m.received DESC`;

  return database.query(query);
};

const postOne = (userId, subject, message) => {
  const query = `INSERT INTO message (user_id, type_id, content) VALUES (?,(SELECT id FROM message_type WHERE name = ?),?)`;

  return database.query(query, [userId, subject, message]);
};

const updateRead = (read, id) => {
  const query = `UPDATE message SET opened = ? WHERE id = ?`;

  return database.query(query, [read, id]);
};

const removeOne = (id) => {
  const query = `DELETE FROM message WHERE id = ?`;

  return database.query(query, [id]);
};

module.exports = {
  getAllTypes,
  getAllMessages,
  postOne,
  updateRead,
  removeOne,
};
