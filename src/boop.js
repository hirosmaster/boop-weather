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
  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKeyForecast = "7284tb793b63a4fb3a7aacc794o38a02";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyForecast}&unit=metric`;
  axios(apiUrlForecast).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-container">
   <div class="weather-forecast-day">${formatDay(day.time)}</div>
    <div class="weather-forecast-icon"> <img src="${
      day.condition.icon_url
    }" width=35px /></div>
    <div class="weather-forecast-temps">
    <span> <strong>${Math.round(day.temperature.maximum)}°</strong> </span>
    <span>${Math.round(day.temperature.minimum)}°</span>
  </div>
    </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearchForm);

let currentDateElement = document.querySelector("#current-date-time");
let currentDateTime = new Date();
currentDateElement.innerHTML = fixDate(currentDateTime);

searchCity("Manila");
displayForecast("Manila");
