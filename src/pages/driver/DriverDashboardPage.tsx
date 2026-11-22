import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';
import { useLangStore } from '../../store/langStore';
import { TamilNaduMap } from '../../components/map/TamilNaduMap';
import { RideRequestModal } from '../../components/driver/RideRequestModal';
import { ActiveTripCard } from '../../components/driver/ActiveTripCard';
import {
  Power,
  Star,
  IndianRupee,
  CalendarCheck,
  TrendingUp,
  MapPin,
  Bell,
  CheckCircle2,
  Navigation,
} from 'lucide-react';

export const DriverDashboardPage: React.FC = () => {
  const { currentDriver } = useAuthStore();
  const { t } = useLangStore();
  const {
    activeBooking,
    updateBookingStatus,
    completeActiveBooking,
    cancelActiveBooking,
    driverCoords,
    routePolyline,
    createBooking,
  } = useBookingStore();

  const [isOnline, setIsOnline] = useState<boolean>(
    currentDriver?.onlineStatus === 'ONLINE'
  );
  const [incomingRequest, setIncomingRequest] = useState<any>(null);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
  };

  const handleSimulateNewRequest = () => {
    // Generate an incoming request for driver
    const dummyReq = {
      id: 'bkg-incoming-01',
      bookingCode: '#ATC1025',
      customerName: 'Karthik Raja',
      customerPhone: '+91 98401 23456',
      vehicleType: 'AUTO' as const,
      pickup: {
        id: 'tn-tvl-01',
        name: 'Palayamkottai Bus Stand',
        address: 'Palayamkottai, Tirunelveli',
        district: 'Tirunelveli',
        lat: 8.718,
        lng: 77.742,
      },
      destination: {
        id: 'tn-tvl-02',
        name: 'Tirunelveli Junction Railway Station',
        address: 'Junction, Tirunelveli',
        district: 'Tirunelveli',
        lat: 8.729,
        lng: 77.708,
      },
      distanceKm: 6.8,
      estimatedDurationMin: 15,
      estimatedFare: 140,
      paymentMethod: 'UPI' as const,
      status: 'PENDING' as const,
      createdAt: new Date().toISOString(),
    };
    setIncomingRequest(dummyReq);
  };

  const handleAcceptRequest = () => {
    setIncomingRequest(null);
    createBooking(); // Sets active booking with Ravi Kumar
  };

  const handleRejectRequest = () => {
    setIncomingRequest(null);
  };

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-slate-950 text-white">
      {/* Map Background for Navigation */}
      <div className="absolute inset-0 z-0">
        <TamilNaduMap
          pickup={activeBooking?.pickup}
          destination={activeBooking?.destination}
          polyline={activeBooking ? routePolyline : []}
          driverCoords={driverCoords}
          vehicleType="AUTO"
          interactive={true}
        />
      </div>

      {/* Floating Top Driver Status Bar */}
      <div className="absolute top-4 left-3 right-3 z-20 flex flex-col gap-2 max-w-xl mx-auto w-full pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={
                  currentDriver?.avatar ||
                  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80'
                }
                alt="Driver"
                className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500 shadow"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                  isOnline ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">
                  {currentDriver?.name || 'Ravi Kumar'}
                </h3>
                <span className="flex items-center gap-0.5 text-xs text-amber-400 font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {currentDriver?.rating || 4.8}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentDriver?.vehicle.registrationNumber || 'TN 72 AB 4587'} • {currentDriver?.vehicle.model || 'Bajaj RE 4S'}
              </p>
            </div>
          </div>

          {/* Online / Offline Toggle Switch */}
          <button
            onClick={toggleOnline}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
              isOnline
                ? 'bg-emerald-500 text-slate-950 shadow-glow-green hover:bg-emerald-400'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>

        {/* Demo trigger button for incoming ride request test */}
        {!activeBooking && isOnline && !incomingRequest && (
          <div className="pointer-events-auto flex justify-end">
            <button
              onClick={handleSimulateNewRequest}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span>Simulate Customer Request (#ATC1025)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Driver Controls or Stats */}
      <div className="mt-auto z-20 p-3 sm:p-5 max-w-xl mx-auto w-full pointer-events-none">
        <div className="pointer-events-auto">
          {activeBooking ? (
            /* ACTIVE TRIP DRIVER CONTROLS */
            <ActiveTripCard
              booking={activeBooking}
              onUpdateStatus={(nextStatus) => {
                if (nextStatus === 'COMPLETED') {
                  completeActiveBooking();
                } else {
                  updateBookingStatus(nextStatus);
                }
              }}
              onCancel={() => cancelActiveBooking('Driver cancelled')}
            />
          ) : (
            /* DRIVER DAILY METRICS CARD */
            <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Today's Performance • Tirunelveli
                </span>
                <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Target: 15 Trips
                </span>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Today's Trips
                  </span>
                  <div className="text-xl font-black text-white mt-0.5">
                    12 <span className="text-xs font-normal text-slate-500">trips</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Today's Earnings
                  </span>
                  <div className="text-xl font-black text-amber-400 mt-0.5">
                    ₹2,340
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Total Earnings
                  </span>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">
                    ₹45,820
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Rating
                  </span>
                  <div className="text-xl font-black text-amber-400 mt-0.5 flex items-center gap-1">
                    4.8 <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                </div>
              </div>

              {isOnline ? (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>You are online and ready to accept auto passengers in Tirunelveli district.</span>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2">
                  <Power className="w-4 h-4" />
                  <span>You are currently offline. Tap "Go Online" at top to start receiving ride requests.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Incoming Request Modal */}
      {incomingRequest && (
        <RideRequestModal
          booking={incomingRequest}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      )}
    </div>
  );
};
