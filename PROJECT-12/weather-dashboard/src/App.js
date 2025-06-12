// src/App.js

import React, { useState } from 'react';
import {
  fetchCurrentWeather,
  fetchForecastWeather
} from './services/weatherService';
import WeatherChart from './components/WeatherChart';

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setCurrentWeather(null);
    setForecastData([]);

    try {
      const current = await fetchCurrentWeather(city);
      setCurrentWeather(current);

      const forecast = await fetchForecastWeather(city);
      setForecastData(forecast.list);
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {currentWeather && (
        <div style={{ marginTop: 20 }}>
          <h2>{currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp} °C</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
        </div>
      )}

      {forecastData.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3>5-Day Forecast (3-hour intervals)</h3>
          <WeatherChart forecastData={forecastData} />
        </div>
      )}
    </div>
  );
}

export default App;
