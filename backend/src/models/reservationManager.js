const database = require("./index");

const table = "station";

const getById = (currentLatitude, currentLongitude, id) => {
  const query = `SELECT s.id, b.name, s.nom_station, s.adresse_station, s.condition_acces, r.id  reservation_id, r.start_time, r.end_time, r.price, r.date, c.id  charge_point_id, c.serial, r.vehicle_user_id, v.user_id, u.id  user_id, ST_Distance_Sphere(point(?,?), point(s.longitude, s.latitude)) * 0.001  distance FROM ${table} s JOIN brand b ON s.brand_id = b.id JOIN charge_point c ON c.station_id = s.id JOIN reservation r ON r.charge_point_id = c.id JOIN vehicle_user v ON r.vehicle_user_id = v.id JOIN user u ON v.user_id = u.id WHERE  r.user_id = u.id AND u.id = (?) AND r.date >= CURDATE() HAVING distance <= 1000 ORDER BY distance ASC`;
  return database.query(query, [currentLongitude, currentLatitude, id]);
};

const getStationData = (id) => {
  const query = `SELECT s.id, cp.id as cpIdentifier , b.name, s.nom_station, s.adresse_station, s.nbre_pdc, s.condition_acces, s.reservation  FROM station s JOIN brand b ON s.brand_id = b.id JOIN charge_point cp ON s.id = cp.station_id WHERE s.id = ?`;

  return database.query(query, [id]);
};

const insertOne = (
  vehiculeId,
  chargePointId,
  startTime,
  endTime,
  date,
  userId
) => {
  const query = `INSERT INTO reservation (vehicle_user_id, charge_point_id, start_time, end_time,  date, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  return database.query(query, [
    vehiculeId,
    chargePointId,
    startTime,
    endTime,
    date,
    userId,
  ]);
};

const getOne = (stationId) => {
  const query = `select cp.id from charge_point cp join station on cp.station_id = station_id where station_id  = ? limit 1;`;
  return database.query(query, [stationId]);
};

const getLastReservationData = () => {
  const query = `SELECT r.date, r.start_time, r.price, r.user_id, r.charge_point_id, cp.serial, s.nom_station FROM reservation r JOIN charge_point cp ON cp.id = r.charge_point_id JOIN station s ON s.id = cp.station_id WHERE r.id = (SELECT MAX(id)FROM reservation)`;
  return database.query(query);
};

const removeOne = (id) => {
  const query = `DELETE FROM reservation WHERE id = ?`;
  return database.query(query, [id]);
};

module.exports = {
  getById,
  insertOne,
  getStationData,
  getOne,
  getLastReservationData,
  removeOne,
};
