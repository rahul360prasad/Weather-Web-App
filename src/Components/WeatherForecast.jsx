import React from "react";
import { iconURL } from "../Services/WeatherServices";

const WeatherForecast = ({ heading, weatherData }) => {
  return (
    <div>
      <div className="flex text-white items-center mt-12 justify-start text-center">
        <p className="font-medium uppercase">{heading}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row justify-around">
        {weatherData.map((weatherData, i) => (
          <div
            key={i}
            className="flex flex-col text-white items-center mt-6 justify-center mx-2"
          >{
            console.log(weatherData.title+"weather app")
          }
            <p className="font-light text-sm uppercase">{`${weatherData.title}`}</p>
            <img src={iconURL(weatherData.icon)} className="w-20" alt="" />
            <p className="font-medium">{`${weatherData.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
