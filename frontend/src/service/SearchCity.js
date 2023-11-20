import axios from "axios";

async function searchCity(address) {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=geojson`
    );
    return res.data.features[0].geometry.coordinates;
  } catch (err) {
    return console.error(err);
  }
}

const newCoordinates = async (address) => {
  const coordinates = await searchCity(address);
  localStorage.setItem("homeChange", true);
  return coordinates.reverse();
};

export default newCoordinates;
