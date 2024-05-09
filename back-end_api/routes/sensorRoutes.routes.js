const express = require('express');
const { storeIrrigationData, getAllIrrigationData } = require('../controllers/IrrigationDataController');
const router = express.Router();

router.route('/').get(getAllIrrigationData).post(storeIrrigationData);

module.exports = router