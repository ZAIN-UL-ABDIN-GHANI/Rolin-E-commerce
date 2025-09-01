import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import offer from "../../assets/images/offer.png"
function ExclusiveOffer() {
  const { darkMode } = useDarkMode();

  // Persist target date in localStorage
  const [targetDate] = useState(() => {
    const saved = localStorage.getItem("exclusiveOfferTargetDate");
    if (saved) {
      return new Date(saved); 
    } else {
      const now = new Date();
     const newTarget = new Date(
  now.getTime() + (48 * 60 * 60 * 1000) // 48 hours
);
      localStorage.setItem("exclusiveOfferTargetDate", newTarget.toISOString());
      return newTarget;
    }
  });

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff > 0) {
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

    // Handle buy now click
  const handleBuyNow = () => {
    console.log("Buy Now clicked");

  };

  return (
    <section 
    id='features'
      className={`p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col lg:flex-row justify-between items-center min-h-[400px] ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-gray-900'
      }`}
    >
      {/* Text Content - Order 1 on desktop, Order 2 on mobile */}
      <div className="text-center lg:text-left mb-4 lg:mb-0 flex-1 max-w-lg lg:max-w-none order-2 lg:order-1">
        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Exclusive Offer
        </h2>
        
        <p className={`mt-2 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Unlock the ultimate style upgrade with our exclusive offer! Enjoy
          savings of up to 40% off on our latest New Arrivals.
        </p>
        
        {/* Countdown Timer - Hours, Minutes, Seconds only */}
        <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4">
          {/* Hours */}
          <div className={`text-center p-2 sm:p-3 md:p-4 rounded-lg min-w-[60px] sm:min-w-[80px] ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {String(timeLeft.hours).padStart(2, '0')}
            </p>
            <p className={`text-xs sm:text-sm md:text-base font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Hours
            </p>
          </div>

          {/* Minutes */}
          <div className={`text-center p-2 sm:p-3 md:p-4 rounded-lg min-w-[60px] sm:min-w-[80px] ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </p>
            <p className={`text-xs sm:text-sm md:text-base font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Min
            </p>
          </div>

          {/* Seconds */}
          <div className={`text-center p-2 sm:p-3 md:p-4 rounded-lg min-w-[60px] sm:min-w-[80px] ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </p>
            <p className={`text-xs sm:text-sm md:text-base font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sec
            </p>
          </div>
        </div>
        
        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className={`mt-4 sm:mt-6 lg:mt-8 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
            darkMode 
              ? 'bg-gray-600 hover:bg-white text-black focus:ring-gray-500' 
              : 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500'
          }`}
          aria-label="Buy now to get exclusive offer"
        >
          Buy Now
        </button>
      </div>

      {/* Image Section - Order 2 on desktop, Order 1 on mobile */}
      <div className="flex-1 flex justify-center lg:justify-end items-center order-1 lg:order-2 mb-4 lg:mb-0">
        <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px]">
          {/*  */}
          <div className={`w-full aspect-square rounded-lg shadow-lg overflow-hidden `}>
            <div className={`w-full h-full flex items-center justify-center
            }`}>
              {/* actual image */}
              <div className="text-center md:h-96 md:w-72 object-cover  ">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-2">
                  <img
            src={offer}
            alt="offer image"
            className={`max-w-full max-h-full object-contain transition-opacity duration-300`}
            
             />
                </div>
         
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className={`absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-gray-900'
          } opacity-80`}></div>
          <div className={`absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-gray-900'
          } opacity-60`}></div>
        </div>
      </div>
    </section>
  );
}

export default ExclusiveOffer;