import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ManageUserCard from "../components/adminSide/ManageUserCard";
import expressApi from "../service/expressAPI";
import "react-toastify/dist/ReactToastify.css";

function ManageUsers() {
  const [data, setData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [filter, setFilter] = useState(false);

  const [userName, setUserName] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [pseudoUser, setPseudoUser] = useState("");
  const [adressUser, setAdressUser] = useState("");
  const [birthdateMin, setBirthdateMin] = useState("");
  const [birthdateMax, setBirthdateMax] = useState("");
  const [registerMin, setRegisterMin] = useState("");
  const [registerMax, setRegisterMax] = useState("");
  const [nbGenre, setNbGenre] = useState(0);
  const [masculinGenre, setMasculinGenre] = useState(0);
  const [femininGenre, setFemininGenre] = useState(0);
  const [adminRole, setAdminRole] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastNameUser(e.target.value);
  };
  const handlePseudo = (e) => {
    setPseudoUser(e.target.value);
  };
  const handleAdress = (e) => {
    setAdressUser(e.target.value);
  };
  const handleBirthdateMin = (e) => {
    setBirthdateMin(e.target.value);
  };
  const handleBirthdateMax = (e) => {
    setBirthdateMax(e.target.value);
  };
  const handleRegisterMin = (e) => {
    setRegisterMin(e.target.value);
  };
  const handleRegisterMax = (e) => {
    setRegisterMax(e.target.value);
  };
  useEffect(() => {
    expressApi
      .get("/admin/user-list")
      .then((res) => {
        setData(res.data);
        setSavedData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChecks = (checkboxName) => {
    switch (checkboxName) {
      case "nb":
        setNbGenre(!nbGenre);
        break;
      case "fem":
        setFemininGenre(!femininGenre);
        break;
      case "masc":
        setMasculinGenre(!masculinGenre);
        break;
      case "admin":
        setAdminRole(!adminRole);
        break;
      case "user":
        setUserRole(!userRole);
        break;
      default:
        break;
    }
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const filterResult = () => {
    const filteredData = savedData.filter((item) => {
      const firstnameMatch = userName
        ? item.firstname && item.firstname.match(new RegExp(userName, "i"))
        : true;

      const lastNameMatch = lastNameUser
        ? item.lastname && item.lastname.match(new RegExp(lastNameUser, "i"))
        : true;

      const pseudoMatch = pseudoUser
        ? item.nickname?.toLowerCase().includes(pseudoUser.toLowerCase())
        : true;

      const addressMatch = adressUser
        ? item.adress?.toLowerCase().includes(adressUser.toLowerCase())
        : true;

      const birthdateMatch =
        birthdateMin === "" || birthdateMax === ""
          ? true
          : item.birth_date &&
            birthdateMin <= item.birth_date &&
            birthdateMax >= item.birth_date;

      const registerMatch =
        registerMin === "" || registerMax === ""
          ? true
          : item.register_date.split("T")[0] &&
            registerMin <= item.register_date.split("T")[0] &&
            registerMax >= item.register_date.split("T")[0];

      const genreMatch =
        !nbGenre ||
        item.gender_id === 3 ||
        (femininGenre && item.gender_id === 1) ||
        (masculinGenre && item.gender_id === 2);

      const roleMatch =
        !adminRole ||
        item.roles === "admin" ||
        (userRole && item.roles === "userStandard");

      return (
        firstnameMatch &&
        lastNameMatch &&
        pseudoMatch &&
        addressMatch &&
        birthdateMatch &&
        registerMatch &&
        genreMatch &&
        roleMatch
      );
    });

    setData(filteredData);
    setFilter(!filter);
  };

  const deleteUser = (id) => {
    expressApi
      .delete(`/remove-user/${id}`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Utilisateur supprimer");
          setData((prevData) => prevData.filter((elem) => elem.id !== id));
        }
      })
      .catch((err) => console.error(err));
  };

  const resetBirthdate = () => {
    setBirthdateMin("");
    setBirthdateMax("");
  };

  const resetRegister = () => {
    setRegisterMax("");
    setRegisterMin("");
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
            <label htmlFor="prenom" className="text-blue">
              Prénom :
            </label>
            <input
              placeholder="Rechercher"
              type="search"
              name="prenom"
              id="prenom"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              onChange={handleUserName}
              value={userName}
            />

            <label htmlFor="nom" className="text-blue font-semibold">
              Nom :
            </label>
            <input
              placeholder="Rechercher"
              type="search"
              name="nom"
              id="nom"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              onChange={handleLastName}
              value={lastNameUser}
            />

            <label htmlFor="pseudo" className="text-blue font-semibold">
              Pseudo :
            </label>
            <input
              placeholder="Rechercher"
              type="search"
              name="pseudo"
              id="pseudo"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              onChange={handlePseudo}
              value={pseudoUser}
            />

            <label htmlFor="adresse" className="text-blue font-semibold">
              Adresse :
            </label>
            <input
              placeholder="Rechercher"
              type="search"
              name="adresse"
              id="adresse"
              className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
              onChange={handleAdress}
              value={adressUser}
            />
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-green p-4">
            <p className="text-blue font-semibold">Date de naissance: </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="birhtdate-min"
                  className="text-blue font-semibold text-lg"
                >
                  Date de début :
                </label>
                <input
                  type="date"
                  name="birhtdate-min"
                  className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
                  id="birhtdate-min"
                  onChange={handleBirthdateMin}
                  value={birthdateMin}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="birhtdate-max"
                  className="text-blue font-semibold text-lg"
                >
                  Date de fin :
                </label>
                <input
                  type="date"
                  name="birhtdate-max"
                  className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
                  id="birhtdate-max"
                  onChange={handleBirthdateMax}
                  value={birthdateMax}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={resetBirthdate}
              className="btn btn-sm bg-blue border-none text-primary"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-green p-4">
            <p className="text-blue font-semibold">Date d'enregistrement :</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="register-min"
                  className="text-blue font-semibold text-lg"
                >
                  Date de début :
                </label>
                <input
                  type="date"
                  name="register-min"
                  id="register-min"
                  className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
                  onChange={handleRegisterMin}
                  value={registerMin}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="register-max"
                  className="text-blue font-semibold text-lg"
                >
                  Date de fin :
                </label>
                <input
                  type="date"
                  name="register-max"
                  id="register-max"
                  className="input bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
                  onChange={handleRegisterMax}
                  value={registerMax}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={resetRegister}
              className="btn btn-sm bg-blue border-none text-primary"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-green p-4">
            <p className="text-blue">Genre</p>
            <div className=" grid lg:grid-cols-3 grid-cols-1 gap-y-2">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="feminin"
                  className="text-secondary text-lg font-semibold "
                >
                  Féminin
                </label>
                <input
                  type="checkbox"
                  name="feminin"
                  checked={femininGenre}
                  onChange={() => handleChecks("fem")}
                  className="checkbox checkbox-accent"
                  id="feminin"
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="masculin"
                  className="text-secondary text-lg font-semibold "
                >
                  Masculin
                </label>
                <input
                  type="checkbox"
                  name="masculin"
                  checked={masculinGenre}
                  onChange={() => handleChecks("masc")}
                  className="checkbox checkbox-accent"
                  id="masculin"
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="non-binary"
                  className="text-secondary text-lg font-semibold "
                >
                  Non-binaire
                </label>
                <input
                  type="checkbox"
                  name="non-binary"
                  checked={nbGenre}
                  onChange={() => handleChecks("nb")}
                  className="checkbox checkbox-accent"
                  id="non-binary"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-2 border-green p-4">
            <p className="text-blue font-semibold">Roles</p>
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="admin"
                  className="text-secondary text-lg font-semibold "
                >
                  Admin
                </label>
                <input
                  type="checkbox"
                  name="admin"
                  checked={adminRole}
                  onChange={() => handleChecks("admin")}
                  className="checkbox checkbox-accent"
                  id="admin"
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="user"
                  className="text-secondary text-lg font-semibold "
                >
                  User
                </label>
                <input
                  type="checkbox"
                  name="user"
                  checked={userRole}
                  onChange={() => handleChecks("user")}
                  className="checkbox checkbox-accent"
                  id="user"
                />
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
      {Boolean(!filter && data.length) && (
        <div className=" lg:mb-0 mb-[11vh] flex flex-wrap justify-center gap-6 mt-3 ">
          {data.map((user) => (
            <ManageUserCard
              key={user.id}
              firstname={user.firstname}
              lastname={user.lastname}
              nickname={user.nickname}
              email={user.email}
              adress={user.adress}
              birthdate={user.birth_date}
              registerDate={user.register_date}
              genderId={user.gender_id}
              roles={user.roles}
              userId={user.id}
              deleteUser={deleteUser}
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

export default ManageUsers;
