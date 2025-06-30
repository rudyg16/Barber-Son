import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPhone, FaCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

interface CarouselImage {
    id: number;
    beforeSrc: string;
    afterSrc: string;
    title: string;
    description: string;
}

interface BeforeAfterSectionProps {
    title: string;
    description: string;
    beforeSrc: string;
    afterSrc: string;
    features: string[];
}

const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
    title,
    description,
    beforeSrc,
    afterSrc,
    features
}) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
            <div className="relative">
                <img
                    src={beforeSrc}
                    alt={`${title} before cleaning`}
                    className="w-full h-72 md:h-96 object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/pressure_washing_img/stockimage.jpeg';
                    }}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                    BEFORE
                </div>
            </div>
            <div className="relative">
                <img
                    src={afterSrc}
                    alt={`${title} after cleaning`}
                    className="w-full h-72 md:h-96 object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/pressure_washing_img/stockimage.jpeg';
                    }}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg font-bold">
                    AFTER
                </div>
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-deep_blue mb-3">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="space-y-2">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <FaCheck className="text-green-500 text-sm" />
                        <span className="text-gray-700">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Services: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const carouselImages: CarouselImage[] = [
        {
            id: 1,
            beforeSrc: '/pressure_washing_img/before/Job_One_Patio_Before (1).PNG',
            afterSrc: '/pressure_washing_img/after/Job_One_Patio_After.PNG',
            title: 'Patio Transformation',
            description: 'Complete restoration of weathered patio surfaces'
        },
        {
            id: 2,
            beforeSrc: '/pressure_washing_img/before/Job_One_Driveway_Before.PNG',
            afterSrc: '/pressure_washing_img/after/JobOne_Driveway_After.PNG',
            title: 'Driveway Cleaning',
            description: 'Removing years of oil stains and dirt buildup'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const currentImage = carouselImages[currentSlide];

    return (
        <div className="bg-cream min-h-screen w-full pb-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-deep_blue text-white py-24">
                <div className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20'
                style={{backgroundImage:"url('/waterbubbles.png')"}}>
                    
                </div>
                <div className="container mx-auto px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">
                        Our Services
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                        Professional pressure washing for residential and commercial properties throughout the Dallas area
                    </p>
                </div>
            </div>

            {/* Image Carousel */}
            <div className="py-16 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-deep_blue mb-4">
                            Our Work Gallery
                        </h2>
                        <p className="text-gray-600 text-lg">
                            See the amazing transformations we've achieved for our customers
                        </p>
                    </div>

                    {/* Carousel */}
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {/* Before Image */}
                            <div className="relative">
                                <img
                                    src={currentImage.beforeSrc}
                                    alt={`${currentImage.title} before`}
                                    className="w-full h-80 md:h-96 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '/pressure_washing_img/stockimage.jpeg';
                                    }}
                                />
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                                    BEFORE
                                </div>
                            </div>

                            {/* After Image */}
                            <div className="relative">
                                <img
                                    src={currentImage.afterSrc}
                                    alt={`${currentImage.title} after`}
                                    className="w-full h-80 md:h-96 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = '/pressure_washing_img/stockimage.jpeg';
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                                    AFTER
                                </div>
                            </div>
                        </div>

                        {/* Carousel Content */}
                        <div className="p-6 md:p-8 text-center bg-gray-50">
                            <h3 className="text-2xl md:text-3xl font-bold text-deep_blue mb-2">
                                {currentImage.title}
                            </h3>
                            <p className="text-gray-600 text-lg">
                                {currentImage.description}
                            </p>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-deep_blue bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-deep_blue bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300"
                        >
                            <FaArrowRight size={20} />
                        </button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {carouselImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-deep_blue' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Sections */}
            <div className="py-16 px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-deep_blue mb-4">
                            Our Specialized Services
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Professional cleaning solutions tailored to your specific needs
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Driveway Service */}
                        <BeforeAfterSection
                            title="Driveway Cleaning"
                            description="Remove oil stains, tire marks, and years of accumulated dirt from your driveway. Our specialized equipment and techniques restore your driveway to like-new condition."
                            beforeSrc="/pressure_washing_img/before/Job_One_Driveway_Before.PNG"
                            afterSrc="/pressure_washing_img/after/JobOne_Driveway_After.PNG"
                            features={[
                                "Oil stain removal",
                                "Tire mark elimination",
                                "Safe for all driveway materials"
                            ]}
                        />

                        {/* Patio Service */}
                        <BeforeAfterSection
                            title="Patio & Deck Cleaning"
                            description="Restore your outdoor living spaces by removing algae, mold, dirt, and weathering. Perfect for concrete patios, wooden decks, and stone surfaces."
                            beforeSrc="/pressure_washing_img/before/Job_One_Patio_Before (1).PNG"
                            afterSrc="/pressure_washing_img/after/Job_One_Patio_After.PNG"
                            features={[
                                "Algae and mold removal",
                                "Wood-safe cleaning techniques",
                                "Stone and concrete restoration",
                                "Slip-resistant surface cleaning"
                            ]}
                        />
                        {/*
                        {/* Commercial Service *}
                        <BeforeAfterSection
                            title="Commercial Properties"
                            description="Professional cleaning for storefronts, office buildings, parking lots, and warehouses. Maintain a professional appearance that welcomes customers and clients."
                            beforeSrc="/pressure_washing_img/before/commercial-before.jpg"
                            afterSrc="/pressure_washing_img/after/commercial-after.jpg"
                            features={[
                                "Storefront cleaning",
                                "Parking lot maintenance",
                                "Building exterior washing",
                                "Scheduled maintenance programs"
                            ]}
                        />

                        {/* Fence & Siding Service *}
                        <BeforeAfterSection
                            title="Fences & Siding"
                            description="Gentle yet effective cleaning for vinyl, wood, and composite fencing and siding. Remove dirt, mildew, and weathering without damage."
                            beforeSrc="/pressure_washing_img/before/fence-before.jpg"
                            afterSrc="/pressure_washing_img/after/fence-after.jpg"
                            features={[
                                "Vinyl fence restoration",
                                "Wood fence cleaning",
                                "Siding mildew removal",
                                "Gentle, damage-free techniques"
                            ]}
                        />
                        */}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-deep_blue text-white rounded-2xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Transform Your Property?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Get your free estimate today and see why Dallas trusts Barber and Son Pressure Washing
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/quote"
                                className="group bg-logo_mint hover:bg-green-400 text-deep_blue px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 shadow-lg"
                            >
                                Get Your Free Quote
                                <FaArrowRightLong className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>

                            <span className="text-white opacity-75">or</span>

                            <a
                                href="tel:+2149973143"
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-deep_blue transition-colors"
                            >
                                <FaPhone className="inline mr-2" />
                                Call (214) 997-3143
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;