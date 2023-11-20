import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const FavouriteContext = createContext();

export const useFavouriteContext = () => useContext(FavouriteContext);

export function FavouriteContextProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const memoizedUser = useMemo(() => {
    return { favourites, setFavourites };
  }, [favourites]);

  return (
    <FavouriteContext.Provider value={memoizedUser}>
      {children}
    </FavouriteContext.Provider>
  );
}
FavouriteContextProvider.propTypes = {
  children: PropTypes.node,
};
FavouriteContextProvider.defaultProps = {
  children: "",
};
