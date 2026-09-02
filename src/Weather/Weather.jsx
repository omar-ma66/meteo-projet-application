import React from 'react';
import Days from '../Days/Days.jsx';

export default function Weather({data}) {
          
  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="card-content">
          <p><span className="card-title">{data.location.country}</span></p>
          <p><span className="card-title">{data.location.region}</span></p>
          <p><span className="card-title">{data.location.ville}</span></p>
          <p>
            <img src={data.icon} alt="Soleil" />
            {/* <img src="icons/sun.svg" alt="Soleil" /> */}
          </p>
          <span className="temperature">{data.temp_c}</span>
          <div className="wind">{data.wind_kph} km/heure (360°)</div>
        </div>
        <Days />
      </div>
    </div>
  );
}