import React, { useState, useEffect } from "react";

export default function EnvironmentCards() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log("API Key:", apiKey); // Debugging
    console.log("All env vars:", import.meta.env); // Debugging
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData({
        temperature: data.current.temp_f,
        humidity: data.current.humidity,
        light: data.current.condition.text,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-lg font-semibold">Light</h3>
        <p>{weatherData.light}</p>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-lg font-semibold">Temperature</h3>
        <p>{weatherData.temperature}°F</p>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h3 className="text-lg font-semibold">Humidity</h3>
        <p>{weatherData.humidity}%</p>
      </div>
    </div>
  );
}
