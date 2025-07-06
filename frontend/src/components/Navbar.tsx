import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar:React.FC = () => {
    const [isOpen,setOpenState] = useState(false);
    return(
 
        <div className='relative z-20 flex flex-row flex-nowrap justify-between items-center space-x-2 w-full bg-white px-2 py-1 font-roboto '>
            <a href='/'>
                <img 
                src='/BarberSonLogo.png' alt='Barber & Son Logo'
                className='h-32 w-auto'>
                </img>
            </a>
            <div className=' hidden md:flex flex-row justify-between mx-6 gap-x-2 mt-2'>
                <Link to='/services' className='text-black text-lg  font-medium bg-white px-6 py-3 hover:-translate-y-[2px] rounded-lg transition-all duration-300'>
                    Services
                </Link>
                <Link to='/about' className='text-black text-lg font-medium bg-white px-6 py-3 hover:-translate-y-[2px] rounded-lg transition-all duration-300'>
                    About
                </Link>
                <Link to='/quote' className='text-white text-center  text-lg font-medium bg-blue-700 hover:bg-blue-600 px-6 py-3  rounded-full transition-all duration-300'>
                    Get a Quote
                </Link>
            </div>
            {/*Hamburger */}
            <button onClick={()=>{
                console.log('Button clicked, isOpen:', !isOpen);
                setOpenState(!isOpen);}} className="block md:hidden p-2 hover:text-gray-800">
                <GiHamburgerMenu size={34}/>
            </button>
            {isOpen && (
                <div className='absolute z-30 -left-2 top-full w-full bg-white shadow-lg font-poppins font-semibold text-base'>
                    <ul className='divide-y divide-black'>
                        <li className='hover:bg-gray-100'>
                            <Link
                                to='/services'
                                onClick={() => setOpenState(false)}
                                className='text-black block w-full text-center py-4 px-6'
                            >
                                Services
                            </Link>
                        </li>
                        <li className='hover:bg-gray-100'>
                            <Link
                                to='/about'
                                onClick={() => setOpenState(false)}
                                className='text-black block w-full text-center py-4 px-6'
                            >
                                About
                            </Link>
                        </li>
                        <li className='hover:bg-gray-100'>
                            <Link
                                to='/quote'
                                onClick={() => setOpenState(false)}
                                className='text-black  block w-full text-center py-4 px-6'
                            >
                                Get a Quote
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>

    );
};
export default Navbar;