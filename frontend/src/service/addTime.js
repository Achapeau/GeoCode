function add30mins(timeString) {
  const [hoursStr, minutesStr] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const totalMinutes = hours * 60 + minutes + 30;
  const newHours =
    Math.floor(totalMinutes / 60) > 23 ? 0 : Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  const newHoursStr = String(newHours).padStart(2, "0");
  const newMinutesStr = String(newMinutes).padStart(2, "0");

  return `${newHoursStr}:${newMinutesStr}`;
}

export default add30mins;
