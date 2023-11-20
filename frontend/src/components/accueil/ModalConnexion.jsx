import PropTypes from "prop-types";
import { useState } from "react";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import { useVehicleListContext } from "../../contexts/VehicleListContext";
import expressApi from "../../service/expressAPI";

function ModalConnexion({ toggleModalConnexion, toggleModalInscritpion }) {
  const [formDataConnexion, setFormDataConnexion] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const { setUser } = useCurrentUserContext();
  const { setVehicleList } = useVehicleListContext();

  const handleUsernameChange = (e) => {
    setFormDataConnexion({
      ...formDataConnexion,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setFormDataConnexion({
      ...formDataConnexion,
      password: e.target.value,
    });
  };
  const handleOpenInscription = () => {
    toggleModalConnexion();
    toggleModalInscritpion();
  };

  const checkLoginForm = (obj) => {
    const values = [];
    let message = "";
    for (const [key, value] of Object.entries(obj)) {
      if (!value.length) {
        values.push(` ${key}`);
      }
    }

    if (values.length) {
      if (values.length === 1) {
        message = `Completer ${values[0]}.`;
      } else {
        message = `Compreleter ${[...values]}.`;
      }
    }

    return message.replaceAll("login", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = checkLoginForm(formDataConnexion);
    if (!errorMessage.length) {
      try {
        const user = await expressApi.post(`/auth/signin`, {
          nickname: formDataConnexion.username,
          password: formDataConnexion.password,
        });

        setUser(user.data);
        localStorage.setItem("user", JSON.stringify(user.data));

        toggleModalConnexion();

        const list = await expressApi.get(
          `/vehicle/owned-vehicles/${user.data.id}`
        );
        setVehicleList(list.data);
        localStorage.setItem("vehicles", JSON.stringify(list.data));
      } catch (err) {
        console.error(err);
        setLoginError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } else {
      setLoginError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-secondary bg-opacity-40 z-20">
      <div className="bg-primary rounded-xl w-80 flex flex-col">
        <div className="flex items-center justify-between bg-blue rounded-t-xl p-3">
          <h3 className="text-xl text-primary font-bold">Connexion :</h3>
          <button type="button" onClick={toggleModalConnexion}>
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
        <div className="p-3 flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <label htmlFor="username" className="text-blue font-bold text-lg">
                Nom d'utilisateur :
              </label>
              <br />
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="text"
                id="formDataConnexion.username"
                name="username"
                placeholder="Entrez votre nom d'utilisateur"
                value={formDataConnexion.username || ""}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-blue font-bold text-lg">
                Mot de passe :
              </label>
              <br />
              <input
                className="input bg-neutral-300 w-full focus:border-none focus:bg-blue text-secondary focus:text-primary placeholder-secondary focus:placeholder-primary"
                type="password"
                name="formDataConnexion.password"
                placeholder="Entrez votre mot de passe"
                value={formDataConnexion.password || ""}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <p className="text-xxs text-red-700 mb-1">{loginError}</p>
            <button
              className=" btn btn-sm border-none bg-blue text-primary"
              type="submit"
            >
              Se connecter
            </button>
          </form>

          <p className="text-sm text-secondary">
            Si vous n'êtes pas inscrit sur notre magnifique site vous pouvez
            &nbsp;
            <button
              type="button"
              onClick={handleOpenInscription}
              className="text-blue text-sm underline cursor-pointer"
            >
              créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
ModalConnexion.propTypes = {
  toggleModalConnexion: PropTypes.func.isRequired,
  toggleModalInscritpion: PropTypes.func.isRequired,
};
export default ModalConnexion;
