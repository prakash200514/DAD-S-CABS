import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  KeyRound,
  Building2,
  AlertTriangle,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuthStore();

  const [adminPhone, setAdminPhone] = useState('9442211000');
  const [securityPin, setSecurityPin] = useState('2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPhone || adminPhone.length < 10) {
      setError('Please enter a valid business phone number.');
      return;
    }
    if (securityPin !== '2026' && securityPin.length < 4) {
      setError('Invalid Admin Security PIN. (Default master PIN: 2026)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      loginAdmin();
      setIsLoading(false);
      navigate('/admin');
    }, 600);
  };

  const handleQuickDadLogin = () => {
    setAdminPhone('9442211000');
    setSecurityPin('2026');
    setIsLoading(true);
    setTimeout(() => {
      loginAdmin();
      setIsLoading(false);
      navigate('/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col justify-between selection:bg-[#F5A623] selection:text-slate-950 p-4 sm:p-6">
      {/* Top Header */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-2 flex items-center justify-center shadow-lg">
            <Building2 className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="font-black text-sm text-white tracking-tight leading-tight">
              Dad's Auto &amp; Cab
            </h1>
            <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
              Central Fleet HQ • Administration
            </span>
          </div>
        </div>

        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900"
        >
          Customer Home
        </Link>
      </header>

      {/* Main Admin Login Card */}
      <main className="max-w-md mx-auto w-full my-auto py-6">
        <div className="bg-[#0E131C] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Security watermark glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-1.5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-black uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              Restricted Operations Access
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight pt-1">
              Business Owner &amp; Admin
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Master control panel to manage Tamil Nadu fleet drivers, live bookings, pricing rules, and business revenue.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin Phone / ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Business Owner / Manager Phone
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={adminPhone}
                  onChange={(e) => {
                    setAdminPhone(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder="94422 11000"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#161D29] border border-slate-700 text-sm text-white placeholder-slate-500 font-semibold focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none transition-all"
                />
              </div>
            </div>

            {/* Master Security PIN */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 block">
                  Master Security PIN
                </label>
                <span className="text-[11px] text-amber-400 font-medium">Default: 2026</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  maxLength={6}
                  value={securityPin}
                  onChange={(e) => {
                    setSecurityPin(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder="••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#161D29] border border-slate-700 text-sm text-white placeholder-slate-500 font-semibold tracking-widest focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-[#F5A623] hover:bg-[#e59b20] active:scale-[0.98] text-slate-950 font-black text-sm shadow-[0_4px_15px_rgba(245,166,35,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate &amp; Open Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Dad Owner Login Button */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleQuickDadLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-bold text-amber-400 border border-amber-500/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>👑 One-Tap Login: Sundar Rajan (Business Owner)</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-xl bg-[#141A24] border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>256-bit encrypted operations console. Direct Tirunelveli HQ access.</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-slate-500 py-3">
        <p>Dad's Auto &amp; Cab • Commercial Administration (Version 1.0 TN)</p>
        <p className="text-[10px] text-slate-600 mt-0.5">
          Authorized personnel only. All administrative actions are timestamped and logged.
        </p>
      </footer>
    </div>
  );
};
