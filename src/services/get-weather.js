export const getWeather = async(place)=>{

    // console.log("Functions",place);
    const {lat,lon,name}=place
    const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,rain,apparent_temperature,is_day`;
    const result = await fetch(url)
    // console.log(await result.json())
    const data = await result.json();
    const now = data.current
    // console.log(now);
    if(!now){
        throw new Error("Weather details get failed!")
    }
    return{
        location : name,
        temperature : Math.round(now.temperature_2m),
        humidity : now.relative_humidity_2m,
        wind : now.wind_speed_10m,
    }
};