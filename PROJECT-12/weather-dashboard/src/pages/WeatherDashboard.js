import React, { useEffect, useState } from 'react';
import weatherService from '../services/weatherService';
import WeatherChart from './components/WeatherChart';

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await weatherService.getWeather();
      setWeatherData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Weather Dashboard</h1>
      {weatherData ? (
        <WeatherChart data={weatherData} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherDashboard;
