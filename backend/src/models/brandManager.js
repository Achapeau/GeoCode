const database = require("./index");

const table = "brand";

const insertBrand = (data) => {
  const query = `INSERT INTO ${table} (name) VALUES ?`;

  return database.query(query, [data]);
};

module.exports = { insertBrand };
