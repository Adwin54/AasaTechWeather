
const db = require('../config/db');

const WeatherSearch = {
    create: (userId, city, weatherInfo, callback) => {
        db.query('INSERT INTO weather_searches (user_id, city, weather_info) VALUES (?, ?, ?)', [userId, city, weatherInfo], callback);
    }
};

module.exports = WeatherSearch;