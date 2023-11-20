import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import expressApi from "../../service/expressAPI";
import "react-toastify/dist/ReactToastify.css";

function ManageUserCard({
  firstname,
  lastname,
  nickname,
  email,
  adress,
  birthdate,
  registerDate,
  genderId,
  roles,
  userId,
  deleteUser,
}) {
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState([]);
  const vehicles = { id: userId };
  const [formData, setFormData] = useState({
    firstname,
    lastname,
    nickname,
    email,
    adress,
    birthdate: birthdate.split("T")[0],
    registerDate: registerDate.split("T")[0],
    genderId,
    roles,
    userId,
    // model,
    // serial,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleModal = () => setDeleteConfirmation(!deleteConfirmation);

  const handleDelete = () => {
    deleteUser(userId);
  };

  const handleCheckBoxAdminUser = (e) => {
    const newValue = e.target.checked ? "admin" : "userStandard";
    setFormData({ ...formData, [e.target.id]: newValue });
  };

  const handleCheckBoxNbGenre = (e) => {
    const newValue = e.target.checked ? 3 : 0;
    setFormData({ ...formData, [e.target.id]: newValue });
  };

  const handleCheckBoxFemininGenre = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    setFormData({ ...formData, [e.target.id]: newValue });
  };

  const handleCheckBoxMasculinGenre = (e) => {
    const newValue = e.target.checked ? 2 : 0;
    setFormData({ ...formData, [e.target.id]: newValue });
  };

  const handleChangeUpdate = (e) => {
    e.preventDefault();

    expressApi
      .put("/admin/update-user", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Modifications enregistrées");
        }
        setMenu(!menu);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    expressApi
      .post("/admin/user-vehicle", vehicles)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {!menu && (
        <div className="w-80 border-blue border-2 rounded-xl text-secondary">
          <div className="p-3">
            <div className="flex flex-col my-2 gap-1">
              <label htmlFor="firstname" className="text-blue font-bold">
                Prénom
              </label>
              <input
                type="text"
                id="firstname"
                placeholder={firstname}
                value={formData.firstname || ""}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
              <label htmlFor="lastname" className="text-blue font-bold">
                Nom
              </label>
              <input
                type="text"
                id="lastname"
                placeholder={lastname}
                value={formData.lastname || ""}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
              <label htmlFor="nickname" className="text-blue font-bold">
                Pseudo
              </label>
              <input
                type="text"
                id="nickname"
                placeholder={nickname}
                value={formData.nickname || ""}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
              <label htmlFor="email" className="text-blue font-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder={email}
                value={formData.email || ""}
                onChange={handleChange}
                className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
              />
            </div>
            {!menu && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setMenu(!menu)}
                  type="button"
                  className="btn border-none bg-blue text-primary text-xl"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {menu && (
        <div className="w-[80%]  border-blue border-2 rounded-xl text-secondary mx-4 md:w-[70%]">
          <div className="p-3 md:px-20 ">
            <form onSubmit={handleChangeUpdate}>
              <div className="flex flex-col my-2 gap-2">
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="firstname" className="text-blue font-bold">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    placeholder={firstname}
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="lastname" className="text-blue font-bold">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    placeholder={lastname}
                    value={formData.lastname || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="nickname" className="text-blue font-bold">
                    Pseudo
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    placeholder={nickname}
                    value={formData.nickname || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="email" className="text-blue font-bold">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder={email}
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="adress" className="text-blue font-bold">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="adress"
                    placeholder={adress}
                    value={formData.adress || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="birthdate" className="text-blue font-bold">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    placeholder={birthdate?.split("T")[0]}
                    value={formData.birthdate?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between mx-6">
                  <label htmlFor="registerDate" className="text-blue font-bold">
                    Date de création de compte
                  </label>
                  <input
                    type="date"
                    id="registerDate"
                    placeholder={registerDate?.split("T")[0]}
                    value={formData.registerDate?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="input bg-neutral-300 input-xs  max-w-xs focus:bg-secondary focus:text-green border-2"
                  />
                </div>
                <div className="flex flex-col my-2 mx-6 gap-1 text-blue font-bold">
                  <p>Genre</p>
                  <div className="flex flex-col my-2 gap-1">
                    <div className="form-control">
                      <label className="cursor-pointer label flex  gap-1 mx-6">
                        <span className="place-self-start text-secondary">
                          Non-binaire
                        </span>
                        <input
                          type="checkbox"
                          id="genderId"
                          checked={formData.genderId === 3}
                          onChange={handleCheckBoxNbGenre}
                          className="checkbox checkbox-accent place-self-end"
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="cursor-pointer label flex  gap-1 mx-6">
                        <span className="place-self-start text-secondary">
                          Masculin
                        </span>
                        <input
                          type="checkbox"
                          id="genderId"
                          checked={formData.genderId === 2}
                          onChange={handleCheckBoxMasculinGenre}
                          className="checkbox checkbox-accent place-self-end"
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="cursor-pointer label flex gap-1 mx-6">
                        <span className="place-self-start text-secondary">
                          Féminin
                        </span>
                        <input
                          type="checkbox"
                          id="genderId"
                          checked={formData.genderId === 1}
                          onChange={handleCheckBoxFemininGenre}
                          className="checkbox checkbox-accent place-self-end"
                        />
                      </label>
                    </div>
                  </div>
                  <p>Rôle</p>
                  <div className="flex flex-col my-2 gap-1">
                    <div className="form-control">
                      <label className="cursor-pointer label flex gap-1 mx-6">
                        <span className="place-self-start text-secondary">
                          Admin
                        </span>
                        <input
                          type="checkbox"
                          id="roles"
                          checked={formData.roles === "admin"}
                          onChange={handleCheckBoxAdminUser}
                          className="checkbox checkbox-accent place-self-end"
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="cursor-pointer label flex gap-1 mx-6">
                        <span className="place-self-start text-secondary">
                          User
                        </span>
                        <input
                          type="checkbox"
                          id="roles"
                          value="userStandard"
                          checked={formData.roles === "userStandard"}
                          onChange={handleCheckBoxAdminUser}
                          className="checkbox checkbox-accent place-self-end"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {data.map((vehicle) => (
                  <div
                    className="flex flex-col my-2 gap-1"
                    key={vehicle.serial}
                  >
                    <div className="flex flex-col justify-between sm:flex-row mx-6 gap1">
                      <span className="text-blue font-bold">
                        Modèle du véhicule
                      </span>
                      <p className="input bg-neutral-300 input-xs  max-w-xs  border-2">
                        {vehicle.model}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between sm:flex-row mx-6 gap1">
                      <span className="text-blue font-bold">
                        Immatriculation
                      </span>
                      <p className="input bg-neutral-300 input-xs  max-w-xs  border-2">
                        {vehicle.serial}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-around">
                  <button
                    onClick={handleModal}
                    type="button"
                    className="my-3 mx-auto btn bg-rose-700 bg-opacity-75 border-none text-primary"
                  >
                    Supprimer
                  </button>
                  <button
                    type="submit"
                    className="my-3 mx-auto btn bg-blue text-primary border-none border-[3px]"
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
                        <p>Vous allez supprimez cet Utilisateur !</p>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}
ManageUserCard.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  adress: PropTypes.string,
  birthdate: PropTypes.string.isRequired,
  registerDate: PropTypes.string.isRequired,
  genderId: PropTypes.number,
  roles: PropTypes.string,
  userId: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
ManageUserCard.defaultProps = {
  firstname: "",
  lastname: "",
  adress: "",
  genderId: 0,
  roles: 0,
};
export default ManageUserCard;
