const IrrigationData = require('../models/IrrigationData');
const storeIrrigationData = async (req, res) => {
    const { temperature, humidity, moisture, rain } = req.body;

    const irrigationData = new IrrigationData({
        temperature,
        humidity,
        moisture,
        rain
    });

    try {
        await irrigationData.save();
        res.status(201).json({ message: 'Irrigation data stored successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to store irrigation data' });
    }
}

const getAllIrrigationData = async (req, res) => {
    try {
        const irrigationData = await IrrigationData.find().select('createdAt temperature moisture humidity rain -_id');
        if (!irrigationData.length) {
            return res.status(404).json({ message: 'No irrigation data available.' });
        }
        res.status(200).json(irrigationData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve irrigation data.' });
    }
}

module.exports = {
    storeIrrigationData,
    getAllIrrigationData
}