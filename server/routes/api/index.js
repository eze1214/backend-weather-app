const express = require('express');
const router = express.Router();

const locationController = require('../../controllers/location');
const currentController = require('../../controllers/current');
const forecastController = require('../../controllers/forecast');

router.use('/location', locationController);
router.use('/current', currentController);
router.use('/forecast', forecastController);

module.exports = router;
