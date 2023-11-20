import { useEffect } from "react";

import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import { useCurrentMapContext } from "../contexts/CurrentCenterMap";

import StationCard from "../components/StationList/StationCard";
import expressAPI from "../service/expressAPI";

function FavoriteStationList() {
  const { user } = useCurrentUserContext();
  const { favourites, setFavourites } = useFavouriteContext();
  const { coordinates } = useCurrentMapContext();
  const [latitude, longitude] = coordinates;

  useEffect(() => {
    (async () => {
      const result = await expressAPI.get(
        `/favourites/${longitude}/${latitude}/${user.id}`
      );
      setFavourites(result.data);
    })();
  }, []);

  return (
    <div className="bg-primary flex flex-col lg:gap-6 items-center lg:min-h-[90vh] lg:mb-0 min-h-[80vh] my-[10vh] z-0">
      <div className="lg:flex hidden mt-6 w-full justify-center">
        <h2 className=" w-2/3 bg-teal-500 text-center p-4 rounded-xl shadow-lg text-xl font-bold text-primary">
          Mes Favoris
        </h2>
      </div>
      {favourites?.length ? (
        <div className="flex justify-center flex-wrap lg:gap-6 gap-4 mt-4">
          {favourites.map((elem) => (
            <StationCard
              key={elem.id}
              stationId={elem.stationId}
              nomStation={elem.nomStation}
              adresseStation={elem.adresseStation}
              distance={elem.distance.toFixed(2)}
              name={elem.brandName}
              conditionAcces={elem.conditionAcces}
              bornes={elem.nbrePdc}
              reservation={elem.reservation}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-grow justify-center items-center mt-8 w-96">
          <div className="border-2 border-blue w-full mx-6 rounded-lg flex flex-col">
            <p className="bg-blue rounded-t-md p-2 text-xl text-primary">
              Vous n'avez pas encore de favoris
            </p>
            <div className="p-4 text-lg">
              <div className="flex items-center">
                <p className="text-secondary w-52">
                  Cliquez sur cette magnifique icone
                </p>
                <svg
                  width="60px"
                  height="60px"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#21A89A"
                  className=""
                  fill="none"
                >
                  <path
                    d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
                    stroke="#21A89A"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-secondary">
                pour ajouter des stations ici et y accèder plus rapidement pour
                vos prochaines réservation
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoriteStationList;
