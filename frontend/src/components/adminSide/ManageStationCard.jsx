import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import expressAPI from "../../service/expressAPI";

function ManageStationCard({ station, deleteStation }) {
  const [menu, setMenu] = useState(false);
  const [newData, setNewData] = useState(station);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.id]: e.target.value });
  };

  const handleCheckBox = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setNewData({ ...newData, [e.target.id]: newValue });
  };

  const handleModal = () => setDeleteConfirmation(!deleteConfirmation);

  const handleSave = () => {
    expressAPI.put("/admin/stations", newData).then((res) => {
      if (res.status === 200) {
        toast.success("Modifications enresgistrées");
        setMenu(!menu);
      } else toast.error("Erreur d'enregistrement");
    });
  };

  const handleDelete = () => {
    deleteStation(station);
  };

  return (
    <>
      {!menu && (
        <div className="w-80 border-blue border-2 rounded-xl text-secondary">
          <div className="p-3">
            <div className="flex flex-col my-2 gap-1">
              <label htmlFor="nomStation" className="text-blue font-bold">
                Nom de la station
              </label>
              <input
                type="text"
                id="nomStation"
                placeholder={newData.nomStation}
                value={newData.nomStation}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
              <label htmlFor="addressStation" className="text-blue font-bold">
                Adresse
              </label>
              <input
                type="text"
                id="addressStation"
                placeholder={newData.adressStation}
                value={newData.adressStation}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
              <label htmlFor="dateMaj" className="text-blue font-bold">
                Date de mise à jour
              </label>
              <input
                type="text"
                id="dateMaj"
                placeholder={newData.dateMaj}
                value={newData.dateMaj}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
            </div>
          </div>
          {!menu && (
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setMenu(!menu)}
                type="button"
                className="btn border-none bg-blue text-primary  text-xl"
              >
                +
              </button>
            </div>
          )}
        </div>
      )}
      {menu && (
        <div className="w-[80%]  border-blue border-2 rounded-xl text-secondary mx-4 md:w-[70%]">
          <div className="p-3 md:px-20">
            <div className="flex flex-col my-2 gap-2">
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="nomStation" className="text-blue font-bold">
                  Nom de la station
                </label>
                <input
                  type="text"
                  id="nomStation"
                  placeholder={newData.nomStation}
                  value={newData.nomStation}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs max-w-xs  focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="adressStation" className="text-blue font-bold">
                  Adresse
                </label>
                <input
                  type="text"
                  id="adressStation"
                  placeholder={newData.adressStation}
                  value={newData.adressStation}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="dateMaj" className="text-blue font-bold">
                  Date de mise à jour
                </label>
                <input
                  type="text"
                  id="dateMaj"
                  placeholder={newData.dateMaj}
                  value={newData.dateMaj}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="bName" className="text-blue font-bold">
                  Nom de l'enseigne
                </label>
                <input
                  type="text"
                  id="bName"
                  placeholder={newData.bName}
                  value={newData.bName}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="oName" className="text-blue font-bold">
                  Opérateur
                </label>
                <input
                  type="text"
                  id="oName"
                  placeholder={newData.oName}
                  value={newData.oName}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="hName" className="text-blue font-bold">
                  Amménageur
                </label>
                <input
                  type="text"
                  id="hName"
                  placeholder={newData.hName}
                  value={newData.hName}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="conditionAcces" className="text-blue font-bold">
                  Condition d'accès
                </label>
                <input
                  type="text"
                  id="conditionAcces"
                  placeholder={newData.conditionAcces}
                  value={newData.conditionAcces}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="reservation" className="text-blue font-bold">
                  Possibilité de réservation
                </label>
                <input
                  type="text"
                  id="reservation"
                  placeholder={newData.reservation}
                  value={newData.reservation}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="dateCreation" className="text-blue font-bold">
                  Date de mise en service
                </label>
                <input
                  type="text"
                  id="dateCreation"
                  placeholder={newData.dateCreation}
                  value={newData.dateCreation}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="nbrePdc" className="text-blue font-bold">
                  Nombre de prise
                </label>
                <input
                  type="text"
                  id="nbrePdc"
                  placeholder={newData.nbrePdc}
                  value={newData.nbrePdc}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="longitude" className="text-blue font-bold">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  placeholder={newData.longitude}
                  value={newData.longitude}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label htmlFor="latitude" className="text-blue font-bold">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  placeholder={newData.latitude}
                  value={newData.latitude}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between mx-6">
                <label
                  htmlFor="puissanceNominale"
                  className="text-blue font-bold"
                >
                  Puissance nominale
                </label>
                <input
                  type="text"
                  id="puissanceNominale"
                  placeholder={newData.puissanceNominale}
                  value={newData.puissanceNominale}
                  onChange={handleChange}
                  className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2 lg:w-80"
                />
              </div>
            </div>
            <div className="flex flex-col my-2 mx-6 gap-1 text-blue font-bold">
              <p>Type de prise: </p>
              <div className="flex flex-col my-2 gap-1">
                <div className="form-control">
                  <label className="cursor-pointer label flex  gap-1 mx-6">
                    <span className="place-self-start text-blue font-bold">
                      Type 2
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent place-self-end"
                      id="priseType2"
                      checked={newData.priseType2 === 1}
                      value={newData.priseType2}
                      onChange={handleCheckBox}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label flex  gap-1 mx-6">
                    <span className="place-self-start text-blue font-bold">
                      Type EF
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent place-self-end"
                      id="priseTypeEF"
                      checked={newData.priseTypeEF === 1}
                      value={newData.priseTypeEF}
                      onChange={handleCheckBox}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label flex  gap-1 mx-6">
                    <span className="place-self-start text-blue font-bold">
                      Type combo CCS
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent place-self-end"
                      id="priseTypeComboCCS"
                      checked={newData.priseTypeComboCCS === 1}
                      value={newData.priseTypeComboCCS}
                      onChange={handleCheckBox}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label flex  gap-1 mx-6">
                    <span className="place-self-start text-blue font-bold">
                      CHADEMO
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent place-self-end"
                      id="priseTypeChademo"
                      checked={newData.priseTypeChademo === 1}
                      value={newData.priseTypeChademo}
                      onChange={handleCheckBox}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="cursor-pointer label flex f gap-1 mx-6">
                    <span className="place-self-start text-blue font-bold">
                      Autres types
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent place-self-end"
                      id="priseTypeAutre"
                      checked={newData.priseTypeAutre === 1}
                      value={newData.priseTypeAutre}
                      onChange={handleCheckBox}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <button
              type="button"
              className="my-3 mx-auto btn bg-rose-700 bg-opacity-75 border-none text-primary"
              onClick={handleModal}
            >
              Supprimer
            </button>
            <button
              type="button"
              className="my-3 mx-auto btn bg-blue text-primary border-none border-[3px]"
              onClick={handleSave}
            >
              Enregistrer
            </button>
          </div>
          {deleteConfirmation && (
            <div className="bg-secondary bg-opacity-60 fixed inset-0 h-screen flex justify-center items-center">
              <div className="bg-primary flex flex-col items-center rounded-xl text-lg font-bold w-80 gap-4">
                <h3 className="bg-rose-700 bg-opacity-75 p-3 w-full text-primary rounded-t-xl">
                  Attention !
                </h3>
                <div className="flex flex-col p-3 gap-3 text-secondary w-full text-base">
                  <p>Vous allez supprimez cette Station !</p>
                  <p>Êtes vous sûr de vouloir procéder ?</p>
                </div>

                <div className="w-full flex justify-evenly mb-3">
                  <button
                    type="button"
                    onClick={handleModal}
                    className="btn bg-rose-700 bg-opacity-75 text-primary border-none"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn bg-blue text-primary border-none"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <button
              type="button"
              className="my-3 mx-auto btn bg-blue border-none text-primary rounded-full text-xl"
              onClick={() => setMenu(!menu)}
            >
              <svg
                width="30px"
                height="30px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#E5E9E7"
              >
                <path
                  d="m6 11 6-6 6 6M6 19l6-6 6 6"
                  stroke="#E5E9E7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageStationCard;

ManageStationCard.propTypes = {
  deleteStation: PropTypes.func.isRequired,
  station: PropTypes.shape({
    adressStation: PropTypes.string.isRequired,
    bName: PropTypes.string.isRequired,
    conditionAcces: PropTypes.string.isRequired,
    dateCreation: PropTypes.string,
    dateMaj: PropTypes.string.isRequired,
    hName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    nbrePdc: PropTypes.number.isRequired,
    nomStation: PropTypes.string.isRequired,
    oName: PropTypes.string.isRequired,
    priseType2: PropTypes.number.isRequired,
    priseTypeAutre: PropTypes.number.isRequired,
    priseTypeChademo: PropTypes.number.isRequired,
    priseTypeComboCCS: PropTypes.number.isRequired,
    priseTypeEF: PropTypes.number.isRequired,
    puissanceNominale: PropTypes.number.isRequired,
    reservation: PropTypes.number.isRequired,
  }).isRequired,
};
