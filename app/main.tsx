import { CarCounter } from "./components/car/car";

export default function MainPage() {
  return (
    <div className="component-gap">
     <img className="logo-img" src={"https://www.volvocars.com/static/shared/images/volvo-wordmark-black.svg"} alt='Logo'/>
    <CarCounter />
  </div>);
}