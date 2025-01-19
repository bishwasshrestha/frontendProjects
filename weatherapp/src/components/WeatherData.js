import { useEffect, useState } from "react";
import GetWeather from "../Utility/getWeather";
import GetCoordinates from "../Utility/getCoordinates";
import CurrentWeather from "./CurrentWeather";
import MapComponent from "./MapComponent";
import DailyWeather from "./DailyWeather";
import "./weatherdata.css";

export default function WeatherData({ City }) {
  const [WeatherData, setWeatherData] = useState();
  const [coordinates, setCoordinates] = useState();
  const [Error, setError] = useState("");

  useEffect(() => {
    GetCoordinates(City, { setCoordinates, setError });
  }, [City]);

  useEffect(() => {
    if (coordinates) {     
      GetWeather(coordinates, { setWeatherData, setError });
    }
  }, [coordinates]);

  return (
    <div className="weatherdata">
      {WeatherData ? (
        <div className="cards">
          <h3>Weather in {City}</h3>
          <CurrentWeather data={WeatherData.current} />
          {/* <MapComponent data={WeatherData.hourly} coordinates={coordinates} /> */}
          <DailyWeather data={WeatherData.daily} />
        </div>
      ) : (
        <div>{Error}</div>
      )}
    </div>
  );
}
