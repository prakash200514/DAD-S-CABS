import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { RoleSwitcherBanner } from '../components/common/RoleSwitcherBanner';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import {
  Navigation,
  IndianRupee,
  Clock,
  WifiOff,
} from 'lucide-react';

export const DriverLayout: React.FC = () => {
  const { isOnline } = useNetworkStatus();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* Top Role Switcher Banner */}
      <RoleSwitcherBanner />

      {/* Offline Alert */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-xs font-bold py-1.5 px-4 flex items-center justify-center gap-2 z-50">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Offline: Driver GPS synchronization requires active mobile network.</span>
        </div>
      )}

      {/* Driver View */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 sm:pb-0">
        <Outlet />
      </main>

      {/* Driver Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-30 flex items-center justify-around px-2 sm:hidden">
        <NavLink
          to="/driver"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-4 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'text-amber-400 scale-105'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Navigation className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Duty / Map</span>
        </NavLink>

        <NavLink
          to="/driver/earnings"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-4 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'text-amber-400 scale-105'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <IndianRupee className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Earnings</span>
        </NavLink>
      </nav>
    </div>
  );
};
