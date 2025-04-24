
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-deepPurple via-deepPurple to-black">
      <div className="text-center">
        <div className="relative">
          <div className="mb-8 animate-rotate w-32 h-32 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gold rounded-full opacity-30"></div>
            <div className="absolute top-2 left-2 w-28 h-28 border-4 border-gold rounded-full opacity-50"></div>
            <div className="absolute top-4 left-4 w-24 h-24 border-4 border-gold rounded-full opacity-70"></div>
            <div className="absolute top-6 left-6 w-20 h-20 border-4 border-gold rounded-full opacity-90"></div>
            <div className="absolute top-8 left-8 w-16 h-16 border-4 border-gold rounded-full"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gold rounded-full animate-pulse flex items-center justify-center">
              <div className="text-black font-serif font-bold text-xl">BJ</div>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 animate-slide-up">
          Bharat<span className="text-gold">Jewel</span>
        </h1>
        <p className="text-gray-300 animate-fade-in">Exquisite Indian Craftsmanship</p>
      </div>
      
      <div className="absolute bottom-16 w-full flex justify-center">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gold rounded-full"></div>
          <div className="w-3 h-3 bg-gold rounded-full opacity-70"></div>
          <div className="w-3 h-3 bg-gold rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
