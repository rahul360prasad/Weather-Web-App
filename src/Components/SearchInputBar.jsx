import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const SearchInputBar = ({
  setQuery,
  units,
  setUnits,
  unitSymbol,
  setUnitSymbol,
}) => {
  const [city, setCity] = useState("");
  // console.log(units,"units111");
  //this is for search bar button
  const searchHandler = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  // this is for location buttons
  const locationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  // this is for uints i.e in degee or in farenheight
  const unitsHandler = (e) => {
    // console.log(e.currentTarget.name, "eee");
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
      // setUnitSymbol("F");
    }
    // units==="metric"?setUnitSymbol("F"):unitSymbol;
  };

  return (
    <div className="flex flex-row justify-center mb-10 sm:mt-10 sm:flex-col sm:items-center lg:flex-row">
      {/* div for search input box */}
      <div className="flex flex-row w-2/4 items-center justify-center space-x-4 sm:w-max">
        <input
          type="text"
          value={city}
          placeholder="Search only City..."
          className="text-md font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-md"
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        {/* search icon button */}
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={searchHandler}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={locationHandler}
        />
      </div>

      <div className="flex flex-row w-1/4  items-center justify-center sm:mt-14 sm:items-center sm:mt-5 lg:mt-0">
        <button
          name="metric"
          className="text-white cursor-pointer font-light text-xl"
          onClick={unitsHandler}
        >
          °C
        </button>
        <p className="text-white cursor-pointer font-light text-xl px-1">/</p>
        <button
          name="imperial"
          className="text-white cursor-pointer font-light text-xl"
          onClick={unitsHandler}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default SearchInputBar;
