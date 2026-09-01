import React from 'react';
import Header from './Header/Header.jsx';
import Weather from './Weather/Weather.jsx';
import './App.css'; // Import des styles CSS classiques

export default function App() {
  return (
    <div className="App">
      <Header />
      <Weather />
    </div>
  );
}