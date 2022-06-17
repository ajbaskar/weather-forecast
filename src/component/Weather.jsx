import React, { useState, useEffect } from "react";
import "./Weather.css";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL =
  "http://api.weatherstack.com/current?access_key=303679edd6331634577c7de4a86e576f";
const Weather = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeatherData("london");
  }, []);

  const getWeatherData = (title) => {
    fetch(`${API_URL}&query=${title}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data.current);
        setLocation(data.location);
        setLoading(false);
      });
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function displayDay(d) {
    var date = new Date(d);
    var day = days[date.getDay()];
    //console.log(day+'.'+date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear());
    return (
      day +
      "." +
      date.getDate() +
      "/" +
      date.getMonth() +
      "/" +
      date.getFullYear()
    );
  }

  function windDirection(dir) {
    if (dir) {
      var array = dir.split("");

      let res = "";
      array.filter((dir) => {
        if (dir == "S") res += " South";
        if (dir == "W") res += " West";
        if (dir == "E") res += " East";
        if (dir == "N") res += " North";
      });
      return res;
    }
  }

  if (loading)
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  else
    return (
      <div className="weather">
        <div className="weather-container">
          <div className="weather-current">
            <div className="weather-info">
              <div className="weather-date-time">
                <div className="weather-date">
                  <p>{displayDay(location?.localtime)}</p>
                </div>
                <div className="weather-time">
                  <p>{weatherData?.observation_time}</p>
                </div>
              </div>
              <div className="weather-temp">
                <p>
                  {weatherData?.temperature}
                  <sup>°c</sup>
                </p>

                <div className="weather-min-max">
                  <div className="weather-max">
                    <p>
                      Min : {weatherData?.feelslike}
                      <sup>°</sup>
                    </p>
                  </div>
                  <div className="weather-min">
                    <p>
                      Max : {weatherData?.humidity}
                      <sup>°</sup>
                    </p>
                  </div>
                </div>
              </div>
              <div className="weather-icon">
                <img
                  src={
                    weatherData?.weather_icons && weatherData?.weather_icons[0]
                  }
                  alt="icon"
                />
                <p>
                  {weatherData?.weather_descriptions &&
                    weatherData?.weather_descriptions[0]}
                </p>
              </div>
            </div>
            <div className="wheather-speed">
              <p>Wind : {windDirection(weatherData?.wind_dir)}</p>
              <p>{weatherData?.wind_speed} mi/h</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Weather;
