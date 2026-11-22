import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { BookingStatus, Booking } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Receipt,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BookingHistoryPage: React.FC = () => {
  const { bookingsList, setPickup, setDestination, setVehicleType } =
    useBookingStore();
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const filteredBookings = bookingsList.filter((b) => {
    if (filter === 'COMPLETED') return b.status === 'COMPLETED';
    if (filter === 'CANCELLED') return b.status === 'CANCELLED';
    return true;
  });

  const handleRebook = (b: Booking) => {
    setPickup(b.pickup);
    setDestination(b.destination);
    setVehicleType(b.vehicleType);
    navigate('/app');
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-brand-dark p-4 sm:p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
          My Ride History
        </h2>
        <p className="text-xs text-amber-500 font-semibold">
          Dad's Auto &amp; Cab • Tamil Nadu
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-gray-200 dark:bg-slate-900 p-1 border border-gray-200 dark:border-slate-800">
        {(['ALL', 'COMPLETED', 'CANCELLED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === tab
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab === 'ALL' && 'All Rides'}
            {tab === 'COMPLETED' && 'Completed'}
            {tab === 'CANCELLED' && 'Cancelled'}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => {
            const isCompleted = b.status === 'COMPLETED';
            const isCancelled = b.status === 'CANCELLED';

            return (
              <div
                key={b.id}
                className="bg-white dark:bg-brand-surface rounded-2xl p-4 border border-gray-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-amber-500/40 transition-colors"
              >
                {/* Header of card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center p-1">
                      <img
                        src="/icons/icon-auto.svg"
                        alt="Vehicle"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                        {b.vehicleType === 'AUTO' ? 'Local Auto' : 'Prime Cab'}
                      </span>
                      <span className="text-[11px] text-gray-400 block font-mono">
                        {b.bookingCode}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-sm text-gray-900 dark:text-white">
                      ₹{b.finalFare || b.estimatedFare}
                    </span>
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-wider ${
                        isCompleted
                          ? 'text-emerald-500'
                          : isCancelled
                          ? 'text-red-500'
                          : 'text-amber-500'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* Route Summary */}
                <div className="bg-gray-50 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-100 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {b.pickup.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {b.destination.name}
                    </span>
                  </div>
                </div>

                {/* Rating or Cancellation Note */}
                {b.rating && (
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>You rated {b.rating} Stars: "{b.feedback}"</span>
                  </div>
                )}
                {b.cancellationReason && (
                  <p className="text-[11px] text-red-400">
                    Reason: {b.cancellationReason}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-gray-400">
                    {new Date(b.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  <button
                    onClick={() => handleRebook(b)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rebook</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-brand-surface rounded-2xl border border-gray-200 dark:border-slate-800">
            <Car className="w-10 h-10 text-gray-400 mx-auto mb-2 opacity-40" />
            <h4 className="font-bold text-gray-700 dark:text-gray-300 text-sm">
              No bookings found in this tab
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Your completed rides across Tamil Nadu will be catalogued here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
