"use client"
import { getCarById } from '@/lib/features/cars/carReducer';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from '../../components/car/car.module.css';



const Learn = () => {
    const { id } = useParams();
    const carId = Array.isArray(id) ? id[0] : id;
    const dispatch = useAppDispatch();
    const selectedCar = useAppSelector((state) => state.cars.selectedCar);
    useEffect(() => {
        if (carId) {
          dispatch(getCarById(carId)); 
        }
      }, [carId]);
    return(
    <div aria-label={selectedCar?.modelName} className={styles["car-list"]}>
      <div className={styles["body-type-text"]}>{selectedCar?.bodyType}</div>
      <div className={styles["model"]}>
          <div className={styles["model-name-text"]}>{selectedCar?.modelName}</div>
          <span className= {styles["model-type-text"]} role="img" aria-label="from"> {selectedCar?.modelType}</span>
          </div>
          <img src={selectedCar?.imageUrl} alt={selectedCar?.modelName} className={styles["car-img"]} />
        </div>
    )
};

export default Learn;
