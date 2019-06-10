const express = require('express');
const currentController = require('./current-controller');

let router = express.Router();

router.get('/:city', currentController.specific);
router.get('/', currentController.current);

module.exports = router;