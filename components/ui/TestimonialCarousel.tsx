import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';

interface Testimonial {
    quote: string;
    name: string;
    company: string;
    avatar: string;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative max-w-3xl mx-auto">
            <Card className="bg-amunet-primary text-center transition-all duration-500 ease-in-out">
                <div className="absolute top-6 left-6 text-amunet-accent/20">
                    <QuoteIcon className="w-16 h-16" />
                </div>
                <div className="relative z-10 p-4">
                    <p className="text-xl italic text-amunet-white mb-6">"{currentTestimonial.quote}"</p>
                    <div className="flex items-center justify-center space-x-4">
                        <img src={currentTestimonial.avatar} alt={currentTestimonial.name} className="w-12 h-12 rounded-full border-2 border-amunet-accent" />
                        <div>
                            <p className="font-bold text-lg text-amunet-white">{currentTestimonial.name}</p>
                            <p className="text-amunet-light">{currentTestimonial.company}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 p-2 rounded-full bg-amunet-secondary hover:bg-amunet-accent transition-colors text-white"
                aria-label="Previous testimonial"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 p-2 rounded-full bg-amunet-secondary hover:bg-amunet-accent transition-colors text-white"
                aria-label="Next testimonial"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
             <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            currentIndex === index ? 'bg-amunet-accent' : 'bg-amunet-secondary hover:bg-amunet-light'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
