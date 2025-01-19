import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import WeatherData from "./components/WeatherData";

function App() {
  const [City, setCity] = useState("Kathmandu");

  const handleSearch = (city) => {
    setCity(city);
  };

  return (
    <div className="App">
      <Search setCity={handleSearch} />
      <WeatherData City={City} />
    </div>
  );
}

export default App;
