/* eslint-disable */
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Filler,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getWeather } from "../../API/getWeather";

const LineChart = ({ city, date, type }) => {
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    const filterData = async () => {
      try {
        const datas = await getWeather(city);

        const dataDate = datas?.forecast?.forecastday?.find(
          (item) => item.date === date
        );
        if (type === "temp") {
          setDayData([]);
          dataDate?.hour?.forEach((item) => {
            setDayData((prev) => [
              ...prev,
              { time: item.time, data: item.temp_f },
            ]);
          });
        }

        if (type === "uv") {
          setDayData([]);
          dataDate?.hour?.forEach((item) => {
            setDayData((prev) => [...prev, { time: item.time, data: item.uv }]);
          });
        }

        if (type === "humidity") {
          setDayData([]);
          dataDate?.hour?.forEach((item) => {
            setDayData((prev) => [
              ...prev,
              { time: item.time, data: item.humidity },
            ]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    filterData();
  }, [city, date, type]);

  Chart.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const labels = dayData.map((item) => item.time);
  const dt = dayData.map((item) => item.data);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${
          type === "temp" ? "Temperature" : type === "uv" ? "UV" : "Humidity"
        }`,
        data: dt,
        fill: true,
        borderColor: `${
          type === "temp"
            ? "rgb(75, 192, 192)"
            : type === "uv"
            ? "rgb(227, 191, 12)"
            : "rgb(64, 136, 4)"
        }`,
        borderWidth: 1,
        pointRadius: 1, ///style dấu chấm trong đường
        backgroundColor: `${
          type === "temp"
            ? "rgba(5, 86, 86, 0.2)"
            : type === "uv"
            ? "rgb(241, 223, 137)"
            : "rgba(185, 235, 143, 0.2)"
        }`,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
        title: {
          display: false, // Ẩn tiêu đề trục X
        },
        ticks: {
          display: false, // Ẩn nhãn trục X
        },
        grid: {
          display: false, // Ẩn lưới trục X
        },
      },
      y: {
        display: false,
        title: {
          display: false, // Ẩn tiêu đề trục Y
        },
        ticks: {
          display: false, // Ẩn nhãn trục Y
        },
        grid: {
          display: false, // Ẩn lưới trục Y nếu cần
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} ${
              type === "temp" ? "°F" : type === "uv" ? "" : "%"
            }`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
