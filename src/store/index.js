import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./Slice";


let store = configureStore({
  reducer: {
    weather: weatherReducer
  }
});

export { store };