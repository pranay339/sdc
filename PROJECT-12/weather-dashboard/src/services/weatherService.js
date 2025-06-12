// src/services/weatherService.js

const API_KEY = '159e96d8936ead30d67d0437a85c63f9'; // Your API key

export async function fetchCurrentWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  return response.json();
}

export async function fetchForecastWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
}

export async function fetchHistoricalWeather(lat, lon, days) {
  return []; // Disabled for free tier
}
