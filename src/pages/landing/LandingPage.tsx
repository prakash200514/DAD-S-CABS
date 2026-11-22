import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { TamilNaduMap } from '../../components/map/TamilNaduMap';
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
  Users,
  Compass,
  Car,
  Bot,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 sticky top-0 z-40 bg-brand-dark/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <BrandLogo size="md" showBadge={true} />

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app')}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-glow-yellow transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Proudly Serving Tamil Nadu
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Safe Rides.<br />
              Local Routes.<br />
              <span className="text-amber-500">Always With You.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-lg font-medium leading-relaxed">
              Tamil Nadu's dedicated Auto &amp; Cab booking platform for your everyday local commute, temple visits, and inter-city journeys. Built with trust for our communities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/app')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-base shadow-glow-yellow flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Book Auto or Cab</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => navigate('/onboarding')}
                className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Install Mobile PWA</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="block font-black text-lg text-white">₹0 Surge</span>
                <span className="text-slate-400">Fair Standard Fares</span>
              </div>
              <div>
                <span className="block font-black text-lg text-amber-400">100% TN</span>
                <span className="text-slate-400">Local Verified Drivers</span>
              </div>
              <div>
                <span className="block font-black text-lg text-emerald-400">24x7</span>
                <span className="text-slate-400">Direct Call &amp; WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Visual: Interactive Tamil Nadu Map & Benchmark Trip Card */}
          <div className="relative">
            <div className="h-[440px] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-glow-yellow relative">
              <TamilNaduMap interactive={false} />
            </div>

            {/* Floating Benchmark Card: Palayamkottai to Tirunelveli Junction */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 right-2 sm:right-6 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 p-4 rounded-3xl shadow-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 p-1 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/icons/icon-auto.svg"
                    alt="Auto"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Example Popular Route
                  </span>
                  <p className="font-extrabold text-white text-sm">
                    Palayamkottai ➔ Tirunelveli Junction
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    6.8 km • ~15 mins • Auto: ₹120–₹150
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/app')}
                className="hidden sm:flex px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs items-center gap-1 hover:bg-amber-400 transition-colors"
              >
                <span>Try Route</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Simple &amp; Frictionless
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              How Dad's Auto &amp; Cab Works
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Get an auto or cab at your doorstep in Tamil Nadu within three effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 font-black text-xl flex items-center justify-center border border-amber-500/30">
                1
              </div>
              <h3 className="font-extrabold text-lg text-white">
                Enter your location
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your pickup and destination anywhere across Tamil Nadu — bus stands, railway stations, temples, or residential streets.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 font-black text-xl flex items-center justify-center border border-amber-500/30">
                2
              </div>
              <h3 className="font-extrabold text-lg text-white">
                Choose your ride
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick an affordable local Auto Rickshaw for quick street agility, or a comfortable Prime AC Cab for longer highway commutes.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 font-black text-xl flex items-center justify-center border border-amber-500/30">
                3
              </div>
              <h3 className="font-extrabold text-lg text-white">
                Enjoy your journey
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track your driver live, call or WhatsApp directly, pay transparently with Cash or UPI, and travel safely with peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
            Complete Mobility Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Our Services in Tamil Nadu
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Tailored travel options for every requirement and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Auto Rides',
              desc: 'Iconic Tamil Nadu auto-rickshaws for narrow lanes, bustling markets, and everyday town trips.',
              badge: 'Fast & Affordable',
            },
            {
              title: 'Prime Cab Rides',
              desc: 'AC Sedans for family travel, business trips, and comfortable long distance touring.',
              badge: 'AC Comfort',
            },
            {
              title: 'Local Travel',
              desc: 'Point-to-point daily rides within Tirunelveli, Madurai, Coimbatore, Chennai, and all towns.',
              badge: 'Instant Dispatch',
            },
            {
              title: 'Railway & Bus Stand Drops',
              desc: 'Never miss a train or bus with scheduled and emergency station pickups.',
              badge: 'On-time Guarantee',
            },
            {
              title: 'Temple & Spiritual Tours',
              desc: 'Nellaiappar, Meenakshi Amman, Srirangam, Rameswaram, and Big Temple family excursions.',
              badge: 'Pilgrim Friendly',
            },
            {
              title: 'Airport Travel',
              desc: 'Hassle-free transfers to Chennai, Coimbatore, Madurai, and Tuticorin airports.',
              badge: 'Luggage Friendly',
            },
          ].map((srv, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {srv.badge}
              </span>
              <h3 className="font-extrabold text-base text-white">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TAMIL NADU COVERAGE SHOWCASE */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              Statewide Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              “Proudly Serving Tamil Nadu”
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              From Chennai to Kanyakumari, from Coimbatore to Nagapattinam. Every district, town, and route is supported.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              'Chennai',
              'Coimbatore',
              'Madurai',
              'Tiruchirappalli',
              'Salem',
              'Tirunelveli',
              'Thoothukudi',
              'Nagercoil',
              'Erode',
              'Vellore',
              'Thanjavur',
              'Dindigul',
              'Virudhunagar',
              'Kanyakumari',
              'Kanchipuram',
              'Tiruppur',
              'Tenkasi',
              'Karur',
              'Sivakasi',
            ].map((city) => (
              <span
                key={city}
                className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 max-w-7xl mx-auto text-xs text-slate-500 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <BrandLogo size="sm" />
          <p className="text-center sm:text-right">
            Dad's Auto &amp; Cab • “Safe Rides • Local Routes • Always With You”<br />
            Proudly Serving Tamil Nadu, India.
          </p>
        </div>
      </footer>

      {/* PWA Install Promotion Banner */}
      <PwaInstallPrompt />
    </div>
  );
};
