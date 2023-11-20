import { useState } from "react";
import { useVehicleListContext } from "../../contexts/VehicleListContext";
import expressApi from "../../service/expressAPI";

import carHolder from "../../assets/images/placeholder-car.png";

function CarSelector() {
  const { vehicleList, setVehicleList } = useVehicleListContext();

  const [page, setPage] = useState(0);

  const priseList = (obj) => {
    const list = [];
    Object.keys(obj).forEach((key) => {
      if (key.match(/^prise/g) && obj[key] === 1)
        list.push(key.replace("prise", ""));
    });
    return list;
  };

  const handleDelete = () => {
    expressApi
      .delete(`/vehicle/${vehicleList[page].vehicleUserId}`)
      .then((res) => {
        if (res.status === 204) {
          setPage(0);
          setVehicleList(
            vehicleList.filter(
              (elem) => elem.vehicleUserId !== vehicleList[page].vehicleUserId
            )
          );
          localStorage.setItem(
            "vehicles",
            JSON.stringify(
              vehicleList.filter(
                (elem) => elem.vehicleUserId !== vehicleList[page].vehicleUserId
              )
            )
          );
        }
      });
  };

  return (
    <div className="lg:hidden flex justify-center">
      {vehicleList?.length ? (
        <div className="flex flex-col items-center border-[2px] border-blue rounded-3xl">
          <img
            className="h-48 rounded-t-3xl"
            src={
              vehicleList[page]?.vehiclePic
                ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/vehicles/${
                    vehicleList[page].vehiclePic
                  }`
                : carHolder
            }
            alt="illustration du modèle de voiture"
          />
          <div className="w-full p-3">
            <div className="flex gap-2">
              <p className="font-semibold text-blue">Marque:</p>
              <p className="text-secondary font-semibold">
                {vehicleList[page]?.brand}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold text-blue">Modèle:</p>
              <p className="text-secondary font-semibold">
                {vehicleList[page]?.model}
              </p>
            </div>
            <div className=" flex gap-2">
              <p className="font-semibold text-blue">Immatriculation:</p>
              <p className="text-secondary font-semibold">
                {vehicleList[page]?.serial}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold text-blue">Prises:</p>
              <div className="text-secondary font-semibold flex gap-2 uppercase">
                {vehicleList[page] &&
                  priseList(vehicleList[page]).map((type) => (
                    <p key={type}>{type}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-around mb-3">
            {vehicleList.length > 1 && page > 0 ? (
              <button type="button" onClick={() => setPage(page - 1)}>
                <svg
                  width="64px"
                  height="64px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#21A89A"
                  fill="#21A89A"
                  className="h-[44px]"
                >
                  <path
                    d="M16 12H8m0 0l3.5 3.5M8 12l3.5-3.5M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#E5E9E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <div className="h-[44px] w-[64px]" />
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="btn bg-rose-700 bg-opacity-75 text-primary border-none border-[3px]"
            >
              Supprimer
            </button>

            {vehicleList.length > 1 && page < vehicleList.length - 1 ? (
              <button type="button" onClick={() => setPage(page + 1)}>
                <svg
                  width="64px"
                  height="64px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#21A89A"
                  fill="#21A89A"
                  className="rotate-180 h-[44px]"
                >
                  <path
                    d="M16 12H8m0 0l3.5 3.5M8 12l3.5-3.5M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#E5E9E7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <div className="h-[44px] w-[64px]" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mx-4 mt-2 py-1 px-2 border-[2px] border-blue rounded-3xl h-[23rem] text-secondary font-bold">
          Veuillez ajouter un véhicule
        </div>
      )}
    </div>
  );
}

export default CarSelector;
