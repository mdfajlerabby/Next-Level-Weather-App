const WMO_CODE = {
    0: {
        condition: "clear",
        description: "clear sky",
        label: "Clear_sky",
        icon: "Clear",
    },

    1: {
        condition: "mainly_clear",
        description: "mainly clear",
        label: "Mainly_clear",
        icon: "PartlyCloudy",
    },

    2: {
        condition: "partly_cloudy",
        description: "partly cloudy",
        label: "Partly_cloudy",
        icon: "PartlyCloudy",
    },

    3: {
        condition: "overcast",
        description: "overcast",
        label: "Overcast",
        icon: "Cloudy",
    },

    45: {
        condition: "fog",
        description: "fog",
        label: "Fog",
        icon: "Fog",
    },

    48: {
        condition: "rime_fog",
        description: "depositing rime fog",
        label: "Rime_fog",
        icon: "Fog",
    },

    51: {
        condition: "light_drizzle",
        description: "light drizzle",
        label: "Light_drizzle",
        icon: "Drizzle",
    },

    53: {
        condition: "moderate_drizzle",
        description: "moderate drizzle",
        label: "Moderate_drizzle",
        icon: "Drizzle",
    },

    55: {
        condition: "heavy_drizzle",
        description: "dense drizzle",
        label: "Heavy_drizzle",
        icon: "Drizzle",
    },

    56: {
        condition: "light_freezing_drizzle",
        description: "light freezing drizzle",
        label: "Light_freezing_drizzle",
        icon: "FreezingDrizzle",
    },

    57: {
        condition: "heavy_freezing_drizzle",
        description: "dense freezing drizzle",
        label: "Heavy_freezing_drizzle",
        icon: "FreezingDrizzle",
    },

    61: {
        condition: "light_rain",
        description: "slight rain",
        label: "Light_rain",
        icon: "Rain",
    },

    63: {
        condition: "moderate_rain",
        description: "moderate rain",
        label: "Moderate_rain",
        icon: "Rain",
    },

    65: {
        condition: "heavy_rain",
        description: "heavy rain",
        label: "Heavy_rain",
        icon: "Rain",
    },

    66: {
        condition: "light_freezing_rain",
        description: "light freezing rain",
        label: "Light_freezing_rain",
        icon: "FreezingRain",
    },

    67: {
        condition: "heavy_freezing_rain",
        description: "heavy freezing rain",
        label: "Heavy_freezing_rain",
        icon: "FreezingRain",
    },

    71: {
        condition: "light_snow",
        description: "slight snow fall",
        label: "Light_snow",
        icon: "Snow",
    },

    73: {
        condition: "moderate_snow",
        description: "moderate snow fall",
        label: "Moderate_snow",
        icon: "Snow",
    },

    75: {
        condition: "heavy_snow",
        description: "heavy snow fall",
        label: "Heavy_snow",
        icon: "Snow",
    },

    77: {
        condition: "snow_grains",
        description: "snow grains",
        label: "Snow_grains",
        icon: "Snow",
    },

    80: {
        condition: "light_rain_showers",
        description: "slight rain showers",
        label: "Light_rain_showers",
        icon: "RainShowers",
    },

    81: {
        condition: "moderate_rain_showers",
        description: "moderate rain showers",
        label: "Moderate_rain_showers",
        icon: "RainShowers",
    },

    82: {
        condition: "heavy_rain_showers",
        description: "violent rain showers",
        label: "Heavy_rain_showers",
        icon: "RainShowers",
    },

    85: {
        condition: "light_snow_showers",
        description: "slight snow showers",
        label: "Light_snow_showers",
        icon: "SnowShowers",
    },

    86: {
        condition: "heavy_snow_showers",
        description: "heavy snow showers",
        label: "Heavy_snow_showers",
        icon: "SnowShowers",
    },

    95: {
        condition: "thunderstorm",
        description: "thunderstorm",
        label: "Thunderstorm",
        icon: "Thunderstorm",
    },

    96: {
        condition: "thunderstorm_hail",
        description: "thunderstorm with slight hail",
        label: "Thunderstorm_hail",
        icon: "Thunderstorm",
    },

    99: {
        condition: "thunderstorm_hail",
        description: "thunderstorm with heavy hail",
        label: "Thunderstorm_heavy_hail",
        icon: "Thunderstorm",
    },
};


export const getWeather = async(place)=>{

    // console.log("Functions",place);
    const {lat,lon,name}=place
    const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,rain,apparent_temperature,is_day`;
    const result = await fetch(url)
    // console.log(await result.json())
    const data = await result.json();
    const now = data.current
    console.log(now.weather_code);
    if(!now){
        throw new Error("Weather details get failed!")
    }
    const weather = WMO_CODE[now.weather_code]

    const icon = weather.icon === "clear" &&  now.is_day === 0 ? "clear_night" : weather.icon
    console.log(weather);
    return{
        location : name,
        temperature : Math.round(now.temperature_2m),
        humidity : now.relative_humidity_2m,
        windSpeed : Math.round(now.wind_speed_10m),
        feelsLike : Math.round(now.apparent_temperature),
        condition: weather.condition,
        description: weather.description,
        conditionLabel: weather.label,
        icon: weather.icon
    }
};