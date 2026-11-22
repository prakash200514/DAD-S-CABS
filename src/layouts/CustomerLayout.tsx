import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { PwaInstallPrompt } from '../components/common/PwaInstallPrompt';
import {
  Home,
  CalendarCheck2,
  Wallet,
  User,
  WifiOff,
} from 'lucide-react';

export const CustomerLayout: React.FC = () => {
  const { isOnline } = useNetworkStatus();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-brand-dark text-gray-900 dark:text-gray-100">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-xs font-bold py-1.5 px-4 flex items-center justify-center gap-2 z-50">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>You're offline. Viewing cached interface. Live booking requires connection.</span>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 sm:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-brand-surface/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 z-30 flex items-center justify-around px-2 sm:hidden">
        <NavLink
          to="/app"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'text-amber-500 scale-105'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </NavLink>

        <NavLink
          to="/app/history"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'text-[#F5A623] scale-105'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`
          }
        >
          <CalendarCheck2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Bookings</span>
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'text-[#F5A623] scale-105'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`
          }
        >
          <Wallet className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Wallet</span>
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'text-[#F5A623] scale-105'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`
          }
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </NavLink>
      </nav>

      {/* PWA Install Prompt */}
      <PwaInstallPrompt />
    </div>
  );
};
