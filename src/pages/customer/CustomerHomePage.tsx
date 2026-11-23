import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';
import { useLangStore } from '../../store/langStore';
import { TamilNaduMap } from '../../components/map/TamilNaduMap';
import { LocationSearchModal } from '../../components/customer/LocationSearchModal';
import { RideCompletedModal } from '../../components/customer/RideCompletedModal';
import { AiBookingSheet } from '../../components/customer/AiBookingSheet';
import { TNLocation } from '../../types';
import {
  MapPin,
  Search,
  Bell,
  Clock,
  Navigation,
  Compass,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  Check,
  ChevronDown,
  Bot,
  AlertTriangle,
  Car,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomerHomePage: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { t } = useLangStore();
  const {
    pickup,
    destination,
    vehicleType,
    distanceKm,
    durationMin,
    routePolyline,
    estimatedFare,
    fareMin,
    fareMax,
    activeBooking,
    driverCoords,
    setPickup,
    setDestination,
    setVehicleType,
    createBooking,
    cancelActiveBooking,
    completeActiveBooking,
    rateBooking,
  } = useBookingStore();

  // Screen Stages matching the mockup:
  // 'home' | 'route' | 'confirmed' | 'tracking'
  const [screenStage, setScreenStage] = useState<
    'home' | 'route' | 'confirmed' | 'tracking'
  >(activeBooking ? 'tracking' : 'home');

  const [searchModalType, setSearchModalType] = useState<
    'pickup' | 'destination' | null
  >(null);
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
  const [completedBookingToReview, setCompletedBookingToReview] = useState<any>(null);



  const handleOpenSearch = (type: 'pickup' | 'destination') => {
    setSearchModalType(type);
  };

  const handleSelectLocation = (loc: TNLocation) => {
    if (searchModalType === 'pickup') {
      setPickup(loc);
    } else if (searchModalType === 'destination') {
      setDestination(loc);
    }
  };

  const handleBookRideClick = () => {
    setScreenStage('route');
  };

  const handleConfirmRideClick = () => {
    createBooking();
    setScreenStage('confirmed');

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#F5A623', '#10B981', '#3B82F6', '#FFFFFF'],
      });
    } catch (e) {}
  };

  const handleTrackRideClick = () => {
    setScreenStage('tracking');
  };

  const handleCallDriver = () => {
    window.open('tel:+919443187654');
  };

  const handleWhatsAppDriver = () => {
    const text = encodeURIComponent(
      `Hello Ravi Kumar, I am waiting for ride #${activeBooking?.bookingCode || 'ATC1025'} at ${pickup.name}.`
    );
    window.open(`https://wa.me/919443187654?text=${text}`, '_blank');
  };

  const handleSimulateFinishTrip = () => {
    if (activeBooking) {
      setCompletedBookingToReview(activeBooking);
      completeActiveBooking();
      setScreenStage('home');
    }
  };

  return (
    <div className="relative flex-1 flex flex-col h-full min-h-0 overflow-hidden bg-[#06090E] select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. HOME SCREEN STATE (Exact match to Home Screen in image)     */}
      {/* ------------------------------------------------------------- */}
      {screenStage === 'home' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-white sm:rounded-[40px] sm:my-3 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative border-0 sm:border-[10px] border-slate-900 ring-1 ring-slate-800">
          {/* Top Status Bar (9:41) */}
          <div className="px-5 pt-3 pb-2 flex items-center justify-between text-xs text-slate-800 font-semibold z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">●●●●</span>
              <span>WiFi</span>
              <div className="w-5 h-2.5 rounded-sm border border-slate-800 p-0.5">
                <div className="h-full bg-slate-800 rounded-xs w-3/4"></div>
              </div>
            </div>
          </div>

          {/* User Greeting & Notification */}
          <div className="px-5 py-2 flex items-center justify-between z-20">
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80'}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-[#F5A623]"
              />
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Vanakkam!</span>
                <h3 className="font-extrabold text-slate-900 text-sm">Where are you going?</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAiSheetOpen(true)}
                className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                title="AI Booking"
              >
                <Bot className="w-4 h-4" />
              </button>
              <div className="relative w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F5A623]"></span>
              </div>
            </div>
          </div>

          {/* Local Auto Cab Badge Banner */}
          <div className="px-5 pt-0.5 pb-1 z-20">
            <div className="bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <span className="text-sm">🛺</span>
                <span>Local Auto Cab</span>
                <span className="text-[10px] text-slate-500 font-medium">• Tamil Nadu Fleet</span>
              </div>
              <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-tight">
                Active Now
              </span>
            </div>
          </div>

          {/* Location Input Card */}
          <div className="px-5 py-1 z-20">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3 shadow-xs">
              {/* Pickup field */}
              <div
                onClick={() => handleOpenSearch('pickup')}
                className="flex items-center gap-3 cursor-pointer group hover:bg-white p-1 rounded-xl transition-colors"
              >
                <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0 ring-4 ring-emerald-100"></div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-400 font-medium block">Pickup Location</span>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {pickup.name.includes('Palayamkottai') ? 'Current Location' : pickup.name}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 mx-1"></div>

              {/* Destination field */}
              <div
                onClick={() => handleOpenSearch('destination')}
                className="flex items-center gap-3 cursor-pointer group hover:bg-white p-1 rounded-xl transition-colors"
              >
                <div className="w-3 h-3 rounded-full border-2 border-slate-400 flex-shrink-0 ring-4 ring-slate-100"></div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-slate-400 font-medium block">Destination</span>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {destination.name || 'Enter destination'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Preview (Fixed Explicit Height, clean OSM tiles) */}
          <div className="mx-5 my-2 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative h-48 sm:h-52 w-[calc(100%-40px)] flex-shrink-0">
            <TamilNaduMap
              pickup={pickup}
              destination={destination}
              polyline={routePolyline}
              vehicleType="AUTO"
              interactive={true}
              showCenterControls={false}
            />
          </div>

          {/* Mini Metric Pills: 6.8 km Distance, 15 min Time, ₹119-144 Fare */}
          <div className="px-5 py-1 flex items-center justify-between text-center">
            <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl mx-1">
              <span className="text-xs font-black text-slate-900 block">{distanceKm} km</span>
              <span className="text-[10px] text-slate-400">Distance</span>
            </div>
            <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl mx-1">
              <span className="text-xs font-black text-slate-900 block">{durationMin} min</span>
              <span className="text-[10px] text-slate-400">Time</span>
            </div>
            <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl mx-1">
              <span className="text-xs font-black text-slate-900 block">₹{fareMin}-{fareMax}</span>
              <span className="text-[10px] text-slate-400">Fare</span>
            </div>
          </div>

          {/* Primary CTA Button: Book Ride */}
          <div className="p-5 pt-2">
            <button
              onClick={handleBookRideClick}
              className="w-full py-4 rounded-full bg-[#F5A623] hover:bg-[#e59b20] active:scale-[0.98] text-slate-950 font-black text-sm shadow-[0_4px_15px_rgba(245,166,35,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Auto Ride</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. MAP & ROUTE SCREEN (Exact match to Map & Route in image)    */}
      {/* ------------------------------------------------------------- */}
      {screenStage === 'route' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-slate-900 sm:rounded-[40px] sm:my-3 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative border-0 sm:border-[10px] border-slate-900 ring-1 ring-slate-800">
          {/* Full Screen Interactive Map Layer */}
          <div className="absolute inset-0 z-0">
            <TamilNaduMap
              pickup={pickup}
              destination={destination}
              polyline={routePolyline}
              vehicleType={vehicleType}
              interactive={true}
            />
          </div>

          {/* Floating Top Route Pill: Green Pin, Tirunelveli Junction, 6.8 km • 15 min */}
          <div className="p-4 z-20">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-slate-900 text-sm truncate">
                  {destination.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {distanceKm} km • {durationMin} min
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Floating Route Card: Auto • ₹120-150 + Confirm Ride */}
          <div className="p-4 z-20 space-y-3">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">
                  Local Auto • ₹{fareMin}-{fareMax}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>

            <button
              onClick={handleConfirmRideClick}
              className="w-full py-4 rounded-full bg-[#F5A623] hover:bg-[#e59b20] active:scale-[0.98] text-slate-950 font-black text-sm shadow-[0_4px_15px_rgba(245,166,35,0.4)] transition-all"
            >
              Confirm Ride
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. BOOKING CONFIRMED (Exact match to Booking Confirmed in image)*/}
      {/* ------------------------------------------------------------- */}
      {screenStage === 'confirmed' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-[#080B0F] text-white sm:rounded-[40px] sm:my-3 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative border-0 sm:border-[10px] border-slate-900 ring-1 ring-slate-800 select-none">
          {/* Top Status Bar (9:41) */}
          <div className="px-5 pt-3 pb-2 flex items-center justify-between text-xs text-slate-400 font-semibold z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">●●●●</span>
              <span>WiFi</span>
              <div className="w-5 h-2.5 rounded-sm border border-slate-400 p-0.5">
                <div className="h-full bg-white rounded-xs w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Center Confirmation with Green Check Circle & ID */}
          <div className="flex flex-col items-center text-center my-auto px-6 space-y-4 z-20 animate-in zoom-in-95 duration-300">
            {/* Green Check Circle */}
            <div className="w-20 h-20 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.45)]">
              <Check className="w-10 h-10 stroke-[3.5]" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white">Ride Confirmed!</h2>
              <p className="text-xs text-slate-400">
                Booking ID <span className="text-[#F5A623] font-bold">#ATC1025</span>
              </p>
            </div>

            {/* Driver Card with White Background */}
            <div className="w-full bg-white rounded-3xl p-5 shadow-2xl text-slate-900 text-left space-y-4 mt-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80"
                  alt="Ravi Kumar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#F5A623]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-slate-900">Ravi Kumar</h4>
                    <span className="text-xs text-[#F5A623] font-bold">★ 4.8</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Auto • TN 72 AB 4587</p>
                  <p className="text-xs text-slate-900 font-bold mt-0.5">ETA: 5 min</p>
                </div>
              </div>

              {/* Call & WhatsApp Pill Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleCallDriver}
                  className="py-2.5 rounded-full border border-blue-500 bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>Call</span>
                </button>

                <button
                  onClick={handleWhatsAppDriver}
                  className="py-2.5 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Track Ride Primary Solid Yellow Button */}
            <div className="w-full pt-2">
              <button
                onClick={handleTrackRideClick}
                className="w-full py-4 rounded-full bg-[#F5A623] hover:bg-[#e59b20] active:scale-[0.98] text-slate-950 font-black text-sm shadow-[0_4px_15px_rgba(245,166,35,0.4)] transition-all"
              >
                Track Ride
              </button>
            </div>
          </div>

          {/* Bottom Temple Gopurams Silhouette */}
          <div className="w-full h-20 text-[#F5A623]/60 flex items-end justify-center overflow-hidden z-10">
            <img
              src="/assets/temple_skyline.svg"
              alt="Temple Skyline"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. LIVE TRACKING SCREEN (Exact match to Live Tracking in image)*/}
      {/* ------------------------------------------------------------- */}
      {screenStage === 'tracking' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-slate-900 sm:rounded-[40px] sm:my-3 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative border-0 sm:border-[10px] border-slate-900 ring-1 ring-slate-800">
          {/* Full Screen Map Layer */}
          <div className="absolute inset-0 z-0">
            <TamilNaduMap
              pickup={pickup}
              destination={destination}
              polyline={routePolyline}
              driverCoords={driverCoords}
              vehicleType={vehicleType}
              interactive={true}
            />
          </div>

          {/* Top Floating Pill: Green Dot, Driver Arriving, ETA: 5 min */}
          <div className="p-4 z-20">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-slate-200 flex items-center gap-3 w-fit mx-auto">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <span className="font-extrabold text-slate-900 text-xs block leading-tight">
                  Driver Arriving
                </span>
                <span className="text-[11px] text-slate-500 font-semibold block leading-tight">
                  ETA: 5 min
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Floating Drawer: Step Timeline + Driver Bar */}
          <div className="p-4 z-20 space-y-3">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-slate-200 space-y-4">
              {/* Step Timeline Indicator: Assigned --- Arriving --- On Trip --- Reached */}
              <div className="flex items-center justify-between px-2 pt-1">
                {[
                  { name: 'Assigned', state: 'done' },
                  { name: 'Arriving', state: 'active' },
                  { name: 'On Trip', state: 'pending' },
                  { name: 'Reached', state: 'pending' },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.state === 'done' || step.state === 'active'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {step.state === 'done' || step.state === 'active' ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span>●</span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 mt-1">
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Driver Bar: Photo, Ravi Kumar ★ 4.8, TN 72 AB 4587, Circular Phone, Circular WhatsApp */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80"
                    alt="Ravi Kumar"
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#F5A623]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900">Ravi Kumar</h4>
                      <span className="text-xs text-[#F5A623] font-bold">★ 4.8</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">TN 72 AB 4587</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCallDriver}
                    className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow transition-colors"
                    title="Call Ravi"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleWhatsAppDriver}
                    className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow transition-colors"
                    title="WhatsApp Ravi"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Complete demo trip button */}
              <button
                onClick={handleSimulateFinishTrip}
                className="w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Trip Finish (Arrived at Junction)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <LocationSearchModal
        isOpen={searchModalType !== null}
        type={searchModalType || 'destination'}
        currentValue={searchModalType === 'pickup' ? pickup : destination}
        onSelect={handleSelectLocation}
        onClose={() => setSearchModalType(null)}
      />

      <AiBookingSheet
        isOpen={isAiSheetOpen}
        onClose={() => setIsAiSheetOpen(false)}
        onApplyIntent={() => setScreenStage('route')}
      />

      {completedBookingToReview && (
        <RideCompletedModal
          booking={completedBookingToReview}
          onDone={(r, f) => {
            rateBooking(completedBookingToReview.id, r, f);
            setCompletedBookingToReview(null);
          }}
        />
      )}
    </div>
  );
};
