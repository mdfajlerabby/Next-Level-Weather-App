import {useState} from 'react';
import LocationModal from '../components/LocationModal';

const Home = () => {
    const [click,setClick] = useState(false);
    return (
        <div>
            <div className='text-center'>
                <h1 className='text-6xl text-blue-300 font-extrabold'>NextLevel <span className='text-blue-400'>Weather</span></h1>
                <p className='py-4 text-md text-gray-400'>Check your weather to in next level</p>
            </div>
            <div className='flex justify-center'>
                <button type='button' onClick={()=>setClick(true)} className=' cursor-pointer text-lg font-medium bg-blue-500 px-5 py-1 rounded-4xl hover:scale-105 transition-all delay-100 text-gray-100'>Cehck Weather</button>
            </div>
            {
                click && <LocationModal onClose={()=>setClick(false)}/>
                
            }
        </div>
    );
};

export default Home;