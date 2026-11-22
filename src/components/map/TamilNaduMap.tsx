import React, { useEffect, useRef, useState } from 'react';
import { TNLocation } from '../../types';
import { Navigation, Compass, Layers, ShieldCheck } from 'lucide-react';
import L from 'leaflet';

interface TamilNaduMapProps {
  pickup?: TNLocation;
  destination?: TNLocation;
  polyline?: [number, number][];
  driverCoords?: { lat: number; lng: number };
  vehicleType?: 'AUTO' | 'CAB';
  interactive?: boolean;
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
  showCenterControls?: boolean;
}

export const TamilNaduMap: React.FC<TamilNaduMapProps> = ({
  pickup,
  destination,
  polyline = [],
  driverCoords,
  vehicleType = 'AUTO',
  interactive = true,
  className = 'h-full w-full',
  onMapClick,
  showCenterControls = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker | L.Polyline }>({});
  const [googleMapsKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [mapMode, setMapMode] = useState<'leaflet' | 'google'>(
    googleMapsKey ? 'google' : 'leaflet'
  );

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if Leaflet map is already initialized
    if (!leafletMapRef.current) {
      const defaultCenter: [number, number] = pickup
        ? [pickup.lat, pickup.lng]
        : [8.7245, 77.725]; // Tirunelveli center

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 13,
        zoomControl: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
      });

      // Sleek Dark CartoDB / OSM tiles for premium look
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 19,
          subdomains: 'abcd',
        }
      ).addTo(map);

      if (interactive) {
        L.control.zoom({ position: 'bottomright' }).addTo(map);
      }

      map.on('click', (e) => {
        if (onMapClick) {
          onMapClick(e.latlng.lat, e.latlng.lng);
        }
      });

      leafletMapRef.current = map;
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update Markers and Polyline whenever props change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((layer) => {
      map.removeLayer(layer);
    });
    markersRef.current = {};

    const bounds: [number, number][] = [];

    // 1. Pickup Marker (Green Pin with Pulse)
    if (pickup) {
      bounds.push([pickup.lat, pickup.lng]);
      const pickupIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="relative flex items-center justify-center -top-4 -left-4">
            <span class="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping"></span>
            <div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
            </div>
            <div class="absolute -bottom-6 bg-slate-900/90 text-white font-semibold text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
              ${pickup.name.split(' ')[0]}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const pMarker = L.marker([pickup.lat, pickup.lng], { icon: pickupIcon }).addTo(map);
      markersRef.current['pickup'] = pMarker;
    }

    // 2. Destination Marker (Red Flag Pin)
    if (destination) {
      bounds.push([destination.lat, destination.lng]);
      const destIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="relative flex items-center justify-center -top-4 -left-4">
            <div class="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            </div>
            <div class="absolute -bottom-6 bg-slate-900/90 text-white font-semibold text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
              ${destination.name.split(' ')[0]}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const dMarker = L.marker([destination.lat, destination.lng], { icon: destIcon }).addTo(map);
      markersRef.current['destination'] = dMarker;
    }

    // 3. Driver Real-Time / Simulation Marker (Yellow Auto or Cab Icon)
    if (driverCoords) {
      const isAuto = vehicleType === 'AUTO';
      const driverIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="relative flex items-center justify-center -top-5 -left-5">
            <span class="absolute w-10 h-10 rounded-full bg-amber-400/40 animate-pulse"></span>
            <div class="w-10 h-10 rounded-full bg-amber-500 border-2 border-slate-900 shadow-xl flex items-center justify-center text-slate-950 font-bold transition-all duration-700 ease-out">
              ${
                isAuto
                  ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`
              }
            </div>
            <div class="absolute -bottom-6 bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
              Ravi (TN 72)
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const drvMarker = L.marker([driverCoords.lat, driverCoords.lng], {
        icon: driverIcon,
      }).addTo(map);
      markersRef.current['driver'] = drvMarker;
    }

    // 4. Polyline Route
    if (polyline && polyline.length > 1) {
      const roadLine = L.polyline(polyline, {
        color: '#F59E0B',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: undefined,
      }).addTo(map);

      // Add a subtle darker outline for contrast
      const roadCasing = L.polyline(polyline, {
        color: '#1E293B',
        weight: 9,
        opacity: 0.4,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      roadCasing.bringToBack();

      markersRef.current['polyline'] = roadLine;
      markersRef.current['polyline_casing'] = roadCasing;

      polyline.forEach((p) => bounds.push(p));
    }

    // Auto fit map view to cover pickup, destination, and route
    if (bounds.length > 0) {
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
      });
    }
  }, [pickup, destination, polyline, driverCoords, vehicleType]);

  const handleCenterOnLocation = () => {
    if (!leafletMapRef.current) return;
    if (pickup) {
      leafletMapRef.current.setView([pickup.lat, pickup.lng], 14, { animate: true });
    } else if (driverCoords) {
      leafletMapRef.current.setView([driverCoords.lat, driverCoords.lng], 14, { animate: true });
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Floating Status & Engine Pills */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 dark:bg-brand-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 text-white text-xs shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-amber-400">Tamil Nadu</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300">
            {pickup ? pickup.district : 'Live GPS Active'}
          </span>
        </div>

        {/* API / Engine status badge */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-[11px] text-slate-300 shadow">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>{googleMapsKey ? 'Google Maps Connected' : 'TN Vector Map Engine'}</span>
        </div>
      </div>

      {/* Center Controls */}
      {showCenterControls && (
        <div className="absolute bottom-20 right-3 flex flex-col gap-2 z-20">
          <button
            onClick={handleCenterOnLocation}
            title="Recenter Map"
            className="w-10 h-10 rounded-full bg-slate-900/90 dark:bg-brand-surface/90 backdrop-blur-md border border-slate-700/70 text-amber-400 hover:text-amber-300 flex items-center justify-center shadow-lg transition-transform active:scale-95"
          >
            <Compass className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
