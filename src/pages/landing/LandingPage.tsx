import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { PwaInstallPrompt } from '../../components/common/PwaInstallPrompt';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Download,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  Check,
  Users,
  Compass,
  Car,
  Bot,
  Activity,
  Layers,
  Award,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0D12] text-white selection:bg-[#F5A623] selection:text-slate-950 overflow-x-hidden flex flex-col justify-between select-none">
      {/* ------------------------------------------------------------------ */}
      {/* TOP NAVIGATION BAR                                                 */}
      {/* ------------------------------------------------------------------ */}
      <header className="border-b border-slate-800/80 sticky top-0 z-40 bg-[#0A0D12]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <BrandLogo size="md" showBadge={false} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-[#F5A623] transition-colors">Home</a>
            <a href="#services" className="hover:text-[#F5A623] transition-colors">Services</a>
            <a href="#coverage" className="hover:text-[#F5A623] transition-colors">Coverage</a>
            <a href="#safety" className="hover:text-[#F5A623] transition-colors">Safety</a>
            <a href="#contact" className="hover:text-[#F5A623] transition-colors">Contact</a>
          </nav>

          {/* CTA: Book a Ride */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app')}
              className="px-5 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#e59b20] active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-[0_4px_15px_rgba(245,166,35,0.4)] transition-all flex items-center gap-1.5"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* HERO SECTION                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section id="hero" className="relative pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Safe Rides • Local Routes<br />
              <span className="text-[#F5A623]">Always With You</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-medium">
              Your Journey, Our Priority.
            </p>

            {/* Buttons: Book a Ride & Install App */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('/app')}
                className="px-8 py-3.5 rounded-full bg-[#F5A623] hover:bg-[#e59b20] active:scale-95 text-slate-950 font-black text-sm shadow-[0_4px_15px_rgba(245,166,35,0.4)] flex items-center justify-center gap-2 transition-all"
              >
                <span>Book a Ride</span>
              </button>

              <button
                onClick={() => navigate('/onboarding')}
                className="px-6 py-3.5 rounded-full bg-[#161B22] hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#F5A623]" />
                <span>Install App</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Column (Auto Rickshaw with Temple & Palms) */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl relative group">
              <img
                src="/assets/tn_auto_temple_hero.jpg"
                alt="Dad's Auto & Cab Tamil Nadu"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* 3 SERVICE CARDS ROW                                              */}
        {/* ---------------------------------------------------------------- */}
        <div id="services" className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
          {/* 1. Auto Rides */}
          <div
            onClick={() => navigate('/app')}
            className="bg-[#12161E] border border-slate-800 hover:border-[#F5A623]/60 p-5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-110 transition-transform">
              <img
                src="/icons/icon-auto.svg"
                alt="Auto"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Auto Rides</h3>
              <p className="text-xs text-slate-400">Quick &amp; Affordable</p>
            </div>
          </div>

          {/* 2. Cab Rides */}
          <div
            onClick={() => navigate('/app')}
            className="bg-[#12161E] border border-slate-800 hover:border-[#F5A623]/60 p-5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center p-2.5 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Car className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Cab Rides</h3>
                <span className="text-[9px] bg-amber-500/20 text-amber-400 font-extrabold px-1.5 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-tighter">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-slate-400">Comfortable Travel • Next Phase</p>
            </div>
          </div>

          {/* 3. Proudly Serving Tamil Nadu */}
          <div
            onClick={() => navigate('/app')}
            className="bg-[#12161E] border border-slate-800 hover:border-[#F5A623]/60 p-5 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center p-2.5 flex-shrink-0 group-hover:scale-110 transition-transform">
              <img
                src="/assets/tamil_nadu_map.svg"
                alt="Tamil Nadu"
                className="w-full h-full object-contain text-[#F5A623]"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Proudly Serving</h3>
              <p className="text-xs text-[#F5A623] font-bold">Tamil Nadu</p>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* KEY FEATURES SECTION                                             */}
        {/* ---------------------------------------------------------------- */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F5A623] uppercase tracking-widest block">
              Enterprise Grade Mobility
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Built for Safety, Speed &amp; Trust
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Dad's Auto &amp; Cab combines the charm of local Tamil Nadu drivers with modern PWA technology, live GPS routing, and instant WhatsApp support.
            </p>
          </div>

          {/* Key Features Check List Card matching mockup badge */}
          <div className="bg-[#12161E] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <h3 className="font-black text-xs text-[#F5A623] uppercase tracking-wider mb-2">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
              {[
                'Premium UI/UX',
                'Tamil Nadu Focus',
                'Real-time Tracking',
                'PWA Support',
                'AI Assistant',
                'Secure & Scalable',
                'Multi-Role Access',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-[#F5A623] text-slate-950 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3.5]" />
                  </div>
                  <span className="font-bold text-xs">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM RIBBON: Safe & Secure + Yellow Partner Banner               */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-slate-800 bg-[#07090D] z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-between">
          {/* Left Ribbon Badges */}
          <div className="flex flex-wrap items-center gap-5 px-6 py-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
              <span>Safe &amp; Secure</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Zap className="w-4 h-4 text-[#F5A623]" />
              <span>Fast &amp; Reliable</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Download className="w-4 h-4 text-[#F5A623]" />
              <span>PWA Ready</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Users className="w-4 h-4 text-[#F5A623]" />
              <span>Accessible</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Activity className="w-4 h-4 text-[#F5A623]" />
              <span>Analytics</span>
            </div>
          </div>

          {/* Right Yellow Banner */}
          <div className="bg-[#F5A623] text-slate-950 font-black italic px-8 py-4 flex items-center justify-center text-xs sm:text-sm tracking-tight shadow-md">
            <span>Your Trusted Local Ride Partner in Tamil Nadu</span>
          </div>
        </div>
      </footer>

      {/* PWA Install Promotion Banner */}
      <PwaInstallPrompt />
    </div>
  );
};
