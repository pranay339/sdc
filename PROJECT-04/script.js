const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
  const city = document.getElementById("city").value;
  const apiKey = "171e009cae7e126fcbcec49c3a5cee6a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(url); 
    const data = await response.json();
    if (data.cod === "404") {
      document.getElementById("result").innerHTML =
        "City not found. Try again!";
      return;
    }
    displayWeather(data);
    displayGraph(data.main.temp, data.main.feels_like, data.main.humidity);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
});
const displayWeather = (data) => {
  const result = document.getElementById("result");
  result.innerHTML = `
        <h2 style="font-family: 'Alkatra', serif;">Weather of ${data.name}</h2>
        <h4>Temperature: ${Math.round(data.main.temp - 273.15)}°C</h4>
        <h4>Feels like: ${Math.round(data.main.feels_like - 273.15)}°C</h4>
        <h4>Humidity: ${data.main.humidity}%</h4>
        <h4>Pressure: ${data.main.pressure} hPa</h4>
        <h4>Wind speed: ${data.wind.speed} m/s</h4>
        <h4>Wind direction: ${data.wind.deg} degrees</h4>
    `;
};
const displayGraph = (temp, feelsLike, humidity) => {
  const ctx = document.getElementById("weatherChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Temperature (°C)", "Feels Like (°C)", "Humidity (%)"],
      datasets: [
        {
          label: "Weather Data",
          data: [
            Math.round(temp - 273.15),
            Math.round(feels_like - 273.15),
            humidity,
          ],
          backgroundColor: ["red", "orange", "blue"],
          borderColor: ["darkred", "darkorange", "darkblue"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
document.addEventListener("DOMContentLoaded", () => {
  let today = new Date();
  let formattedDate = today.toDateString();
  document.getElementById("current-date").innerText =
    "Today's Date: " + formattedDate;
});

