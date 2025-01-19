import Axios from "axios";


export default function GetWeather(coordinates, {setWeatherData, setError}) { 
 
  const api_key = process.env.REACT_APP_API_KEY;
  const units='metric';
  if (coordinates) {
    const URL = `https:api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&units=${units}&appid=${api_key}`;
    Axios
    .get(URL)
    .then((response) => {
        console.log("weather data recieved!");
        setWeatherData(response.data)
      }).catch((error)=>{
        setError(error);
      });
   
  }
}
