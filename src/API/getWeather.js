import axios from "axios";

import { APIKEY, ENDPOINT } from "../constants/constants";
export const getWeather = async (city, countDay=10) => {
  const response = await axios.get(
    `${ENDPOINT}?key=${APIKEY}&q=${city}&days=${countDay}&aqi=no&alerts=yes`
  );
  return response.data;
};
