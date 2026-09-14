import { useState } from 'react';
import { X } from 'lucide-react';
import { getGeolocation } from '../services/get-geolocation';
import { useNavigate } from 'react-router';

const LocationModal = ({onClose}) => {
    const navigate = useNavigate();
    const [city,setCity] = useState("");
    const [error,setError] = useState("");

    const goToPage = (location)=> {
        navigate("/weather",{state: {location}})
    }


    const handelSubmit = async (e)=>{
        e.preventDefault();
        const value = city.trim();
        // console.log(value);
        if(!value){
            setError("Please enter a city name")
            return 
        }
        
        try{
            const location = await getGeolocation(value);
            // console.log(result);
            if(!location){
                setError("Geocoding request failed!")
            }
            goToPage(location);

        }catch(error){
            setError(error);
        }
    }
    const handelGeoLocation = ()=>{
        if(!navigator){
            setError("Geo location not found!")
            return
        }
        navigator.geolocation.getCurrentPosition(
            (positions)=>{
                const {latitude,longitude} = positions.coords;
                // console.log({latitude,longitude});
                goToPage({name: "Your Locations",lat : latitude, lon : longitude})
            },(error)=>{
                setError(error.message)
            },{
                timeout: 1000
            }
        )
    }
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-950/60'>
            <div className='h-[300px] rounded-xl w-[370px] bg-gray-100 shadow-2xl p-6'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xml font-medium'>Where are you today ?</h2>
                        <button onClick={onClose} className='cursor-pointer'>
                            <X/>
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handelSubmit}  action="">
                            <input type="text" placeholder='enter your city' value={city} onChange={(e)=>setCity(e.target.value)} 
                            className='w-full rounded-2xl border p-1 my-4' />
                            <div className='pt-4'>
                               <button type='submit' className='w-full  cursor-pointer text-lg font-medium bg-blue-500 px-5 py-1 rounded-4xl hover:scale-105 transition-all delay-100 text-gray-100'>Get Weather</button>
                           </div>
                        </form>
                        <div className='flex justify-center py-3'>
                            <h2>OR</h2>
                        </div>
                        <div className='py-2'>
                               <button type='button' onClick={handelGeoLocation} className='w-full  cursor-pointer text-lg font-medium bg-blue-500 px-5 py-1 rounded-4xl hover:scale-105 transition-all delay-100 text-gray-100'>Use My Locations</button>
                        </div>

                        <div className='text-center my-1'>
                            {error && <p className='text-red-500 text-md font-medium'>{error}</p>}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default LocationModal;