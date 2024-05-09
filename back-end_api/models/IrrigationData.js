const mongoose = require('mongoose');

const IrrigationDataSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        require: true,
        default: 0.0
    },
    humidity: {
        type: Number,
        default: 0
    },
    moisture: {
        type: Number,
        default: 0
    },
    rain: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const SensorData = mongoose.model('SensorData', IrrigationDataSchema);

module.exports = SensorData;