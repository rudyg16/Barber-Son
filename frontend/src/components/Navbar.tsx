import React from 'react';
import { GiWaterRecycling } from "react-icons/gi";

const Navbar:React.FC = () => {
    return(
        <div className='flex items-center space-x-2 w-full bg-white px-4 py-3 font-roboto ' >
            <GiWaterRecycling className='flex h-8 w-auto text-maroon '/>
            <h1 className='flex text-maroon text-left font-semibold'>Barber & Son Pressure Washing</h1>
        </div>

    );
};
export default Navbar;