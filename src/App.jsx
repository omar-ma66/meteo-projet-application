import React from "react";
import Header from "./Header/Header.jsx";
import Weather from "./Weather/Weather.jsx";
import "./App.css"; // Import des styles CSS classiques

export default function App() {
  async function getWeatherData() {

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url =
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Lyon&days=5&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.current.is_day);
  }

  getWeatherData();
  return (
    <div className="App">
      <Header />
      <Weather />
    </div>
  );
}
