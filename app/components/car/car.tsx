"use client";

import ChevronCircle from "@/app/icon/ChevronCircle";
import ChevronCircleSmall from "@/app/icon/ChevronCircleSmalled";
import { calculateCarHashMap, getCarsByBodyType, setCars, setLoading } from "@/lib/features/cars/carReducer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './car.module.css';


export const CarCounter = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.cars.cars);
  const carHashMap = useAppSelector((state) => state.cars.carHashMap);
  const loading = useAppSelector((state) => state.cars.loading);
  const [selectedKey, setSelectedKey] = useState('all');
  const customSlider = useRef<Slider>(null);

  const slidesToShow = cars.length < 4 ? cars.length : 4;

  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    speed: 500,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cars.length < 3 ? cars.length : 3.1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          dots: true,
        },
      },
    ]
  };

  useEffect(() => {
    dispatch(setCars(cars)); 
    dispatch(calculateCarHashMap())
    dispatch(setLoading(false));
  }, [cars]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div role="main" className={styles["component-gap"]}>
      <div role="button" aria-label="car filter" className={styles["car-filter"]}>
        {Object.entries(carHashMap).map(([key, value], index) => (
          <button
            key={index}
            onClick={() => {
              dispatch(getCarsByBodyType(key));
              setSelectedKey(key)
            }}
            className={`${styles['car-filter-text']} ${selectedKey === key ? styles['active'] : ''}`}
          >
             <div className={styles['button-content']}>
              <div className={styles['key']}>{key}</div>
              <div className={styles['value']}>({value})</div>
            </div>
          </button>
        ))}
      </div>
      <Slider ref={customSlider} {...settings}>
        {cars.map((t, index) => (
          <div key={index} aria-hidden="true" tabIndex={-1} className={styles["car-list"]}>
            <div className={styles["body-type-text"]}>{t?.bodyType}</div>
            <div className={styles["model"]}>
              <div className={styles["model-name-text"]}>{t?.modelName}</div>
              <span className={styles["model-type-text"]} role="img" aria-label="from"> {t?.modelType}</span>
            </div>
            <img src={t?.imageUrl} alt={t?.modelName} className={styles["car-img"]} />
            <div className={styles["link"]}>
              <div className={styles["link-type"]}>
                <Link href={`/${t?.id}/learn`} className={styles["link-text"]}>
                  Learn More
                </Link>
                <ChevronCircleSmall />
              </div>
              <div className={styles["link-type"]}>
                <Link href={`/${t?.id}/shop`} className={styles["link-text"]}>
                  Shop
                </Link>
                <ChevronCircleSmall />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className={styles["button-nav"]}>
        <button aria-label="previous" onClick={() => customSlider?.current?.slickPrev()}>
          <ChevronCircle className={styles["button-prev"]} />
        </button>
        <button aria-label="next" onClick={() => customSlider?.current?.slickNext()}>
          <ChevronCircle className={styles["button-next"]} />
        </button>
      </div>
    </div>
  );
};

