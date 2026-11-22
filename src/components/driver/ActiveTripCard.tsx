import React from 'react';
import { Booking } from '../../types';
import {
  Phone,
  MessageCircle,
  Play,
  CheckCircle,
  MapPin,
  Clock,
  Shield,
  Navigation,
} from 'lucide-react';

interface ActiveTripCardProps {
  booking: Booking;
  onUpdateStatus: (status: 'ARRIVING' | 'STARTED' | 'COMPLETED') => void;
  onCancel: () => void;
}

export const ActiveTripCard: React.FC<ActiveTripCardProps> = ({
  booking,
  onUpdateStatus,
  onCancel,
}) => {
  const isStarted = booking.status === 'STARTED';
  const isArriving = booking.status === 'ARRIVING';
  const isAccepted = booking.status === 'ACCEPTED';

  const handleCallCustomer = () => {
    window.open(`tel:${booking.customerPhone}`);
  };

  const handleWhatsAppCustomer = () => {
    const text = encodeURIComponent(
      `Vanakkam ${booking.customerName}, I am your driver Ravi from Dad's Auto & Cab. I am arriving at ${booking.pickup.name} shortly.`
    );
    window.open(`https://wa.me/${booking.customerPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-white space-y-4">
      {/* Active Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-extrabold text-sm uppercase tracking-wide text-amber-400">
            {isAccepted && 'Heading to Pickup'}
            {isArriving && 'Arrived at Pickup'}
            {isStarted && 'Trip in Progress'}
          </span>
        </div>

        <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
          {booking.bookingCode}
        </span>
      </div>

      {/* Target Destination or Pickup Display */}
      <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Navigation className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] text-slate-400 uppercase font-semibold">
            {isStarted ? 'Drive To Dropoff' : 'Drive To Passenger'}
          </span>
          <h4 className="font-extrabold text-base text-white truncate">
            {isStarted ? booking.destination.name : booking.pickup.name}
          </h4>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {isStarted ? booking.destination.address : booking.pickup.address}
          </p>
        </div>
      </div>

      {/* Passenger Card & Fast Actions */}
      <div className="flex items-center justify-between bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Customer</span>
          <h5 className="font-bold text-sm text-white">{booking.customerName}</h5>
          <span className="text-xs text-amber-400">{booking.customerPhone}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCallCustomer}
            title="Call Passenger"
            className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center justify-center transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={handleWhatsAppCustomer}
            title="WhatsApp Passenger"
            className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 flex items-center justify-center transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Trip Step Actions */}
      <div className="pt-2">
        {isAccepted && (
          <button
            onClick={() => onUpdateStatus('ARRIVING')}
            className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-glow-yellow flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>Confirm Arrived at Pickup</span>
          </button>
        )}

        {isArriving && (
          <button
            onClick={() => onUpdateStatus('STARTED')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black text-sm shadow-glow-green flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Passenger Trip (OTP Verified)</span>
          </button>
        )}

        {isStarted && (
          <button
            onClick={() => onUpdateStatus('COMPLETED')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black text-sm shadow-glow-green flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Complete Trip &amp; Collect ₹{booking.estimatedFare}</span>
          </button>
        )}
      </div>
    </div>
  );
};
