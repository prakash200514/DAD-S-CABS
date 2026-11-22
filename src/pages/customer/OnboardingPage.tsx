import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Your Ride, Just a Tap Away',
      description: 'Book an auto or cab quickly and easily.',
      image: '/assets/tn_auto_temple_hero.jpg',
    },
    {
      title: 'Track Your Ride Live',
      description: 'Know where your driver is and when they will arrive.',
      image: '/assets/auto_rickshaw_card.jpg',
    },
    {
      title: 'Built for Tamil Nadu',
      description: 'Reliable local travel designed for our communities.',
      image: '/assets/tn_auto_temple_hero.jpg',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/app');
    }
  };

  const handleSkip = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-sm min-h-screen sm:min-h-[750px] bg-white rounded-none sm:rounded-[40px] shadow-2xl border-0 sm:border-8 border-slate-900 flex flex-col justify-between overflow-hidden relative">
        {/* Top Mobile Status Bar (9:41) */}
        <div className="absolute top-0 left-0 right-0 z-30 px-6 pt-3 flex items-center justify-between text-xs text-slate-800 font-semibold drop-shadow">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">●●●●</span>
            <span>WiFi</span>
            <div className="w-5 h-2.5 rounded-sm border border-slate-800 p-0.5">
              <div className="h-full bg-slate-800 rounded-xs w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Upper Half: Photograph of Yellow Auto & Tamil Nadu Temple */}
        <div className="w-full h-80 relative overflow-hidden flex-shrink-0">
          <img
            src={slides[currentSlide].image}
            alt="Tamil Nadu Auto & Temple"
            className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
        </div>

        {/* Lower Half: Card with Title, Subtitle, Dots, Next & Skip */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 text-center bg-white">
          <div className="space-y-3 pt-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
              {slides[currentSlide].title}
            </h2>

            <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-2 py-4">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-6 bg-[#F5A623]'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Action Button: Solid Yellow Pill */}
          <div className="space-y-4 pb-4">
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-full bg-[#F5A623] hover:bg-[#e59b20] active:scale-[0.98] text-slate-950 font-black text-base shadow-[0_4px_15px_rgba(245,166,35,0.4)] transition-all"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </button>

            <button
              onClick={handleSkip}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
