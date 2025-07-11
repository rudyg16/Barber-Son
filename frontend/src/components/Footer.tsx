import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const Footer: React.FC = () => {
    return (
        <footer className='bg-deep_blue text-white'>
            {/* Main Footer Content */}
            <div className='container mx-auto px-6 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>

                    {/* Company Info */}
                    <div className='lg:col-span-1'>
                        <Link to='/' className='inline-block mb-4'>
                            <img
                                src='/BarberSonLogo.png'
                                alt='Barber & Son Logo'
                                className='h-24 w-auto'
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </Link>
                        <h3 className='text-xl font-bold mb-3 font-poppins'>
                            Barber and Son Pressure Washing
                        </h3>
                        <p className='text-gray-300 leading-relaxed'>
                            Family owned pressure washing business serving the Dallas metro area with professional,
                            reliable cleaning services for residential and commercial properties.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-lg font-semibold mb-4 text-logo_mint'>Quick Links</h4>
                        <ul className='space-y-3'>
                            <li>
                                <Link to='/' className='text-gray-300 hover:text-white transition-colors duration-300'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/about' className='text-gray-300 hover:text-white transition-colors duration-300'>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to='/services' className='text-gray-300 hover:text-white transition-colors duration-300'>
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link to='/quote' className='text-gray-300 hover:text-white transition-colors duration-300'>
                                    Get Quote
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className='text-lg font-semibold mb-4 text-logo_mint'>Our Services</h4>
                        <ul className='space-y-3 text-gray-300'>
                            <li>Driveway Cleaning</li>
                            <li>Patio & Deck Washing</li>
                            <li>Commercial Properties</li>
                            <li>Fence & Siding</li>
                            <li>Window Cleaning</li>
                            <li>Gutter Cleaning</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className='text-lg font-semibold mb-4 text-logo_mint'>Contact Us</h4>
                        <div className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <FaPhone className='text-logo_mint flex-shrink-0' size={18} />
                                <div>
                                    <a href='tel:+2142742762'
                                        className='text-white hover:text-logo_mint transition-colors duration-300 font-semibold'>
                                        (214) 274-2762
                                    </a>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <MdOutlineAccessTimeFilled className='text-logo_mint flex-shrink-0 mt-1' size={18} />
                                <div className='text-gray-300'>
                                    <p>9:00 AM - 2:30 PM</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3'>
                                <FaEnvelope className='text-logo_mint flex-shrink-0' size={18} />
                                <div>
                                    <a href='mailto:barberpressure@gmail.com'
                                        className='text-gray-300 hover:text-white transition-colors duration-300'>
                                        barberpressure@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <FaMapMarkerAlt className='text-logo_mint flex-shrink-0 mt-1' size={18} />
                                <div className='text-gray-300'>
                                    <p>Farmers Branch, TX</p>
                                    <p>& Surrounding Areas</p>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className='mt-12 pt-8 border-t border-blue-700'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold mb-4'>Ready to Get Started?</h3>
                        <p className='text-gray-300 mb-6 max-w-2xl mx-auto'>
                            Get your free estimate today and see why Dallas chooses Barber and Son for all their pressure washing needs.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                            <Link to='/quote'
                                className='bg-logo_mint hover:bg-green-400 text-deep_blue px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:-translate-y-1'>
                                Get Free Quote
                            </Link>
                            <a href='tel:+2142742762'
                                className='border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-deep_blue transition-colors duration-300'>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='bg-blue-900 py-4'>
                <div className='container mx-auto px-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <div className='text-gray-400 text-sm'>
                            © 2025 Barber and Son Pressure Washing. All rights reserved.
                        </div>

                        {/* Social Media Links (Optional) */}
                        <div className='flex gap-4'>
                            <a href='#' className='text-gray-400 hover:text-white transition-colors duration-300'>
                                <FaFacebook size={20} />
                            </a>
                           
                        </div>

                        <div className='text-gray-400 text-sm'>
                            Proudly serving Dallas, TX & surrounding areas
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;