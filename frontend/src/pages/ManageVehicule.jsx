import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageVehiclesCard from "../components/adminSide/ManageVehiclesCard";
import expressApi from "../service/expressAPI";

function ManageVehicule() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [brands, setBrands] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [isCheckedType2, setIsCheckedType2] = useState(false);
  const [isCheckedTypeEF, setIsCheckedTypeEF] = useState(false);
  const [isCheckedTypeComboCCS, setIsCheckedTypeComboCCS] = useState(false);
  const [isCheckedChademo, setIsCheckedCHADEMO] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("0");
  const [autonomieMin, setAutonomieMin] = useState("");
  const [autonomieMax, setAutonomieMax] = useState("");
  const [batteryCapacityMin, setBatteryCapacityMin] = useState("");
  const [batteryCapacityMax, setBatteryCapacityMax] = useState("");
  const [consommationMin, setConsommationMin] = useState("");
  const [consommationMax, setConsommationMax] = useState("");

  useEffect(() => {
    expressApi
      .get("/admin/vehicle-list")
      .then((res) => {
        setData(res.data);
        setSavedData(res.data);
        const filterBrand = [];
        res.data.forEach((obj) => {
          if (!filterBrand.includes(obj.brandName)) {
            filterBrand.push(obj.brandName);
          }
        });
        setBrands(filterBrand);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const handleChecks = (checkboxName) => {
    switch (checkboxName) {
      case "type2":
        setIsCheckedType2(!isCheckedType2);
        break;
      case "typeEf":
        setIsCheckedTypeEF(!isCheckedTypeEF);
        break;
      case "typeComboCcs":
        setIsCheckedTypeComboCCS(!isCheckedTypeComboCCS);
        break;
      case "chademo":
        setIsCheckedCHADEMO(!isCheckedChademo);
        break;
      default:
        break;
    }
  };

  const filterData = () => {
    let filteredData = [...savedData];

    if (isCheckedType2) {
      filteredData = filteredData.filter((item) => item.charge_t2 === 1);
    }

    if (isCheckedTypeEF) {
      filteredData = filteredData.filter((item) => item.charge_ef === 1);
    }

    if (isCheckedTypeComboCCS) {
      filteredData = filteredData.filter((item) => item.charge_combo_ccs === 1);
    }

    if (isCheckedChademo) {
      filteredData = filteredData.filter((item) => item.charge_chademo === 1);
    }

    if (autonomieMin !== "" || autonomieMax !== "") {
      filteredData = filteredData.filter((item) => {
        const realRange = parseInt(item.real_range, 10);
        return (
          (autonomieMin === "" || realRange >= parseInt(autonomieMin, 10)) &&
          (autonomieMax === "" || realRange <= parseInt(autonomieMax, 10))
        );
      });
    }

    if (batteryCapacityMin !== "" || batteryCapacityMax !== "") {
      filteredData = filteredData.filter((item) => {
        const batteryCapacity = parseInt(item.battery_capacity, 10);
        return (
          (batteryCapacityMin === "" ||
            batteryCapacity >= parseInt(batteryCapacityMin, 10)) &&
          (batteryCapacityMax === "" ||
            batteryCapacity <= parseInt(batteryCapacityMax, 10))
        );
      });
    }

    if (consommationMin !== "" || consommationMax !== "") {
      filteredData = filteredData.filter((item) => {
        const powerConsumption = parseInt(item.power_consumption, 10);
        return (
          (consommationMin === "" ||
            powerConsumption >= parseInt(consommationMin, 10)) &&
          (consommationMax === "" ||
            powerConsumption <= parseInt(consommationMax, 10))
        );
      });
    }

    if (selectedBrand !== "0") {
      filteredData = filteredData.filter(
        (item) => item.brandName === selectedBrand
      );
    }

    setData(filteredData);
    setFilter(!filter);
  };

  const handleBrands = (e) => {
    setSelectedBrand(e.target.value);
  };
  const deleteVehicle = (vehicle) => {
    const vehicleId = vehicle.id;
    expressApi
      .delete(`/admin/remove-vehicle/${vehicleId}`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Véhicule supprimé");
          setData((prevData) =>
            prevData.filter((elem) => elem.id !== vehicleId)
          );
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="relative bg-primary flex flex-col items-center lg:min-h-[90vh] lg:mb-0 lg:mt-[10vh] min-h-[80vh]  z-0">
      <div className="bg-secondary rounded-b-xl text-center w-full">
        <button
          type="button"
          className="btn btn-sm text-primary text-base w-32 bg-blue border-none shadow-xl my-3"
          onClick={toggleFilter}
        >
          Filtres
        </button>
      </div>
      {filter && (
        <div className="lg:w-1/2 flex flex-col lg:text-xl text-lg font-bold lg:mb-8 mb-[11vh]">
          <div className="flex flex-col gap-2 border-b-2 border-green p-4">
            <label htmlFor="brand" className="text-blue">
              Modèle du véhicule
            </label>
            <select
              onChange={handleBrands}
              defaultValue={selectedBrand}
              name="brand"
              id="brand"
              className="select bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
            >
              <option value="0">Tous les Modèles...</option>
              {brands.map((brand) => (
                <option value={brand} key={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col border-b-2 border-green p-4 ">
            <h1 className="text-blue">Type de prises</h1>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text text-secondary">Type 2</span>
                <input
                  type="checkbox"
                  name="type2"
                  checked={isCheckedType2}
                  onChange={() => handleChecks("type2")}
                  className="checkbox checkbox-accent"
                  id="type2"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text text-secondary">Type EF</span>
                <input
                  type="checkbox"
                  name="typeEf"
                  checked={isCheckedTypeEF}
                  onChange={() => handleChecks("typeEf")}
                  className="checkbox checkbox-accent"
                  id="typeEf"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text text-secondary">
                  Type combo CCS
                </span>
                <input
                  type="checkbox"
                  name="typeComboCcs"
                  checked={isCheckedTypeComboCCS}
                  onChange={() => handleChecks("typeComboCcs")}
                  className="checkbox checkbox-accent"
                  id="typeComboCcs"
                />
              </label>
            </div>
            <div>
              <label className="cursor-pointer label">
                <span className="label-text text-secondary">CHADEMO</span>
                <input
                  type="checkbox"
                  name="chademo"
                  checked={isCheckedChademo}
                  onChange={() => handleChecks("chademo")}
                  className="checkbox checkbox-accent"
                  id="chademo"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-[3fr_1fr_1fr] items-center w-full gap-2 p-4 text-secondary">
            <label htmlFor="autonomie" className="text-blue">
              Autonomie :
            </label>

            <input
              placeholder="Min"
              type="number"
              name="autonomieMin"
              id="autonomieMin"
              value={autonomieMin}
              onChange={(e) => setAutonomieMin(e.target.value)}
              className="input bg-neutral-300 w-20 text-base text-blue font-semibold focus:bg-primary focus:text-blue placeholder:text-secondary"
            />
            <input
              placeholder="Max"
              type="number"
              name="autonomieMax"
              id="autonomieMax"
              value={autonomieMax}
              onChange={(e) => setAutonomieMax(e.target.value)}
              className="input bg-neutral-300 w-20 text-base text-blue font-semibold focus:bg-primary focus:text-blue placeholder:text-secondary"
            />

            <label htmlFor="batteryCapacity" className="text-blue">
              Capacité batterie :
            </label>

            <input
              placeholder="Min"
              type="number"
              name="batteryCapacityMin"
              id="batteryCapacityMin"
              value={batteryCapacityMin}
              onChange={(e) => setBatteryCapacityMin(e.target.value)}
              className="input bg-neutral-300 w-20 text-base text-blue font-semibold focus:bg-primary focus:text-blue placeholder:text-secondary"
            />
            <input
              placeholder="Max"
              type="number"
              name="batteryCapacityMax"
              id="batteryCapacityMax"
              value={batteryCapacityMax}
              onChange={(e) => setBatteryCapacityMax(e.target.value)}
              className="input bg-neutral-300 w-20 text-base text-blue font-semibold focus:bg-primary focus:text-blue placeholder:text-secondary"
            />

            <label htmlFor="consommation" className="text-blue">
              Consommation:
            </label>

            <input
              placeholder="Min"
              type="number"
              name="consommationMin"
              id="consommationMin"
              value={consommationMin}
              onChange={(e) => setConsommationMin(e.target.value)}
              className="input bg-neutral-300 w-20 text-blue  font-semibold focus:bg-primary focus:text-blue placeholder:text-secondary"
            />
            <input
              placeholder="Max"
              type="number"
              name="consommationMax"
              id="consommationMax"
              value={consommationMax}
              onChange={(e) => setConsommationMax(e.target.value)}
              className="input bg-neutral-300 w-20  text-blue font-semibold focus:bg-primary focus:text-blue placeholder:text-secondary"
            />
          </div>
          <div className="flex justify-center my-3">
            <button
              onClick={filterData}
              type="button"
              className="btn border-none bg-blue  text-primary"
            >
              Valider
            </button>
          </div>
        </div>
      )}

      {Boolean(!filter && data.length) && (
        <div className=" lg:mb-8 mb-[11vh] flex flex-wrap justify-center gap-6 lg:gap-12 mt-6 lg:mt-12">
          {data.map((vehicle) => (
            <ManageVehiclesCard
              key={vehicle.id}
              vehiclePic={vehicle.vehicle_pic}
              vehicle={vehicle}
              deleteVehicle={deleteVehicle}
            />
          ))}
        </div>
      )}
      {Boolean(!filter && !data.length) && (
        <div className="flex flex-grow justify-center items-center mt-8 w-96">
          <div className="border-2 border-blue w-full mx-6 rounded-lg flex flex-col">
            <p className="bg-blue rounded-t-md p-2 text-xl text-primary">
              C'est la misère ici ...
            </p>
            <div className="p-4 text-lg">
              <p className="text-secondary">
                Essaye de jouer plus gentiment avec les filtres pour avoir un
                résultat
              </p>
            </div>
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

export default ManageVehicule;
