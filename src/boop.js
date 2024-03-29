function updateWeatherInfo(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let weatherConditions = document.querySelector("#conditions");
  weatherConditions.innerHTML = response.data.condition.description;

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${response.data.temperature.humidity}%`;
  let windValue = document.querySelector("#windspeed");
  windValue.innerHTML = `${response.data.wind.speed}m/sec`;
  let iconElement = document.querySelector("#temp-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "7284tb793b63a4fb3a7aacc794o38a02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function submitSearchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function fixDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let fixedDay = days[day];
  return `${fixedDay}, ${hours}:${minutes} ||`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearchForm);

let currentDateElement = document.querySelector("#current-date-time");
let currentDateTime = new Date();
currentDateElement.innerHTML = fixDate(currentDateTime);

searchCity("Manila");

console.log(currentDateTime);
console.log(currentDateTime.getMinutes());
