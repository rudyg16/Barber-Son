import React from 'react'
import Form from '@/components/Form'
import {Link} from "react-router-dom";

import { FaHome, FaCheck, FaBuilding } from "react-icons/fa";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

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
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    alt="Pressure washing"
                />

                <div className="absolute inset-y-0 left-0 w-full  bg-gradient-to-r from-deep_blue via-blue-600 to-transparent z-10 opacity-80" />

                <h1 className="absolute top-1/3 left-8 z-20 text-white font-poppins font-semibold text-6xl">
                    DALLAS PROFESSIONAL <br />
                    PRESSURE WASHING
                </h1>
            </div>


            {/*End initial header */}
            <div className='flex flex-col mt-20 font-roboto'>

                {/*Service Cards*/}
                <svg className=' block w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#030380" fillOpacity="1"
                    d="M0,192L48,165.3C96,139,192,85,288,58.7C384,32,480,32,576,74.7C672,117,768,203,864,218.7C960,235,1056,181,1152,160C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <div className=" -mt-1 flex flex-col md:flex-row justify-center items-center w-full  gap-x-6 bg-deep_blue">
                    <div className='text-center'>
                        <h3 className="text-5xl  font-bold text-white ">
                            Our Services
                        </h3>
                    </div>
                    <div className='flex flex-col text-white '>
                        <img src='/house.svg' className='max-h-40 w-auto' />
                        <h2 className='font-poppins text-4xl font-semibold my-2'>Residential Services</h2>
                        <ul className="space-y-2 ">
                            <Bullet text="Driveways" />
                            <Bullet text="Decks & Patios" />
                            <Bullet text="Fences & Gates" />
                            <Bullet text="Window Cleaning" />
                            <Bullet text="Gutter Cleaning" />
                        </ul>
                    </div>

                    <div className='flex flex-col text-white max-w-xs'>
                        <img src='/building.svg' className='h-40 w-auto' />
                        <h2 className='font-poppins text-4xl font-semibold my-2'>Commercial Services</h2>
                        <ul className="space-y-2 ">
                            <Bullet text="Office Buildings" />
                            <Bullet text="Parking lots" />
                            <Bullet text="Storefronts" />
                            <Bullet text="Warehouses" />
                            <Bullet text="Dumpster Pads" />
                        </ul>
                    </div>


                </div>{/*Service Cards*/}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#030380" fill-opacity="1" 
                d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,170.7C672,139,768,85,864,64C960,43,1056,53,1152,90.7C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

                {/*About Us*/}
                <div className=' flex flex-row flex-wrap bg-cream font-roboto items-center py-20 px-10 gap-x-10'>
                    {/*Left column */}
                    <div className=" justify-endflex-[1]">
                        <img className=' max-w-[90%] h-auto'
                            src='/placeholder.jpg'
                        />
                    </div>



                    {/*Right column*/}
                    <div className="flex flex-col flex-nowrap  flex-[1]">
                        <h1 className='text-4xl font-bold text- py-3 text-rich_brown'>
                            About Barber & Son
                        </h1>
                        <h3 className='mx-auto text-black mt-4 flex-shrink-0'>
                            Barber & Son is a family-owned pressure washing company built on trust, quality, and a commitment to doing things right. We treat every home and business like it's our own, using eco-friendly methods and a personal touch that bigger companies often miss. When you work with us, you're not just getting a service, you're supporting a family that cares about the results just as much as you do.
                        </h3>
                        <div className='flex mt-4'>
                            <Link to='/about'
                            className=" justify-between ml-0 mr-auto px-4 py-3 bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-400 text-white shadow-md border border-white  rounded-xl  
                            transform transition-transform hover:-translate-y-[2px] duration-300 ">
                                <div className='flex flex-row flex-nowrap gap-x-1 w-full h-full'>
                                    <div>About us</div>
                                    <HiMiniArrowTopRightOnSquare size={22} className=''/>
                                </div>
                            </Link>
                            
                        </div>

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