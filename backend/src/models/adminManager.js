const database = require("./index");

const formattedDate = new Date(
  Date.now() - 7 * 24 * 60 * 60 * 1000
).toISOString();

const numberOfUser = () => {
  return database.query("select count(*) c from user");
};

const numberOfVehicle = () => {
  return database.query("select count(*) c from vehicle");
};

const numberOfSation = () => {
  return database.query("select count(*) c from station");
};

const numberOfUsersLast7Days = () => {
  return database.query(`
  SELECT COUNT(*) c
  FROM user
  WHERE register_date >= '${formattedDate}';
`);
};

const insertVersion = (version) => {
  return database.query("insert into dbversion (version) values (?)", [
    version,
  ]);
};

const lastDbVersion = () => {
  return database.query("select * from dbversion order by id desc limit 1");
};

const findStations = () => {
  const query = `SELECT s.id, s.nom_station nomStation, b.name bName, o.name oName, h.name hName, s.adresse_station adressStation , s.prise_type_2 priseType2, s.prise_type_ef priseTypeEF, s.prise_type_combo_ccs priseTypeComboCCS, s.prise_type_chademo priseTypeChademo, s.prise_type_autre priseTypeAutre, s.nbre_pdc nbrePdc, s.puissance_nominale puissanceNominale, s.condition_acces conditionAcces, s.reservation, s.date_mise_en_service dateCreation, s.date_maj dateMaj, s.longitude, s.latitude FROM station s JOIN brand b on b.id = s.brand_id JOIN handler h ON h.id = s.handler_id JOIN operator o ON o.id = s.operator_id ORDER BY dateMaj DESC LIMIT 100;`;
  return database.query(query);
};

const findFilteredStations = ({
  nomStation,
  bName,
  adressStation,
  priseType2,
  priseTypeEF,
  priseTypeComboCCS,
  priseTypeChademo,
  priseTypeAutre,
}) => {
  const query = `SELECT s.id, s.nom_station nomStation, b.name bName, o.name oName, h.name hName, s.adresse_station adressStation , s.prise_type_2 priseType2, s.prise_type_ef priseTypeEF, s.prise_type_combo_ccs priseTypeComboCCS, s.prise_type_chademo priseTypeChademo, s.prise_type_autre priseTypeAutre, s.nbre_pdc nbrePdc, s.puissance_nominale puissanceNominale, s.condition_acces conditionAcces, s.reservation, s.date_mise_en_service dateCreation, s.date_maj dateMaj, s.longitude, s.latitude FROM station s JOIN brand b on b.id = s.brand_id JOIN handler h ON h.id = s.handler_id JOIN operator o ON o.id = s.operator_id WHERE s.nom_station LIKE ? AND b.name LIKE ? AND s.adresse_station LIKE ? AND s.prise_type_2 = ? AND s.prise_type_ef = ? AND s.prise_type_combo_ccs = ? AND s.prise_type_chademo = ? AND s.prise_type_autre = ? ORDER BY s.date_maj DESC;`;
  return database.query(query, [
    nomStation,
    bName,
    adressStation,
    priseType2,
    priseTypeEF,
    priseTypeComboCCS,
    priseTypeChademo,
    priseTypeAutre,
  ]);
};

const findFilteredStationsWithoutPrise = ({
  nomStation,
  bName,
  adressStation,
}) => {
  const query = `SELECT s.id, s.nom_station nomStation, b.name bName, o.name oName, h.name hName, s.adresse_station adressStation , s.prise_type_2 priseType2, s.prise_type_ef priseTypeEF, s.prise_type_combo_ccs priseTypeComboCCS, s.prise_type_chademo priseTypeChademo, s.prise_type_autre priseTypeAutre, s.nbre_pdc nbrePdc, s.puissance_nominale puissanceNominale, s.condition_acces conditionAcces, s.reservation, s.date_mise_en_service dateCreation, s.date_maj dateMaj, s.longitude, s.latitude FROM station s JOIN brand b on b.id = s.brand_id JOIN handler h ON h.id = s.handler_id JOIN operator o ON o.id = s.operator_id WHERE s.nom_station LIKE ? AND b.name LIKE ? AND s.adresse_station LIKE ?  ORDER BY s.date_maj DESC;`;
  return database.query(query, [nomStation, bName, adressStation]);
};

const updateStation = (data) => {
  const query = `UPDATE station s SET s.nom_station = ?, s.adresse_station = ?, s.date_maj = ?, s.brand_id = (SELECT id FROM brand WHERE name = ?), s.operator_id =(SELECT id FROM operator WHERE name = ?), s.handler_id = (SELECT id FROM handler WHERE name = ?), s.condition_acces = ?, s.reservation = ?, s.date_mise_en_service = ?, s.nbre_pdc = ?, s.longitude = ?, s.latitude = ?, s.puissance_nominale = ?, s.prise_type_2 = ?, s.prise_type_ef = ?, s.prise_type_combo_ccs = ?, s.prise_type_chademo = ?, s.prise_type_autre = ? where id = ?;`;
  return database.query(query, [
    data.nomStation,
    data.adressStation,
    data.dateMaj,
    data.bName,
    data.oName,
    data.hName,
    data.conditionAcces,
    data.reservation,
    data.dateCreation,
    data.nbrePdc,
    data.longitude,
    data.latitude,
    data.puissanceNominale,
    data.priseType2,
    data.priseTypeEF,
    data.priseTypeComboCCS,
    data.priseTypeChademo,
    data.priseTypeAutre,
    data.id,
  ]);
};

const destroyStationById = (id) => {
  const query = `DELETE FROM station where id = ?`;
  return database.query(query, [id]);
};
const vehiclesList = () => {
  const query = `select  model, real_range, power_consumption, battery_capacity, charge_ef, charge_t2, charge_combo_ccs, charge_other, charge_chademo, vehicle_pic, vb.name brandName, brand_id, v.id from vehicle v join vehicle_brand vb on vb.id = v.brand_id`;
  return database.query(query);
};

const updateVehicle = (data) => {
  const query = `UPDATE vehicle  v JOIN vehicle_brand vb ON vb.id = v.brand_id SET  v.model = ?, v.real_range = ?, v.power_consumption = ?, v.battery_capacity = ?, v.charge_ef = ?, v.charge_t2 = ?, v.charge_combo_ccs = ?, vb.name = ? WHERE v.id = ?;`;
  return database.query(query, [
    data.model,
    data.realRange,
    data.powerConsumption,
    data.batteryCapacity,
    data.chargeEf,
    data.chargeT2,
    data.chargeComboCcs,
    data.brandName,
    data.vehicleId,
  ]);
};
const removeOne = (id) => {
  const query = `DELETE FROM vehicle WHERE id = ?`;
  return database.query(query, [id]);
};

const usersList = () => {
  return database.query(
    "select u.id, u.firstname, u.lastname, u.nickname, u.email, u.gender_id, u.adress, u.birth_date, u.register_date, u.profile_pic, u.roles from user u "
  );
};

const userVehicle = ({ id }) => {
  return database.query(
    "select u.id, v.model, vu.serial from user u join vehicle_user vu on vu.user_id = u.id join vehicle v on vu.vehicle_id = v.id where u.id = ?",
    [id]
  );
};
const updateUser = ({
  firstname,
  lastname,
  nickname,
  email,
  adress,
  birthdate,
  registerDate,
  genderId,
  roles,
  userId,
}) => {
  const query = `UPDATE user u SET  u.firstname = ?,u.lastname = ?, u.nickname = ?, u.email = ?, u.adress = ?, u.birth_date = ?, u.register_date = ?, u.gender_id = ?, u.roles= ? WHERE u.id = ?;`;
  return database.query(query, [
    firstname,
    lastname,
    nickname,
    email,
    adress,
    birthdate,
    registerDate,
    genderId,
    roles,
    userId,
  ]);
};
const removeOneUser = (id) => {
  const query = `DELETE FROM user WHERE id = ?`;
  return database.query(query, [id]);
};
module.exports = {
  numberOfUser,
  numberOfSation,
  numberOfVehicle,
  numberOfUsersLast7Days,
  insertVersion,
  lastDbVersion,
  findStations,
  findFilteredStations,
  findFilteredStationsWithoutPrise,
  updateStation,
  destroyStationById,
  vehiclesList,
  updateVehicle,
  removeOne,
  usersList,
  userVehicle,
  updateUser,
  removeOneUser,
};
