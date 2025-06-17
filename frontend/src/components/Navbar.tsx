import React from 'react';
import { GiWaterRecycling } from "react-icons/gi";

const Navbar:React.FC = () => {
    return(
        <div className='flex items-center space-x-2 w-full bg-white px-2 py-1 font-roboto '>
            <img 
            src='/BarberSonLogo.png' alt='Barber & Son Logo'
            className='h-32 w-auto'>
            </img>
        </div>

    );
};
export default Navbar;