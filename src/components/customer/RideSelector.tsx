import React from 'react';
import { RideVehicleType } from '../../types';
import { calculateEstimatedFare } from '../../services/fareCalculator';
import { Clock, Zap, Shield, Users, Wind } from 'lucide-react';

interface RideSelectorProps {
  selectedType: RideVehicleType;
  onSelect: (type: RideVehicleType) => void;
  distanceKm: number;
  durationMin: number;
}

export const RideSelector: React.FC<RideSelectorProps> = ({
  selectedType,
  onSelect,
  distanceKm,
  durationMin,
}) => {
  const autoFare = calculateEstimatedFare('AUTO', distanceKm);
  const cabFare = calculateEstimatedFare('CAB', distanceKm);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Available Rides • Tamil Nadu
        </h4>
        <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Fast Dispatch
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* AUTO RICKSHAW CARD */}
        <div
          onClick={() => onSelect('AUTO')}
          className={`relative p-4 rounded-3xl cursor-pointer border-2 transition-all duration-200 select-none ${
            selectedType === 'AUTO'
              ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-glow-yellow'
              : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-brand-surface hover:border-gray-300 dark:hover:border-slate-700'
          }`}
        >
          {selectedType === 'AUTO' && (
            <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
              Popular Choice
            </span>
          )}

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center p-1.5 flex-shrink-0">
                <img
                  src="/icons/icon-auto.svg"
                  alt="Auto Rickshaw"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-1.5">
                  Local Auto
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-amber-500" />
                    3 mins away
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Users className="w-3 h-3" />
                    3 Seats
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <span className="text-lg font-black text-gray-900 dark:text-white">
                ₹{autoFare.totalEstimatedFare}
              </span>
              <p className="text-[10px] text-gray-400">
                ₹{autoFare.fareRangeMin}–₹{autoFare.fareRangeMax}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
            Fast, pocket-friendly &amp; ideal for town streets &amp; local routes.
          </p>
        </div>

        {/* CAB / TAXI CARD */}
        <div
          onClick={() => onSelect('CAB')}
          className={`relative p-4 rounded-3xl cursor-pointer border-2 transition-all duration-200 select-none ${
            selectedType === 'CAB'
              ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-glow-yellow'
              : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-brand-surface hover:border-gray-300 dark:hover:border-slate-700'
          }`}
        >
          {selectedType === 'CAB' && (
            <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
              Comfort Prime
            </span>
          )}

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center p-2 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-1.5">
                  Prime Cab
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-blue-500" />
                    5 mins away
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Wind className="w-3 h-3" />
                    AC Sedan (4)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <span className="text-lg font-black text-gray-900 dark:text-white">
                ₹{cabFare.totalEstimatedFare}
              </span>
              <p className="text-[10px] text-gray-400">
                ₹{cabFare.fareRangeMin}–₹{cabFare.fareRangeMax}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
            Spacious AC sedan, comfortable for long trips &amp; highway routes.
          </p>
        </div>
      </div>
    </div>
  );
};
