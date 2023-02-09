import "./App.css";
import React, { useState, useEffect } from "react";

const api = {
  key: "0538c45df11db30e1ef3846defb88992",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [updateWeatherInfo, setUpdateWeatherInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setUpdateWeatherInfo(
            `${data.name}, ${data.sys.country} : ${data.weather[0].description} -Temperature: ${data.main.temp}°C`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }

      setLoading(false);
    };
    fetchWeatherInfo();
  }, [searchCity]);

  return (
    <div id="card-container">
      <h1 className="card-title">Search For Your City Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={searchInput}
          placeholder="City"
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          id="card-input"
        />
        <button id="card-button">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div className="card-weather-info">{updateWeatherInfo}</div>
          )}
        </>
      )}
    </div>
  );
}
export default App;
