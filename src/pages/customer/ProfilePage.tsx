import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLangStore } from '../../store/langStore';
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Bell,
  Globe,
  HelpCircle,
  ShieldCheck,
  Info,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuthStore();
  const { language, setLanguage, t } = useLangStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-brand-dark p-4 sm:p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-5">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-brand-surface rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="relative">
          <img
            src={
              currentUser?.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80'
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            {currentUser?.name || 'Karthik Raja'}
          </h2>
          <p className="text-xs text-amber-500 font-semibold font-mono">
            {currentUser?.phone || '+91 98401 23456'}
          </p>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 mt-1 border border-amber-500/20">
            Verified Passenger • Tamil Nadu
          </span>
        </div>
      </div>

      {/* Settings & Navigation List */}
      <div className="bg-white dark:bg-brand-surface rounded-3xl border border-gray-200 dark:border-slate-800 divide-y divide-gray-100 dark:divide-slate-800 overflow-hidden shadow-sm">
        {/* Language Selection */}
        <div
          onClick={toggleLanguage}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Language / மொழி
              </p>
              <p className="text-xs text-gray-400">
                Current: {language === 'en' ? 'English' : 'தமிழ் (Tamil)'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
            {language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}
          </span>
        </div>

        {/* Saved Locations */}
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Saved Places
              </p>
              <p className="text-xs text-gray-400">
                Home (Palayamkottai), Work (Tirunelveli Town)
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* Safety Center */}
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Safety &amp; Emergency Helpline
              </p>
              <p className="text-xs text-gray-400">
                24x7 Dad's Care desk &amp; Tamil Nadu 112 SOS
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* Payment Methods */}
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Payment Preferences
              </p>
              <p className="text-xs text-gray-400">UPI (GPay / PhonePe) &amp; Cash</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        {/* About App */}
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-500/10 text-gray-500 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                About Dad's Auto &amp; Cab
              </p>
              <p className="text-xs text-gray-400">
                Version 1.0.0 • “Safe Rides • Local Routes • Always With You”
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Logout CTA */}
      <button
        onClick={logout}
        className="w-full py-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-sm flex items-center justify-center gap-2 border border-red-500/20 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </button>
    </div>
  );
};
