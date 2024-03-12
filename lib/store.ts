import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { carsSlice } from "./features/cars/carReducer";

const rootReducer = combineSlices(carsSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
