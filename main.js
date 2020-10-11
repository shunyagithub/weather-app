// if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
// }

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
const clearSky = document.getElementById("clear-sky");
const rain = document.getElementById("rain");
const snow = document.getElementById("snow");
const thunderstorm = document.getElementById("thunderstorm");
const mist = document.getElementById("mist");
const clouds = document.getElementById("broken-clouds");
const body = document.body;

const weathers = [clearSky, rain, clouds, snow, thunderstorm, mist];

// Prepare openweathermap.org request

const  API_KEY  = process.env.API_KEY;

console.log(API_KEY)

let xml = new XMLHttpRequest();

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const unitsMetric = "&units=metric";
const unitsImperial = "&units=imperial";
// const apikey = "&APPID=d4d9dff7aac7ef697172af5cc9bf274e";

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const chosenCity = cityInput.value;

  if (btnCelsius.classList.contains("active")) {
    xml.open("GET", url + chosenCity + unitsMetric + API_KEY);
    xml.send();
  } else if (btnFahrenheit.classList.contains("active")) {
    xml.open("GET", url + chosenCity + unitsImperial + API_KEY);
    xml.send();
  }
  cityForm.reset();
});

xml.onreadystatechange = () => {
  if (xml.readyState === 4) {
    if (xml.status === 404) {
      return (errorText.textContent = "City Not Found");
    }

    const respons = JSON.parse(xml.response);

    const weatherName = respons.weather[0].main;

    weatherCondition.textContent = weatherName;
    locationName.textContent = respons.name;
    temperature.textContent = Math.floor(respons.main.temp) + "° ";
    minMaxTemp.textContent =
      Math.floor(respons.main.temp_min) +
      "°  / " +
      Math.floor(respons.main.temp_max) +
      "° ";
    humidity.textContent = respons.main.humidity + "%";

    if (weatherName === "Clear") {
      switchWeather(clearSky);
      body.style.background = "#fffef4";
    } else if (weatherName === "Rain") {
      switchWeather(rain);
      body.style.background = "#F4FFFE";
    } else if (weatherName === "Clouds") {
      switchWeather(clouds);
      body.style.background = "#F2F2F2";
    } else if (weatherName === "Snow") {
      switchWeather(snow);
      body.style.background = "#E6FFF6";
    } else if (weatherName === "Thunderstorm") {
      switchWeather(thunderstorm);
      body.style.background = "#E5E5E5";
    } else {
      switchWeather(mist);
      body.style.background = "#FFFFFF";
    }
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

// Switch Weather Icons
function removeShow() {
  for (let eachWeather of weathers) {
    eachWeather.classList.remove("show");
  }
}

function addShow(target) {
  target.classList.add("show");
}

function switchWeather(target) {
  const tl = gsap
    .timeline({})
    .to(".show", {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    })
    .add(removeShow())
    .to(target, {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      onComplete: addShow(target),
    });
}
