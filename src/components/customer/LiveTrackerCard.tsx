import React from 'react';
import { Booking } from '../../types';
import {
  Phone,
  MessageCircle,
  Share2,
  AlertTriangle,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Navigation,
} from 'lucide-react';

interface LiveTrackerCardProps {
  booking: Booking;
  onCancel: () => void;
  onCompleteDemoTrip?: () => void;
}

export const LiveTrackerCard: React.FC<LiveTrackerCardProps> = ({
  booking,
  onCancel,
  onCompleteDemoTrip,
}) => {
  const driver = booking.driver;
  const isAuto = booking.vehicleType === 'AUTO';

  // Calculate progress steps
  const steps = [
    { key: 'ACCEPTED', label: 'Assigned' },
    { key: 'ARRIVING', label: 'Arriving' },
    { key: 'STARTED', label: 'On Trip' },
    { key: 'COMPLETED', label: 'Reached' },
  ];

  const currentStepIndex =
    booking.status === 'ACCEPTED'
      ? 0
      : booking.status === 'ARRIVING'
      ? 1
      : booking.status === 'STARTED'
      ? 2
      : 3;

  const handleCall = () => {
    window.open(`tel:${driver?.phone || '+919443187654'}`);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${driver?.name || 'Ravi'}, I booked ride ${booking.bookingCode} on Dad's Auto & Cab. I am waiting at ${booking.pickup.name}.`
    );
    window.open(`https://wa.me/919443187654?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Track my ride on Dad's Auto & Cab",
        text: `I'm travelling with ${driver?.name} (${driver?.vehicle.registrationNumber}) on Dad's Auto & Cab. Booking ${booking.bookingCode}`,
        url: window.location.href,
      });
    } else {
      alert(`Ride link copied: Booking ${booking.bookingCode} - ${driver?.name} (${driver?.vehicle.registrationNumber})`);
    }
  };

  const handleEmergencySOS = () => {
    const confirmed = window.confirm(
      'Emergency Safety Protocol:\nDial Tamil Nadu Police Helpline (112 / 100) or contact Dad\'s Cab 24x7 Safety desk?'
    );
    if (confirmed) {
      window.open('tel:112');
    }
  };

  return (
    <div className="bg-white dark:bg-brand-surface rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-slate-800 space-y-4">
      {/* Top Banner: Status & ETA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
            {booking.status === 'ACCEPTED' && 'Driver Assigned'}
            {booking.status === 'ARRIVING' && 'Driver Arriving (~2 mins)'}
            {booking.status === 'STARTED' && 'On Trip to Destination'}
            {booking.status === 'COMPLETED' && 'Ride Finished'}
          </span>
        </div>
        <span className="text-xs font-black text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          {booking.bookingCode}
        </span>
      </div>

      {/* Progress Step Indicator */}
      <div className="grid grid-cols-4 gap-1.5 py-1">
        {steps.map((st, idx) => {
          const isActive = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div key={st.key} className="flex flex-col items-center">
              <div
                className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-amber-500' : 'bg-gray-200 dark:bg-slate-800'
                } ${isCurrent ? 'animate-pulse' : ''}`}
              />
              <span
                className={`text-[10px] mt-1 font-semibold truncate ${
                  isActive
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-gray-400'
                }`}
              >
                {st.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Driver Information Card */}
      <div className="bg-gray-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                driver?.avatar ||
                'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80'
              }
              alt={driver?.name || 'Driver'}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-0.5 rounded-full border border-white">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-gray-900 dark:text-white text-base">
              {driver?.name || 'Ravi Kumar'}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <span className="flex items-center gap-0.5 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                {driver?.rating || 4.8}
              </span>
              <span>•</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {driver?.vehicle.model || 'Bajaj RE 4S'}
              </span>
            </div>
            <div className="mt-1">
              <span className="inline-block bg-slate-900 dark:bg-slate-800 text-amber-400 font-mono font-bold text-[11px] px-2 py-0.5 rounded border border-amber-500/30">
                {driver?.vehicle.registrationNumber || 'TN 72 AB 4587'}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center p-2">
          <img
            src="/icons/icon-auto.svg"
            alt="Auto"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>
      </div>

      {/* Action Buttons: Call, WhatsApp, Share, SOS */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        <button
          onClick={handleCall}
          className="py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white text-xs font-semibold flex flex-col items-center gap-1 transition-colors"
        >
          <Phone className="w-4 h-4 text-emerald-500" />
          <span>Call</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white text-xs font-semibold flex flex-col items-center gap-1 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleShare}
          className="py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white text-xs font-semibold flex flex-col items-center gap-1 transition-colors"
        >
          <Share2 className="w-4 h-4 text-blue-500" />
          <span>Share</span>
        </button>

        <button
          onClick={handleEmergencySOS}
          className="py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex flex-col items-center gap-1 transition-colors border border-red-500/20"
        >
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span>SOS 112</span>
        </button>
      </div>

      {/* Demo helper to complete trip instantly if testing */}
      {onCompleteDemoTrip && (
        <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="text-xs text-red-500 font-semibold hover:underline"
          >
            Cancel Booking
          </button>

          <button
            onClick={onCompleteDemoTrip}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Simulate Trip Finish</span>
          </button>
        </div>
      )}
    </div>
  );
};
