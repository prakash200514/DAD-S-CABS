import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';
import { useLangStore } from '../../store/langStore';
import { TamilNaduMap } from '../../components/map/TamilNaduMap';
import { LocationSearchModal } from '../../components/customer/LocationSearchModal';
import { RideSelector } from '../../components/customer/RideSelector';
import { BookingConfirmSheet } from '../../components/customer/BookingConfirmSheet';
import { LiveTrackerCard } from '../../components/customer/LiveTrackerCard';
import { RideCompletedModal } from '../../components/customer/RideCompletedModal';
import { AiBookingSheet } from '../../components/customer/AiBookingSheet';
import { TNLocation } from '../../types';
import {
  MapPin,
  Search,
  ArrowUpDown,
  Navigation,
  Clock,
  Sparkles,
  Home,
  Briefcase,
  History,
  Bot,
  Bell,
  CheckCircle2,
} from 'lucide-react';

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
    swapLocations,
    cancelActiveBooking,
    completeActiveBooking,
    rateBooking,
  } = useBookingStore();

  // Modals & Sheets
  const [searchModalType, setSearchModalType] = useState<
    'pickup' | 'destination' | null
  >(null);
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false);
  const [isAiSheetOpen, setIsAiSheetOpen] = useState(false);
  const [completedBookingToReview, setCompletedBookingToReview] = useState<any>(
    null
  );

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

  const handleSimulateFinishTrip = () => {
    if (activeBooking) {
      setCompletedBookingToReview(activeBooking);
      completeActiveBooking();
    }
  };

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-gray-50 dark:bg-brand-dark">
      {/* Interactive Tamil Nadu Vector / Google Map Layer */}
      <div className="absolute inset-0 z-0">
        <TamilNaduMap
          pickup={pickup}
          destination={destination}
          polyline={routePolyline}
          driverCoords={activeBooking ? driverCoords : undefined}
          vehicleType={vehicleType}
          interactive={true}
        />
      </div>

      {/* Floating Top Bar (Avatar, Greeting, AI Trigger) */}
      <div className="absolute top-4 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* User Greeting Card */}
        <div className="pointer-events-auto bg-white/95 dark:bg-brand-surface/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-premium flex items-center gap-3">
          <img
            src={
              currentUser?.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80'
            }
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border border-amber-500"
          />
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              {t('home.greeting')}
            </p>
            <h3 className="text-xs font-black text-gray-900 dark:text-white leading-tight">
              {currentUser?.name || 'Karthik Raja'}
            </h3>
          </div>
        </div>

        {/* AI Assistant Quick Trigger */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsAiSheetOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-glow-yellow flex items-center gap-1.5 transition-all active:scale-95"
            title="Book with Dad's AI Assistant"
          >
            <Bot className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Dad's AI</span>
          </button>
        </div>
      </div>

      {/* Bottom Sheet Drawer for Booking or Live Tracking */}
      <div className="mt-auto z-20 p-3 sm:p-5 max-w-xl mx-auto w-full pointer-events-none">
        <div className="pointer-events-auto">
          {activeBooking ? (
            /* ACTIVE RIDE LIVE TRACKING CARD */
            <LiveTrackerCard
              booking={activeBooking}
              onCancel={() => cancelActiveBooking()}
              onCompleteDemoTrip={handleSimulateFinishTrip}
            />
          ) : isConfirmingBooking ? (
            /* CONFIRM BOOKING BOTTOM SHEET */
            <BookingConfirmSheet
              onConfirmed={() => {
                setIsConfirmingBooking(false);
              }}
            />
          ) : (
            /* PRIMARY RIDE PLANNING CARD */
            <div className="bg-white/95 dark:bg-brand-surface/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-gray-200/80 dark:border-slate-800 space-y-4">
              {/* Heading */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                    {t('home.whereAreYouGoing')}
                  </h2>
                  <p className="text-[11px] text-amber-500 font-semibold">
                    Local Auto &amp; Cab Booking • Tamil Nadu
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{durationMin} mins</span>
                </div>
              </div>

              {/* Pickup & Destination Interactive Fields */}
              <div className="relative bg-gray-50 dark:bg-slate-900/80 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-2">
                {/* Pickup Field */}
                <div
                  onClick={() => handleOpenSearch('pickup')}
                  className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-gray-400 font-medium block">
                      {t('home.pickup')}
                    </span>
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {pickup.name}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200/60 dark:border-slate-800/80 mx-2"></div>

                {/* Destination Field */}
                <div
                  onClick={() => handleOpenSearch('destination')}
                  className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-gray-400 font-medium block">
                      {t('home.destination')}
                    </span>
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {destination.name}
                    </p>
                  </div>
                </div>

                {/* Swap locations button */}
                <button
                  type="button"
                  onClick={swapLocations}
                  title="Swap Locations"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow flex items-center justify-center text-gray-600 dark:text-slate-300 hover:text-amber-500 transition-transform active:scale-90"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Vehicle Selection: Auto vs Cab */}
              <RideSelector
                selectedType={vehicleType}
                onSelect={setVehicleType}
                distanceKm={distanceKm}
                durationMin={durationMin}
              />

              {/* Primary Action Button */}
              <button
                onClick={() => setIsConfirmingBooking(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-glow-yellow flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Book {vehicleType === 'AUTO' ? 'Local Auto' : 'Prime Cab'}</span>
                <span className="text-slate-900">•</span>
                <span>₹{estimatedFare}</span>
              </button>
            </div>
          )}
        </div>
      </div>

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
        onApplyIntent={() => {
          // Handled inside AI Sheet
        }}
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
