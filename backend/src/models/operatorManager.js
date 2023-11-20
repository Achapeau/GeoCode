const database = require("./index");

const table = "operator";

const insertOperator = (data) => {
  const query = `INSERT INTO ${table} (name, contact) VALUES ?`;

  return database.query(query, [data]);
};

module.exports = { insertOperator };
