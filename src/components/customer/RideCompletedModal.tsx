import React, { useState } from 'react';
import { Booking } from '../../types';
import {
  CheckCircle2,
  Star,
  Receipt,
  Car,
  MapPin,
  Clock,
  Send,
  ThumbsUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RideCompletedModalProps {
  booking: Booking;
  onDone: (rating: number, feedback: string) => void;
}

export const RideCompletedModal: React.FC<RideCompletedModalProps> = ({
  booking,
  onDone,
}) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('Excellent ride! Safe and very polite.');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // Safe fallback
    }
    onDone(rating, feedback);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-brand-surface rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-6 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Success Header */}
        <div className="text-center space-y-1">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">
            Ride Completed!
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Booking ID: <span className="font-bold text-amber-500">{booking.bookingCode}</span>
          </p>
        </div>

        {/* Fare Receipt Pill */}
        <div className="bg-gray-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-center">
          <span className="text-xs text-gray-400 uppercase font-semibold">Total Fare Paid</span>
          <div className="text-3xl font-black text-gray-900 dark:text-white mt-0.5">
            ₹{booking.finalFare || booking.estimatedFare}
          </div>
          <p className="text-xs text-emerald-500 font-semibold mt-1">
            Paid via {booking.paymentMethod} • Dad's Auto & Cab Standard Bill
          </p>
        </div>

        {/* Ride Details summary */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <span className="text-gray-400 block">Distance Covered</span>
            <span className="font-bold text-gray-900 dark:text-white text-sm">
              {booking.distanceKm} km
            </span>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <span className="text-gray-400 block">Total Duration</span>
            <span className="font-bold text-gray-900 dark:text-white text-sm">
              {booking.estimatedDurationMin} mins
            </span>
          </div>
        </div>

        {/* Driver Snapshot */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/40 rounded-2xl">
          <img
            src={booking.driver?.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80'}
            alt="Driver"
            className="w-10 h-10 rounded-xl object-cover border border-amber-500"
          />
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {booking.driver?.name || 'Ravi Kumar'}
            </p>
            <p className="text-[11px] text-gray-500 font-mono">
              {booking.driver?.vehicle.registrationNumber || 'TN 72 AB 4587'}
            </p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="text-center pt-2">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            Rate your journey with {booking.driver?.name?.split(' ')[0] || 'Ravi'}
          </p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-1 transition-transform active:scale-125 focus:outline-none"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= (hoverRating || rating)
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-gray-300 dark:text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Input */}
        <div>
          <textarea
            rows={2}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share feedback for Dad's Auto & Cab..."
            className="w-full p-3 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Done CTA */}
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-glow-yellow flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};
