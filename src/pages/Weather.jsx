import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getWeather } from '../services/get-weather';
import { MapPin } from 'lucide-react';

const Weather = () => {
    const value = useLocation();
    const place = value.state.location
    // console.log(place)
    const [weather,setWeather] = useState(null);
    // console.log("weather",weather)
    useEffect(()=>{
        if(!place){
            return
        }
            const fetchWeather = async()=>{
                try{
                    const result = await getWeather(place)
                    // console.log(result);
                    setWeather(result);
                }catch(error){
                    console.log(error)
                }
            }
    fetchWeather();
    },[place])
    return (
        <div>
            <div className='grid md:grid-cols-2 gap-5'>
                <div className='shadow-2xl rounded-2xl p-5'>
                    <div className='space-y-3'>
                        <h1 className='text-2xl text-blue-500 font-semibold'>Today's weather Details </h1>
                        <div className='flex items-center gap-3'>
                            <MapPin size={30}/>
                            <h2 className='text-2xl text-purple-500 font-semibold'>{place.name}</h2>
                        </div>
                        <div className='flex items-center gap-16'>
                            <h3 className='text-5xl text-purple-800 font-extrabold'>{weather?.temperature}<sup className='text-xl'>°</sup>C</h3>
                            <p className='text-3xl text-purple-700 font-extrabold'>{weather?.description}</p>
                        </div>
                        <div className='flex items-center justify-between gap-3'>
                            <div className='rounded-2xl shadow-2xl p-4 text-center'>
                                <h3 className='text-lg text-purple-800 font-bold'>Feels Like : </h3>
                                <p className='text-3xl text-purple-700 font-extrabold'>{weather?.feelsLike}</p>                                
                            </div>
                            <div className='rounded-2xl shadow-2xl p-4 text-center'>
                                <h3 className='text-lg text-purple-800 font-bold'>Humidity : </h3>
                                <p className='text-3xl text-purple-700 font-extrabold'>{weather?.humidity}</p>                                
                            </div>
                            <div className='rounded-2xl shadow-2xl p-4 text-center'>
                                <h3 className='text-lg text-purple-800 font-bold'>Wind Speed : </h3>
                                <p className='text-3xl text-purple-700 font-extrabold'>{weather?.windSpeed}</p>                                
                            </div>

                        </div>
                    </div>
                </div>
                <div className='shadow-2xl flex flex-col justify-between items-center space- rounded-2xl p-5'>
                    <div>
                        <h2 className='text-blue-900 font-bold text-xl'>Live in {place.name}</h2>
                    </div>
                    <div className='text-center '>
                        <p className='text-3xl text-blue-700 font-extrabold '>{weather?.description}</p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <span className='rounded-full border-2 font-medium text-lg border-purple-400 p-1'>Feels Like : {weather.feelsLike}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;