import { useEffect, useState } from "react";
import expressAPI from "../service/expressAPI";

import StationCard from "../components/StationList/StationCard";
import { useCurrentMapContext } from "../contexts/CurrentCenterMap";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

function StationList() {
  const { coordinates } = useCurrentMapContext();
  const { setFavourites } = useFavouriteContext();
  const { user } = useCurrentUserContext();

  const [data, setData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(6);
  const [filter, setFilter] = useState(false);
  const [brands, setBrands] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("0");

  useEffect(() => {
    try {
      (async () => {
        const [latitude, longitude] = coordinates;

        if (user) {
          const favouritesResult = await expressAPI.get(
            `/favourites/${longitude}/${latitude}/${user.id}`
          );
          setFavourites(favouritesResult.data);
        }

        const request = {
          distance,
          latitude,
          longitude,
        };

        const stationResult = await expressAPI.post(
          `/station/station-list`,
          request
        );

        setData(stationResult.data);
        setSavedData(stationResult.data);
        setLoading(false);

        const filterBrand = [];
        stationResult.data.forEach((obj) => {
          if (!filterBrand.includes(obj.name)) {
            filterBrand.push(obj.name);
          }
          setBrands(filterBrand);
        });
      })();
    } catch (err) {
      console.error(err);
    }
  }, [distance]);

  const filterResult = () => {
    const filteredDataBrands = savedData
      .filter((item) => item.name === selectedBrand || selectedBrand === "0")
      .filter((item) => {
        if (isChecked) {
          return item.condition_acces.match(/libre/gi);
        }
        return true;
      });

    setData(filteredDataBrands);

    setFilter(!filter);
  };

  const handleBrands = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleAcess = () => {
    setIsChecked(!isChecked);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  return (
    <div className="bg-primary flex flex-col items-center lg:min-h-[90vh] lg:mb-0 min-h-[80vh] my-[10vh] z-0">
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
        <div className="flex flex-grow flex-col items-center justify-evenly text-xl font-bold lg:w-1/2">
          <div className="flex-grow w-96 flex flex-col justify-evenly items-center ">
            <div className="w-full  flex flex-col gap-2 border-b-2 border-green px-6 pb-3 my-3">
              <h1 className="text-secondary">Distance maximum</h1>
              <input
                type="range"
                min={2}
                max={50}
                step={2}
                value={distance}
                onChange={handleDistanceChange}
                className="range bg-secondary "
              />
              <p className="text-blue text-center">{distance} km</p>
            </div>

            <div className="w-full flex flex-col gap-2 border-b-2 border-green px-6 pb-3 my-3">
              <label htmlFor="brand" className="text-secondary">
                Selectionnez le nom de l'Enseigne
              </label>
              <select
                name="brand"
                id="brand"
                className="select bg-neutral-300 text-secondary focus:bg-primary focus:text-blue"
                onChange={handleBrands}
                defaultValue={selectedBrand}
              >
                <option value="0">Toutes les enseignes</option>
                {brands.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full flex flex-col gap-2 border-b-2 border-green px-6 pb-3 my-3">
              <h1 className="text-secondary">Type d'accès</h1>
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  name="libre"
                  id="libre"
                  className="w-6 h-6"
                  checked={isChecked}
                  onChange={handleAcess}
                />
                <label htmlFor="libre" className="text-secondary">
                  Accès libre uniquement
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-24">
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
      {loading && <p>Chargement...</p>}
      {!loading && !filter && (
        <div className="flex lg:flex-grow flex-wrap justify-center lg:gap-6  lg:mt-6 gap-4 mt-4">
          {data.map((station) => (
            <StationCard
              key={station.id}
              stationId={station.id}
              nomStation={station.nom_station}
              adresseStation={station.adresse_station}
              distance={station.distance.toFixed(2)}
              name={station.name}
              conditionAcces={station.condition_acces}
              reservation={station.reservation}
              bornes={station.nbre_pdc}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StationList;
