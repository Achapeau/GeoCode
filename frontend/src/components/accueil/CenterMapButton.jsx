import React, { useCallback } from "react";
import Proptypes from "prop-types";

function CenterMapButton({ map, center }) {
  const zoom = 13;

  const onClick = useCallback(() => {
    if (center.length) map.flyTo(center, zoom);
  }, [map, center]);

  return (
    <div className="absolute z-50 bottom-2 w-full flex">
      <button
        className="btn btn-sm text-primary text-base w-32 bg-blue border-none shadow-xl my-3 mx-auto"
        type="button"
        onClick={onClick}
      >
        recentrer
      </button>
    </div>
  );
}

CenterMapButton.propTypes = {
  map: Proptypes.shape({ flyTo: Proptypes.func }).isRequired,
  center: Proptypes.arrayOf(Proptypes.number).isRequired,
};

export default CenterMapButton;
