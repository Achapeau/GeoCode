const database = require("./index");

const table = "station";

const insertStation = (handler, operator, brand, data) => {
  const query = `INSERT INTO ${table} (handler_id, operator_id, brand_id, id_station_itinerance, nom_station, adresse_station, nbre_pdc, puissance_nominale, prise_type_ef, prise_type_2, prise_type_combo_ccs, prise_type_chademo, prise_type_autre, gratuit, paiement_acte, paiement_cb, paiement_autre, condition_acces, reservation, horaires, date_mise_en_service, date_maj,  longitude, latitude) VALUES (
    (SELECT id FROM handler WHERE name = ?), (SELECT id FROM operator WHERE name = ?), (SELECT id FROM brand WHERE name = ?), ?)`;

  return database.query(query, [handler, operator, brand, data]);
};

const findDistance = (currentLatitude, currentLongitude, distance) => {
  const query = `SELECT s.id, b.name, s.nom_station, s.adresse_station, s.nbre_pdc, s.condition_acces, s.reservation , ST_Distance_Sphere(point(?,?), point(s.longitude, s.latitude))*0.001 AS distance FROM station s JOIN brand b ON s.brand_id = b.id   HAVING distance <= (?)  ORDER BY distance ASC ;`;

  return database.query(query, [currentLongitude, currentLatitude, distance]);
};

const findBorneWithDistance = (currentLatitude, currentLongitude) => {
  const query = `SELECT s.id,  b.name , s.nom_station, s.adresse_station, s.nbre_pdc, s.condition_acces, s.gratuit, s.condition_acces, s.reservation, s.longitude, s.latitude, ST_Distance_Sphere(point(?,?), point(s.longitude, s.latitude))*0.001 AS distance FROM station s JOIN brand b ON s.brand_id = b.id ORDER BY distance ASC LIMIT 1000;`;
  return database.query(query, [currentLongitude, currentLatitude]);
};

module.exports = {
  insertStation,
  findDistance,
  findBorneWithDistance,
};
