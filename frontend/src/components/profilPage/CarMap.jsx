import { useVehicleListContext } from "../../contexts/VehicleListContext";
import expressApi from "../../service/expressAPI";

import carHolder from "../../assets/images/placeholder-car.png";

function CarMap() {
  const { vehicleList, setVehicleList } = useVehicleListContext();

  const priseList = (obj) => {
    const list = [];
    Object.keys(obj).forEach((key) => {
      if (key.match(/^prise/g) && obj[key] === 1)
        list.push(key.replace("prise", ""));
    });
    return list;
  };

  const handleDelete = (evt) => {
    expressApi.delete(`/vehicle/${evt.target.value}`).then((res) => {
      if (res.status === 204) {
        setVehicleList(
          vehicleList.filter(
            (elem) => elem.vehicleUserId !== parseInt(evt.target.value, 10)
          )
        );
        localStorage.setItem(
          "vehicles",
          JSON.stringify(
            vehicleList.filter(
              (elem) => elem.vehicleUserId !== parseInt(evt.target.value, 10)
            )
          )
        );
      }
    });
  };

  return (
    <div className="hidden lg:flex justify-center gap-3 mt-2 flex-wrap">
      {vehicleList?.length ? (
        vehicleList.map((vehicle) => (
          <div
            key={vehicle.vehicleUserId}
            className="flex flex-col items-center border-[2px] border-blue rounded-3xl"
          >
            <img
              className="h-48 rounded-t-3xl"
              src={
                vehicle.vehiclePic
                  ? `${
                      import.meta.env.VITE_BACKEND_URL
                    }/assets/images/vehicles/${vehicle.vehiclePic}`
                  : carHolder
              }
              alt=""
            />
            <div className="w-full p-3">
              <div className="flex gap-2">
                <p className="font-semibold text-blue">Marque:</p>
                <p className="text-secondary font-semibold">{vehicle?.brand}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-blue">Modèle:</p>
                <p className="text-secondary font-semibold">{vehicle?.model}</p>
              </div>
              <div className=" flex gap-2">
                <p className="font-semibold text-blue">Immatriculation:</p>
                <p className="text-secondary font-semibold">
                  {vehicle?.serial}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-blue">Prises:</p>
                <div className="text-secondary font-semibold flex gap-2 uppercase">
                  {vehicle &&
                    priseList(vehicle).map((type) => <p key={type}>{type}</p>)}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              value={vehicle.vehicleUserId}
              className="btn btn-sm bg-rose-700 bg-opacity-75 text-primary border-none border-[3px] mb-2"
            >
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mx-4 mt-2 py-1 px-2 border-[2px] border-blue rounded-3xl h-[23rem] text-secondary font-bold">
          Veuillez ajouter un véhicule
        </div>
      )}
    </div>
  );
}

export default CarMap;
