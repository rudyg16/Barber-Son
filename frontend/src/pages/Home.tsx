import React from 'react'
import { FaHome, FaCheck, FaBuilding } from "react-icons/fa";
import Form from '@/components/Form'

interface BulletProps {
  text: string;
}

export const Bullet: React.FC<BulletProps> = ({ text }) => (
  <div className="flex items-center gap-x-2">
    <FaCheck size={12} className="text-green-600" />
    <span className="text-black text-sm">{text}</span>
  </div>
);

const Home: React.FC = () => {
    return (
        <div className='bg-cream min-h-screen w-full pb-12'>
            {/*Initial Header */}
            <div className=' flex flex-row flex-wrap bg-deep_blue  font-roboto items-center py-20 px-5 gap-x-10'>
                {/*Left column */}
                <div className="flex flex-col flex-[1]">
                    <h1 className='text-4xl font-bold text-white py-3 '>
                        Professional Pressure <br>
                        </br>Washing Services
                    </h1>
                    <h3 className='flex text-left mx-auto text-white mt-4 '>
                        Trusted by homeowners and businesses alike, we restore your property’s beauty with powerful, professional pressure washing — safe, effective, and satisfaction guaranteed.
                    </h3>
                    <div className="flex flex-row flex-wrap gap-x-4 my-4 max-w-screen-sm  font-medium text-sm">
                        <a
                            className="px-7 py-3 bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-400 text-white shadow-md border border-white  rounded-xl  mt-2 
                            transform transition-transform hover:-translate-y-[2px] duration-300 "
                            href="/Quote"
                        >
                            <div >Get Free Quote</div>

                        </a>
                        <a
                            className="px-7 py-3 bg-transparent hover:bg-white hover:bg-opacity-20 text-white shadow-md rounded-xl  border border-white mt-2 
                            transform transition-transform hover:-translate-y-[2px] transition-colors duration-300"
                            href="./Services.tsx"
                        >
                            <div >View Services</div>
                        </a>
                    </div>

                </div>

                {/*Right column*/}
                <div className=" justify-endflex-[1]">
                    <img className=' max-w-[100%] h-auto'
                        src='/placeholder.jpg'
                    />
                </div>
            </div>
            {/*End initial header */}
            <div className='flex flex-col mt-20 font-roboto'>
                <div className='text-center'>
                    <h3 className="text-3xl  font-bold text-rich_brown ">
                        Our Services
                    </h3>
                </div>

                {/*Service Cards*/}
                <div className="flex flex-col md:flex-row justify-center items-center my-4 w-full px-6 gap-x-6">

                    <div className="relative w-[250px] h-[325px] border-2 border-gray-200 rounded-sm shadow-lg flex flex-col items-center gap-y-2">

                        <FaHome className="mx-auto mt-12  text-maroon" size={30} />
                        <h2 className="mx-auto text-rich_brown font-bold">
                            Residential Cleaning
                        </h2>

                        <div className=" absolute left-[20%] bottom-[12%] flex flex-col items-start gap-y-2 mt-2">
                            <Bullet text="House Exteriors" />
                            <Bullet text="Driveways" />
                            <Bullet text="Decks & Patios" />
                            <Bullet text="Fences & Gates" />
                            <Bullet text="Window Cleaning" />
                            <Bullet text="Gutter Cleaning" />
                        </div>
                    </div>

                    <div className="relative w-[250px] h-[325px] border-2 border-gray-200 rounded-sm shadow-lg flex flex-col items-center gap-y-2">
                        <FaBuilding className="mx-auto mt-12 text-maroon" size={30} />
                        <h2 className="mx-auto text-rich_brown font-bold">
                            Commercial Cleaning
                        </h2>
                        <div className=" absolute left-[20%] bottom-[30%] flex flex-col items-start gap-y-2 mt-2">
                            <Bullet text="Office Buildings" />
                            <Bullet text="Parking lots" />
                            <Bullet text="Storefronts" />
                            <Bullet text="Warehouses" />
                        </div>
                    </div>


                </div>{/*Service Cards*/}

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
                        <a
                            href="./Quote.tsx"
                            className=" w-fit flex px-5 py-3 my-7 bg-sage hover:bg-bright_sage rounded-xl border transition-colors duration-300
                 text-white font-medium text-sm border-1 border-gray-300 shadow-md">
                            About us
                        </a>




                    </div>
                </div>
                {/*About us end*/}
                {/* Quote Section */}
                <div className='text-'>
                    <Form />
                </div>

            </div>
            {/*Whole Page */}
        </div>

        
    );
};

export default Home;