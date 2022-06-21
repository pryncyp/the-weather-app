let currentDate = new Date();
function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day}, ${hour}:${minutes}`;

  return formattedDate;
}
let dateLine = document.querySelector(".current-date");
dateLine.innerHTML = formatDate(currentDate);

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function searchCity(city) {
  let apiKey = "38a06bd9c736078109704ba679efbd58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "38a06bd9c736078109704ba679efbd58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function showTemperature(response) {
  let currTempe = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  currTempe.innerHTML = `${temperature}°C`;
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector(".total-input");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#button-current");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Amsterdam");
