import React from 'react';
import { RideVehicleType } from '../../types';
import { calculateEstimatedFare } from '../../services/fareCalculator';
import { Clock, Zap, Users } from 'lucide-react';

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
}) => {
  const autoFare = calculateEstimatedFare('AUTO', distanceKm);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Available Ride • Tamil Nadu
        </h4>
        <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Fast Dispatch
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* AUTO RICKSHAW CARD */}
        <div
          onClick={() => onSelect('AUTO')}
          className="relative p-4 rounded-3xl cursor-pointer border-2 border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-glow-yellow transition-all duration-200 select-none"
        >
          <span className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
            Popular Choice
          </span>

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
      </div>
    </div>
  );
};
