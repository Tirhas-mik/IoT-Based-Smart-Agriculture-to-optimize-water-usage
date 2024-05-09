import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = ({ title, sensorData }) => {
  console.log(sensorData);
  const labels = sensorData.createdAt.map((date) => date.split("T")[0]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${title.toUpperCase()} Sensor Data`,
        backgroundColor: "rgb(99, 255, 132)",
        borderColor: "rgb(99, 255, 132)",
        data: sensorData[title],
      },
    ],
  };
  return (
    <div className="chart">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
