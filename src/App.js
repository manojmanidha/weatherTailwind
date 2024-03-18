import React, { useState } from "react";
import axios from 'axios';

// import './App.css'; // Import Tailwind CSS styles

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const apiKey = 'c22d605561dd453b86f180252232812'
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await axios.get(apiUrl); // Use axios to fetch data
      const data = response.data;

      if (response.status === 200) { // Check response status
        setWeatherData(data);
      } else {
        setWeatherData(null);
        alert('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app max-w-full mx-auto my-10 text-center p-4 ">
       <h1 className="flex item-center justify-center">Weather Application</h1> 
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-2 rounded border-black-800"
        />
        <button className="p-2 bg-green-500 text-white rounded cursor-pointer" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className='weather-cards flex justify-around'>

          <div className='weather-card bg-white border border-gray-300 p-4 mt-8 rounded'>
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>

          <div className='weather-card bg-white border border-gray-300 p-4 mt-8 rounded'>
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>

          <div className='weather-card bg-white border border-gray-300 p-4 mt-8 rounded'>
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
           
          <div className='weather-card bg-white border border-gray-300 p-4 mt-8 rounded'>
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default App;
