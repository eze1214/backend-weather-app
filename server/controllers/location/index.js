const express = require('express');
const locationController = require('./location-controller');

let router = express.Router();

router.get('/', locationController);

module.exports = router;
