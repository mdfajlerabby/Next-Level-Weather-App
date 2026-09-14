import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getGeolocation } from '../services/get-geolocation';

const LocationModal = ({onClose}) => {
    const [city,setCity] = useState();
    const handelSubmit = async (e)=>{
        e.preventDefault();
        const value = city.trim();
        // console.log(value);
        
        try{
            const result = await getGeolocation(value);
            console.log(result);
        }catch(error){
            console.log(error);
        }
    }
    const handelGeoLocation = ()=>{
        navigator.geolocation.getCurrentPosition(
            (positions)=>{
                const {latitude,longitude} = positions.coords;
                console.log({latitude,longitude});
            },(error)=>{
                console.log(error)
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
                    </div>
            </div>
        </div>
    );
};

export default LocationModal;