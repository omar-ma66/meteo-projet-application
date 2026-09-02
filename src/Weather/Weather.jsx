// import React from 'react';
// import Days from '../Days/Days.jsx';

// export default function Weather({data}) {
          
//   return (
//     <div className="weather-container">
//       <div className="weather-card">
//         <div className="card-content">
//           <p><span className="card-title">{data.location.country}</span></p>
//           <p><span className="card-title">{data.location.region}</span></p>
//           <p><span className="card-title">{data.location.ville}</span></p>
//           <p>
//             <img src={data.icon} alt="Soleil" />
//             {/* <img src="icons/sun.svg" alt="Soleil" /> */}
//           </p>
//           <span className="temperature">{data.temp_c}</span>
//           <div className="wind">{data.wind_kph} km/heure (360°)</div>
//         </div>
//         <Days />
//       </div>
//     </div>
//   );
// }


/****************************************************************************** */


import React, { useState } from 'react';
import Days from '../Days/Days.jsx';

export default function Weather({ data }) {
  // L'état du jour sélectionné est géré ici (0 = aujourd'hui)
  const [jour, setJour] = useState(0);

  // Données météo spécifiques au jour sélectionné
  const currentForecast = data.forecast[jour];

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="card-content">
          <span className="card-title">{data.location.ville}, {data.location.country}</span>
          
          <p>
            <img src={currentForecast.day.condition.icon} alt={currentForecast.day.condition.text} />
          </p>
          
          {/* Affiche la température moyenne ou max du jour sélectionné */}
          <span className="temperature">{Math.round(currentForecast.day.avgtemp_c)}°C</span>
          
          <div className="wind">Vent max : {currentForecast.day.maxwind_kph} km/h</div>
          <div>Pluie : {currentForecast.day.daily_chance_of_rain}%</div>
        </div>

        {/* Transmission de l'index actif et de la fonction pour le modifier */}
        <Days 
          daysList={data.forecast} 
          activeIndex={jour} 
          onSelectDay={setJour} 
        />
      </div>
    </div>
  );
}