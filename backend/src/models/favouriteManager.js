const database = require("./index");

const getByUserId = (longitude, latitude, userId) => {
  const query = `SELECT f.id, f.user_id userId, f.station_id stationId, s.nom_station nomStation, s.adresse_station adresseStation, s.nbre_pdc nbrePdc, s.condition_acces conditionAcces, s.reservation, ST_Distance_Sphere(point(?,?), point(s.longitude, s.latitude))*0.001 distance, b.name brandName
  FROM geocode.favourite f 
  JOIN geocode.station s
  ON s.id = f.station_id 
  JOIN geocode.brand b 
  ON b.id = s.brand_id 
  WHERE user_id = ?`;

  return database.query(query, [longitude, latitude, userId]);
};

const postOne = (userId, stationId) => {
  const query = `INSERT INTO favourite (user_id, station_id) VALUES (?,?)`;

  return database.query(query, [userId, stationId]);
};

const removeOne = (stationId, userId) => {
  const query = `DELETE FROM favourite WHERE station_id = ? AND user_id = ?`;

  return database.query(query, [stationId, userId]);
};
module.exports = { getByUserId, postOne, removeOne };
