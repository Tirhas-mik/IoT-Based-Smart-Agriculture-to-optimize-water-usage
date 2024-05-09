const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const SensorData = require('./models/IrrigationData');
const http = require('http');
const connectDB = require('./config/connection');
require('dotenv').config();

const { SerialPort } = require("serialport");
const { ReadlineParser } = require('@serialport/parser-readline');

const parser = new ReadlineParser({
    delimiter: "\r\n",
});

const config = {
    path: 'COM6',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    autoOpen: false,
};

var port = new SerialPort(config);
port.open((err) => {
    if (err) {
        console.log('error opening the port' + err.messages);
    }
});

port.write('Hi From Node js', (err) => {
    if (err) {
        console.log('Error writing ' + err.message);
    }
});
port.pipe(parser);

// const app = http.createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(index);
// });


const sensorRoutes = require('./routes/sensorRoutes.routes');
const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use('/api/v1/irrigation', sensorRoutes);
// parser.on('data', (data) => {
//     console.log(data.toString());
// });
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", function (socket) {
    console.log("Node is listening to port");
});

const storeToDB = async (data) => {
    const sensorData = new SensorData({
        temperature: data.temperature,
        humidity: data.humidity,
        moisture: data.moisture,
        rain: data.rain
    });
    try {
        await sensorData.save();
        console.log('Data stored successfully');
    } catch (error) {
        console.log('Failed to store data');
    }
}
parser.on("data", function (data) {
    console.log("Received data from port: " + data);
    const sensedData = { temperature: Number(data), humidity: 45, moisture: 75, rain: 52 }
    storeToDB(sensedData);
    io.emit("data", data);
});

// database connection
connectDB(process.env.MONGO_URI).then(() => {
    console.log('successfully connected to DB')
}).catch(err => {
    console.log('Failed to connect to database.')
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});