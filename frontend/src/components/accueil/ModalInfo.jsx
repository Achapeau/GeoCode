import PropTypes from "prop-types";
import MapBlueVersion from "../../assets/images/MapBlueVersion.png";
import taskL from "../../assets/images/taskL.png";
import logoOriginal from "../../assets/images/logoOriginal.png";
import crossCloseWhite from "../../assets/images/crossCloseWhite.png";

function ModalInfo({ toggleModalInfo }) {
  return (
    <div className="fixed z-30 inset-0 h-screen bg-secondary bg-opacity-40 flex justify-center items-center ">
      <div className="bg-primary rounded-xl shadow-md w-80 flex flex-col gap-3">
        <div className="bg-blue flex justify-between items-center rounded-t-xl p-3">
          <div className="text-xl text-primary font-bold">Informations:</div>
          <button type="button" onClick={toggleModalInfo}>
            <img src={crossCloseWhite} alt="closeWindow" className="w-8" />
          </button>
        </div>
        <div className="flex flex-col gap-4 text-secondary p-2">
          <div className="flex items-center border-b-2  gap-2 px-1 py-2">
            <img
              src={logoOriginal}
              alt="LogoEntrepriseOriginal"
              className="w-12 h-12"
            />
            <p className=" px-2">
              GéoCode vous propose un système afin de visualiser et réserver les
              bornes de recharges autour de vous
            </p>
          </div>
          <div className="flex items-center border-b-2  gap-2 px-1 py-2">
            <img src={MapBlueVersion} alt="IconMapBlue" className="w-12 h-12" />
            <p className=" px-2">
              Vous permet de visualiser les bornes sur la carte
            </p>
          </div>
          <div className="flex items-center border-b-2  gap-2 px-1 py-2">
            <img src={taskL} alt="IconListBlue" className="w-12 h-12" />
            <p className=" px-2">
              Vous permet de visualiser les bornes sous forme de liste
            </p>
          </div>
          <div className="flex items-center border-b-2  gap-2 px-1 py-2">
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#21A89A"
              width="50px"
              height="50px"
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
            <p className="w-full px-2">
              Vous permet d'accèder à votre profil et vos véhicule <br />
              (sous réserve d`inscription)
            </p>
          </div>
          <div className="flex items-center border-b-2  gap-2 px-1 py-2 text-xs ml-[36px]">
            <p className="">*</p>
            <div className="flex flex-col">
              <p className="px-2">
                En cas de problèmes extérieurs causant un dysfonctionnement des
                bornes, l`entreprise n`assumera aucune responsabilité
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ModalInfo.propTypes = {
  toggleModalInfo: PropTypes.func.isRequired,
};
export default ModalInfo;
