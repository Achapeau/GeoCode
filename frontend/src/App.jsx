import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { CurrentCenterMapContextProvider } from "./contexts/CurrentCenterMap";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { VehicleListContextProvider } from "./contexts/VehicleListContext";
import { FavouriteContextProvider } from "./contexts/FavouriteContext";

import AppRoutes from "./Routes/AppRoutes";
import NavBarTop from "./components/NavBarTop";
import BottomNavBar from "./components/BottomNavBar";
import ModalInfo from "./components/accueil/ModalInfo";
import ModalConnexion from "./components/accueil/ModalConnexion";
import ModalInscription from "./components/accueil/ModalInscription";

import "./fonts/Roboto-Regular.ttf";
import "./fonts/RobotoSlab-Regular.ttf";
import NavBarDesktop from "./components/NavBarDesktop";

function App() {
  const [modalInfoIsVisible, setModalInfoIsVisible] = useState(false);
  const [modalConnexionIsVisible, setModalConnexionIsVisible] = useState(false);
  const [modalInscriptionIsVisible, setModalInscriptionIsVisible] =
    useState(false);
  useEffect(() => {
    const hasBeenVisited = localStorage.getItem("visited");
    if (!hasBeenVisited) {
      setModalInfoIsVisible(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  const toggleModalInfo = () => {
    setModalInfoIsVisible(!modalInfoIsVisible);
  };
  const toggleModalConnexion = () => {
    setModalConnexionIsVisible(!modalConnexionIsVisible);
  };
  const toggleModalInscritpion = () => {
    setModalInscriptionIsVisible(!modalInscriptionIsVisible);
  };
  return (
    <BrowserRouter>
      <FavouriteContextProvider>
        <VehicleListContextProvider>
          <CurrentUserContextProvider>
            <CurrentCenterMapContextProvider>
              <div className="flex-grow relative max-w-6xl flex flex-col bg-primary">
                <NavBarTop
                  toggleModalInfo={toggleModalInfo}
                  toggleModalConnexion={toggleModalConnexion}
                />
                <NavBarDesktop
                  toggleModalInfo={toggleModalInfo}
                  toggleModalConnexion={toggleModalConnexion}
                />
                <AppRoutes />
                <BottomNavBar />
                {modalInfoIsVisible && (
                  <ModalInfo toggleModalInfo={toggleModalInfo} />
                )}
                {modalConnexionIsVisible && (
                  <ModalConnexion
                    toggleModalConnexion={toggleModalConnexion}
                    toggleModalInscritpion={toggleModalInscritpion}
                  />
                )}
                {modalInscriptionIsVisible && (
                  <ModalInscription
                    toggleModalConnexion={toggleModalConnexion}
                    toggleModalInscritpion={toggleModalInscritpion}
                  />
                )}
              </div>
            </CurrentCenterMapContextProvider>
          </CurrentUserContextProvider>
        </VehicleListContextProvider>
      </FavouriteContextProvider>
    </BrowserRouter>
  );
}

export default App;
