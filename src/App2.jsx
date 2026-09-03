/***************************************************************************************** */
import React, { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Weather from "./Weather/Weather.jsx";
import "./App.css"; 
/***************************************************************************************** */

export default function App() {
  const [meteoData, setMeteoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ville, setVille] = useState('Lyon');
  const [searchQuery, setSearchQuery] = useState('Lyon');

              /*###################################################################*/
// on test localStorage




              /*###################################################################*/
useEffect(()=>{
  
     if(navigator.geolocation)
          {
            navigator.geolocation.getCurrentPosition((position)=>{
              const {latitude,longitude} = position.coords;
              setVille(`${latitude},${longitude}`);
            },(error)=>{
              console.warn("Géolocalisation non disponible ",error);
            }
          )
          }
},[]);
              /*###################################################################*/
             
              /*###################################################################*/
  useEffect(() => { 

    async function getWeatherData() {
      setLoading(true);
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ville}&days=5&aqi=no&alerts=no`;
     
      try { 
        const response = await fetch(url);
        const data = await response.json();

/*  Pour controler les données API Weather */

 console.log( data );



        setMeteoData({
          location: {
            country: data.location.country,
            region: data.location.region,
            ville: data.location.name,
          },
          // On conserve tout le tableau des 5 jours de prévisions
          forecast: data.forecast.forecastday 
        });
        setSearchQuery(data.location.name);
      } catch(error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setLoading(false);
      }
    }
    getWeatherData();
  }, [ville]);

              /*###################################################################*/
            
   function handleInputChange(e) {
    setSearchQuery(e.target.value);
  } 
              /*###################################################################*/

  function handleSubmit(e) {
    e.preventDefault();
    setVille(searchQuery);
  }
              /*###################################################################*/


  return (
    <div className="App">
      <Header />
        <form className="myform" onSubmit={handleSubmit}>
        <label>
          Ville: <input type="text" value={searchQuery} onChange={handleInputChange} />
        </label>
        <button type="submit">Rechercher</button>
      </form>
      {loading ? ( <p>Chargement de la météo ...</p>) : (<Weather data={meteoData} />)}
      {/* **************************************************************************** */}
      
      {/* **************************************************************************** */}

    </div>
  );
}
