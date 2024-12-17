import React, { useState } from 'react';
import { fetchWeather } from './weatherService';

const WeatherSearch = ({ token }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!city.trim()) {
            setError('Please enter a city name.');
            return;
        }

        setError(null);
        setWeatherData(null); // Clear previous results
        setLoading(true); // Set loading state

        try {
            const data = await fetchWeather(city, token);
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Weather Search</h2>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search Weather'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {weatherData && (
                <div>
                    <h3>Weather Information for {weatherData.location.name}</h3>
                    <p>Temperature: {weatherData.current.temperature}°C</p>
                    <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
                    <p>Humidity: {weatherData.current.humidity}%</p>
                    <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
                </div>
            )}
        </div>
    );
};

export default WeatherSearch;