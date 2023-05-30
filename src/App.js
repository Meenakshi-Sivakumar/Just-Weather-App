import React, { useState, useEffect } from 'react';
import data from './data';
import Loading from './Loading';
import Search from './Search';
import WeatherDetails from './WeatherDetails';

const apiKey = '71acb43b5585168d990ac95d8210debd';
const currentDate = new Date();

const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const formattedDate = currentDate.toLocaleString('en-US', options);
const formattedTemplate = `${formattedDate}`



function App() {
  const [image, setImage] = useState('');
  const [city, setCity] = useState('Salem');
  const [weatherData, setWeatherData] = useState(data);

  async function api_call(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(`Error retrieving weather data: ${error}`);
    }
  }

  useEffect(() => {
    api_call(city);
  }, [city]);

  const handleCityUpdate = (newCity) => {
    setCity(newCity);
  }
  console.log(weatherData)
  return (
    <div className='main-container' style={{ backgroundImage: `url(${image})` }}>
      <div className='content-block'>
        <Search handleCityUpdate={handleCityUpdate} />
        <WeatherDetails weatherData={weatherData} />
      </div>
      <div className='hero-weather-details'>
      <div className='large-temperature'>
      <h1>{weatherData.main.temp}</h1>
      </div>
      <div className='location-time'>
      <h3>{weatherData.name}</h3>
      <p>{formattedTemplate}</p>
      </div>
      <div className='weather-icon'>
      <p>{weatherData.weather[0].description}</p>
      </div>
      </div>
    </div>
  );
}

export default App;
