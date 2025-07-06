import React from 'react'
import Form from '@/components/Form'
import { FaPhone, FaCheck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

interface BulletProps {
    text: string;
}

export const Bullet: React.FC<BulletProps> = ({ text }) => (
    <div className="flex items-center gap-x-2">
        <FaCheck size={14} className="text-green-500 flex-shrink-0" />
        <span className="text-gray-700">{text}</span>
    </div>
);

const Quote: React.FC = () => {
    return (
        <div className=' bg-blue-100 min-h-screen'>
            {/* Main Content */}
            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>

                    {/* Left Column - Form (Priority) */}
                    <div className='order-1'>
                        <div className='bg-white rounded-xl shadow-xl px-6 py-12 lg:px-6 lg:py-14 mx-auto'>
                            <div className='text-center mb-6'>
                                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-deep_blue mb-3 font-poppins'>
                                    Get Your Free Quote
                                </h1>
                                
                            </div>
                            <Form />
                        </div>
                    </div>

                    {/* Right Column - Contact Info */}
                    <div className='order-2 space-y-6'>

                        {/* Contact Information */}
                        <div className='bg-white rounded-xl shadow-lg p-6'>
                            <h2 className='text-2xl text-deep_blue font-bold mb-4 text-center'>
                                Contact Us Directly
                            </h2>

                            <div className='space-y-4'>
                                <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-lg'>
                                    <div className='flex items-center justify-center w-12 h-12 bg-deep_blue rounded-full'>
                                        <FaPhone size={20} className='text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Call for immediate service</p>
                                        <a href='tel:+2149973143'
                                            className='text-2xl text-deep_blue font-bold hover:text-blue-600 transition-colors'>
                                            (214) 997-3143
                                        </a>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                                    <div className='flex items-center justify-center w-12 h-12 bg-deep_blue rounded-full'>
                                        <MdOutlineAccessTimeFilled size={22} className='text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Hours of Operation</p>
                                        <p className='text-lg text-gray-800 font-semibold'>
                                            9:00 AM - 2:30 PM
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                                    <div className='flex items-center justify-center w-12 h-12 bg-deep_blue rounded-full'>
                                        <IoLocationSharp size={22} className='text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Serving</p>
                                        <p className='text-lg text-gray-800 font-semibold'>
                                            Farmers Branch, TX & Dallas Metro
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us - Simplified */}
                        <div className='bg-white rounded-xl shadow-lg p-6 pb-10'>
                            <h3 className='text-xl text-deep_blue font-bold mb-4 text-center'>
                                Why Barber and Son?
                            </h3>

                            <div className='space-y-2'>
                                <Bullet text="100% Free estimates" />
                                <Bullet text="Family-owned & operated" />
                                <Bullet text="Competitive pricing" />
                                <Bullet text="Satisfaction guaranteed" />
                            </div>
                        </div>

                        {/* Quick CTA */}
                        <div className='bg-deep_blue text-white rounded-xl p-6 text-center'>
                            <h3 className='text-xl font-bold mb-2'>
                                Need a Quote Fast?
                            </h3>
                            <p className='mb-4 opacity-90'>
                                Call us now for immediate assistance
                            </p>
                            <a href='tel:+2149973143'
                                className='bg-white text-deep_blue px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block'>
                                Call (214) 997-3143
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quote;