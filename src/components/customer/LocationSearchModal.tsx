import React, { useState } from 'react';
import { TNLocation } from '../../types';
import {
  searchTNLocations,
  TAMIL_NADU_LOCATIONS,
} from '../../services/locationService';
import {
  Search,
  MapPin,
  Clock,
  Compass,
  X,
  Building,
  Train,
  Bus,
  Sparkles,
} from 'lucide-react';

interface LocationSearchModalProps {
  isOpen: boolean;
  type: 'pickup' | 'destination';
  currentValue: TNLocation;
  onSelect: (location: TNLocation) => void;
  onClose: () => void;
  onOpenMap?: () => void;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  type,
  currentValue,
  onSelect,
  onClose,
  onOpenMap,
}) => {
  const [query, setQuery] = useState('');
  const searchResults = searchTNLocations(query);

  if (!isOpen) return null;

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'railway':
        return <Train className="w-4 h-4 text-amber-500" />;
      case 'bus_stand':
        return <Bus className="w-4 h-4 text-blue-500" />;
      case 'temple':
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-brand-surface rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 flex flex-col max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              {type === 'pickup' ? 'Select Pickup Point' : 'Choose Destination'}
            </h3>
            <p className="text-xs text-amber-500 font-medium">
              Tirunelveli Inter-City Only
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-amber-500 absolute left-3.5" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Palayamkottai, Junction, Town, New Bus Stand..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-slate-900/80 border border-transparent focus:border-amber-500 text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Current Location Action */}
        <div className="px-4 py-2 bg-amber-500/5 dark:bg-amber-500/10 border-b border-amber-500/10 flex items-center gap-3 cursor-pointer hover:bg-amber-500/15 transition-colors"
             onClick={() => {
               onSelect(TAMIL_NADU_LOCATIONS[0]);
               onClose();
             }}>
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white">
              Use Current Location (GPS)
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Palayamkottai, Tirunelveli
            </p>
          </div>
        </div>

        {/* Set Pin on Map / Move map to adjust location Action */}
        {onOpenMap && (
          <div
            className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            onClick={onOpenMap}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  Move map to adjust location
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Set pin on full screen interactive map
                </p>
              </div>
            </div>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              Open Map ↗
            </span>
          </div>
        )}

        {/* List of Tamil Nadu Locations */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-slate-800/60">
          {searchResults.length > 0 ? (
            searchResults.map((loc) => {
              const isSelected = loc.id === currentValue.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    onSelect(loc);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl cursor-pointer flex items-start gap-3 transition-colors ${
                    isSelected
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getCategoryIcon(loc.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {loc.name}
                      </p>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {loc.district}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {loc.address}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                No Tirunelveli location found matching "{query}"
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Version 1 is exclusively tailored for Tirunelveli Inter-City routes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
