import { DateTime } from "luxon";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "283015dbc54cfa7783ccba226431f0bb";

//DEMO OF API with city name
// https://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=c813f0e8ca8c75697569652955dc1657

//ONE CALL URL
//  https://api.openweathermap.org/data/2.5/onecall?
//  lat=33.44&lon=-94.04&exclude=hourly,daily&appid=c813f0e8ca8c75697569652955dc1657

//creating the funtion to get all weather raw data
// infotype is the data provided by the user i.e city name or long/lati
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType); //https://api.openweathermap.org/data/2.5/weather?q=nagpur& // i.e infotype is wether and searchParams is ?q=nagpur
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  const final = fetch(url)
    .then((res) => res.json())
    .then((data) => data);
  return final;
};

//onecall--function for format forecast weather
const formatForecastWeather = (data) => {
  let { timezone, hourly, daily } = data;
  console.log(data, "data");
  hourly = hourly.slice(1, 8).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  daily = daily.slice(1, 8).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  console.log(searchParams, "searchParams");
  //below code is for fetching current records of weather
  const gettingFormattedCurrentWeatherData = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
    console.log(gettingFormattedCurrentWeatherData, "gettingFormattedCurrentWeatherData")

  //below code is for fetching daily records of weather
  const { lon, lat } = gettingFormattedCurrentWeatherData;
  const gettingFormattedForecasteWeatherData = await getWeatherData("onecall", {
    lon,
    lat,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return {
    ...gettingFormattedCurrentWeatherData,
    ...gettingFormattedForecasteWeatherData,
  };
};

//taking all requiered data form particular "city" and "destructring" them.
const formatCurrentWeather = (requiredData) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity }, //"pressure" is optional if required
    wind: { speed }, //"deg" is optional if required
    dt,
    name,
    weather,
    sys: { country, sunrise, sunset },
  } = requiredData;

  const { main, description, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    dt,
    name,
    weather,
    country,
    sunrise,
    sunset,
    main,
    description,
    icon,
  };
};

//function to format local time
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//function for ICONS getting dynamically
const iconURL = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

export { formatToLocalTime, iconURL };
export default getFormattedWeatherData;
