import {
    Clock3,
    MapPin,
    Sun,
} from "lucide-react";

const WeatherHero = ({ weather }) => {
    const {
        location,
        current,
    } = weather;

    return (
        <section
            className=" relative overflow-hidden rounded-b-[40px] bg-gradient-to-br from-blue-700 via-blue-500 to-sky-300 px-5 py-8 text-white sm:px-8 lg:px-14" >
            {/* Decorative clouds */}
            <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />

            <div className="absolute right-20 top-32 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

            <div className="relative z-10">
                {/* Location */}
                <div className="mb-3 flex items-center gap-2">
                    <MapPin size={25} />

                    <h1 className="text-3xl font-bold sm:text-4xl">
                        {location.name}
                    </h1>
                </div>

                <p className="text-sm text-blue-50 sm:text-base">
                    {new Date(location.localtime).toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }
                    )}
                </p>

                {/* Time */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Clock3 size={21} />

                        <span className="text-lg">
                            {new Date(location.localtime).toLocaleTimeString(
                                "en-US",
                                {
                                    hour: "numeric",
                                    minute: "2-digit",
                                }
                            )}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur">
                        <Sun size={18} />

                        <span>
                            {current.is_day === 1 ? "Day" : "Night"}
                        </span>
                    </div>
                </div>

                {/* Main weather */}
                <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
                    <div>
                        <div className="flex items-start">
                            <span className="text-[90px] font-light leading-none sm:text-[120px]">
                                {Math.round(current.temp_c)}
                            </span>

                            <span className="mt-4 text-3xl sm:text-4xl">
                                °C
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <img
                            src={`https:${current.condition.icon}`}
                            alt={current.condition.text}
                            className="h-24 w-24"
                        />

                        <div>
                            <h2 className="text-2xl font-semibold">
                                {current.condition.text}
                            </h2>

                            <p className="mt-2 text-blue-50">
                                Sunshine and clouds mixed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeatherHero;