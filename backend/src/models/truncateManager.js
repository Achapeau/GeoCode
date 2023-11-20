const database = require("./index");

const truncateTables = async () => {
  const dropReservationFK = `ALTER TABLE geocode.reservation DROP FOREIGN KEY reservation_FK_1;`;
  const truncChargePoint = `TRUNCATE table charge_point;`;
  const createReservationFK = `ALTER TABLE geocode.reservation ADD CONSTRAINT reservation_FK_1 FOREIGN KEY (charge_point_id) REFERENCES geocode.charge_point(id) ON DELETE CASCADE ON UPDATE CASCADE;`;

  const dropChargePointFK = `ALTER TABLE geocode.charge_point DROP FOREIGN KEY charge_point_FK;`;
  const dropFavouriteFK = `ALTER TABLE geocode.favourite DROP FOREIGN KEY favourite_FK_1;`;
  const truncStation = `TRUNCATE table station;`;
  const createChargePointFK = `ALTER TABLE geocode.charge_point ADD CONSTRAINT charge_point_FK FOREIGN KEY (station_id) REFERENCES geocode.station(id) ON DELETE CASCADE ON UPDATE CASCADE;`;
  const createFavouriteFK = `ALTER TABLE geocode.favourite ADD CONSTRAINT favourite_FK_1 FOREIGN KEY (station_id) REFERENCES geocode.station(id) ON DELETE CASCADE ON UPDATE CASCADE;`;

  const dropStationFK0 = `ALTER TABLE geocode.station DROP FOREIGN KEY station_FK;`;
  const truncHandler = `TRUNCATE table handler;`;
  const createStationFK0 = `ALTER TABLE geocode.station ADD CONSTRAINT station_FK FOREIGN KEY (handler_id) REFERENCES geocode.handler(id) ON DELETE CASCADE ON UPDATE CASCADE;`;

  const dropStationFK1 = `ALTER TABLE geocode.station DROP FOREIGN KEY station_FK_1;`;
  const truncOperator = `TRUNCATE table operator;`;
  const createStationFK1 = `ALTER TABLE geocode.station ADD CONSTRAINT station_FK_1 FOREIGN KEY (operator_id) REFERENCES geocode.operator(id) ON DELETE CASCADE ON UPDATE CASCADE;`;

  const dropStationFK2 = `ALTER TABLE geocode.station DROP FOREIGN KEY station_FK_2;`;
  const truncBrand = `TRUNCATE table brand;`;
  const createStationFK2 = `ALTER TABLE geocode.station ADD CONSTRAINT station_FK_2 FOREIGN KEY (brand_id) REFERENCES geocode.brand(id) ON DELETE CASCADE ON UPDATE CASCADE;`;

  try {
    await database.query(dropReservationFK);
    await database.query(truncChargePoint);
    await database.query(createReservationFK);
    await database.query(dropChargePointFK);
    await database.query(dropFavouriteFK);
    await database.query(truncStation);
    await database.query(createChargePointFK);
    await database.query(createFavouriteFK);
    await database.query(dropStationFK0);
    await database.query(truncHandler);
    await database.query(createStationFK0);
    await database.query(dropStationFK1);
    await database.query(truncOperator);
    await database.query(createStationFK1);
    await database.query(dropStationFK2);
    await database.query(truncBrand);
    await database.query(createStationFK2);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { truncateTables };
