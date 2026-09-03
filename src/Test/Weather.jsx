import React, { useState } from 'react';
import Days from '../Days/Days.jsx';
// import HourlyChart from '../HourlyChart/HourlyChart.jsx'; // Import du composant
import HourlyChart from './HourlyChart.jsx'; // Import du composant

export default function Weather({ data }) {
  const [jour, setJour] = useState(0);

  const currentForecast = data.forecast[jour];

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="card-content">
          <span className="card-title">{data.location.ville}, {data.location.country}</span>
          
          <p>
            <img src={currentForecast.day.condition.icon} alt={currentForecast.day.condition.text} />
          </p>
          
          <span className="temperature">{Math.round(currentForecast.day.avgtemp_c)}°C</span>
          
          <div className="wind">Vent max : {currentForecast.day.maxwind_kph} km/h</div>
          <div>Pluie : {currentForecast.day.daily_chance_of_rain}%</div>

          {/* Graphique heure par heure */}
          {currentForecast.hour && (
            <HourlyChart hourlyData={currentForecast.hour} />
          )}
        </div>

        <Days 
          daysList={data.forecast} 
          activeIndex={jour} 
          onSelectDay={setJour} 
        />
      </div>
    </div>
  );
}