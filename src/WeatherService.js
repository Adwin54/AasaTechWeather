import axios from 'axios';

const API_URL = 'http://your-backend-url/api/weather/current'; // Update with your backend URL

export const fetchWeather = async (city, token) => {
    try {
        const response = await axios.get(`${API_URL}?city=${city}`, {
            headers: { Authorization: token }
        });
        return response.data; // Return the weather data
    } catch (error) {
        throw new Error('Error fetching weather data');
    }
};