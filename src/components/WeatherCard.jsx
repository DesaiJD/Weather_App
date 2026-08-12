const WeatherCard = ({ icon, title, value, iconBg = "bg-blue-50" }) => {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconBg}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 truncate text-xl font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;