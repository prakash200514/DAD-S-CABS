import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { useLangStore } from '../../store/langStore';
import {
  MapPin,
  Clock,
  Navigation,
  CreditCard,
  Banknote,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingConfirmSheetProps {
  onConfirmed: () => void;
}

export const BookingConfirmSheet: React.FC<BookingConfirmSheetProps> = ({
  onConfirmed,
}) => {
  const {
    pickup,
    destination,
    vehicleType,
    distanceKm,
    durationMin,
    estimatedFare,
    fareMin,
    fareMax,
    paymentMethod,
    setPaymentMethod,
    createBooking,
  } = useBookingStore();

  const { t } = useLangStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      createBooking();
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6'],
        });
      } catch (e) {
        // Safe fallback
      }

      onConfirmed();
    }, 600);
  };

  return (
    <div className="bg-white dark:bg-brand-surface rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-100 dark:border-slate-800 space-y-4">
      {/* Route Summary Pill */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[120px]">
            {pickup.name}
          </span>
          <span className="text-gray-400">➔</span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[120px]">
            {destination.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-amber-500">
            {distanceKm} km • {durationMin} min
          </span>
        </div>
      </div>

      {/* Payment Selection: Cash vs UPI */}
      <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod('UPI')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
              paymentMethod === 'UPI'
                ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-sm'
                : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>UPI / GPay / QR</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('CASH')}
            className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
              paymentMethod === 'CASH'
                ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-sm'
                : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:border-gray-300'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>Cash to Driver</span>
          </button>
        </div>
      </div>

      {/* Pricing & Disclaimer */}
      <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 block">Total Estimated Fare</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              ₹{estimatedFare}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              (₹{fareMin} - ₹{fareMax})
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3" />
            Standard Rate Card
          </span>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 leading-tight">
        * Final fare may vary based on actual distance, waiting time, traffic conditions, or configured pricing rules.
      </p>

      {/* Primary CTA */}
      <button
        onClick={handleConfirm}
        disabled={isSubmitting}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] text-slate-950 font-black text-base shadow-glow-yellow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <span>Confirm Auto Ride</span>
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};
