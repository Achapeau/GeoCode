import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageStationCard from "../components/adminSide/ManageStationCard";
import expressAPI from "../service/expressAPI";

function ManageStations() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState({
    nomStation: "",
    bName: "",
    adressStation: "",
    priseType2: 0,
    priseTypeEF: 0,
    priseTypeComboCCS: 0,
    priseTypeChademo: 0,
    priseTypeAutre: 0,
  });

  useEffect(() => {
    expressAPI
      .get(`/admin/stations`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const handleChange = (e) => {
    setFilteredData({ ...filteredData, [e.target.id]: e.target.value });
  };

  const handleCheckBox = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setFilteredData({ ...filteredData, [e.target.id]: newValue });
  };
  const filterResult = () => {
    const request = {
      nomStation: `%${filteredData.nomStation}%`,
      bName: `%${filteredData.bName}%`,
      adressStation: `%${filteredData.adressStation}%`,
      priseType2: filteredData.priseType2,
      priseTypeEF: filteredData.priseTypeEF,
      priseTypeComboCCS: filteredData.priseTypeComboCCS,
      priseTypeChademo: filteredData.priseTypeChademo,
      priseTypeAutre: filteredData.priseTypeAutre,
    };
    expressAPI
      .post(`/admin/stations`, request)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));

    setFilter(!filter);
  };

  const deleteStation = (station) => {
    const stationId = station.id;
    expressAPI
      .delete(`/admin/stations/${stationId}`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Suppression validée");
          setData((prevData) =>
            prevData.filter((elem) => elem.id !== stationId)
          );
        } else toast.error("Suppression non validée");
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
        <div className="lg:w-1/2 flex flex-col lg:text-xl text-lg font-bold">
          <div className="grid grid-cols-[1fr_3fr] items-center gap-2 border-b-2 border-green p-4">
            <label htmlFor="nomStation" className="text-blue">
              Station :
            </label>
            <input
              type="search"
              name="nomStation"
              id="nomStation"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              value={filteredData.nomStation}
              placeholder={
                filteredData.nomStation.length
                  ? filteredData.nomStation
                  : "Recherche par nom"
              }
              onChange={handleChange}
            />

            <label htmlFor="bName" className="text-blue">
              Marque :
            </label>
            <input
              name="bName"
              id="bName"
              type="search"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              onChange={handleChange}
              placeholder={
                filteredData.bName.length
                  ? filteredData.bName
                  : "Recherche par marque"
              }
              value={filteredData.bName}
            />
            <label htmlFor="adressStation" className="text-blue">
              Ville :
            </label>
            <input
              type="search"
              name="adressStation"
              id="adressStation"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              onChange={handleChange}
              value={filteredData.adressStation}
              placeholder={
                filteredData.adressStation.length
                  ? filteredData.adressStation
                  : "Recherche par Ville"
              }
            />
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-green p-4">
            <h1 className="text-blue">Type de prises</h1>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-[3fr_1fr] ">
                <label className="cursor-pointer label">
                  <span className="label-text text-secondary">Type EF</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    id="priseTypeEF"
                    value={filteredData.priseTypeEF === 1}
                    checked={filteredData.priseTypeEF}
                    onChange={handleCheckBox}
                  />
                </label>
              </div>
              <div className="grid grid-cols-[3fr_1fr] ">
                <label className="cursor-pointer label">
                  <span className="label-text text-secondary">Type 2</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    id="priseType2"
                    checked={filteredData.priseType2 === 1}
                    value={filteredData.priseType2}
                    onChange={handleCheckBox}
                  />
                </label>
              </div>
              <div className="grid grid-cols-[3fr_1fr] ">
                <label className="cursor-pointer label">
                  <span className="label-text text-secondary">Combo CCS</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    id="priseTypeComboCCS"
                    value={filteredData.priseTypeComboCCS === 1}
                    checked={filteredData.priseTypeComboCCS}
                    onChange={handleCheckBox}
                  />
                </label>
              </div>
              <div className="grid grid-cols-[3fr_1fr] ">
                <label className="cursor-pointer label">
                  <span className="label-text text-secondary">Chademo</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    id="priseTypeChademo"
                    value={filteredData.priseTypeChademo === 1}
                    checked={filteredData.priseTypeChademo}
                    onChange={handleCheckBox}
                  />
                </label>
              </div>
              <div className="grid grid-cols-[3fr_1fr] ">
                <label className="cursor-pointer label">
                  <span className="label-text text-secondary">Autres</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent"
                    id="priseTypeAutre"
                    value={filteredData.priseTypeAutre === 1}
                    checked={filteredData.priseTypeAutre}
                    onChange={handleCheckBox}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 mb-24">
            <button
              onClick={filterResult}
              type="button"
              className="btn border-none bg-blue text-primary"
            >
              Valider
            </button>
          </div>
        </div>
      )}

      {!filter && !data.length && (
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

      {Boolean(!filter && data.length) && (
        <div className=" lg:mb-0 mb-[11vh] flex flex-wrap justify-center gap-6 mt-3 ">
          {data.map((station) => (
            <ManageStationCard
              key={station.id}
              station={station}
              deleteStation={deleteStation}
            />
          ))}
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

export default ManageStations;
