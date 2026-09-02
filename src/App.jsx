// import React from "react";
// import Header from "./Header/Header.jsx";
// import Weather from "./Weather/Weather.jsx";
// import { useEffect } from "react";
// import { useState } from "react";
// import "./App.css"; 

// export default function App() {

// const [meteoData, setMeteoData] = useState(null);
// const [loading, setLoading] = useState(true);
// const [ville,setVille] = useState('Lyon');



// function handleJour(j)
// {
//   setJour(j);
// }

// useEffect(() => { 
//   async function getWeatherData() {

//     const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
//     const url =
//       `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ville}&days=5&aqi=no&alerts=no`;
   
//    try{ 
//     const response = await fetch(url);
//     const data = await response.json();


//     setMeteoData({
//       temp_c: data.current.temp_c,
//       feelslike_c: data.current.feelslike_c,
//       humidity : data.current.humidity,
//       cloud: data.current.cloud,
//       wind_kph: data.current.wind_kph,
//       wind_degree: data.current.wind_degree,
//       pressure_mb: data.current.pressure_mb,
//       chance_of_rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
//       sunrise: data.forecast.forecastday[0].astro.sunrise,
//       sunset: data.forecast.forecastday[0].astro.sunset,
//       icon:data.current.condition.icon,
//       location:{
//       country:data.location.country,
//       region:data.location.region,
//       ville:data.location.name,}
//     });



//   console.log(data);

//     }
//     catch(error)
//     {
//       console.error("Erreur lors de la recuperation des données",error)
//     } finally
//     {
//       setLoading(false);
//     }
//   }
//     getWeatherData();
// },[ville]);

// function handleVille(even)
// {
//         setVille(even.target.value);
// }
//   return (
//     <div className="App">
//       <Header  />
//       <label>Ville: <input type="text" value={ville} onChange={handleVille} /> </label>
//       {/* je passe les donnees au composant Weather sous forme de prop  */}
//       {loading ? ( <p>Chargement de la meteo ...</p>):(   <Weather data={meteoData}  /> )}
//     </div>
//   );
// }

/***************************************************************************************** */

import React, { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Weather from "./Weather/Weather.jsx";
import "./App.css"; 

export default function App() {
  const [meteoData, setMeteoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ville, setVille] = useState('Lyon');

  useEffect(() => { 
    async function getWeatherData() {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ville}&days=5&aqi=no&alerts=no`;
     
      try { 
        const response = await fetch(url);
        const data = await response.json();

        setMeteoData({
          location: {
            country: data.location.country,
            region: data.location.region,
            ville: data.location.name,
          },
          // On conserve tout le tableau des 5 jours de prévisions
          forecast: data.forecast.forecastday 
        });
      } catch(error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setLoading(false);
      }
    }
    getWeatherData();
  }, [ville]);

  function handleVille(e) {
    setVille(e.target.value);
  }

  return (
    <div className="App">
      <Header />
      <label>
        Ville: <input type="text" value={ville} onChange={handleVille} />
      </label>
      {loading ? (
        <p>Chargement de la météo ...</p>
      ) : (
        <Weather data={meteoData} />
      )}
    </div>
  );
}