import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLangStore } from '../../store/langStore';
import { UserRole } from '../../types';
import { User, Car, Shield, Globe, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcherBanner: React.FC = () => {
  const { activeRole, switchRole } = useAuthStore();
  const { language, setLanguage } = useLangStore();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    if (role === 'CUSTOMER') {
      navigate('/app');
    } else if (role === 'DRIVER') {
      navigate('/driver');
    } else if (role === 'ADMIN') {
      navigate('/admin');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs px-3 py-1.5 flex items-center justify-between z-50 sticky top-0 backdrop-blur-md">
      {/* Left: TN Notice & Active Role */}
      <div className="flex items-center gap-2">
        <span className="hidden md:inline-flex items-center gap-1 font-semibold text-amber-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Proudly Serving Tamil Nadu
        </span>
        <span className="hidden md:inline text-slate-600">|</span>
        <span className="text-slate-400">Mode:</span>
        <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
          <button
            onClick={() => handleRoleChange('CUSTOMER')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
              activeRole === 'CUSTOMER'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Passenger</span>
          </button>

          <button
            onClick={() => handleRoleChange('DRIVER')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
              activeRole === 'DRIVER'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Car className="w-3 h-3" />
            <span>Driver (Ravi)</span>
          </button>

          <button
            onClick={() => handleRoleChange('ADMIN')}
            className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
              activeRole === 'ADMIN'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Dad (Admin)</span>
          </button>
        </div>
      </div>

      {/* Right: Language Toggle & Quick Links */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
          title="Switch Language"
        >
          <Globe className="w-3 h-3 text-amber-400" />
          <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          Landing Page
        </button>
      </div>
    </div>
  );
};
