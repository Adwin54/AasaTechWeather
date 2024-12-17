const express = require('express');
const weatherController = require('../controllers/weatherController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/current', authenticate, weatherController.getWeather);

module.exports = router;