import { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import expressApi from "../../service/expressAPI";

function ManageVehiclesCard({ vehiclePic, vehicle, deleteVehicle }) {
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    brandName: vehicle.brandName,
    model: vehicle.model,
    realRange: vehicle.real_range,
    batteryCapacity: vehicle.battery_capacity,
    chargeComboCcs: vehicle.charge_combo_ccs,
    chargeT2: vehicle.charge_t2,
    chargeEf: vehicle.charge_ef,
    powerConsumption: vehicle.power_consumption,
    vehicleId: vehicle.id,
  });
  const handleChangeBrand = (e) => {
    setFormData({ ...formData, brandName: e.target.value });
  };
  const handleChangeModel = (e) => {
    setFormData({ ...formData, model: e.target.value });
  };
  const handleChangeBattery = (e) => {
    setFormData({
      ...formData,
      batteryCapacity: e.target.value,
    });
  };
  const handleChangeAutonomi = (e) => {
    setFormData({ ...formData, realRange: e.target.value });
  };
  const handleChangeCombo = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setFormData({ ...formData, chargeComboCcs: newValue });
  };
  const handleChangeT2 = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setFormData({ ...formData, chargeT2: newValue });
  };
  const handleChangeEf = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setFormData({ ...formData, chargeEf: newValue });
  };
  const handleChangeConsumption = (e) => {
    setFormData({ ...formData, powerConsumption: e.target.value });
  };

  const handleChanges = (e) => {
    e.preventDefault();

    expressApi
      .put("/admin/update-vehicle", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Modifications enresgistrées");
        }
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteClick = () => {
    setModalConfirmation(!modalConfirmation);
  };
  const handleDeleteVehicle = () => {
    deleteVehicle(vehicle);
  };

  return (
    <div className="w-80 border-blue border-2 rounded-xl text-secondary">
      <div className="p-3">
        <div className="flex justify-center">
          <img
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/assets/images/vehicles/${vehiclePic}`}
            alt={`${vehiclePic}`}
            className=" w-40 rounded-lg"
          />
        </div>
        <form action="submit" onSubmit={handleChanges}>
          <div className=" flex flex-col my-2 gap-1">
            <label htmlFor="brand" className="text-blue font-bold">
              Marque
            </label>
            <input
              type="text"
              id="brand"
              placeholder={formData.brandName}
              value={formData.brandName}
              onChange={handleChangeBrand}
              className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
            />

            <label htmlFor="model" className="text-blue font-bold">
              Modèle de la voiture
            </label>
            <input
              type="text"
              id="model"
              placeholder={formData.model}
              value={formData.model}
              onChange={handleChangeModel}
              className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
            />
            <label htmlFor="capaciteBaterie" className="text-blue font-bold">
              Capacité de la baterie
            </label>
            <input
              type="number"
              id="capaciteBaterie"
              placeholder={formData.batteryCapacity}
              value={formData.batteryCapacity}
              onChange={handleChangeBattery}
              className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
            />
            <label htmlFor="realRange" className="text-blue font-bold">
              Autonomie estimée
            </label>
            <input
              type="text"
              id="realRange"
              placeholder={formData.realRange}
              value={formData.realRange}
              onChange={handleChangeAutonomi}
              className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
            />
            <label htmlFor="powerConsumption" className="text-blue font-bold">
              Consomation de KW au KM
            </label>
            <input
              type="text"
              id="powerConsumption"
              placeholder={formData.powerConsumption}
              value={formData.powerConsumption}
              onChange={handleChangeConsumption}
              className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
            />
            <div className="flex justify-between my-1">
              <label htmlFor="comboCcs" className="text-blue font-bold ">
                Prise Combo CCS
              </label>
              <input
                type="checkbox"
                id="comboCcs"
                checked={formData.chargeComboCcs === 1}
                onChange={handleChangeCombo}
                className="input  input-xs checkbox-sm checkbox-accent  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="chargeT2" className="text-blue font-bold">
                Prise T2
              </label>
              <input
                type="checkbox"
                id="charget2"
                checked={formData.chargeT2 === 1}
                onChange={handleChangeT2}
                className="input  input-xs checkbox-sm checkbox-accent  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="priseEf" className="text-blue font-bold">
                Prise EF
              </label>
              <input
                type="checkbox"
                id="priseEf"
                checked={formData.chargeEf === 1}
                onChange={handleChangeEf}
                className="input  input-xs checkbox-accent checkbox-sm  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
            </div>
            <div className="flex justify-between gap-2 mt-2">
              <button
                onClick={handleDeleteClick}
                type="button"
                className="btn border-none bg-rose-700 bg-opacity-75 text-primary "
              >
                Supprimer
              </button>
              <button
                type="submit"
                className="btn border-none bg-blue  text-primary "
              >
                Enregistrer
              </button>
            </div>
          </div>
        </form>
        {modalConfirmation && (
          <div className="bg-secondary bg-opacity-60 fixed inset-0 h-screen flex justify-center items-center">
            <div className="bg-primary flex flex-col items-center rounded-xl text-lg font-bold w-80 gap-4">
              <h3 className="bg-rose-700 bg-opacity-75 p-3 w-full text-primary rounded-t-xl">
                Attention !
              </h3>
              <div className="flex flex-col p-3 gap-3 text-secondary w-full text-base">
                <p>Vous allez supprimez ce Véhicule !</p>
                <p>Êtes vous sûr de vouloir procéder ?</p>
              </div>

              <div className="w-full flex justify-evenly mb-3">
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="btn bg-rose-700 bg-opacity-75 text-primary border-none"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDeleteVehicle}
                  className="btn bg-blue text-primary border-none"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        style={{ marginTop: 100 }}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </div>
  );
}

export default ManageVehiclesCard;

ManageVehiclesCard.propTypes = {
  deleteVehicle: PropTypes.func.isRequired,
  vehiclePic: PropTypes.string.isRequired,
  vehicle: PropTypes.shape({
    brandName: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    real_range: PropTypes.number.isRequired,
    battery_capacity: PropTypes.string.isRequired,
    charge_combo_ccs: PropTypes.number.isRequired,
    charge_t2: PropTypes.number.isRequired,
    charge_ef: PropTypes.number.isRequired,
    power_consumption: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
