import React, { useEffect, useState } from 'react';
import { Booking } from '../../types';
import {
  BellRing,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  X,
  Phone,
  IndianRupee,
} from 'lucide-react';

interface RideRequestModalProps {
  booking: Booking;
  onAccept: () => void;
  onReject: () => void;
}

export const RideRequestModal: React.FC<RideRequestModalProps> = ({
  booking,
  onAccept,
  onReject,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(20);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onReject();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onReject]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in zoom-in-95">
      <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 shadow-glow-yellow text-white space-y-5">
        {/* Urgent Header with Countdown Ring */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-black text-amber-400 text-sm tracking-wide uppercase">
              Incoming {booking.vehicleType} Request
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="font-mono font-bold text-amber-400 text-xs">
              {secondsLeft}s
            </span>
          </div>
        </div>

        {/* Customer & Fare Bar */}
        <div className="flex items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Passenger</span>
            <h4 className="font-bold text-base text-white">
              {booking.customerName}
            </h4>
            <span className="text-xs text-amber-400 font-mono">
              {booking.customerPhone}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-medium">Est. Earning</span>
            <div className="text-2xl font-black text-amber-400">
              ₹{booking.estimatedFare}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              Cash / UPI Direct
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></div>
            <div>
              <span className="text-slate-400 font-medium">Pickup</span>
              <p className="font-bold text-slate-100 text-sm">
                {booking.pickup.name}
              </p>
              <p className="text-[11px] text-slate-400">{booking.pickup.address}</p>
            </div>
          </div>

          <div className="border-l border-dashed border-slate-700 ml-1.5 h-4 my-1"></div>

          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
            <div>
              <span className="text-slate-400 font-medium">Destination</span>
              <p className="font-bold text-slate-100 text-sm">
                {booking.destination.name}
              </p>
              <p className="text-[11px] text-slate-400">{booking.destination.address}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400">
            <span>Distance: <strong className="text-white">{booking.distanceKm} km</strong></span>
            <span>Duration: <strong className="text-white">~{booking.estimatedDurationMin} mins</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onReject}
            className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
          >
            <X className="w-4 h-4 text-red-400" />
            <span>Decline</span>
          </button>

          <button
            onClick={onAccept}
            className="py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-1.5 shadow-glow-yellow transition-all active:scale-95"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Accept Ride</span>
          </button>
        </div>
      </div>
    </div>
  );
};
