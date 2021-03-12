import axios from 'axios';
import { toJS } from 'mobx';
import { observer , } from 'mobx-react';
import React from 'react';
import "./App.css";
import { Info } from './store/info';

function App() {
  const {weatherInfo, favorites} = Info;
  const API_KEY = "104159519345e7644be9626f75e19e6e";
  const favoriteCities = toJS(favorites);
  const getCurrentWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const response = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    console.log(response.data);
    weatherInfo.length = 0;
    weatherInfo.push(response.data);
    console.log(weatherInfo);
    e.target.elements.city.value = "";
  }

  const cleaAll = () => {
    weatherInfo.length = 0;
  }
  
  const selectCity = async (e) => {                                                                           
    const city = e.target.innerHTML;                                                                          
    const response = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    console.log(response.data);                                                                               
    weatherInfo.length = 0;                                                                                   
    weatherInfo.push(response.data);                                                                          
    console.log(weatherInfo);                                                                                 
  }
  return (
    <div className="App">
      <h1>Weather app</h1>
            <form action="" onSubmit={getCurrentWeather}>
                <input type="text" placeholder="Select city" name="city"/>
                <button>Get</button>
                <button onClick={cleaAll}>Clear all</button>
            </form>
            <div className="favorites">
              <h1 style={{color: "#ffffff"}}>Favorites</h1>
              {favoriteCities.map((city,idx)=>(<button key={idx} onClick={selectCity}>{city.name}</button>))}{/**/}
            </div>
          
            <div>
            {weatherInfo.map((info, idx) => {
              return(
                <div key={idx} className="weatherCard">
                    <h1>Country: {info.sys.country}</h1>
                    <h1>City: {info.name}</h1>
                    <p>Temperature: {Math.floor(info.main.temp - 273.15)}</p>
                    <p>Weather: {info.weather[0].main}</p>
                    <button>F</button>
                    <button>C</button>
                </div> 
              )
            })}
            </div>
        </div>
  );
}

export default observer(App);
