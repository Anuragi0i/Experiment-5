const apiKey = "YOUR_API_KEY"; // Use OpenWeatherMap

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  getWeather(city);
});

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    updateUI(data);
    getForecast(city);

  } catch (err) {
    console.error(err);
  }
}

function updateUI(data) {
  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temperature").innerText = data.main.temp + "°C";
  document.getElementById("condition").innerText = data.weather[0].main;
  document.getElementById("humidity").innerText = data.main.humidity + "%";
  document.getElementById("wind").innerText = data.wind.speed + " km/h";
  document.getElementById("pressure").innerText = data.main.pressure + " hPa";
  document.getElementById("feelsLike").innerText = data.main.feels_like + "°C";

  const icon = data.weather[0].icon;
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();
  const container = document.getElementById("forecastContainer");
  container.innerHTML = "";

  data.list.slice(0, 5).forEach(item => {
    const div = document.createElement("div");
    div.classList.add("card", "glass");

    div.innerHTML = `
      <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
      <p>${item.main.temp}°C</p>
      <p>${item.weather[0].main}</p>
    `;

    container.appendChild(div);
  });
}
