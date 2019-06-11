const express = require('express');
const citiesController = require('./cities-controller');

let router = express.Router();

router.get('/', citiesController);

module.exports = router;