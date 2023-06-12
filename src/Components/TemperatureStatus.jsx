import React from "react";
import {
  UilTemperatureThreeQuarter,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconURL } from "../Services/WeatherServices";

const TemperatureStatus = ({
  weatherData: {
    description,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
  unitSymbol,
}) => {
  console.log(unitSymbol, "unitSymbol");
  return (
    <div>
      {/* temperature status in text */}
      <div className="flex item-center justify-center my-2 py-2">
        <p className="text-white font-light text-sm">
          Status:
          <span className="text-cyan-200 font-medium text-lg capitalize">
            {" "}
            {description}
          </span>
        </p>
      </div>

      {/* detail temprature status with logo and temperature values */}
      <div className="flex flex-row items-center justify-around my-3 py-3 text-white">
        {/* first is for logo */}
        <img src={iconURL(icon)} alt="sunImg" className="w-24" />
        {/* second is for temperature values in degree */}
        <p className="text-5xl">{temp.toFixed()}° </p>
        {/* third div for real time temperature degree, humidity and wind speed */}
        <div className="flex flex-col items-center justify-center space-y-2 items-baseline	">
          {/*degree*/}
          <div className="flex font-light text-sm item-center justify-center">
            <UilTemperatureThreeQuarter size={18} className="mr-1" />
            Real Fell:
            <span className="font-medium ml-1">{feels_like.toFixed()}°</span>
          </div>

          {/* humidity */}
          <div className="flex font-light text-sm item-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{humidity}%</span>
          </div>

          {/* wind */}
          <div className="flex font-light text-sm item-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{speed}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-5 justify-center items-center my-2 py-2 text-white sm:flex-col sm:w-80 sm:-ml-28 sm:text-center lg:flex-row lg:w-auto">
        <div className="flex font-light text-sm item-center justify-center">
          <UilSun size={18} className="mr-1" />
          Rise:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </div>
        <span className="font-light">|</span>
        <div className="flex font-light text-sm item-center justify-center">
          <UilSunset size={18} className="mr-1" />
          Sunset:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </div>
        <span className="font-light">|</span>
        <div className="flex font-light text-sm item-center justify-center">
          <UilArrowUp size={18} className="mr-1" />
          High:
          <span className="font-medium ml-1">{temp_max.toFixed()}°c</span>
        </div>
        <span className="font-light">|</span>
        <div className="flex font-light text-sm item-center justify-center">
          <UilArrowDown size={18} className="mr-1" />
          Low:
          <span className="font-medium ml-1">{temp_min.toFixed()}°c</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureStatus;
