import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';
import { useLangStore } from '../../store/langStore';
import { TamilNaduMap } from '../../components/map/TamilNaduMap';
import { ActiveTripCard } from '../../components/driver/ActiveTripCard';
import {
  Bell,
  Check,
  X,
  Star,
  MapPin,
  Clock,
  Car,
  Home,
  FileText,
  IndianRupee,
  User,
} from 'lucide-react';

export const DriverDashboardPage: React.FC = () => {
  const { currentDriver } = useAuthStore();
  const {
    activeBooking,
    updateBookingStatus,
    completeActiveBooking,
    cancelActiveBooking,
    driverCoords,
    routePolyline,
    createBooking,
  } = useBookingStore();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasRequest, setHasRequest] = useState<boolean>(true);

  const handleAccept = () => {
    setHasRequest(false);
    createBooking();
  };

  const handleReject = () => {
    setHasRequest(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-[#0F141C] text-white sm:rounded-[36px] sm:my-3 sm:shadow-2xl overflow-hidden relative border-0 sm:border-8 border-slate-900 select-none">
      {/* Top Header: Driver Dashboard + Notification */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-800/80 z-20">
        <h2 className="text-base font-black tracking-tight text-white">
          Driver Dashboard
        </h2>
        <div className="relative w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F5A623]"></span>
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto z-20">
        {/* Driver Profile Card with Online Green Toggle Switch */}
        <div className="bg-[#171F2B] border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80"
              alt="Ravi Kumar"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#F5A623]"
            />
            <div>
              <h3 className="font-extrabold text-sm text-white">Ravi Kumar</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="text-[#F5A623] font-bold">★ 4.8</span>
                <span>•</span>
                <span className={isOnline ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </p>
            </div>
          </div>

          {/* iOS-style Green Toggle Switch */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 ease-in-out flex items-center ${
              isOnline ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
            }`}
          >
            <div className="w-5.5 h-5.5 rounded-full bg-white shadow-md"></div>
          </button>
        </div>

        {/* 3 Metric Stat Cards: 12 Trips, ₹2,340 Today, ₹45,820 Total */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="bg-[#171F2B] border border-slate-800 p-3 rounded-2xl">
            <span className="text-lg font-black text-white block">12</span>
            <span className="text-[10px] text-slate-400 font-semibold">Trips</span>
          </div>

          <div className="bg-[#171F2B] border border-slate-800 p-3 rounded-2xl">
            <span className="text-lg font-black text-[#F5A623] block">₹2,340</span>
            <span className="text-[10px] text-slate-400 font-semibold">Today</span>
          </div>

          <div className="bg-[#171F2B] border border-slate-800 p-3 rounded-2xl">
            <span className="text-lg font-black text-emerald-400 block">₹45,820</span>
            <span className="text-[10px] text-slate-400 font-semibold">Total</span>
          </div>
        </div>

        {/* ACTIVE TRIP or NEW RIDE REQUEST CARD */}
        {activeBooking ? (
          <ActiveTripCard
            booking={activeBooking}
            onUpdateStatus={(st) => {
              if (st === 'COMPLETED') {
                completeActiveBooking();
              } else {
                updateBookingStatus(st);
              }
            }}
            onCancel={() => cancelActiveBooking('Driver cancelled')}
          />
        ) : hasRequest ? (
          /* New Ride Request Card */
          <div className="bg-[#171F2B] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div>
              <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider block mb-1">
                New Ride Request
              </span>
              <h4 className="text-sm font-extrabold text-white">
                Palayamkottai ➔ Tirunelveli Junction
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                <span className="text-amber-400 font-bold">₹140</span> • 6.8 km
              </p>
            </div>

            {/* Accept (Green) and Reject (Red) Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleAccept}
                className="py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-black text-xs shadow-md transition-all active:scale-95"
              >
                Accept
              </button>

              <button
                onClick={handleReject}
                className="py-3 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-black text-xs shadow-md transition-all active:scale-95"
              >
                Reject
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-[#171F2B] rounded-2xl border border-slate-800">
            <Car className="w-8 h-8 text-[#F5A623] mx-auto mb-2 opacity-60" />
            <p className="text-xs font-bold text-white">Online and ready for requests</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Waiting for passengers in Tirunelveli</p>
            <button
              onClick={() => setHasRequest(true)}
              className="mt-3 text-[11px] text-[#F5A623] underline"
            >
              Simulate new ride request
            </button>
          </div>
        )}
      </div>

      {/* Driver Bottom Navigation Bar */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-[#111722] flex items-center justify-around text-xs">
        <button className="flex flex-col items-center text-[#F5A623] font-bold">
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-white">
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Trips</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-white">
          <IndianRupee className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Earnings</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-white">
          <User className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
};
