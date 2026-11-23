import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { ArrowLeft, Crosshair, Check, MapPin, X, Loader2 } from 'lucide-react';
import { TNLocation } from '../../types';
import {
  findNearestTirunelveliLocation,
  getBrowserGeolocation,
  searchTNLocations,
} from '../../services/locationService';

interface AdjustLocationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocation: TNLocation;
  onConfirm: (location: TNLocation) => void;
  title?: string;
}

export const AdjustLocationMapModal: React.FC<AdjustLocationMapModalProps> = ({
  isOpen,
  onClose,
  initialLocation,
  onConfirm,
  title = 'Move map to adjust location',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const reverseGeocodeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentAddress, setCurrentAddress] = useState<string>(
    initialLocation.address || initialLocation.name
  );
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: initialLocation.lat,
    lng: initialLocation.lng,
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TNLocation[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Debounced reverse geocode using OSM Nominatim with Tirunelveli fallback
  const reverseGeocode = useCallback((lat: number, lng: number) => {
    if (reverseGeocodeTimeoutRef.current) {
      clearTimeout(reverseGeocodeTimeoutRef.current);
    }

    const nearest = findNearestTirunelveliLocation(lat, lng);

    reverseGeocodeTimeoutRef.current = setTimeout(async () => {
      setIsGeocoding(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
            },
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.display_name) {
            // Extract the most relevant road / area / city components
            const parts = data.display_name.split(',').slice(0, 3).map((s: string) => s.trim());
            setCurrentAddress(parts.join(', '));
            return;
          }
        }
      } catch (err) {
        // Fallback gracefully to curated local database
      } finally {
        setIsGeocoding(false);
      }

      // Default to curated local Tirunelveli landmark
      setCurrentAddress(nearest.address ? `${nearest.name}, ${nearest.address}` : nearest.name);
    }, 250);
  }, []);

  // Initialize or re-center map when opened
  useEffect(() => {
    if (!isOpen) {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      return;
    }

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [initialLocation.lat, initialLocation.lng],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      // High-resolution clean OpenStreetMap tiles
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Listen to map move/pan events to adjust location at center
      map.on('move', () => {
        const center = map.getCenter();
        setCurrentCoords({ lat: center.lat, lng: center.lng });
      });

      map.on('moveend', () => {
        const center = map.getCenter();
        setCurrentCoords({ lat: center.lat, lng: center.lng });
        reverseGeocode(center.lat, center.lng);
      });

      leafletMapRef.current = map;

      // Invalidate map size to ensure tiles render fully in modal
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }, 60);

    return () => {
      clearTimeout(timer);
      if (reverseGeocodeTimeoutRef.current) {
        clearTimeout(reverseGeocodeTimeoutRef.current);
      }
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [isOpen, initialLocation.lat, initialLocation.lng, reverseGeocode]);

  // Handle GPS Locate Me (Target Reticle Button)
  const handleLocateMe = async () => {
    setIsLocating(true);
    try {
      const pos = await getBrowserGeolocation();
      if (leafletMapRef.current) {
        leafletMapRef.current.setView([pos.lat, pos.lng], 17, { animate: true });
        setCurrentCoords({ lat: pos.lat, lng: pos.lng });
        reverseGeocode(pos.lat, pos.lng);
      }
    } catch (e) {
      // Fallback: stay on current Tirunelveli position
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const results = searchTNLocations(val);
    setSearchResults(results.slice(0, 5));
  };

  const handleSelectSearchResult = (loc: TNLocation) => {
    setSearchQuery('');
    setIsSearching(false);
    setCurrentAddress(`${loc.name}, ${loc.address}`);
    setCurrentCoords({ lat: loc.lat, lng: loc.lng });
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([loc.lat, loc.lng], 17, { animate: true });
    }
  };

  const handleConfirmLocation = () => {
    const nearest = findNearestTirunelveliLocation(currentCoords.lat, currentCoords.lng);
    const resolvedLocation: TNLocation = {
      ...nearest,
      id: `custom-loc-${Date.now()}`,
      name: currentAddress.split(',')[0].trim() || nearest.name,
      address: currentAddress,
      lat: currentCoords.lat,
      lng: currentCoords.lng,
      district: 'Tirunelveli',
    };
    onConfirm(resolvedLocation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 overflow-hidden animate-in fade-in duration-200 select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER BAR: Back Arrow + "Move map to adjust location" */}
      {/* ------------------------------------------------------------- */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-3 z-30 shadow-xs">
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. FLOATING ADDRESS CARD: Exactly matching Image 2            */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-16 left-4 right-4 z-30 max-w-xl mx-auto">
        <div className="relative bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center px-4 py-3 gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery || currentAddress}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search landmark, street, building in Tirunelveli..."
              className="w-full text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none bg-transparent truncate"
            />
            {isGeocoding && (
              <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin flex-shrink-0" />
            )}
            {(searchQuery || isSearching) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearching(false);
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Search Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSearchResult(item)}
                  className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors text-left"
                >
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {item.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FULL-SCREEN INTERACTIVE MAP VIEWPORT                        */}
      {/* ------------------------------------------------------------- */}
      <div className="relative flex-1 w-full h-full z-0 overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* ----------------------------------------------------------- */}
        {/* CENTER TARGET PIN NEEDLE & TOOLTIP (Exact Match to Image 2)  */}
        {/* ----------------------------------------------------------- */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="relative flex flex-col items-center">
            {/* Tooltip positioned to the right of the pin, matching user reference screenshot */}
            <div className="absolute left-6 -top-2 bg-slate-900/95 text-white text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-lg shadow-2xl border border-slate-700 whitespace-nowrap pointer-events-none animate-in fade-in duration-300">
              Move map to adjust location
            </div>

            {/* Vertical Pin Needle with Tip centered exactly on Map Center */}
            <div className="flex flex-col items-center -translate-y-[calc(100%-2px)]">
              {/* Green Pin Head with White Dot */}
              <div className="w-5 h-5 rounded-full bg-[#16A34A] border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>

              {/* Vertical Needle Pin extending straight down */}
              <div className="w-[2px] h-7 bg-slate-900"></div>

              {/* Ground Shadow underneath the needle tip */}
              <div className="w-3.5 h-1.5 bg-black/40 rounded-full filter blur-[1px]"></div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* 4. CIRCULAR GPS LOCATE BUTTON (Bottom Right matching img 2) */}
        {/* ----------------------------------------------------------- */}
        <div className="absolute bottom-24 right-5 z-20">
          <button
            type="button"
            onClick={handleLocateMe}
            title="Recenter to Exact GPS Location"
            className="w-13 h-13 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl flex items-center justify-center text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all active:scale-95 cursor-pointer"
          >
            <Crosshair
              className={`w-6 h-6 stroke-[2.2] ${isLocating ? 'animate-spin text-emerald-500' : ''}`}
            />
          </button>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* 5. BOTTOM FLOATING CONFIRM LOCATION BUTTON                  */}
        {/* ----------------------------------------------------------- */}
        <div className="absolute bottom-5 left-4 right-4 z-20 max-w-xl mx-auto">
          <button
            type="button"
            onClick={handleConfirmLocation}
            className="w-full py-4 rounded-2xl bg-[#F5A623] hover:bg-[#e59b20] active:scale-[0.98] text-slate-950 font-black text-sm shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Confirm Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};
