import React from 'react'
import Form from '@/components/Form'
import {Link} from "react-router-dom";

import { FaHome, FaCheck, FaBuilding ,FaPhone} from "react-icons/fa";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

interface BulletProps {
  text: string;
}

export const Bullet: React.FC<BulletProps> = ({ text }) => (
  <div className="flex items-center gap-x-2">
    <MdOutlineSubdirectoryArrowRight size={20} className="text-blue-400" />
    <span className="text-white text-xl">{text}</span>
  </div>
);

const Home: React.FC = () => {
    return (
        <div className='bg-cream min-h-screen w-full pb-12'>
            {/*Initial Header */}
            <div className="relative w-full h-[700px] overflow-hidden">
                <img
                    src="/pressure_washing_img/stockimage.jpeg"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    alt="Pressure washing"
                />

                <div className="absolute inset-y-0 left-0 w-full  bg-gradient-to-r from-deep_blue via-blue-600 to-transparent z-10 opacity-80" />
                <div className='absolute top-1/3 left-8 z-20'>
                    <div className='flex flex-col no-wrap items-start'>
                        <h2 className='text-logo_mint font-bold text-3xl md:text-4xl'>COMMERCIAL & RESIDENTIAL</h2>
                        <h1 className="text-white font-poppins font-semibold text-5xl md:text-6xl">
                            DALLAS PROFESSIONAL <br />
                            PRESSURE WASHING
                        </h1>
                        <div className='flex flex-row gap-x-4 flex-wrap mt-4 '>
                            <Link to="/quote"
                                className="group px-5 py-3 bg-transparent hover:bg-white hover:bg-opacity-20 text-white font-roboto shadow-md rounded-xl  border border-gray-300 mt-2 
                                    transform transition-transform hover:-translate-y-1  duration-300">
                                <div className='flex flex-row flex-nowrap gap-x-2 w-full h-full mt-[2px]'>
                                    <div className='text-xl'>Get a FREE Quote Today</div>
                                    <FaArrowRightLong size={22} className='group-hover:translate-x-1 mt-1 duration-500 transition-transform ' />
                                </div>
                            </Link>
                            <a href= 'tel:+2149973143' className='py-3 px-5 border border-white rounded-xl text-white mt-2 
                            hover:-translate-y-1  hover:bg-white hover:bg-opacity-20 transition-transform duration-300'>
                                <div className='flex flex-row flex-nowrap gap-x-2 w-full h-full mt-[2px]'>
                                    <FaPhone className='mt-[2px]'size={24}/>
                                    <div className=' font text-xl font-semibold font-roboto'>(214){' '}997-3143</div>
                                </div>

                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/*End initial header */}
            <div className='relative mt-20 '>
                
                {/*Service Section*/}
                <svg className=' block w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#030380" fillOpacity="1"
                    d="M0,192L48,165.3C96,139,192,85,288,58.7C384,32,480,32,576,74.7C672,117,768,203,864,218.7C960,235,1056,181,1152,160C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <div className='bg-deep_blue -mt-1 z-10'>
                    <h3 className="text-5xl md:text-7xl text-center font-bold text-white ">
                        Our Services
                    </h3>
                    <div className=" flex flex-col md:flex-row justify-center items-center w-full gap-x-20 md:gap-x-40 mt-10 ">
                            
                        <div className='flex flex-col text-white '>
                            <img src='/house.svg' className='max-h-32 md:max-h-40 w-auto' />
                            <h2 className='font-poppins text-3xl md:text-4xl font-semibold my-2'>Residential Services</h2>
                            <ul className="space-y-2 ">
                                <Bullet text="Driveways" />
                                <Bullet text="Decks & Patios" />
                                <Bullet text="Fences & Gates" />
                                <Bullet text="Window Cleaning" />
                                <Bullet text="Gutter Cleaning" />
                            </ul>
                        </div>

                        <div className='flex flex-col text-white max-w-xs '>
                            <img src='/building.svg' className='max-h-32 md:max-h-40 w-auto' />
                            <h2 className='font-poppins text-3xl md:text-4xl font-semibold my-2'>Commercial Services</h2>
                            <ul className="space-y-2 ">
                                <Bullet text="Office Buildings" />
                                <Bullet text="Parking lots" />
                                <Bullet text="Storefronts" />
                                <Bullet text="Warehouses" />
                                <Bullet text="Dumpster Pads" />
                            </ul>
                        </div>


                    </div>
                    <div className='flex justify-center mt-10'>
                        <Link to="/services"
                        className="group pl-5 pr-12 py-3 bg-transparent hover:bg-white hover:bg-opacity-20 text-white shadow-md rounded-xl  border border-gray-300 mt-2 
                            transform transition-transform hover:-translate-y-[2px]  duration-300 relative">
                            <div className='flex flex-row flex-nowrap gap-x-2 w-full h-full mt-[2px]'>
                                <div className='text-xl'>View Our Services</div>
                                <FaArrowRightLong size={22} className='absolute left-[82%] group-hover:translate-x-1 mt-1 duration-500 transition-transform ' />
                            </div>
                        </Link>
                    </div>
                </div>{/*Service Cards*/}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#030380" fill-opacity="1" 
                d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,170.7C672,139,768,85,864,64C960,43,1056,53,1152,90.7C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

                {/* About Us */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fef9f2" fillOpacity="1"
                        d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,229.3C672,235,768,181,864,176C960,171,1056,213,1152,234.7C1248,256,1344,256,1392,256L1440,256V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z">
                    </path>
                </svg>

                <div className="bg-cream py-20 px-6 font-roboto">
                    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                        <img src='/placeholder.jpg' alt="Barber & Son" className='w-full max-w-md mb-8 rounded-xl shadow-md' />
                        <h2 className='text-4xl md:text-5xl font-bold text-rich_brown mb-6'>About Barber & Son</h2>
                        <p className='text-lg text-black leading-relaxed'>
                            Barber & Son is a family-owned pressure washing company built on trust, quality, and a commitment to doing things right.
                            We treat every home and business like it's our own, using eco-friendly methods and a personal touch that bigger companies often miss.
                        </p>
                        <p className='text-lg text-black mt-4 leading-relaxed'>
                            When you work with us, you're not just getting a service — you're supporting a family that cares about the results just as much as you do.
                        </p>
                        <Link to='/about' className="group mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-400 text-white rounded-xl shadow-md border border-white transition-transform transform hover:-translate-y-1 duration-300">
                            <span className='text-lg font-medium'>About Us</span>
                            <HiMiniArrowTopRightOnSquare size={22} />
                        </Link>
                    </div>
                </div>


                {/*About us end*/}
                {/* Quote Section */}
                <div className='flex flex-col'>
                    <h1 className='mx-auto font-roboto'></h1>
                    <Form />
                </div>

            </div>
            {/*Whole Page */}
        </div>

        
    );
};

export default Home;