import {
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Navigation,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";

import WeatherCard from "./WeatherCard";

const WeatherGrid = ({ weather }) => {
  const { location, current } = weather;

  const cards = [
    {
      title: "Temperature",
      value: `${Math.round(current.temp_c)}°C`,
      icon: <Thermometer className="text-red-500" />,
      iconBg: "bg-red-50",
    },
    {
      title: "Feels Like",
      value: `${Math.round(current.feelslike_c)}°C`,
      icon: <Thermometer className="text-purple-500" />,
      iconBg: "bg-purple-50",
    },
    {
      title: "Condition",
      value: current.condition.text,
      icon: <Cloud className="text-blue-500" />,
      iconBg: "bg-blue-50",
    },
    {
      title: "Humidity",
      value: `${current.humidity}%`,
      icon: <Droplets className="text-cyan-500" />,
      iconBg: "bg-cyan-50",
    },
    {
      title: "Wind Speed",
      value: `${current.wind_kph} km/h`,
      icon: <Wind className="text-green-500" />,
      iconBg: "bg-green-50",
    },
    {
      title: "Wind Direction",
      value: current.wind_dir,
      icon: <Navigation className="text-indigo-500" />,
      iconBg: "bg-indigo-50",
    },
    {
      title: "Rain",
      value: `${current.precip_mm} mm`,
      icon: <CloudRain className="text-sky-500" />,
      iconBg: "bg-sky-50",
    },
    {
      title: "UV Index",
      value: current.uv,
      icon: <Sun className="text-yellow-500" />,
      iconBg: "bg-yellow-50",
    },
    {
      title: "City",
      value: location.name,
      icon: <MapPin className="text-red-500" />,
      iconBg: "bg-red-50",
    },
    {
      title: "Local Time",
      value: new Date(location.localtime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      icon: <Gauge className="text-purple-500" />,
      iconBg: "bg-purple-50",
    },
    {
      title: "Visibility",
      value: `${current.vis_km} km`,
      icon: <Eye className="text-blue-500" />,
      iconBg: "bg-blue-50",
    },
    {
      title: "Cloud Cover",
      value: `${current.cloud}%`,
      icon: <Cloud className="text-slate-500" />,
      iconBg: "bg-slate-100",
    },
  ];

  return (
    <section className="px-4 py-8 sm:px-8 lg:px-14">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <WeatherCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBg={card.iconBg}
          />
        ))}
      </div>
    </section>
  );
};

export default WeatherGrid;