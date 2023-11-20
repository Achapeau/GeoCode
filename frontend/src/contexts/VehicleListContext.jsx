import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const VehicleListContext = createContext();

export const useVehicleListContext = () => useContext(VehicleListContext);

export function VehicleListContextProvider({ children }) {
  const [vehicleList, setVehicleList] = useState(
    JSON.parse(localStorage.getItem("vehicles"))
  );

  const memoizedUser = useMemo(() => {
    return { vehicleList, setVehicleList };
  }, [vehicleList]);

  return (
    <VehicleListContext.Provider value={memoizedUser}>
      {children}
    </VehicleListContext.Provider>
  );
}
VehicleListContextProvider.propTypes = {
  children: PropTypes.node,
};
VehicleListContextProvider.defaultProps = {
  children: "",
};
