import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import expressAPI from "../service/expressAPI";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

function ProfilDetailsPage() {
  const { user, setUser } = useCurrentUserContext();
  const [changeValide, setChangeValide] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    id: user.id,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
  });
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const regexPassword =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+−*/=<>%!@#$^&;:"'(),.~_])[A-Za-z\d+−*/=<>%!@#$^&;:"'(),.~_]{8,}$/g;
  const [newProfil, setNewProfil] = useState({
    adress: user.adress,
    birthdate: user.birthdate?.split("T")[0],
    email: user.email,
    firstname: user.firstname,
    genderId: user.genderId,
    lastname: user.lastname,
    username: user.username,
    profilePic: user.profilePic,
    id: user.id,
    roles: user.roles,
  });

  const handleModal = () => setDeleteConfirmation(!deleteConfirmation);

  const handleChange = (e) => {
    if (e.target.id === "genderId") {
      setNewProfil({
        ...newProfil,
        [e.target.id]: parseInt(e.target.value, 10),
      });
    } else {
      setNewProfil({ ...newProfil, [e.target.id]: e.target.value });
    }
  };

  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.id]: e.target.value });
  };

  const handleCheckPassword = (e) => {
    setConfirmPassword({ ...confirmPassword, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (
      confirmPassword.confirmPassword &&
      confirmPassword.confirmPassword === password.password
    ) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }
  }, [password, confirmPassword]);

  const handlePass = () => {
    setConfirmation(!confirmation);
  };

  const handleConfirmation = () => {
    setConfirmation(false);
    expressAPI
      .put("/user/newpassword", password)
      .then((res) => {
        if (res.status === 201) {
          setChangeValide(true);
        }
      })
      .catch((err) => console.error(err));
    setPassword({ password: "", id: newProfil.id });
    setConfirmPassword({ confirmPassword: "" });
  };

  const handleChangeData = () => {
    expressAPI
      .put("/user/update", newProfil)
      .then((res) => {
        if (res.status === 201) {
          setChangeValide(true);
          localStorage.setItem("user", JSON.stringify(newProfil));
          setUser(newProfil);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCloseValidate = () => setChangeValide(false);

  const handleDelete = () => {
    expressAPI.delete(`/user/${newProfil.id}`).then((res) => {
      if (res.status === 204) {
        expressAPI.get("/auth/logout").then((resp) => {
          if (resp.status === 200) {
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
          } else {
            res.status(500).send("impossible de se deconnecter ");
          }
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="bg-primary flex flex-col gap-3 items-center justify-evenly lg:min-h-[90vh] lg:mb-0 min-h-[80vh] my-[10vh] z-0">
      {newProfil.profilePic ? (
        <img
          className="lg:h-52 lg:w-52 w-40 h-40 rounded-full mt-2"
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/users/${
            newProfil.profilePic
          }`}
          alt="illustration de l'utilisateur"
        />
      ) : (
        <svg
          width="512px"
          height="512px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#21A89A"
          className="lg:h-52 lg:w-52 w-40 h-40"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
            stroke="#21A89A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
            stroke="#21A89A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <div className="flex-grow grid grid-cols-[1fr_2fr] gap-3 items-center lg:w-1/2 lg:max-h-[50%] w-[22rem] text-secondary">
        <div className="col-span-2 flex justify-between">
          <p className="font-bold text-blue text-lg">Sexe</p>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id="genderId"
                name="1"
                value="1"
                checked={newProfil.genderId === 1}
                onChange={handleChange}
              />
              <p>Masculin</p>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id="genderId"
                name="2"
                value="2"
                checked={newProfil.genderId === 2}
                onChange={handleChange}
              />
              <p>Féminin</p>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id="genderId"
                name="3"
                value="3"
                checked={newProfil.genderId === 3}
                onChange={handleChange}
              />
              <p>Non-binaire</p>
            </div>
          </div>
        </div>
        <label htmlFor="firstName" className="font-bold text-blue text-lg">
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          placeholder={newProfil.lastname}
          value={newProfil.lastname || ""}
          onChange={handleChange}
          className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
        />
        <label htmlFor="lastName" className="font-bold text-blue text-lg">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          placeholder={newProfil.firstname}
          value={newProfil.firstname || ""}
          onChange={handleChange}
          className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
        />
        <label htmlFor="userName" className="font-bold text-blue text-lg">
          Pseudonyme
        </label>
        <input
          type="text"
          id="username"
          placeholder={newProfil.username}
          value={newProfil.username || ""}
          onChange={handleChange}
          className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
        />
        <label htmlFor="eMail" className="font-bold text-blue text-lg">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder={newProfil.email}
          value={newProfil.email || ""}
          onChange={handleChange}
          className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
        />
        <label htmlFor="birthdate" className="font-bold text-blue text-lg">
          Date de naissance
        </label>
        <input
          type="date"
          id="birthdate"
          placeholder={newProfil.birthdate?.split("T")[0]}
          value={newProfil.birthdate?.split("T")[0]}
          onChange={handleChange}
          className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
        />
        <label htmlFor="address" className="font-bold text-blue text-lg">
          Adresse
        </label>
        <input
          type="text"
          id="adress"
          placeholder={newProfil.adress}
          value={newProfil.adress || ""}
          onChange={handleChange}
          className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
        />
        <label htmlFor="password" className="font-bold text-blue text-lg">
          Mot de passe
        </label>
        <div className="flex items-center justify-between">
          <div
            data-tip="min 8 char. dont 1 chiffre, 1 majuscule, 1 spécial"
            className="tooltip tooltip-accent "
          >
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={password.password}
              onChange={handleChangePassword}
              className={`input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary ${
                password.password.match(regexPassword)
                  ? "border-blue"
                  : "border-rose-700 border-opacity-75"
              }`}
            />
          </div>
          <button type="button" onClick={handlePass}>
            <svg
              width="64px"
              height="64px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color={confirmation ? "#525B5A" : "#21A89A"}
              className="lg:h-14 h-10"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                stroke={confirmation ? "#525B5A" : "#21A89A"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 21.168V14l4-7 4 7v7.168"
                stroke={confirmation ? "#525B5A" : "#21A89A"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 14s1.127 1 2 1 2-1 2-1 1.127 1 2 1 2-1 2-1"
                stroke={confirmation ? "#525B5A" : "#21A89A"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {confirmation && (
          <>
            <label htmlFor="password" className="font-bold text-blue text-lg">
              Confirmation
            </label>
            <div className="flex items-center justify-between">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
                value={confirmPassword.password}
                onChange={handleCheckPassword}
                className="input bg-neutral-300 lg:input-md input-sm w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
              />
              {passwordCheck && (
                <button type="button" onClick={handleConfirmation}>
                  <svg
                    width="64px"
                    height="64px"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#21A89A"
                    className="lg:h-14 h-10"
                  >
                    <path
                      d="M7 12.5l3 3 7-7"
                      stroke="#21A89A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                      stroke="#21A89A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-evenly w-full my-6">
        <button
          type="button"
          className="btn bg-rose-700 bg-opacity-75 text-primary border-none"
          onClick={handleModal}
        >
          Supprimer
        </button>
        <button
          type="button"
          className="btn bg-blue text-primary border-none"
          onClick={handleChangeData}
        >
          Enregistrer
        </button>
        {deleteConfirmation && (
          <div className="bg-secondary bg-opacity-60 fixed inset-0 h-screen flex justify-center items-center">
            <div className="bg-primary flex flex-col items-center rounded-xl text-lg font-bold w-80 gap-4">
              <h3 className="bg-rose-700 bg-opacity-75 p-3 w-full text-primary rounded-t-xl">
                Attention !
              </h3>
              <div className="flex flex-col p-3 gap-3 text-secondary w-full text-base">
                <p>Supression définitive du compte !</p>
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
        {changeValide && (
          <div className="bg-secondary bg-opacity-60 fixed inset-0 h-screen flex justify-center items-center z-30">
            <div className="bg-primary p-6 flex flex-col items-center gap-6 rounded-xl">
              <h3 className="text-blue font-bold text-lg">
                Votre profil à bien été mis à jour !
              </h3>
              <p className="text-2xl">🚀🚀</p>
              <button
                type="button"
                onClick={handleCloseValidate}
                className="btn border-none bg-blue text-primary font-bold"
              >
                fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilDetailsPage;
