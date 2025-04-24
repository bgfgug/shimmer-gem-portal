
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const onboardingData = [
  {
    title: "Welcome to BharatJewel",
    description: "Discover exquisite Indian jewelry crafted with tradition and passion.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a",
  },
  {
    title: "Handcrafted Excellence",
    description: "Each piece tells a story of artisanal craftsmanship passed down through generations.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88558",
  },
  {
    title: "Celebrate Every Occasion",
    description: "Find the perfect piece for weddings, festivals, or everyday elegance.",
    image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1",
  },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      navigate('/');
    }
  };
  
  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  const skipOnboarding = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress indicator */}
      <div className="absolute top-6 left-0 w-full px-4">
        <div className="max-w-md mx-auto flex space-x-1">
          {onboardingData.map((_, index) => (
            <div 
              key={index}
              className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                index <= activeIndex ? 'bg-gold' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Skip button */}
      <div className="absolute top-6 right-6">
        <Button 
          variant="ghost" 
          onClick={skipOnboarding}
          className="text-gray-500"
        >
          Skip
        </Button>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full max-w-md px-4">
            <div className="relative h-72 md:h-96 mb-6 overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-deepPurple opacity-40"
              />
              <img 
                src={onboardingData[activeIndex].image}
                alt={onboardingData[activeIndex].title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-3">
                {onboardingData[activeIndex].title}
              </h1>
              <p className="text-gray-600">
                {onboardingData[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="p-6 max-w-md mx-auto w-full">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className={activeIndex === 0 ? 'opacity-0' : ''}
            >
              <ChevronLeft size={20} className="mr-2" />
              Back
            </Button>
            
            <Button onClick={nextSlide} className="bg-gold hover:bg-amber-600 text-black">
              {activeIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
