let form = document.getElementById("searchForm");
let searchBox = document.getElementById("searchBox");

let city = document.getElementById("city");
let temp = document.getElementById("temp");
let icon = document.getElementById("img-ico");
let weather = document.getElementById("weather");
let range = document.getElementById("range");
let other = document.getElementById("other");
let thermal = document.getElementById("thermal");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
form.addEventListener("submit", onSubmit, true);
addEventListener("DOMContentLoaded", load);


/* función de carga por defecto */
async function load() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=-12.0432&lon=-77.0282&appid=32a225a5535b16e6c832ee5a6f4b2b6f&lang=es`
    );

    const data = await response.json();

    /* main weather*/
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `Min ${toCelsius(data.main.temp_min)}°C / Max ${toCelsius(
      data.main.temp_max
    )}°C`;

    /* other */
    other.innerHTML = "Otros datos";
    thermal.innerHTML = `Sensación termica: ${toCelsius(
      data.main.feels_like
    )}°C`;
    humidity.innerHTML = `Humedad: ${data.main.humidity}%`;
    wind.innerHTML = `Viento: ${toKmh(data.wind.speed)} Km/h`;
  } catch (err) {
    ShowMessage("Sin conexión a internet", "error");
  }
}

/* función para buscar ciudad */
async function search(query) {
  let icon = document.getElementById("img-ico");

  const api = {
    key: "32a225a5535b16e6c832ee5a6f4b2b6f",
    url: "https://api.openweathermap.org/data/2.5/weather",
  };

  try {
    const response = await fetch(
      `${api.url}?q=${query}&appid=${api.key}&lang=es`
    );

    const data = await response.json();

    /* main weather*/
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
    weather.innerHTML = data.weather[0].description;

    /* other*/
    thermal.innerHTML = `Sensación termica: ${toCelsius(
      data.main.feels_like
    )}°C`;
    humidity.innerHTML = `Humedad: ${data.main.humidity}%`;
    wind.innerHTML = `Viento: ${toKmh(data.wind.speed)} Km/h`;
    range.innerHTML = `Min ${toCelsius(data.main.temp_min)}°C / Max ${toCelsius(
      data.main.temp_max
    )}°C`;
  } catch (err) {
    ShowMessage("Ingrese una ciudad valida", "invalid");
  }
}

function onSubmit(event) {
  event.preventDefault();
  search(searchBox.value);
  form.reset();
}

/* función grados kelvin a grados celsius */
function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

/* función  metros por segundos a kilometros por hora */
function toKmh(ms) {
  return Math.round(ms * 3.6);
}

/* función toastify */
function ShowMessage(message, type) {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        type === "invalid" ? "linear-gradient(90deg, #FBBA00, #FF8714)" : "red",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
