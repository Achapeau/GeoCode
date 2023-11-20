const database = require("./index");

const vehicle = "vehicle";
const vehicleUser = "vehicle_user";
const vehicleBrand = "vehicle_brand";

const getBrands = () => {
  return database.query(`select vb.id, vb.name from ${vehicleBrand} vb`);
};

const getVehicleByBrandId = (brandId) => {
  return database.query(
    `select v.id vehicleId, vb.name brand, v.model, v.real_range realRange, v.power_consumption powerConsumption, v.battery_capacity batteryCapacity, v.charge_ef priseEf, v.charge_t2 priseT2, v.charge_combo_ccs priseCcs, v.charge_chademo priseChademo, v.charge_other priseAutre, v.vehicle_pic vehiclePic from ${vehicle} v join ${vehicleBrand} vb on v.brand_id = vb.id where v.brand_id = ?`,
    [brandId]
  );
};

const getVehicleByUserId = (id) => {
  return database.query(
    `select vu.id vehicleUserId, vu.user_id userId, vu.vehicle_id vehicleId, vu.serial, vb.name brand, v.model, v.charge_ef priseEf, v.charge_t2 priseT2, v.charge_combo_ccs priseCcs, v.charge_chademo priseChademo, v.charge_other priseAutre, v.vehicle_pic vehiclePic from ${vehicleUser} vu join ${vehicle} v on vu.vehicle_id = v.id join ${vehicleBrand} vb on v.brand_id = vb.id where vu.user_id = ?`,
    [id]
  );
};

const postVehicle = (userId, vehicleId, serial) => {
  return database.query(
    `insert into ${vehicleUser} (user_id, vehicle_id, serial) values (?,?,?)`,
    [userId, vehicleId, serial]
  );
};

const removeVehicle = (vehicleUserid) => {
  return database.query(`delete from ${vehicleUser} where id = ?`, [
    vehicleUserid,
  ]);
};

module.exports = {
  getBrands,
  getVehicleByBrandId,
  getVehicleByUserId,
  postVehicle,
  removeVehicle,
};
