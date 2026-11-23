import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { PwaInstallPrompt } from '../../components/common/PwaInstallPrompt';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Users,
  Star,
  Award,
  ChevronRight,
  Car,
  CreditCard,
  Smartphone,
  Shield,
  Search,
} from 'lucide-react';

// Popular Tamil Nadu Commercial Routes for Live Estimator
const TN_POPULAR_ROUTES = [
  {
    city: 'Tirunelveli',
    pickup: 'Palayamkottai Bus Stand',
    destination: 'Tirunelveli Junction',
    distance: 6.8,
    duration: 15,
    fareMin: 120,
    fareMax: 145,
  },
  {
    city: 'Madurai',
    pickup: 'Madurai Junction Station',
    destination: 'Meenakshi Temple',
    distance: 4.2,
    duration: 12,
    fareMin: 85,
    fareMax: 105,
  },
  {
    city: 'Coimbatore',
    pickup: 'Gandhipuram Bus Stand',
    destination: 'Coimbatore Airport',
    distance: 10.4,
    duration: 24,
    fareMin: 185,
    fareMax: 215,
  },
  {
    city: 'Chennai',
    pickup: 'Chennai Central',
    destination: 'T. Nagar Panagal Park',
    distance: 8.5,
    duration: 22,
    fareMin: 155,
    fareMax: 180,
  },
];

// Commercial Fleet Tiers (Auto Rickshaws Only)
const COMMERCIAL_FLEET = [
  {
    id: 'auto-std',
    title: "Standard City Auto",
    subtitle: 'Bajaj Compact RE 4S',
    passengers: '3 Passengers',
    luggage: '2 Medium Bags',
    fuel: 'CNG / LPG Metered',
    baseFare: '₹35',
    perKm: '₹15 / km',
    description: 'The standard commercial auto rickshaw for fast intra-city transit, railway station transfers, and daily commutes.',
    image: '/assets/auto_rickshaw_card.jpg',
  },
  {
    id: 'auto-ev',
    title: "Green EV Auto",
    subtitle: 'Mahindra Treo Electric',
    passengers: '3 Passengers',
    luggage: '2 Medium Bags',
    fuel: '100% Zero-Emission EV',
    baseFare: '₹35',
    perKm: '₹14 / km',
    description: 'Ultra-silent, vibration-free electric ride with modern suspension. Clean and sustainable travel across Tamil Nadu.',
    image: '/assets/tn_auto_temple_hero.jpg',
  },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Route selector
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);
  const selectedRoute = TN_POPULAR_ROUTES[selectedRouteIdx];

  const [pickupText, setPickupText] = useState(selectedRoute.pickup);
  const [destText, setDestText] = useState(selectedRoute.destination);

  const handleSelectRoute = (idx: number) => {
    setSelectedRouteIdx(idx);
    setPickupText(TN_POPULAR_ROUTES[idx].pickup);
    setDestText(TN_POPULAR_ROUTES[idx].destination);
  };

  const handleBookNow = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between">
      {/* ------------------------------------------------------------------ */}
      {/* 1. CLEAN COMMERCIAL NAVIGATION BAR                                */}
      {/* ------------------------------------------------------------------ */}
      <header className="border-b border-slate-800/60 sticky top-0 z-40 bg-[#090D14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <BrandLogo size="md" showBadge={true} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#fleet" className="hover:text-white transition-colors">
              Fleet
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Meter Pricing
            </a>
            <a href="#driver-partner" className="hover:text-white transition-colors">
              Drive with Us
            </a>
          </nav>

          {/* Action Links & Book Ride CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/driver/login')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              Driver Login
            </button>

            <button
              onClick={() => navigate('/admin/login')}
              className="hidden md:inline-flex px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Admin HQ
            </button>

            <button
              onClick={handleBookNow}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Auto</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* 2. AIRY, CLEAN COMMERCIAL HERO SECTION                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clear, Confident Messaging & Ride Box */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Across Tamil Nadu Local Routes</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Safe local auto rides, <br />
                <span className="text-slate-400 font-normal">at genuine meter rates.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed">
                Zero surge pricing, certified local auto drivers, and direct payments to pilots. Book your auto rickshaw in seconds.
              </p>
            </div>

            {/* Clean Uber-style Ride Booking Card */}
            <div className="bg-[#101520] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 max-w-xl">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Plan Your Ride
              </span>

              {/* Pickup & Destination Inputs */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-slate-500 font-medium block">Pickup Point</span>
                    <input
                      type="text"
                      value={pickupText}
                      onChange={(e) => setPickupText(e.target.value)}
                      placeholder="Enter pickup location in Tamil Nadu"
                      className="w-full bg-transparent text-xs font-semibold text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-slate-500 font-medium block">Destination</span>
                    <input
                      type="text"
                      value={destText}
                      onChange={(e) => setDestText(e.target.value)}
                      placeholder="Enter destination in Tamil Nadu"
                      className="w-full bg-transparent text-xs font-semibold text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Route Selector Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400">Popular Routes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {TN_POPULAR_ROUTES.map((route, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectRoute(idx)}
                      className={`text-[11px] px-3 py-1.5 rounded-xl border transition-colors ${
                        selectedRouteIdx === idx
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {route.city}: {route.destination.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fare & CTA Row */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Estimated Meter Fare</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white font-mono">
                      ₹{selectedRoute.fareMin} – ₹{selectedRoute.fareMax}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({selectedRoute.distance} km • ~{selectedRoute.duration}m)
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Book This Auto</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Quiet Trust Markers */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Government Meter Rates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero Surge Multipliers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Direct Cash / UPI to Pilot</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Photographic Image with Subtle Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
              <img
                src="/assets/tn_auto_temple_hero.jpg"
                alt="Dad's Auto in Tamil Nadu"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

              {/* Floating Quality Pill */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 Rating</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">50,000+ Completed Rides</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    1,200+ Verified Tamil Nadu Auto Pilots
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. FOUR CORE COMMERCIAL PILLARS (CLEAN & AIRY)                     */}
      {/* ------------------------------------------------------------------ */}
      <section id="how-it-works" className="border-t border-slate-800/60 bg-[#0C101A] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Core Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              A fair mobility service built for our towns and cities.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#101522] border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">0% Surge Pricing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standard government meter pricing (₹35 base, ₹15/km). Fares stay consistent regardless of rain or rush hour.
              </p>
            </div>

            <div className="bg-[#101522] border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Verified Local Pilots</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every driver holds a valid Tamil Nadu commercial PSV badge, RTO fitness certificate, and police background clearance.
              </p>
            </div>

            <div className="bg-[#101522] border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Direct Cash &amp; UPI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pay your pilot directly using Google Pay, PhonePe, or cash. No wallet holds or delayed weekly payouts.
              </p>
            </div>

            <div className="bg-[#101522] border border-slate-800/80 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-purple-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Live Route &amp; SOS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track your ride live on GPS and share your journey with family over WhatsApp. 24x7 local support desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. COMMERCIAL FLEET OVERVIEW (AUTOS ONLY)                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="fleet" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Vehicle Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our Tamil Nadu Auto Fleet
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Regulated under Section 66 of Motor Vehicles Act, 1988
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMERCIAL_FLEET.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#101520] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-48 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{vehicle.title}</h3>
                  <span className="text-xs text-amber-400 font-medium">{vehicle.subtitle}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {vehicle.description}
                </p>

                <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Capacity</span>
                    <span className="font-semibold text-white">{vehicle.passengers}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Luggage</span>
                    <span className="font-semibold text-white">{vehicle.luggage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Energy</span>
                    <span className="font-semibold text-emerald-400">{vehicle.fuel}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Standard Meter Rate</span>
                  <span className="text-sm font-bold text-white font-mono">
                    {vehicle.baseFare} Base • {vehicle.perKm}
                  </span>
                </div>
                <button
                  onClick={handleBookNow}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Ride</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. DRIVER PARTNER INVITATION (CLEAN & DIGNIFIED)                   */}
      {/* ------------------------------------------------------------------ */}
      <section id="driver-partner" className="border-t border-slate-800/60 bg-[#0C101A] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-[#101522] border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
              Driver Partner Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Drive with Dad's Fleet &amp; keep 100% of your earnings.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Zero commission deductions. Direct passenger UPI and cash payments into your hand. Complete registration online in 5 minutes with your Driving Licence and Auto Photo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate('/driver/register')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Register as Partner</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => navigate('/driver/login')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              <span>Pilot Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CLEAN APPLICATION PORTALS SECTION                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-slate-800/60 bg-[#090D14] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Passenger App */}
          <div className="bg-[#101520] border border-slate-800/80 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Passenger Portal</span>
              <h4 className="text-base font-bold text-white">Customer Booking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Book certified local autos across Tamil Nadu with zero surge pricing and live GPS tracking.
              </p>
            </div>
            <button
              onClick={() => navigate('/app')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Open Passenger App</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Driver App */}
          <div className="bg-[#101520] border border-slate-800/80 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver Partner</span>
              <h4 className="text-base font-bold text-white">Pilot Operations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Duty map, passenger dispatch requests, daily earnings, and direct UPI settlements.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/driver/login')}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs transition-colors text-center cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/driver/register')}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors text-center cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>

          {/* Fleet HQ */}
          <div className="bg-[#101520] border border-slate-800/80 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Management</span>
              <h4 className="text-base font-bold text-white">Central Fleet HQ</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Owner command center for fleet dispatch, driver verification, fare rules, and revenue analytics.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Admin HQ Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. MINIMALIST COMMERCIAL FOOTER                                    */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-slate-800/80 bg-[#070A0F] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Dad's Auto &amp; Cab. All rights reserved. Proudly Serving Tamil Nadu.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Section 66 MVA Compliant</span>
            <span>24x7 Support: 94431 87654</span>
          </div>
        </div>
      </footer>

      {/* PWA Install Promotion Banner */}
      <PwaInstallPrompt />
    </div>
  );
};
