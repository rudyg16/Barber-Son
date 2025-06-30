import React from 'react'
import { Link } from "react-router-dom";
import { FaCheck, FaUsers, FaClock, FaPhone } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
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

interface ValueCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center w-16 h-16 bg-deep_blue rounded-full mb-4 mx-auto">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-deep_blue text-center mb-3">{title}</h3>
        <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
);

const About: React.FC = () => {
    return (
        <div className='bg-cream min-h-screen w-full pb-12'>
            {/* Logo Header */}
            <div className="bg-deep_blue text-white py-16">
                <div className="container mx-auto px-8 text-center">
                    <div className="inline-block bg-white rounded-xl p-6 mb-8 shadow-lg">
                        <img 
                            src='/BarberSonLogo.png' 
                            alt='Barber & Son Logo'
                            className='h-48 md:h-56 w-auto mx-auto'
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
                        Barber and Son Pressure Washing
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                        Family-owned pressure washing serving Dallas with dedication and quality
                    </p>
                </div>
            </div>

            {/* About Content */}
            <div className="container mx-auto px-8 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-deep_blue mb-8">Who We Are</h2>
                    
                    <div className="text-lg text-gray-700 leading-relaxed space-y-6 mb-12">
                        <p>
                            Barber and Son Pressure Washing is a <strong>family-owned business</strong> bringing fresh energy 
                            and dedication to the Dallas area. As a father-son team, we understand the importance of trust, 
                            reliability, and treating every property like it's our own.
                        </p>
                        
                        <p>
                            Though we're new to the industry, our commitment to excellence and customer satisfaction drives 
                            everything we do. We use modern equipment and eco-friendly solutions to deliver professional 
                            results that speak for themselves.
                        </p>
                        
                        <p>
                            Every job is an opportunity to prove ourselves and build lasting relationships in our community. 
                            We're not just cleaning surfaces – we're building a reputation <strong>one satisfied customer at a time</strong>.
                        </p>
                    </div>

                    {/* Quick Values */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <ValueCard
                            icon={<FaUsers size={32} className="text-white" />}
                            title="Family Values"
                            description="Personal attention and care in every job we complete"
                        />
                        <ValueCard
                            icon={<FaClock size={32} className="text-white" />}
                            title="Fresh Energy"
                            description="New business dedication to exceeding your expectations"
                        />
                        <ValueCard
                            icon={<FaCheck size={32} className="text-white" />}
                            title="Quality Focus"
                            description="Building our reputation on exceptional results"
                        />
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="relative">
                <svg className='block w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#030380" fillOpacity="1"
                        d="M0,192L48,165.3C96,139,192,85,288,58.7C384,32,480,32,576,74.7C672,117,768,203,864,218.7C960,235,1056,181,1152,160C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
                </svg>

                <div className='bg-deep_blue -mt-1 py-16'>
                    <div className="container mx-auto px-8">
                        <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-12">
                            Why Choose Barber and Son?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-16 items-center text-white max-w-5xl mx-auto">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Our Promise</h3>
                                <ul className="space-y-3">
                                    <Bullet text="Free estimates" />
                                    <Bullet text="Eco-friendly cleaning solutions" />
                                    <Bullet text="Professional equipment" />
                                    <Bullet text="Flexible scheduling" />
                                    <Bullet text="100% satisfaction guarantee" />
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Service Areas</h3>
                                <p className="text-lg leading-relaxed mb-4">
                                    Proudly serving the Dallas metropolitan area:
                                </p>
                                <ul className="space-y-2">
                                    <Bullet text="Dallas" />
                                    <Bullet text="Plano" />
                                    <Bullet text="Frisco" />
                                    <Bullet text="Richardson" />
                                    <Bullet text="Garland" />
                                    <Bullet text="Farmers Branch" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#030380" fillOpacity="1"
                        d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,170.7C672,139,768,85,864,64C960,43,1056,53,1152,90.7C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                    </path>
                </svg>
            </div>

            {/* Call to Action Section */}
            <div className="container mx-auto px-8 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-deep_blue mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Experience the difference that family-owned, professional pressure washing can make. 
                        Contact us today for your free estimate.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Link to="/quote"
                            className="group px-8 py-4 bg-deep_blue hover:bg-blue-700 text-white font-roboto shadow-md rounded-xl 
                                transform transition-transform hover:-translate-y-1 duration-300">
                            <div className='flex flex-row flex-nowrap gap-x-2 items-center'>
                                <div className='text-xl'>Get Your Free Quote</div>
                                <FaArrowRightLong size={22} className='group-hover:translate-x-1 duration-500 transition-transform' />
                            </div>
                        </Link>

                        <a href='tel:+2149973143'
                            className='py-4 px-8 border-2 border-deep_blue rounded-xl text-deep_blue 
                                hover:-translate-y-1 hover:bg-deep_blue hover:text-white transition-all duration-300'>
                            <div className='flex flex-row flex-nowrap gap-x-2 items-center'>
                                <FaPhone size={20} />
                                <div className='text-xl font-semibold font-roboto'>(214) 997-3143</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;