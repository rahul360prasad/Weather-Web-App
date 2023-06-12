import React from "react";

const TopbarContents = ({ setQuery }) => {
  //api like arrays format
  const topCities = [
    {
      id: 1,
      name: "New York",
      img: require("../Assets/Images/newyork.png"),
    },
    {
      id: 2,
      name: "London",
      img: require("../Assets/Images/london-bridge.png"),
    },
    {
      id: 3,
      name: "Tokyo",
      img: require("../Assets/Images/tokyo.png"),
    },
    {
      id: 4,
      name: "Moscow",
      img: require("../Assets/Images/russia.png"),
    },
    {
      id: 5,
      name: "Beijing",
      img: require("../Assets/Images/Beijing.png"),
    },
    {
      id: 6,
      name: "Shanghai",
      img: require("../Assets/Images/Shanghai.png"),
    },
    {
      id: 7,
      name: "Los Angeles",
      img: require("../Assets/Images/hollywood.png"),
    },
  ];

  return (
    <div className="flex items-center justify-around mb-14 mt-10  sm:hidden md:flex">
      {topCities.map(
        (city, i) => (
           (
            <div key={i}>
              <button
                className="text-white font-small text-md flex flex-col items-center	"
                onClick={() => setQuery({ q: city.name })}
              >
                <img
                  className="product-image w-12 my-1"
                  src={city.img}
                  alt={city.img}
                />
                {city.name}
              </button>
            </div>
          )
        )
      )}
    </div>
  );
};

export default TopbarContents;
