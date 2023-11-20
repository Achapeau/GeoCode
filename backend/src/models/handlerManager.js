const database = require("./index");

const table = "handler";

const insertHandler = (data) => {
  const query = `INSERT INTO ${table} ( name, siren, contact) VALUES ?`;

  return database.query(query, [data]);
};

module.exports = { insertHandler };
