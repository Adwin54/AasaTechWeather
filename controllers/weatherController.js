
const axios = require('axios');
const WeatherSearch = require('../models/WeatherSearch');

const API_KEY = 'a9d254f17375202e1b60a25345ef04dc'; // Weatherstack API key

const weatherController = {
    getWeather: async (req, res) => {
        const { city } = req.query;

        // Validate the city parameter
        if (!city) {
            return res.status(400).json({ message: 'City parameter is required' });
        }

        try {
            // Fetch weather data from Weatherstack API
            const response = await axios.get("http://api.weatherstack.com/current", {
                params: {
                    access_key: API_KEY,
                    query: city
                }
            });

            const weatherInfo = response.data;

            // Check if the API returned valid data
            if (weatherInfo.error) {
                return res.status(404).json({ message: weatherInfo.error.info });
            }

            // Save the search to the database (optional)
            WeatherSearch.create(req.user.id, city, JSON.stringify(weatherInfo), (err) => {
                if (err) {
                    console.error('Error saving weather search:', err);
                }
            });

            // Return the weather data
            res.json(weatherInfo);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ message: 'Error fetching weather data', error: error.message });
        }
    }
};

module.exports = weatherController;