import React from 'react'
import Form from '@/components/Form'
import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Quote: React.FC = () => {
    return (
        <div className='bg-white min-h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:mx-16 '>
                <div className='flex flex-col no-wrap gap-y-2 items-center justify-center my-12 md:mt-0'>
                    <div className='flex text-deep_blue text-3xl mx-auto font-poppins font-extrabold'>
                        Get Started
                    </div>
                    <div>
                        <div className='flex font-roboto mx-auto'>
                            Call us or reach out to get a free quote!
                        </div>
                        <div className='flex flex-nowrap gap-x-2 mt-4 '>
                            <FaPhone size={19} className='text-deep_blue mt-[5px] items-center justify-items-center'/>
                            <a href='tel:+2149973143' 
                            className='text-blue-700 font-roboto text-lg font-medium  hover:text-blue-600'>
                                (214){' '} 997-3143
                            </a>
                        </div>
                        <div className='flex flex-nowrap gap-x-1 mt-2 items-center justify-items-center'>
                            <IoLocationSharp size={22} className='text-deep_blue mt-[2x] ' />
                            <a className = 'text-black text-md font-medium'>
                                Farmers Branch, TX
                            </a>
                        </div>
                    </div>
                </div>
                <div className=' md:ml-0 md:mr-auto'>
                    <Form />
                </div>
            </div>
            
        </div>
    );
};

export default Quote;