import { useEffect, useState } from "react";
// import  API_COIN_URL  from "../.env";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
const API_COIN_URL = import.meta.env.VITE_COIN_API_URL;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
);

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `${API_COIN_URL}/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1].toFixed(2),
        }));

        const formattedData = {
          labels: data.prices.map((price) => new Date(price[0])),
          datasets: [
            {
              label: "Price in USD",
              data: prices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              pointRadius: 0,
              tension: 0.1,
            },
          ],
        };
        setChartData(formattedData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [coinId]);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart: {error}</div>;
  if (!chartData) return <div>No chart data available</div>;

  return (
    <div className="coin-chart-container">
      <h2>30-Day Price Chart</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
                display: false,
              position: "top",
            },
            title: {
              display: true,
              text: "30-Day Price Chart",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
              },
              title: {
                display: true,
                text: "Date",
                displayFormats: {
                  day: "MMM d",
                },
              },
            },
            y: {
              title: {
                display: true,
                text: "Price in USD",
              },
              beginAtZero: false,
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
