import React, { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
// import Weather from "./Weather/Weather.jsx";
import Weather from "./Test/Weather.jsx";  // je test ce code

import "./App.css";

export default function App() {
  const [meteoData, setMeteoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Charger les 5 villes depuis localStorage (ou utiliser des valeurs par défaut)
  const [villes, setVilles] = useState(() => {
    const savedVilles = localStorage.getItem("mes_villes");
    return savedVilles ? JSON.parse(savedVilles) : ['Lyon', 'Paris', 'Marseille', 'Toulouse', 'Nice'];
  });

  // Ville actuellement affichée dans le composant Weather
  const [villeActive, setVilleActive] = useState(villes[0]);

  /* Géolocalisation au premier chargement */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const tempVille = [...villes] ;
          tempVille[0] = `${latitude},${longitude}`;
        //   setVilleActive(`${latitude},${longitude}`);
          setVilleActive(tempVille[0]);
          setVilles(tempVille);
        },
        (error) => {
          console.warn("Géolocalisation non disponible ", error);
        }
      );
    }
  }, []);

  /* Récupération des données météo quand 'villeActive' change */
  useEffect(() => {
    async function getWeatherData() {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${villeActive}&days=5&aqi=no&alerts=no`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        setMeteoData({
          location: {
            country: data.location.country,
            region: data.location.region,
            ville: data.location.name,
          },
          forecast: data.forecast.forecastday,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setLoading(false);
      }
    }
    getWeatherData();
  }, [villeActive]);

  // 2. Mettre à jour une ville spécifique dans le tableau et sauvegarder dans localStorage
  const handleVilleChange = (index, newValue) => {
    const updatedVilles = [...villes];
    updatedVilles[index] = newValue;
    setVilles(updatedVilles);
    localStorage.setItem("mes_villes", JSON.stringify(updatedVilles));
  };

  return (
    <div className="App">
      <Header />

      {/* Formulaire des 5 villes */}
      <div className="villes-container" style={{ margin: "20px 0" }}>
        <h3>Vos 5 villes sauvegardées :</h3>
        {villes.map((nomVille, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={nomVille}
              onChange={(e) => handleVilleChange(index, e.target.value)}
            />
            <button 
              type="button" 
              onClick={() => setVilleActive(nomVille)}
              style={{ marginLeft: "10px" }}
            >
              Afficher la météo
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <p>Chargement de la météo ...</p>
      ) : (
        <Weather data={meteoData} />
      )}
    </div>
  );
}