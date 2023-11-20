import React, { useEffect, useMemo, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";

import { useCurrentMapContext } from "../contexts/CurrentCenterMap";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import ReservationPopUp from "../components/Reservation/ReservationPopUp";
import StationPopup from "../components/accueil/StationPopup";
import expressAPI from "../service/expressAPI";

import iconeBorne from "../assets/images/iconeBorne.png";
import CenterMapButton from "../components/accueil/CenterMapButton";

function Home() {
  const { coordinates, isModalOpen, markers } = useCurrentMapContext();
  const { user } = useCurrentUserContext();
  const { setFavourites } = useFavouriteContext();

  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState({});
  const [map, setMap] = useState(null);

  useEffect(() => {
    try {
      if (map !== null) {
        map.flyTo(coordinates, 14);
      }
      (async () => {
        const [latitude, longitude] = coordinates;

        if (user) {
          const favouritesResult = await expressAPI.get(
            `/favourites/${longitude}/${latitude}/${user.id}`
          );
          setFavourites(favouritesResult.data);
        }
      })();
    } catch (err) {
      console.error(err);
    }
  }, [coordinates]);

  const borneIcon = new Icon({
    iconUrl: iconeBorne,
    iconSize: [35, 40],
  });

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="lg:h-[90vh] h-[80vh] mt-[10vh] z-0"
        center={coordinates}
        zoom={7}
        minZoom={4}
        maxZoom={18}
        ref={setMap}
        zoomControl={false}
      >
        {/* OPEN STREET MAPS HUMANITAIRE TILES */}
        <TileLayer
          attribution='donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
          url="//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup className="your-location rounded-xl">
            <p className="text-secondary text-base font-bold">Vous êtes ici</p>
          </Popup>
        </Marker>
        <MarkerClusterGroup>
          {markers &&
            markers.map((elem) => (
              <Marker
                key={elem.id}
                position={elem.coordonnees}
                icon={borneIcon}
              >
                <Popup className="station-popup rounded-xl">
                  <StationPopup
                    stationId={elem.id}
                    bornes={elem.nbre_pdc}
                    nomStation={elem.nom_station}
                    adresseStation={elem.adresse_station}
                    distance={elem.distance.toFixed(2)}
                    name={elem.name}
                    conditionAcces={elem.condition_acces}
                    reservation={elem.reservation}
                    setReservationOpen={setReservationOpen}
                    reservationOpen={reservationOpen}
                    setSelectedStation={setSelectedStation}
                    className="w-full m-0"
                  />
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    ),
    [coordinates, markers]
  );

  return (
    <>
      {isModalOpen && (
        <div className="absolute z-10 inset-0 mt-[10vh] bg-secondary bg-opacity-40 flex justify-center items-center">
          <div className="rounded-xl bg-primary w-80">
            <div className="bg-blue rounded-t-xl p-3 text-xl text-primary font-bold">
              <p>N'oubliez pas :</p>
            </div>
            <div className="p-4">
              <ul className="flex flex-col gap-4 text-lg text-blue font-bold">
                <li>
                  <h3>Entrez une adresse</h3>
                  <p className="text-secondary text-base">
                    Afin de savoir quelles sont les bornes à proximité
                  </p>
                </li>
                {!user && (
                  <li>
                    <h3>Connectez vous</h3>
                    <p className="text-secondary text-base">
                      Afin d'avoir accès à de nouvelles fonctions
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {map ? <CenterMapButton map={map} center={coordinates} /> : null}
      <div>{displayMap}</div>
      {reservationOpen && (
        <ReservationPopUp
          setIsModalOpen={setReservationOpen}
          isModalOpen={reservationOpen}
          selectedStation={selectedStation}
        />
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
    </>
  );
}

export default Home;
