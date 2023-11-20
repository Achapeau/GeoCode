import PropTypes from "prop-types";

function ReservationStationCard({
  nomStation,
  adresseStation,
  distance,
  charpePointSerial,
  name,
  date,
  startTime,
  endTime,
  handleAnnulation,
  reservationId,
}) {
  return (
    <div className="m-4" key={reservationId}>
      <div className="w-full  py-1 flex flex-col text-base font-bold border-2 border-blue rounded-xl p-3">
        <div className="flex flex-col border-b-2 border-green pb-1 text-lg">
          <h2 className="text-blue">{nomStation}</h2>
          <h3 className="text-secondary">{adresseStation}</h3>
        </div>
        <div className="grid grid-cols-[1fr_2fr] border-b-2 border-green mb-1 gap-y-0.5">
          <p className="text-blue">Distance:</p>
          <p className="text-secondary">{distance} km</p>

          <p className="text-blue">Enseigne:</p>
          <p className="text-secondary">{name}</p>
          <p className="text-blue">Borne:</p>
          <p className="text-secondary ">{charpePointSerial}</p>
          <p className="text-blue">Date</p>
          <p className="text-secondary">{date}</p>
          <p className="text-blue">Debut:</p>
          <p className="text-secondary">{startTime}</p>
          <p className="text-blue">Fin:</p>
          <p className="text-secondary">{endTime}</p>
        </div>
        <div className="flex w-full justify-center m-1">
          <button
            type="button"
            className="btn btn-sm text-primary bg-blue border-0 rounded-lg drop-shadow-lg"
            onClick={handleAnnulation}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationStationCard;

ReservationStationCard.propTypes = {
  nomStation: PropTypes.string.isRequired,
  adresseStation: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  charpePointSerial: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  handleAnnulation: PropTypes.func.isRequired,
  reservationId: PropTypes.number,
};

ReservationStationCard.defaultProps = {
  reservationId: 0,
};
