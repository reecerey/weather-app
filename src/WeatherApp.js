import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [fetchWeather, setFetchWeather] = useState(false);
  const [error, setError] = useState(null);

  // Access the API key from the environment variable
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (fetchWeather && city) {
      getWeather();
      setFetchWeather(false);
    }
  }, [fetchWeather, city]);

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setError('Please enter a valid city');
    }
  };

  const handleGetWeather = () => {
    setFetchWeather(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGetWeather();
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleGetWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;