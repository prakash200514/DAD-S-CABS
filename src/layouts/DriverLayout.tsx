import React from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import {
  Navigation,
  IndianRupee,
  WifiOff,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const DriverLayout: React.FC = () => {
  const { isOnline } = useNetworkStatus();
  const { activeRole, isAuthenticated, currentDriver, logout } = useAuthStore();
  const navigate = useNavigate();

  // Guard: if not driver, redirect to driver login
  if (!isAuthenticated || activeRole !== 'DRIVER') {
    return <Navigate to="/driver/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/driver/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white select-none">
      {/* Offline Alert */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-xs font-bold py-1.5 px-4 flex items-center justify-center gap-2 z-50">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Offline: Driver GPS synchronization requires active mobile network.</span>
        </div>
      )}

      {/* Dedicated Driver Partner Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 backdrop-blur-md">
        {/* Brand & Driver Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 p-1.5 flex items-center justify-center flex-shrink-0 shadow-md">
            <img
              src="/icons/icon-auto.svg"
              alt="Auto"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-white tracking-tight">
                {currentDriver?.name || 'Ravi Kumar'}
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md font-mono font-bold">
                {currentDriver?.vehicle?.registrationNumber || 'TN 72 AB 4587'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Duty Online
              </span>
              <span>•</span>
              <span>Dad's Auto Partner</span>
            </div>
          </div>
        </div>

        {/* Desktop Quick Nav & Logout */}
        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <NavLink
              to="/driver"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`
              }
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Duty / Map</span>
            </NavLink>

            <NavLink
              to="/driver/earnings"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`
              }
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Earnings</span>
            </NavLink>
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 text-xs font-bold transition-colors cursor-pointer"
            title="Sign out of Driver Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Driver View Content */}
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
