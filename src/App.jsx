import React from "react";
import Header from './Header/Header.jsx'
import Weather from "./Weather/Weather.jsx";

import { useState } from "react";
import './App.css';


function App()
{

  return (
    <div id="root">
      <div className="App">
          <Header/>
          <Weather/>
      </div>
    </div>
  )
  
}

export default App;