import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import expressAPI from "../service/expressAPI";

import { useCurrentMapContext } from "../contexts/CurrentCenterMap";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import Logo from "../assets/images/GeoCodeTr.png";
import newCoordinates from "../service/SearchCity";

function NavBarTop({ toggleModalInfo, toggleModalConnexion }) {
  const { user } = useCurrentUserContext();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { setCoordinates, setModalOpen, setMarkers } = useCurrentMapContext();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCoordinates = async (event) => {
    if (event.key === "Enter" || event.key === "Entrée") {
      const coordinates = await newCoordinates(address);
      setCoordinates(coordinates);
      setModalOpen(false);
      expressAPI
        .post(`/station/bornes-list`, coordinates)
        .then((res) =>
          res.data.map((elem) => ({
            ...elem,
            coordonnees: [
              parseFloat(elem.latitude),
              parseFloat(elem.longitude),
            ],
          }))
        )
        .then((formatedData) => {
          setMarkers(formatedData);
          navigate("/");
        })
        .catch((e) => console.error(e));
    }
  };
  const handleConnexionClick = () => {
    if (user) {
      navigate("/profil");
    } else {
      toggleModalConnexion();
    }
  };

  return (
    <div className="absolute inset-x-0 top-0 z-50 bg-blue flex justify-around items-center h-[10vh] min-h-16 lg:hidden">
      <Link to="/">
        <img src={Logo} alt="logo" className="h-[45px]" />
      </Link>
      <input
        placeholder="Rechercher"
        type="search"
        name="Rechercher"
        id="recherche"
        value={address}
        onChange={handleAddressChange}
        onKeyDown={handleCoordinates}
        className="input bg-teal-500 uppercase w-44 text-base text-primary font-semibold focus:bg-primary focus:text-blue  placeholder:text-primary"
      />
      <div className="flex gap-2">
        <button type="button" onClick={toggleModalInfo}>
          <svg
            width="45px"
            height="45px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#E5E9E7"
          >
            <path
              d="M12 11.5v5M12 7.51l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="#E5E9E7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="button" onClick={handleConnexionClick}>
          {user?.profile_pic ? (
            <img
              className="h-[45px] rounded-full"
              src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/users/${
                user.profile_pic
              }`}
              alt="illustration de l'utilisateur"
            />
          ) : (
            <svg
              width="45px"
              height="45px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#E5E9E7"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
NavBarTop.propTypes = {
  toggleModalInfo: PropTypes.func.isRequired,
  toggleModalConnexion: PropTypes.func.isRequired,
};

export default NavBarTop;
