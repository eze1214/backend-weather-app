const express = require('express');
const forecastController = require('./forecast-controller');

let router = express.Router();

router.get('/:city', forecastController.specific);
router.get('/', forecastController.current);

module.exports = router;
