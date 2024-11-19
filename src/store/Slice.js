import { createSlice } from "@reduxjs/toolkit";
const initState = {
  dataWeather: null
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initState,
  reducers: {
    setDataWeather: (state, action) => {
      state.dataWeather = action.payload;
    }
  }
});

export const { setDataWeather } = weatherSlice.actions;
export default weatherSlice.reducer;