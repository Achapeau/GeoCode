import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import { useVehicleListContext } from "../../contexts/VehicleListContext";

import expressApi from "../../service/expressAPI";

function AddCarModal({
  addCarVisible,
  setAddCarVisible,
  modification,
  setModification,
}) {
  const { vehicleList, setVehicleList } = useVehicleListContext();
  const { user } = useCurrentUserContext();

  const [fields, setFields] = useState({
    serial: "",
    brand: "",
    model: {},
  });

  const handleFields = (evt) => {
    setFields({ ...fields, [evt.target.id]: evt.target.value });
  };

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    expressApi.get(`/vehicle/vehicle-brands`).then((res) => {
      setBrands(res.data);
    });
  }, []);

  const [models, setModels] = useState([]);

  useEffect(() => {
    if (fields.brand.length) {
      expressApi.get(`/vehicle/vehicle-models/${fields.brand}`).then((res) => {
        setModels(res.data);
      });
    }
  }, [fields.brand]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newVehicle = {
      userId: user.id,
      serial: fields.serial.toLocaleUpperCase(),
      ...JSON.parse(fields.model),
    };

    if (newVehicle.serial.match(/^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/gi)) {
      expressApi.post(`/vehicle`, newVehicle).then((res) => {
        if (res.status === 201) {
          newVehicle.vehicleUserId = res.data[0].insertId;
          if (vehicleList.length) {
            setVehicleList([...vehicleList, newVehicle]);
            localStorage.setItem(
              "vehicles",
              JSON.stringify([...vehicleList, newVehicle])
            );
          } else {
            setVehicleList(newVehicle);
            localStorage.setItem("vehicles", JSON.stringify([newVehicle]));
          }

          setAddCarVisible(!addCarVisible);
          setModification(!modification);
          toast.success("Votre véhicule à bien été ajouté");
        }
      });
    } else {
      toast.error("Le numéro d'immatriculation est incorrect !");
    }
  };

  return (
    <div>
      {Boolean(addCarVisible) && (
        <div className="fixed inset-0 h-screen bg-opacity-40 bg-secondary flex justify-center items-center ">
          <div className="w-80 bg-primary text-secondary font-bold rounded-xl flex flex-col">
            <h3 className="bg-blue text-primary text-lg w-full rounded-t-xl p-3">
              Ajoutez votre véhicule :
            </h3>
            <form className="flex flex-col gap-3 p-3 text-blue">
              <div className="flex flex-col">
                <label htmlFor="serial">Immatriculation :</label>
                <input
                  type="text"
                  name="serial"
                  id="serial"
                  value={fields.serial}
                  onChange={handleFields}
                  placeholder="XX-000-XX"
                  className={`input bg-neutral-300 w-full uppercase focus:border-[3px] border-[3px] focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary ${
                    fields.serial.match(/^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/gi)
                      ? "border-blue"
                      : "border-rose-700 border-opacity-75"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="brand">Constructeur</label>
                <select
                  id="brand"
                  className="select bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                  onChange={handleFields}
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Choisissez dans la liste
                  </option>
                  {brands?.map((obj) => (
                    <option key={obj.id} value={obj.id}>
                      {obj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="model">Modèle</label>
                <select
                  name="model"
                  id="model"
                  className="select bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                  defaultValue="default"
                  onChange={handleFields}
                  // TODO desactiver ce select tant qu'une brand n'est pas selectionnée
                  // non fonctionnel { !fields.brand && "disabled"}
                >
                  <option value="default" disabled hidden>
                    Choisissez dans la liste
                  </option>
                  {models?.map((obj) => (
                    <option key={obj.vehicleId} value={JSON.stringify(obj)}>
                      {obj.model}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setAddCarVisible(!addCarVisible)}
                  className="btn  bg-rose-700 bg-opacity-75 border-none text-primary "
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn  bg-blue border-none text-primary "
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

AddCarModal.propTypes = {
  addCarVisible: PropTypes.bool.isRequired,
  setAddCarVisible: PropTypes.func.isRequired,
  modification: PropTypes.bool.isRequired,
  setModification: PropTypes.func.isRequired,
};

export default AddCarModal;
