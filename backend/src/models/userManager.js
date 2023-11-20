const database = require("./index");

const table = "user";

const findOneByEmail = (email) => {
  return database.query(`select * from ${table} where email = ?`, [email]);
};

const findOneByUser = (user) => {
  return database.query(
    `select adress, birth_date birthdate, email, firstname, gender_id genderId, id, lastname, nickname username, profile_pic profilePic, register_date registerdate, roles, password from ${table} where nickname = ?`,
    [user]
  );
};

const createOne = ({ username, birthdate, email, password }) => {
  return database.query(
    `insert into ${table} (nickname, birth_date, email, password) values (?, ?, ?, ?)`,
    [username, birthdate, email, password]
  );
};

const updateOne = ({
  adress,
  birthdate,
  email,
  firstname,
  genderId,
  lastname,
  username,
  id,
}) => {
  return database.query(
    `update ${table} set adress = ?, birth_date = ?, email = ?, firstname = ?, gender_id = ?, lastname = ?, nickname = ? where id = ?`,
    [adress, birthdate, email, firstname, genderId, lastname, username, id]
  );
};

const updateOnePassword = ({ password, id }) => {
  return database.query(`update ${table} set password = ? where id = ?`, [
    password,
    id,
  ]);
};

const destroyOneUser = (id) => {
  return database.query(`delete from ${table} where id =?`, [id]);
};

module.exports = {
  findOneByUser,
  findOneByEmail,
  createOne,
  updateOne,
  updateOnePassword,
  destroyOneUser,
};
