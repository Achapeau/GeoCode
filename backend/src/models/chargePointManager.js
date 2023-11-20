const database = require("./index");

const table = "charge_point";

const insertChargePoint = (station, chargePoint) => {
  const query = `INSERT INTO ${table} (station_id,serial) VALUES ((SELECT id FROM station WHERE id_station_itinerance = ?),?)`;

  return database.query(query, [station, chargePoint]);
};

module.exports = { insertChargePoint };
