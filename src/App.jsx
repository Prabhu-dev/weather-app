import { useState,useEffect } from 'react'
import './App.css'
import searchIcon from './assets/search.png'
import clear from './assets/clear.png'
import ClearSun from './assets/ClearSun.png'
import ClearMoon from './assets/ClearMoon.png'
import PartiallyCloud from './assets/PartiallyCloud.png'
import ScatteredCloud from './assets/ScatteredCloud.png'
import BrokenCloud from './assets/BrokenCloud.png'
import ShowerRain from './assets/ShowerRain.png'
import HeavyRain from './assets/HeavyRain.png'
import ThunderStrom from './assets/ThunderStrom.png'
import snow from './assets/snow.png'
import mist from './assets/mist.png'
import windIcon from './assets/wind.png'
import humidityIcon from './assets/humidity.png'

const WeatherDetails = ({icon,temp,city,country,long,lat,humidity,wind}) => {
  return (
    <>
      <div className="weather-container">
        <div className='temp-icon'><img src={icon} alt='temp-icon'/></div>
        <div className="temp"><h1>{temp} &deg; C</h1></div>
        <div className='city'><h2>{city}</h2></div>
        <div className='country'><h4>{country}</h4></div>
        <div className="cords-container">
          <div className="cords">
            <p className="longitute">{long}</p>
            <span className="long-span">Longitude</span>
          </div>
          <div className="cords">
            <p className="latitude">{lat}</p>
            <span className="lat-span">Latitude</span>
          </div>                
        </div>
        <div className="humidity-container">
          <div className="humidity">
            
            <p className="humidity-value">{humidity} %</p>
            <img src={humidityIcon} alt='humidity'/>
            <p className="humidity-text">Humidity</p>
          </div>
          <div className="humidity">           
            <p className="wind-speed">{wind} Km/h</p>
            <img src={windIcon} alt='wind'/>
            <p className="wind-text">Wind</p>
          </div>                
        </div>
      </div>
    </>
  )
}

function App() {
  let apikey= "4a1f9da0515376770e945f691a20dcc4";
  const [city, setCity] = useState("Chennai");
  const [text, setText] = useState("Chennai");
  const [temp, setTemp] = useState("0");
  const [icon, setIcon] = useState(clear);
  const [country, setCountry] = useState("");
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const weatherIconsMap = {
    "01d": ClearSun,
    "01n": ClearMoon,
    "02d": PartiallyCloud,
    "02n": PartiallyCloud,
    "03d": ScatteredCloud,
    "03n": ScatteredCloud,
    "04d": BrokenCloud,
    "04n": BrokenCloud,
    "09d": ShowerRain,
    "09n": ShowerRain,
    "10d": HeavyRain,
    "10n": HeavyRain,
    "11d": ThunderStrom,
    "11n": ThunderStrom,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.cod === "404") {
        console.error("City is not found");
        cityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setCity(data.name);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconsMap[weatherIconCode]);
      setCityNotFound(false);
    } catch (error) {
      console.error("Some Error as occured:",error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCity = (e) => {
    setText(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      search();
    }
  };

  useEffect(function() {
    search();
  },[])

  return (
    <>
      <div className='container'>
        <div className='search-container'>
        <input 
        type='text'
        className='search-input'
        placeholder='Search City'
        onChange={handleCity}
        onKeyDown={handleKeyDown}
        value={text}
       />
       <div className='search-icon'>
        <img src={searchIcon} alt='search' onClick={()=>search()}/>
       </div>
       </div>
       {loading && <div className="loading">Loading....</div>}
       {cityNotFound && <div className="cityNotFound">City Not Found!</div>}
       {error && <div className="error">Some Error as Occured</div>}
       {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} long={long} lat={lat} humidity={humidity} wind={wind}/>}
       <div className="copy">
        <p className="copywright"> &copy; <span className='footer-text'>Desinged by </span> Prabhu</p>
       </div>
      </div>     
    </>
  )
}

export default App
