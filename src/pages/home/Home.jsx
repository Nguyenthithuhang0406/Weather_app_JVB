/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getWeather } from "../../API/getWeather";

import "./Home.css";
const Home = () => {
  const [city, setCity] = useState("Hà Nội"); // Mặc định là Hà Nội
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const fetchWeather = async (city) => {
      setLoading(true);
      try {
        const response = await getWeather(city);
        setWeather(response);
      } catch (err) {
        setError("Không thể lấy dữ liệu thời tiết.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather(city);
  }, [isRefresh]);

  // Hàm xử lý thay đổi ô input thành phố
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
      setIsRefresh(!isRefresh);
    }
  }
  return (
    <div className="custom-container">
      <div className="custom-box">
        <div className="custom-flex-container">
          <div className="custom-flex">
            {" "}
            {/* Dùng flex để căn ngang */}
            <label
              className="custom-text" // Căn phải và màu nhạt cho "Your City"
              htmlFor="city"
            >
              Your City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => handleCityChange(e)} // Người dùng có thể gõ tên thành phố
              className="custom-input"
              placeholder="Nhập tên thành phố"
              onKeyPress={(e) => handleEnter(e)}
            />
          </div>
        </div>

        <div className="custom-days-flex">
          <div>
            <p className="custom-days-text">
              {new Date(weather.location.localtime).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Ho_Chi_Minh", // Chỉnh lại múi giờ Việt Nam
              })}
              ,{" "}
              {new Date(weather.location.localtime).toLocaleString("en-US", {
                weekday: "short",
                timeZone: "Asia/Ho_Chi_Minh",
              })}
              ,
              {new Date(weather.location.localtime).toLocaleString("en-US", {
                month: "short",
                timeZone: "Asia/Ho_Chi_Minh",
              })}
              {new Date(weather.location.localtime).getDate()},
              {new Date(weather.location.localtime).getFullYear()}
            </p>

            {/* Hình ảnh và nhiệt độ */}
            <div className="custom-days-image">
              <img
                className="custom-image"
                src={weather.current.condition.icon}
                alt="weather icon"
              />
              <span className="custom-temp">{weather.current.temp_f}°F</span>
            </div>

            {/* Tình trạng thời tiết */}
            <p className="custom-condition">{weather.current.condition.text}</p>

            {/* Độ ẩm và tốc độ gió */}
            <div className="custom-hum_wind">
              <div className="custom-hum">
                <p className="custom-name">Humidity</p>
                <p className="custom-dv">{weather.current.humidity}%</p>
              </div>
              <div>
                <p className="custom-name">Wind speed</p>
                <p className="custom-dv">{weather.current.wind_kph} km/h</p>
              </div>
            </div>
          </div>

          <div className="custom-body-right">
            <p className="custom-title">Temperature</p>
            <div className="custom-chart">
              <div className="custom-chart-top">
                <svg
                  className="chart-body"
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,30 Q20,20 40,25 T80,15 T100,20"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,30 Q20,20 40,25 T80,15 T100,20 L100,40 L0,40 Z"
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                </svg>
              </div>
              <div className="custom-templateF">
                <div className="templateF-title">
                  <p className="templateF-text">{weather.current.temp_f}°F</p>
                </div>
              </div>
            </div>
            <div className="custom-listDay-temp">
              {weather.forecast.forecastday.map((day, index) => (
                <div
                  key={day.date}
                  className={`day-text ${index === 0 ? "today" : ""}`}
                >
                  <p
                    className={`day-p ${
                      index === 0 ? "day-p_while" : "day-p_black"
                    }`}
                  >
                    {index === 0
                      ? "Today"
                      : `${new Date(day.date).toLocaleString("en-US", {
                          month: "short",
                        })}
                    ${new Date(day.date).getDate()}`}
                  </p>{" "}
                  <img
                    className="weather-icon"
                    src={day.day.condition.icon}
                    alt="weather icon"
                  />
                  <p>{day.day.condition.text }</p>
                  <p className="weather-dayDV">{day.day.avghumidity}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
