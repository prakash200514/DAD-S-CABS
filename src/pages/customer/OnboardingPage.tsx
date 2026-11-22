import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Compass, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Your Ride, Just a Tap Away',
      description: 'Book a local auto or comfortable cab quickly and easily across Tamil Nadu.',
      badge: 'Quick & Affordable',
      visual: (
        <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center p-6 shadow-glow-yellow">
          <img
            src="/icons/icon-auto.svg"
            alt="Auto Booking"
            className="w-full h-full object-contain filter drop-shadow-md animate-pulse"
          />
        </div>
      ),
    },
    {
      title: 'Track Your Ride Live',
      description: 'Know where your driver is and when they will arrive with high-precision GPS tracking.',
      badge: 'Real-time GPS',
      visual: (
        <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-blue-500/20 to-blue-500/5 border border-blue-500/30 flex items-center justify-center p-6">
          <Navigation className="w-20 h-20 text-blue-400 animate-spin duration-3000" />
        </div>
      ),
    },
    {
      title: 'Built for Tamil Nadu',
      description: 'Reliable local travel designed specifically for our families, towns, and communities.',
      badge: 'Local Pride',
      visual: (
        <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center p-6">
          <ShieldCheck className="w-20 h-20 text-emerald-400" />
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 max-w-md mx-auto relative select-none">
      {/* Top Header with Skip Button */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">
          Dad's Auto &amp; Cab
        </span>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1 rounded-full bg-slate-900 border border-slate-800"
          >
            Skip
          </button>
        )}
      </div>

      {/* Slide Visual & Typography */}
      <div className="flex flex-col items-center text-center my-auto py-8">
        <div className="mb-8">{slides[currentSlide].visual}</div>

        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          {slides[currentSlide].badge}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
          {slides[currentSlide].title}
        </h2>

        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Bottom Controls & Dots */}
      <div className="pb-6 space-y-6">
        {/* Indicators */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-8 bg-amber-500'
                  : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-glow-yellow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          {currentSlide === slides.length - 1 ? (
            <>
              <span>Get Started</span>
              <Check className="w-5 h-5 stroke-[3]" />
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
