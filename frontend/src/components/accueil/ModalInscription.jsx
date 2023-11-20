import PropTypes from "prop-types";
import { useState } from "react";

import expressApi from "../../service/expressAPI";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import crossCloseWhite from "../../assets/images/crossCloseWhite.png";

function ModalInscription({ toggleModalInscritpion, toggleModalConnexion }) {
  const [formDataInscription, setFormDataInscription] = useState({
    username: "",
    birthdate: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorValues, setErrorValues] = useState("");
  const [inscriptionDone, setInscriptionDone] = useState(false);
  const { setUser } = useCurrentUserContext();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormDataInscription((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOpenConnexion = () => {
    toggleModalInscritpion();
    toggleModalConnexion();
  };

  const checkSignupForm = (obj) => {
    const values = [];
    let message = "";

    for (const [key, value] of Object.entries(obj)) {
      if (!value.length) {
        values.push(` ${key}`);
      }
    }

    if (values.length) {
      if (values.length === 1) {
        message = `Compléter le champs${values[0]}.`;
      } else {
        message = `Compléter le champs${[...values]}.`;
      }
    }
    if (obj.password !== obj.passwordConfirm) {
      message += "Les mots de passe ne correspondent pas.";
    }
    if (obj.password.length < 8) {
      message += " Longueur minimum 8 caractères.";
    }
    const hasDigit = /\d/.test(obj.password);
    const hasUpperCase = /[A-Z]/.test(obj.password);
    const hasSpecialChar = /[+−*/=<>%!@#$^&;:"'(),.~_]/.test(obj.password);
    if (!hasDigit || !hasUpperCase || !hasSpecialChar) {
      message +=
        " Doit contenir au moins 1 chiffre, 1 majuscule, 1 caractère spécial.";
    }
    return message.replace("_", " ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = checkSignupForm(formDataInscription);
    if (!errorMessage.length) {
      await expressApi
        .post(`/auth/signup`, {
          username: formDataInscription.username,
          birthdate: formDataInscription.birthdate,
          email: formDataInscription.email,
          password: formDataInscription.password,
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          setInscriptionDone(true);
        })
        .catch((err) => {
          setErrorValues(err.response.data);
        });
    } else {
      setErrorValues(errorMessage);
    }
  };

  const toggleInscriptionDone = () => {
    setInscriptionDone(false);
    localStorage.setItem("vehicles", JSON.stringify([]));
    toggleModalInscritpion();
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-secondary bg-opacity-40 z-20 ">
      <div className=" bg-primary rounded-xl w-80 ">
        <div className="flex items-center justify-between bg-blue rounded-t-xl p-3">
          <h3 className="text-xl text-primary font-bold">Inscription :</h3>
          <button type="button" onClick={toggleModalInscritpion}>
            <svg
              width="32px"
              height="32px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#E5E9E7"
            >
              <path
                d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="#E5E9E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="username"
                className="text-blue font-bold text-lg "
              >
                Nom d'utilisateur :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="text"
                id="formDataConnexion.username"
                name="username"
                placeholder="Entrer votre nom d'utilisateur"
                value={formDataInscription.username || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="birthdate"
                className="text-blue font-bold text-lg"
              >
                Date de naissance :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="date"
                id="formDataInscritption.birthdate"
                name="birthdate"
                placeholder="Entrer votre date de naissance"
                value={formDataInscription.birthdate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-blue font-bold text-lg">
                Email :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="email"
                id="formDataInsciption.email"
                name="email"
                placeholder="Entrez votre adresse mail"
                value={formDataInscription.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className="tooltip tooltip-accent"
              data-tip="min 8 char. dont 1 chiffre, 1 majuscule, 1 spécial"
            >
              <label htmlFor="password" className="text-blue font-bold text-lg">
                Mot de passe :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="password"
                id="formDataInscription.password"
                name="password"
                placeholder="Entrez votre mot de passe"
                value={formDataInscription.password || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-blue font-bold text-lg">
                Confirmez votre mot de passe :
              </label>
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="password"
                id="formDataInscription.passwordConfirm"
                name="passwordConfirm"
                placeholder="Vérification du mot de passe"
                value={formDataInscription.passwordConfirm || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm border-none bg-blue text-primary mt-3"
            >
              S'incrire
            </button>
          </form>
          <p className="text-sm text-red-700">{errorValues}</p>

          <p className="text-sm text-secondary">
            Déjà inscrit ? &nbsp;
            <button
              type="button"
              onClick={handleOpenConnexion}
              className="text-blue text-sm underline cursor-pointer"
            >
              se connecter
            </button>
          </p>
        </div>
      </div>
      {inscriptionDone && (
        <div className="fixed z-30 inset-0 h-screen bg-secondary bg-opacity-40 flex justify-center items-center ">
          <div className="bg-primary rounded-xl shadow-md w-80 flex flex-col gap-3">
            <div className="bg-blue flex justify-between items-center rounded-t-xl p-3">
              <div className="text-xl text-primary font-bold">
                Informations:
              </div>

              <button type="button" onClick={toggleInscriptionDone}>
                <img src={crossCloseWhite} alt="closeWindow" className="w-8" />
              </button>
            </div>
            <div className="bg-primary p-6 flex flex-col items-center gap-6 rounded-xl">
              <h3 className="text-blue font-bold text-lg">{`Félicitations ${formDataInscription.username} 🐔`}</h3>
              <p className="text-secondary font-bold">
                Votre inscription a bien été prise en compte !
              </p>
              <p className="text-2xl">🚀🚀</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
ModalInscription.propTypes = {
  toggleModalInscritpion: PropTypes.func.isRequired,
  toggleModalConnexion: PropTypes.func.isRequired,
};
export default ModalInscription;
