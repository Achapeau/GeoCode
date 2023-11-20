const database = require("./index");

const table = "item";

const findAll = () => {
  return database.query(`select * from  ${table}`);
};

const findOne = (id) => {
  return database.query(`select * from ${table} where id = ?`, [id]);
};

const insertOne = (item) => {
  return database.query(`insert into ${table} (title) values (?)`, [
    item.title,
  ]);
};

const updateOne = (item) => {
  return database.query(`update ${table} set title = ? where id = ?`, [
    item.title,
    item.id,
  ]);
};

const removeOne = (id) => {
  return database.query(`delete from ${table} where id = ?`, [id]);
};

module.exports = { findAll, findOne, insertOne, updateOne, removeOne };
