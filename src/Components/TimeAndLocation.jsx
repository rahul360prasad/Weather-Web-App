import React from "react";
import { formatToLocalTime } from "../Services/WeatherServices";

const TimeAndLocation = ({ weatherData: { dt, timezone, name, country } }) => {
  return (
    <div className="timeanddate flex flex-col justify-center sm:w-64 sm:text-center sm:-ml-16 lg:w-auto lg:ml-0 ">
      <div className="flex items-center justify-center my-6 ">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white font-medium text-3xl ">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
