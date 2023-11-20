import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import { useVehicleListContext } from "../../contexts/VehicleListContext";

import expressApi from "../../service/expressAPI";
import add30mins from "../../service/addTime";

function ReservationPopUp({ setIsModalOpen, isModalOpen, selectedStation }) {
  const { nomStation, stationId } = selectedStation;
  const { user } = useCurrentUserContext();
  const { vehicleList } = useVehicleListContext();
  const [reservation, setReservation] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [dataConfirmation, setDataConfirmation] = useState([]);
  const [formDataReservation, setFormDataReservation] = useState({
    id: user.id,
    chargePointId: "",
    startTime: "",
    date: "",
    vehiculeUserId: "",
  });
  const handleDate = (e) => {
    setFormDataReservation({ ...formDataReservation, date: e.target.value });
  };
  const handleStart = (e) => {
    setFormDataReservation({
      ...formDataReservation,
      startTime: e.target.value,
    });
  };
  const handleVehicule = (e) => {
    setFormDataReservation({
      ...formDataReservation,
      vehiculeUserId: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getChargePointId = await expressApi.post(
        "/reservations/charge-Point",
        {
          stationId,
        }
      );
      const cpId = getChargePointId.data[0]?.id;

      const getReservation = await expressApi.post(
        "/reservations/create-reservation",
        {
          userId: formDataReservation.id,
          chargePointId: cpId,
          startTime: formDataReservation.startTime,
          endTime: add30mins(formDataReservation.startTime),
          date: formDataReservation.date,
          vehiculeUserId: formDataReservation.vehiculeUserId,
        }
      );

      setDataConfirmation(getReservation.data);
      setReservation(!reservation);
      setConfirmation(!confirmation);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Mauvaise date inserée");
      }
      console.error(error);
    }
  };

  return (
    <div>
      {reservation && (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-secondary bg-opacity-40 z-40 ">
          <div className="bg-primary rounded-xl shadow-md lg:w-1/2 w-80 flex flex-col">
            <div className="flex justify-between p-3 bg-blue  rounded-t-xl">
              <h1 className="text-primary font-bold text-xl text-center">
                Réservation :
              </h1>
              <button
                type="button"
                onClick={() => {
                  setConfirmation(!confirmation);
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <svg
                  width="32px"
                  height="32px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#E5E9E7"
                >
                  <path
                    d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#E5E9E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <form className=" p-3 flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex lg:flex-row lg: justify-evenly lg:gap-6 flex-col ">
                <div className=" flex flex-col gap-3 lg:justify-between">
                  <div className=" flex gap-8 items-center">
                    <label
                      htmlFor="date"
                      className="text-blue font-bold"
                      onSubmit={handleSubmit}
                    >
                      Date
                    </label>
                    <br />
                    <input
                      className="input bg-neutral-300 focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                      type="date"
                      id="formData.date"
                      name="date"
                      value={formDataReservation.date || ""}
                      onChange={handleDate}
                      required
                    />
                  </div>
                  <div className=" flex gap-7 items-center">
                    <label htmlFor="start" className="text-blue font-bold">
                      Heure
                    </label>
                    <br />
                    <input
                      className="input bg-neutral-300 focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                      type="time"
                      name="formData.start"
                      onChange={handleStart}
                      value={formDataReservation.startTime || ""}
                      required
                    />
                  </div>
                </div>
                <div className=" flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-blue font-bold ">Nom de la Borne</h3>
                    <p className=" font-bold text-secondary">{nomStation}</p>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <label
                      htmlFor="vehicule"
                      className="text-blue font-bold m-1"
                    >
                      Choix du véhicule
                    </label>
                    <select
                      name="vehicule"
                      id="vehicule"
                      onChange={handleVehicule}
                      className="select bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                    >
                      <option value="0">Choisissez un vehicule</option>
                      {vehicleList &&
                        vehicleList.map((car) => (
                          <option
                            key={car.vehicleUserId}
                            value={car.vehicleUserId}
                          >
                            {car.serial} - {car.model}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <p className="text-secondary font-bold text-sm py-4">
                Vous ne pouvez réservez qu'en ayant enregistrer précédemment
                votre véhicule dans votre profil. <br /> <br />
                Une fois le paiement effectué il sera impossible d’effectuer un
                remboursement.
              </p>
              <div className="flex lg:justify-evenly justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setReservation(!reservation);
                    setIsModalOpen(!isModalOpen);
                  }}
                  className="btn bg-rose-700 bg-opacity-75  border-none text-primary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn bg-blue border-none text-primary"
                >
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="fixed inset-0 h-screen flex items-center justify-center bg-secondary bg-opacity-40 z-40">
          <div className="bg-primary rounded-xl shadow-md w-80 flex flex-col">
            <div className="flex justify-between p-3 bg-blue  rounded-t-xl">
              <h1 className="text-primary font-bold text-xl text-center">
                Récapitulatif :
              </h1>
              <button
                type="button"
                onClick={() => {
                  setConfirmation(!confirmation);
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <svg
                  width="32px"
                  height="32px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#E5E9E7"
                >
                  <path
                    d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#E5E9E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-[1fr_2fr] p-3 gap-y-1 font-bold">
              <h3 className="text-blue ">Date:</h3>
              <p className="text-secondary ">
                {dataConfirmation.date.split("T")[0]}
              </p>

              <h3 className="text-blue">Heure:</h3>
              <p className="text-secondary">
                {dataConfirmation.start_time.split(":00")}
              </p>

              <h3 className="text-blue">Station:</h3>
              <p className="text-secondary">{dataConfirmation.nom_station}</p>

              <h3 className="text-blue">Borne:</h3>
              <p className="text-secondary">{dataConfirmation.serial}</p>

              <h3 className="text-blue">Total:</h3>
              <p className="text-secondary">{dataConfirmation.price} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
ReservationPopUp.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  selectedStation: PropTypes.shape({
    nomStation: PropTypes.string.isRequired,
    stationId: PropTypes.number.isRequired,
  }).isRequired,
};
export default ReservationPopUp;
