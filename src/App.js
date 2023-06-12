import "./App.css";
import TopbarContents from "./Components/TopbarContents";
import SearchInputBar from "./Components/SearchInputBar";
import TimeAndLocation from "./Components/TimeAndLocation";
import TemperatureStatus from "./Components/TemperatureStatus";
import WeatherForecast from "./Components/WeatherForecast";
import getFormattedWeatherData from "./Services/WeatherServices";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //useState for query parameter
  const [query, setQuery] = useState({ q: "Nagpur, IN" });
  // useState for units i.e in degree or farenheight
  const [units, setUnits] = useState("metric");
  // useState for storing weather data
  const [weatherData, setWeatherData] = useState(null);
  const [unitSymbol, setUnitSymbol] = useState("C");
  // console.log(query, "query");
  // console.log({...query}, "...query");
  
  //creating useEffect with units and query dependency
  useEffect(() => {
    const fetchFormattedWetherData = async () => {
      // toastify animation code
      const cityName = query.q ? query.q : "current location...";
      toast.info("Fetching weather for " + cityName + "...");
       
      // calling from WeatherServices.js file
       await getFormattedWeatherData({...query, units}).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeatherData(data);
       });
    };
    fetchFormattedWetherData();
  }, [query, units]);
  // console.log(weatherData, "geu");

  // changing background color according to temperature of weatherData
  const backgroundColor = () => {
    if (!weatherData) {
      return " from-cyan-700 to-green-700 h-fit shadow-gray-400";
    }
    const threshold = units === "metric" ? 20 : 60;
    if (weatherData.temp <= threshold) {
      return "from-cyan-700 to-green-700 h-fit shadow-gray-400";
    }
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`max-w-screen-lg px-32 py-5 mx-auto mt-4 shadow-xl bg-gradient-to-tr ${backgroundColor()}`}
    >
      <TopbarContents setQuery={setQuery} />
      <SearchInputBar
        setQuery={setQuery}
        units={units}
        setUnits={setUnits}
        setUnitSymbol={setUnitSymbol}
      />

      {weatherData && (
        <div>
          <TimeAndLocation weatherData={weatherData} />
          <TemperatureStatus
            weatherData={weatherData}
            unitSymbol={unitSymbol}
          />

          <WeatherForecast
            heading="Hourly Forecaste"
            weatherData={weatherData.hourly}
          />
          <WeatherForecast
            heading="Daily Forecaste"
            weatherData={weatherData.daily}
          />
        </div>
      )}

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default App;
