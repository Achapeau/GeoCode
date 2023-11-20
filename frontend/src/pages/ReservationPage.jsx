import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReservationStationCard from "../components/Reservation/ReservationStationCard";
import expressApi from "../service/expressAPI";
import { useCurrentMapContext } from "../contexts/CurrentCenterMap";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

function ReservationPage() {
  const { coordinates } = useCurrentMapContext();

  const [data, setData] = useState([]);

  const { user } = useCurrentUserContext();

  useEffect(() => {
    const [latitude, longitude] = coordinates;
    const request = {
      latitude,
      longitude,
    };

    expressApi
      .post(`/reservations/${user.id}`, request)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAnnulation = () => {
    const reservationId = data[0].reservation_id;

    expressApi
      .delete(`/reservations/remove-reservation/${reservationId}`)
      .then((res) => {
        if (res.status === 204) {
          setData(data.filter((item) => item.reservation_id !== reservationId));
          toast.success("Reservation Annulée avec succès");
        }
      });
  };

  return (
    <div className="bg-primary flex flex-col items-center lg:min-h-[90vh] lg:mb-0 min-h-[80vh] my-[10vh] z-0">
      <div className="lg:flex hidden mt-6 w-full justify-center">
        <h2 className=" w-2/3 bg-teal-500 text-center p-4 rounded-xl shadow-lg text-xl font-bold text-primary">
          Mes Réservations
        </h2>
      </div>
      {!data.length && (
        <div className="flex flex-grow justify-center items-center mt-8 w-96">
          <div className="border-2 border-blue w-full mx-6 rounded-lg flex flex-col">
            <p className="bg-blue rounded-t-md p-2 text-xl text-primary">
              Vous n'avez pas de réservations
            </p>
            <div className="p-4 text-lg text-secondary">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <p className="text-secondary ">Un joli bouton</p>
                  <button
                    type="button"
                    className="btn border-none bg-blue text-primary"
                  >
                    réserver
                  </button>
                </div>
                <p>
                  est présent sur les stations vous offrant la possibilité de
                  verrouiller un créneau horaire
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {data && (
        <div className="flex justify-center flex-wrap gap-2 mt-2">
          {data.map((station) => (
            <ReservationStationCard
              key={station.reservation_id}
              id={station.id}
              nomStation={station.nom_station}
              adresseStation={station.adresse_station}
              distance={station.distance.toFixed(2)}
              name={station.name}
              charpePointSerial={station.serial}
              date={station.date.split("T")[0]}
              startTime={station.start_time}
              endTime={station.end_time}
              handleAnnulation={handleAnnulation}
              reservation_id={data[0].reservation_id}
            />
          ))}
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        style={{ marginTop: 100 }}
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

export default ReservationPage;
