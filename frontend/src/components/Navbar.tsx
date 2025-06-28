import React from 'react';
import { Link } from 'react-router-dom';

const Navbar:React.FC = () => {
    return(
        <div className='flex flex-row flex-nowrap justify-between items-center space-x-2 w-full bg-white px-2 py-1 font-roboto '>
            <a href='/'>
            <img 
            src='/BarberSonLogo.png' alt='Barber & Son Logo'
            className='h-32 w-auto'>
            </img>
            </a>
            <div className='flex flex-row justify-between mx-6 gap-x-2 mt-2'>

                <Link to='/about' className='text-black text-lg font-medium bg-white px-6 py-3 hover:-translate-y-[2px] rounded-lg transition-all duration-300'>
                    About
                </Link>
                <Link to='/contact' className='text-black text-lg  font-medium bg-white px-6 py-3 hover:-translate-y-[2px] rounded-lg transition-all duration-300'>
                    Contact Us
                </Link>
                <Link to='/quote' className='text-white text-center  text-lg font-medium bg-deep_blue px-6 py-3  rounded-full transition-all duration-300'>
                    Get a Quote
                </Link>

            
                
            </div>
        </div>

    );
};
export default Navbar;