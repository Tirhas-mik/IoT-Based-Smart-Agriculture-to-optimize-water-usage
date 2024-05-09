import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const labels = ["Temprature", "Humidity", "Moisture"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Smart Irrigation Sensor Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [10, 20, 30],
      },
    ],
  };

  return (
    <div className="chart">
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
