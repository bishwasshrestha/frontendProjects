import Axios from "axios";
export default function GetCoordinates(City, { setCoordinates, setError }) {
  // console.log('city:',City);
  const api_key = process.env.REACT_APP_API_KEY;

  if (City) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&exclude=minutely,alerts&appid=${api_key}`;

    Axios.get(URL)
      .then((response) => {
        const coordinates = response.data.coord;
        setCoordinates(coordinates);
      })
      .catch((err) => {
        setError(err.message);
      });
  }
}
