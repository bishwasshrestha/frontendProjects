function dateConverter(rawDate) {
  const date = new Date(rawDate);
  const day = date.getDate();
  return day;
}
export default function DailyWeather(data) {
  console.log(data);

  return <div className="daily_weather">{ }</div>;
}
