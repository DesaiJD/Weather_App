import { useEffect, useState } from "react";
import { CloudSun, LocateFixed, RefreshCw, Search } from "lucide-react";

import SearchBar from "../components/SearchBar";
import WeatherHero from "../components/WeatherHero";
import WeatherGrid from "../components/WeatherGrid";

import { getCurrentWeather } from "../services/weatherApi";

const Weather = () => {
    const [search, setSearch] = useState("surat");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==============================
    // Fetch Weather
    // ==============================
    const fetchWeather = async (city) => {
        try {
            setLoading(true);
            setError("");

            const data = await getCurrentWeather(city);
            setWeather(data);
            setSearch(data.location.name);
        } catch (error) {
            console.error("Weather Error:", error);
            setWeather(null);
            setError("Unable to find this city. Please try another city.");
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // Initial Weather
    // ==============================
    useEffect(() => {
        fetchWeather("surat");
    }, []);

    // ==============================
    // Search
    // ==============================
    const handleSearch = (city) => {
        fetchWeather(city);
    };

    // ==============================
    // Current Location
    // ==============================
    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const data = await getCurrentWeather(`${latitude},${longitude}`);
                    setWeather(data);
                    setSearch(data.location.name);
                } catch (error) {
                    console.error(error);
                    setWeather(null);
                    setError("Unable to get weather for your location.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setLoading(false);
                setError("Please allow location access to use this feature.");
            }
        );
    };

    // ==============================
    // Refresh
    // ==============================
    const handleRefresh = () => {
        const city = weather?.location?.name || search || "surat";
        fetchWeather(city);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-100">
            <div className="mx-auto min-h-screen w-full max-w-[1500px] overflow-hidden bg-white shadow-2xl">
                {/* =====================================
            HEADER
        ====================================== */}
                <header className="relative z-20 flex w-full items-center gap-3 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-4 py-4 sm:gap-4 sm:px-8 lg:px-10">
                    {/* Logo */}
                    <div className="hidden shrink-0 items-center gap-3 text-white md:flex md:w-44 lg:w-48">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                            <CloudSun size={27} />
                        </div>
                        <span className="whitespace-nowrap text-lg font-bold lg:text-xl">
                            SkyWeather
                        </span>
                    </div>

                    {/* Mobile Logo */}
                    <div className="flex shrink-0 items-center justify-center text-white md:hidden">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                            <CloudSun size={26} />
                        </div>
                    </div>

                    {/* Search */}
                    <div className="min-w-0 flex-1">
                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                            onSearch={handleSearch}
                        />
                    </div>

                    {/* Location */}
                    <button
                        type="button"
                        onClick={handleCurrentLocation}
                        title="Use current location"
                        aria-label="Use current location"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:h-12 sm:w-12"
                    >
                        <LocateFixed size={20} />
                    </button>

                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={handleRefresh}
                        title="Refresh weather"
                        aria-label="Refresh weather"
                        className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-md transition duration-300 hover:rotate-180 sm:flex"
                    >
                        <RefreshCw size={20} />
                    </button>
                </header>

                {/* =====================================
            MAIN CONTENT
        ====================================== */}
                {loading && (
                    <div className="flex min-h-[70vh] items-center justify-center bg-sky-50 px-5">
                        <div className="text-center">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                            <p className="mt-4 text-sm font-medium text-slate-600">
                                Loading weather...
                            </p>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex min-h-[70vh] items-center justify-center bg-sky-50 px-5">
                        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full g-red-50">
                                <Search size={30} className="text-red-500" />
                            </div>
                            <h2 className="mt-5 text-xl font-bold text-slate-800">
                                City Not Found
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>
                            <button
                                type="button"
                                onClick={() => fetchWeather("Vadodara")}
                                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Try Vadodara
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && weather && (
                    <>
                        {/* Weather Hero */}
                        <WeatherHero weather={weather} />

                        {/* Weather Details */}
                        <WeatherGrid weather={weather} />

                        {/* Footer */}
                        <footer className="bg-blue-50 px-5 py-7 text-center">
                            <p className="text-sm text-slate-400">
                                Last updated: {weather.current.last_updated}
                            </p>
                            <p className="mt-2 text-xs text-slate-400">
                                Weather data provided by{" "}
                                <a
                                    href="https://www.weatherapi.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-blue-500 hover:underline"
                                >
                                    WeatherAPI.com
                                </a>
                            </p>
                        </footer>
                    </>
                )}
            </div>
        </main>
    );
};

export default Weather;