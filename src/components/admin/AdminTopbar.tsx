import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  Search,
  Bell,
  Calendar,
  LogOut,
} from 'lucide-react';

interface AdminTopbarProps {
  onOpenAi: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onOpenAi }) => {
  const { currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-white flex-shrink-0">
      {/* Search Bar */}
      <div className="relative w-72 hidden md:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search booking, driver, route..."
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-500"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Date Filter Tag */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Today: Nov 22, 2026</span>
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <img
            src={
              currentUser?.avatar ||
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80'
            }
            alt="Owner"
            className="w-8 h-8 rounded-xl object-cover border border-amber-500"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-tight">
              {currentUser?.name || 'Sundar Rajan'}
            </p>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              Owner / Admin
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 text-xs font-bold transition-colors cursor-pointer"
            title="Sign out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
