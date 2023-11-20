import PropTypes from "prop-types";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";

import expressAPI from "../../service/expressAPI";
import ReservationModal from "../Reservation/ReservationModal";

function StationCard({
  stationId,
  nomStation,
  adresseStation,
  distance,
  conditionAcces,
  name,
  reservation,
  bornes,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalResume, setModalResume] = useState(false);

  const { favourites, setFavourites } = useFavouriteContext();
  const { user } = useCurrentUserContext();

  const handleFavourite = async () => {
    if (favourites.some((elem) => elem.stationId === stationId)) {
      try {
        const result = await expressAPI.delete(
          `/favourites/${stationId}/${user.id}`
        );
        if (result.status === 204) {
          setFavourites(
            favourites.filter((elem) => elem.stationId !== stationId)
          );
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const newFavouritePost = {
          userId: user.id,
          stationId,
        };

        const result = await expressAPI.post(`/favourites`, newFavouritePost);
        if (result.status === 201) {
          const newFavourite = {
            id: stationId,
            userId: user.id,
            stationId,
            nomStation,
            adresseStation,
            distance: parseFloat(distance),
            nbrePdc: bornes,
            brandName: name,
            conditionAcces,
            reservation,
          };

          setFavourites([...favourites, newFavourite]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className=" flex w-[22rem] max-h-72 flex-col justify-between font-bold border-2 border-blue rounded-xl px-3 py-2">
      <div className="flex flex-grow flex-col justify-evenly pb-1 text-lg">
        <h2 className="text-blue">{nomStation}</h2>
        <h3 className="text-secondary">{adresseStation}</h3>
      </div>
      <div>
        {isModalOpen && (
          <ReservationModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            nomStation={nomStation}
            stationId={stationId}
            modalResume={modalResume}
            setModalResume={setModalResume}
          />
        )}
        <div className="grid grid-cols-[1fr_2fr] border-y-2 border-green mb-1 gap-y-0.5">
          <p className="text-blue">Distance:</p>
          <p className="text-secondary">{distance} km</p>

          <p className="text-blue">Bornes:</p>
          <p className="text-secondary">{bornes}</p>
          <p className="text-blue">Enseigne:</p>
          <p className="text-secondary">{name}</p>
          <p className="text-blue">Acces:</p>
          <p className="text-secondary">{conditionAcces}</p>
        </div>

        <div className="flex w-full justify-between items-center">
          <div className="h-[40px] w-[40px]" />
          {reservation === 0 ? (
            <div className="w-36" />
          ) : (
            <button
              type="button"
              className="btn btn-sm text-primary bg-blue border-0 rounded-lg drop-shadow-lg"
              onClick={() => {
                if (user) {
                  setIsModalOpen(!isModalOpen);
                } else {
                  toast.error("Veuillez vous connecter");
                }
              }}
            >
              Reserver
            </button>
          )}
          {user ? (
            <button type="button" onClick={handleFavourite}>
              <svg
                width="40px"
                height="40px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                color="#21A89A"
                fill={
                  favourites.some((elem) => elem.stationId === stationId)
                    ? "#21A89A"
                    : "none"
                }
              >
                <path
                  d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
                  stroke="#21A89A"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div className="h-[40px] w-[40px]" />
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
    </div>
  );
}

export default StationCard;

StationCard.propTypes = {
  stationId: PropTypes.number.isRequired,
  nomStation: PropTypes.string.isRequired,
  adresseStation: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  conditionAcces: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bornes: PropTypes.number,
  reservation: PropTypes.number.isRequired,
};

StationCard.defaultProps = {
  bornes: 0,
};
