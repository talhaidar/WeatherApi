const button = document.querySelector(".theButton");
const City = document.querySelector(".newCity");
const locationPlace = document.querySelector(".locationPlace");

const icon = document.querySelector(".icon");
const iconDescription = document.querySelector(".iconDescription");

const currentTemp = document.querySelector(".currentTemp");
const lowTemp = document.querySelector(".lowTemp");
const highTemp = document.querySelector(".highTemp");

const windSpeed = document.querySelector(".windSpeed");
const humidPercent = document.querySelector(".humidPercent");

button.addEventListener("click", function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${City.value}&appid=d5dfce808aab61749c9e5e2a43ed7f2f`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const loca = data.name;
      const wind = data.wind.speed;
      const humidity = data.main.humidity;

      const tempur = data.main.temp;
      const hTempur = data.main.temp_max;
      const lTempur = data.main.temp_min;

      const iconDescri = data.weather[0].description;
      const iconPic = data.weather[0].icon;

      locationPlace.innerHTML = loca;
      windSpeed.innerHTML = wind;
      humidPercent.innerHTML = humidity;

      currentTemp.innerHTML = Math.floor((tempur - 273.15) * 1.8 + 32.0);
      highTemp.innerHTML = Math.floor((hTempur - 273.15) * 1.8 + 32.0);
      lowTemp.innerHTML = Math.floor((lTempur - 273.15) * 1.8 + 32.0);

      iconDescription.innerHTML = iconDescri;
      icon.innerHTML = `<Img src="http://openweathermap.org/img/wn/${iconPic}@2x.png"/>`;
    });
});
window.onload = async function () {
  if (City.value != "") {
    button.click();
  } else if (City.value == "") {
    const savedPlace = localStorage.getItem("savedCity");
    if (savedPlace == null) {
      City.value = "Hays";
      button.click();
    } else {
      City.value = savedPlace;
      button.click();
    }
  }
};
var input = document.querySelector(".newCity");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".theButton").click();
  }
});
document.getElementById("saveCity").addEventListener("click", function () {
  let saved = document.querySelector(".newCity").value;
  localStorage.setItem("savedCity", saved);
});
