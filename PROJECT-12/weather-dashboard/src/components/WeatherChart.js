// src/components/WeatherChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WeatherChart({ forecastData }) {
  const labels = forecastData.map(item =>
    new Date(item.dt * 1000).toLocaleString('en-IN', {
      hour: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short'
    })
  );

  const temps = forecastData.map(item => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Temperature Trend (Next 5 Days)' }
    },
    scales: {
      x: { ticks: { maxRotation: 90, minRotation: 45 } },
      y: { beginAtZero: false }
    }
  };

  return <Line data={data} options={options} />;
}

export default WeatherChart;
