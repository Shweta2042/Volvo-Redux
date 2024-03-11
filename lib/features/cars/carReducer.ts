import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cars } from '../../../public/data/carData';

export interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

interface CarsState {
  cars: Car[];
  carHashMap: Record<string, number>;
  selectedCar: Car | null;
  loading: boolean;
}

const initialState: CarsState = {
  cars: cars,
  carHashMap: {},
  selectedCar: null,
  loading: true,
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
      state.loading = false;
    },
    calculateCarHashMap: (state) => {
      state.carHashMap = cars.reduce((acc, car) => {
        acc[car.bodyType] = (acc[car.bodyType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
      if (cars.length > 0) {
        const allCount = cars.length;
        state.carHashMap = { all: allCount, ...state.carHashMap };
      }
    },
    getCarsByBodyType: (state, action: PayloadAction<string>) => {
      const bodyType = action.payload.trim().toLocaleLowerCase();  
      const filteredCars = cars.filter((car) => car.bodyType.trim().toLocaleLowerCase() === bodyType);
      state.cars = filteredCars;
      if(filteredCars.length === 0 ){
        state.cars = cars
      }
    },
    getCarById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const car = cars.find((c) => c.id === id);
      if (car) {
        state.selectedCar = car;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

export const { setCars, calculateCarHashMap, getCarsByBodyType, setLoading, getCarById } = carsSlice.actions;

export default carsSlice.reducer;