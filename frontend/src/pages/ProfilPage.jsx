import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { useVehicleListContext } from "../contexts/VehicleListContext";

import expressApi from "../service/expressAPI";
import CarSelector from "../components/profilPage/CarSelector";
import CarMap from "../components/profilPage/CarMap";
import AddCarModal from "../components/profilPage/AddCarModal";

function ProfilPage() {
  const { user, setUser } = useCurrentUserContext();
  const { setVehicleList } = useVehicleListContext();
  const navigate = useNavigate();

  const [addCarVisible, setAddCarVisible] = useState(false);
  const [modification, setModification] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await expressApi.get(`/vehicle/owned-vehicles/${user.id}`);
        setVehicleList(list.data);
        localStorage.setItem("vehicles", JSON.stringify(list.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [modification]);

  const handleModal = () => {
    setAddCarVisible(!addCarVisible);
  };

  const handleClickDeconnexion = () => {
    expressApi.get("/auth/logout").then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("user");
        setUser(null);
        localStorage.removeItem("vehicles");
        setVehicleList([]);
        navigate("/");
      } else {
        res.status(500).send("impossible de se deconnecter ");
      }
    });
  };

  return (
    <div className="bg-primary flex flex-col items-center gap-2 lg:min-h-[90vh] lg:mb-0 min-h-[80vh] my-[10vh] pt-2 z-0">
      <CarSelector />
      <CarMap />
      <div className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-2 lg:gap-16 gap-x-8 gap-y-4">
          <Link
            to="details"
            className="flex lg:w-72 lg:justify-center lg:gap-10 lg:flex-row  lg:p-3 flex-col p-1 items-center  border-b-[2px] border-r-[2px] border-secondary rounded-lg drop-shadow"
          >
            <svg
              width="64px"
              height="64px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21a89a"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-secondary font-semibold">Mon profil</p>
          </Link>
          <button
            type="button"
            onClick={handleModal}
            className="flex lg:w-72 lg:justify-center lg:gap-10 lg:flex-row lg:p-3 flex-col p-1 items-center  border-b-[2px] border-r-[2px] border-secondary rounded-lg drop-shadow"
          >
            <svg
              width="64px"
              height="64px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21a89a"
            >
              <path
                d="M8 10h8M7 14h1M16 14h1"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18v-6.59a2 2 0 01.162-.787l2.319-5.41A2 2 0 017.319 4h9.362a2 2 0 011.838 1.212l2.32 5.41a2 2 0 01.161.789V18M3 18v2.4a.6.6 0 00.6.6h2.8a.6.6 0 00.6-.6V18m-4 0h4m14 0v2.4a.6.6 0 01-.6.6h-2.8a.6.6 0 01-.6-.6V18m4 0h-4M7 18h10"
                stroke="#21a89a"
                strokeWidth="1.5"
              />
            </svg>
            <p className="text-secondary font-semibold">Ajouter véhicule</p>
          </button>
          <Link
            to="/favourites"
            className="flex lg:w-72 lg:flex-row lg:justify-center lg:gap-10 lg:p-3 flex-col p-1 items-center  border-b-[2px] border-r-[2px] border-secondary rounded-lg drop-shadow"
          >
            <svg
              width="64px"
              height="64px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21a89a"
            >
              <path
                d="M21 5v4"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 19V9a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2z"
                stroke="#21a89a"
                strokeWidth="1.5"
              />
              <path
                d="M5 10V5a2 2 0 012-2h9a2 2 0 012 2v5"
                stroke="#21a89a"
                strokeWidth="1.5"
              />
              <path
                d="M11.167 11L9.5 14h4l-1.667 3"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-secondary font-semibold">Mes Favoris</p>
          </Link>
          <Link
            to="/contact-us"
            className="flex lg:w-72 lg:flex-row lg:justify-center lg:gap-10 lg:p-3 flex-col p-1 items-center  border-b-[2px] border-r-[2px] border-secondary rounded-lg drop-shadow"
          >
            <svg
              width="64px"
              height="64px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21a89a"
            >
              <path
                d="M18 8L5 12.5 9.5 14M18 8l-8.5 6M18 8l-4 10.5L9.5 14"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="#21a89a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-secondary font-semibold">Nous contacter</p>
          </Link>
        </div>
      </div>
      <button
        className="btn bg-rose-700 bg-opacity-75 text-primary border-none drop-shadow-md lg:my-8"
        type="button"
        onClick={handleClickDeconnexion}
      >
        Déconnexion
      </button>
      <AddCarModal
        addCarVisible={addCarVisible}
        setAddCarVisible={setAddCarVisible}
        modification={modification}
        setModification={setModification}
      />
    </div>
  );
}

export default ProfilPage;
