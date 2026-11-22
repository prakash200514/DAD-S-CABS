import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#07090C] text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none">
      {/* Top Mobile Status Bar (9:41) */}
      <div className="w-full max-w-sm flex items-center justify-between text-xs text-slate-400 pt-2 z-20">
        <span className="font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">●●●●</span>
          <span>WiFi</span>
          <div className="w-5 h-2.5 rounded-sm border border-slate-400 p-0.5">
            <div className="h-full bg-white rounded-xs w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Center Golden Circle with Yellow Auto & Curved Road */}
      <div className="my-auto flex flex-col items-center text-center space-y-6 z-10 animate-in fade-in duration-700">
        <div className="relative">
          {/* Golden radial aura */}
          <div className="absolute inset-0 rounded-full bg-[#F5A623]/20 blur-2xl transform scale-125 pointer-events-none"></div>

          {/* Golden Bordered Circle */}
          <div className="w-36 h-36 rounded-full border-2 border-[#F5A623] bg-gradient-to-b from-[#161B22] to-[#0A0D12] p-6 shadow-[0_0_40px_rgba(245,166,35,0.4)] flex items-center justify-center relative">
            <img
              src="/icons/icon-auto.svg"
              alt="Dad's Auto & Cab"
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            <span className="italic">Dad's</span>{' '}
            <span className="text-[#F5A623]">Auto &amp; Cab</span>
          </h1>

          <p className="text-xs text-gray-300 font-medium tracking-wide">
            Safe Rides • Local Routes • Always With You
          </p>
        </div>
      </div>

      {/* Bottom Temple Skyline Silhouette + Proudly Serving TN */}
      <div className="w-full max-w-md flex flex-col items-center pb-4 z-10 space-y-4">
        {/* Golden Temple Gopurams Silhouette */}
        <div className="w-full h-24 text-[#F5A623]/80 flex items-end justify-center overflow-hidden">
          <img
            src="/assets/temple_skyline.svg"
            alt="Tamil Nadu Temples"
            className="w-full h-auto object-cover filter drop-shadow-[0_-5px_15px_rgba(245,166,35,0.25)]"
          />
        </div>

        {/* Serving TN Badge */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#F5A623]">
          <span>Proudly Serving Tamil Nadu</span>
          <img
            src="/assets/tamil_nadu_map.svg"
            alt="Tamil Nadu"
            className="w-4 h-5 object-contain filter drop-shadow"
          />
        </div>

        <button
          onClick={() => navigate('/onboarding')}
          className="text-[11px] text-slate-500 hover:text-white flex items-center gap-1 transition-colors pt-1"
        >
          <span>Tap anywhere to continue</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
