import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherApi = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
});

export const getCurrentWeather = async (city) => {
    const response = await weatherApi.get("/current.json", {
        params: {
            key: API_KEY,
            q: city,
            aqi: "no",
        },
    });

    return response.data;
};