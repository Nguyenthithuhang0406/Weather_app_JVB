/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import exitIcon from "../../assets/images/exit.png";

import "./ModalWeather.css";
const ModalWeather = ({ date, onCancel }) => {
  const weather = useSelector((state) => state.weather);
  const [dayData, setDayData] = useState({});

  useEffect(() => {
    try {
      weather?.dataWeather?.forecast?.forecastday?.forEach((item) => {
        if (item.date === date) {
          setDayData(item);
          console.log("item", item);
        }
      });
    } catch (error) {
      console.log(error);
    }
    console.log("dayData", dayData);
  }, [date]);
  return (
    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title">Hourly Weather</div>
        <img src={exitIcon} alt="icon-cancel" onClick={() => onCancel()}/>
      </div>
      <div className="modal-top">
        <img src={dayData?.day?.condition?.icon} alt="icon-condition" />
        <div className="info-condition">
          <div className="condition-item">
            <p>{`${dayData?.day?.mintemp_c}°C - ${dayData?.day?.maxtemp_c}°C`}</p>
            <p>{`(avg ${dayData?.day?.avgtemp_c}°C)`}</p>
          </div>
          <div className="condition-item">
            <p>{`${dayData?.day?.mintemp_f}°F - ${dayData?.day?.maxtemp_f}°F`}</p>
            <p>{`(avg ${dayData?.day?.avgtemp_f}°F)`}</p>
          </div>
          <div className="condition-item">
            <p>avgHumidity {`${dayData?.day?.avghumidity} %`}</p>
          </div>
          <div className="condition-item">
            <p>UV {`${dayData?.day?.uv}`}</p>
          </div>
        </div>
      </div>
      <div className="modal-body">
        {dayData?.hour?.length > 0 &&
          dayData?.hour?.map((item) => (
            <div key={item?.time_epoch} className="item-hour">
              <p className="hour">
                {new Date(item?.time).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Ho_Chi_Minh", // Chỉnh lại múi giờ Việt Nam
                })}
              </p>
              <img src={item?.condition?.icon} alt="icon-condition" />
              <p className="description">{item?.condition?.text}</p>
              <p className="temp">{item.temp_c} °C</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModalWeather;
