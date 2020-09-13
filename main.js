// Access DOM elements
const weatherCondition = document.getElementById("weather__condition");
const locationName = document.getElementById("location__name");
const cityForm = document.getElementById("city__form");
const cityInput = document.getElementById("city");
const errorText = document.getElementById("error__text");
const temperature = document.getElementById("current__temperature");
const humidity = document.getElementById("humidity");
const minMaxTemp = document.getElementById("minmax__temperature");
const btnCelsius = document.getElementById("celsius");
const btnFahrenheit = document.getElementById("fahrenheit");

// Prepare openweathermap.org request
let xml = new XMLHttpRequest();

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const unitsMetric = "&units=metric";
const unitsImperial = "&units=imperial";
const apikey = "&APPID=d4d9dff7aac7ef697172af5cc9bf274e";

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const chosenCity = cityInput.value;

  if (btnCelsius.classList.contains("active")) {
    xml.open("GET", url + chosenCity + unitsMetric + apikey);
    xml.send();
  } else if (btnFahrenheit.classList.contains("active")) {
    xml.open("GET", url + chosenCity + unitsImperial + apikey);
    xml.send();
  }
});

xml.onreadystatechange = () => {
  if (xml.readyState === 4) {
    if (xml.status === 404) {
      return (errorText.textContent = "City Not Found");
    }

    const respons = JSON.parse(xml.response);

    weatherCondition.textContent = respons.weather[0].main;
    locationName.textContent = respons.name;
    temperature.textContent = Math.floor(respons.main.temp) + "° ";
    minMaxTemp.textContent =
      Math.floor(respons.main.temp_min) +
      "°  / " +
      Math.floor(respons.main.temp_max) +
      "° ";
    humidity.textContent = respons.main.humidity + "%";
  }
};

// Celsius and Fahrenheit

btnFahrenheit.addEventListener("click", () => {
  btnCelsius.classList.remove("active");
  btnFahrenheit.classList.add("active");
});

btnCelsius.addEventListener("click", () => {
  btnCelsius.classList.add("active");
  btnFahrenheit.classList.remove("active");
});
