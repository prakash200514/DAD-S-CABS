import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { MapPin, ArrowRight } from 'lucide-react';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-charcoal via-brand-dark to-slate-950 text-white flex flex-col items-center justify-between p-8 relative overflow-hidden select-none">
      {/* Decorative Road Lines Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-32 border-x-2 border-dashed border-amber-500/40"></div>
      </div>

      <div className="pt-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Proudly Serving Tamil Nadu
        </span>
      </div>

      {/* Center Branding & Animated Vehicle */}
      <div className="flex flex-col items-center text-center space-y-6 z-10">
        <div className="relative animate-bounce duration-1000">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-4 shadow-glow-yellow flex items-center justify-center">
            <img
              src="/icons/icon-auto.svg"
              alt="Dad's Auto & Cab"
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Dad's <span className="text-amber-500">Auto &amp; Cab</span>
          </h1>
          <p className="text-sm text-gray-300 font-medium max-w-xs mx-auto">
            “Safe Rides • Local Routes • Always With You”
          </p>
          <p className="text-xs text-amber-400/90 font-medium">
            Your Journey, Our Priority.
          </p>
        </div>
      </div>

      {/* Bottom Progress & Quick Skip */}
      <div className="w-full max-w-xs space-y-4 pb-6 z-10 text-center">
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-amber-500 h-1.5 rounded-full animate-pulse w-3/4"></div>
        </div>

        <button
          onClick={() => navigate('/app')}
          className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors"
        >
          <span>Tap to continue directly</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
