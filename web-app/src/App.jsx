import { useEffect, useState } from "react";
import LineChart from "./components/LineChart";
import axios from "axios";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [temperature, setTemperature] = useState({});
  const [humidity, setHumidity] = useState({});
  const [moisture, setMoisture] = useState({});
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3001/api/v1/irrigation")
        .then((response) => {
          console.log(response.data);
          setSensorData(response.data);
          setTemperature(groupBy(response.data, "temperature"));
          setHumidity(groupBy(response.data, "humidity"));
          setMoisture(groupBy(response.data, "moisture"));
        })
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, []);
  const groupBy = (array, key) => {
    let groupData = {};
    array.map((item) => {
      if (!groupData[key]) {
        groupData[key] = [item[key]];
        groupData["createdAt"] = [item["createdAt"]];
      } else {
        groupData[key].push(item[key]);
        groupData["createdAt"].push(item.createdAt);
      }
    });
    return groupData;
  };
  console.log(temperature);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <h1 className="col-span-3 text-3xl text-center mb-8">
          Smart Agriculture Sensor Data Analytics Board
        </h1>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Temperature</h2>
          <LineChart sensorData={temperature} title="temperature" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Humidity</h2>
          <LineChart sensorData={humidity} title="humidity" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Moisture</h2>
          <LineChart sensorData={moisture} title="moisture" />
        </div>
      </div>
    </>
  );
}

export default App;
