import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const apiUrl = `http://api.weatherstack.com/current?access_key=23f848739db222b0c7b1911a2f4eaad9&query=${capital}`;

        axios
            .get(apiUrl)
            .then(response => {
                setWeather(response.data.current);
            })
            .catch(error => {
                console.log("Weather API request failed:", error);
            });
    }, [capital]);

    return (
        <div>
            <h2>Weather in {capital}</h2>
            {weather ? (
                <div>
                    <p>temperature {weather.temperature} Celsius</p>
                    <img src={weather.weather_icons} alt="current weather" />
                    <p>wind {weather.wind_speed} km/h</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default Weather;