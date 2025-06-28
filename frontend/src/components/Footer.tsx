import React from 'react';
import {Link} from 'react-router-dom';
const Footer:React.FC = () => {
    return(
        <div className='flex flex-row flex-nowrap justify-between items-center space-x-2 w-full bg-deep_blue px-2 py-1 font-roboto '>
            <a href='/'>
            <img 
            src='/BarberSonLogo.png' alt='Barber & Son Logo'
            className='h-32 w-auto'>
            </img>
            </a>
            <div className='flex flex-row justify-between mx-6 gap-x-4'>
                <div>
                    About
                </div>
                <div>
                    Contact
                </div>
            </div>
        </div>

    );
};
export default Footer;