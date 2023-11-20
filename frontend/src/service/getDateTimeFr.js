const getDateFr = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("fr");
};

export default getDateFr;
