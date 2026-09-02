import React from "react";
import Header from "./Header/Header.jsx";
import Weather from "./Weather/Weather.jsx";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css"; 

export default function App() {

const [meteoData, setMeteoData] = useState(null);
const [loading, setLoading] = useState(true);



useEffect(() => { 
  async function getWeatherData() {

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url =
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Lyon&days=5&aqi=no&alerts=no`;
   
   try{ 
    const response = await fetch(url);
    const data = await response.json();


    setMeteoData({
      temp_c: data.current.temp_c,
      feelslike_c: data.current.feelslike_c,
      humidity : data.current.humidity,
      cloud: data.current.cloud,
      wind_kph: data.current.wind_kph,
      wind_degree: data.current.wind_degree,
      pressure_mb: data.current.pressure_mb,
      chance_of_rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
    });



  // console.log(
  // `   Probabilite de pluie ${ data.current.chance_of_rain }% 
  //  Couverture nuageuse  ${data.current.cloud }%  
  //  Vitesse du vent ${data.current.wind_kph }km/heure  
  //  Direction du vent ${data.current.wind_degree }° (360°) 
  //  Temperature ressentie ${data.current.feelslike_c}° C
  //  Humidité ${data.current.humidity} % 
  //  Temperature ${data.current.temp_c} ° C 
  //  Pression ${data.current.pressure_mb } millibars 
  //  Lever du soleil ${data.forecast.forecastday[0].astro.sunrise}  
  //  Coucher du soleil ${data.forecast.forecastday[0].astro.sunset} `);

    }
    catch(error)
    {
      console.error("Erreur lors de la recuperation des données",error)
    } finally
    {
      setLoading(false);
    }
  }
    getWeatherData();
},[]);


  return (
    <div className="App">
      <Header  />
      {/* je passe les donnees au composant Weather sous forme de prop  */}
      {loading ? ( <p>Chargement de la meteo ...</p>):(   <Weather data={meteoData}  /> )}
    </div>
  );
}
