import "./CurrentWeather.css";

export default function CurrentWeather(Current) {  
  return (
    <div className="currentweather">
      <div id="temp_icon">
        <img
          src={`http://openweathermap.org/img/wn/${Current.data.weather[0].icon}@4x.png`}
          alt="Weather Icon"
        />
        <h3>{Current.data.temp}C</h3>
        <p>{Current.data.weather[0].description}</p>
      </div>

      <div id="description">
        <div id="box">
          <p>Feels like</p> <p>{Current.data.feels_like}</p>
        </div>
        <div id="box">
          <p>Wind speed</p>
          <p> {Current.data.wind_speed}</p>
        </div>
        <div id="box">
          <p>Humidity</p>
          <p>{Current.data.humidity}</p>
        </div>
        <div id="box">
          <p>UV </p>
          <p>{Current.data.uvi}</p>
        </div>
      </div>
    </div>
  );
}
