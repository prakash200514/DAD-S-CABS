import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  ShieldCheck,
  Phone,
  Lock,
  ArrowRight,
  CheckCircle2,
  Zap,
  MapPin,
  ChevronRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const DriverLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginDriver } = useAuthStore();

  const [phone, setPhone] = useState('9443187654');
  const [vehicleReg, setVehicleReg] = useState('TN 72 AB 4587');
  const [pin, setPin] = useState('4587');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!pin || pin.length < 4) {
      setError('Please enter your 4-digit security PIN.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      loginDriver(phone);
      setIsLoading(false);
      navigate('/driver');
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setPhone('9443187654');
    setVehicleReg('TN 72 AB 4587');
    setPin('4587');
    setIsLoading(true);
    setTimeout(() => {
      loginDriver('9443187654');
      setIsLoading(false);
      navigate('/driver');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] text-white flex flex-col justify-between selection:bg-[#F5A623] selection:text-slate-950 p-4 sm:p-6">
      {/* Top Header */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A623] p-2 flex items-center justify-center shadow-md">
            <img
              src="/icons/icon-auto.svg"
              alt="Dad's Auto Cab"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-black text-sm text-white tracking-tight leading-tight">
              Dad's Auto &amp; Cab
            </h1>
            <span className="text-[10px] text-amber-400 font-bold block">
              Driver Partner Portal • Tamil Nadu
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/driver/register"
            className="text-xs text-amber-400 hover:text-white transition-colors py-1.5 px-3 rounded-full border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 font-bold flex items-center gap-1"
          >
            <span>Register</span>
            <ArrowRight className="w-3 h-3 stroke-[3]" />
          </Link>
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900"
          >
            Home
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md mx-auto w-full my-auto py-6">
        <div className="bg-[#121721] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Top Switcher Tabs: Sign In / Register */}
          <div className="grid grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold">
            <button
              type="button"
              className="py-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Driver Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/driver/register')}
              className="py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>New Registration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </button>
          </div>

          <div className="space-y-1.5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Driver Portal
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Vanakkam, Driver Partner!
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Sign in to accept passenger booking requests, track earnings, and navigate local routes across Tamil Nadu.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Registered Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder="94431 87654"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A2230] border border-slate-700 text-sm text-white placeholder-slate-500 font-semibold focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none transition-all"
                />
              </div>
            </div>

            {/* Vehicle Registration field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Auto Rickshaw Registration Number
              </label>
              <input
                type="text"
                value={vehicleReg}
                onChange={(e) => {
                  setVehicleReg(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="TN 72 AB 4587"
                className="w-full px-4 py-3 rounded-xl bg-[#1A2230] border border-slate-700 text-sm text-[#F5A623] font-bold font-mono focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none uppercase transition-all"
              />
            </div>

            {/* PIN field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  Driver Security PIN
                </label>
                <span className="text-[10px] text-amber-400 font-mono">
                  Default: 4587
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError('');
                  }}
                  placeholder="••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A2230] border border-slate-700 text-sm text-white placeholder-slate-500 tracking-widest focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none transition-all font-mono"
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
                  <span>Go Online on Duty</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </form>

          {/* New Driver Registration Callout Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>New Auto Rickshaw Driver?</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Register detailed Auto Rickshaw specs, upload Driver Bio Data &amp; Govt Legal Documents (DL/Aadhaar/RC), and verify mobile via SMS OTP.
            </p>
            <button
              type="button"
              onClick={() => navigate('/driver/register')}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Register Auto &amp; Join Dad's Fleet →</span>
            </button>
          </div>

          {/* Quick Pilot Driver Login */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-bold text-amber-400 border border-amber-500/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>⚡ One-Tap Login: Ravi Kumar (TN 72 AB 4587)</span>
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
            <div className="p-2.5 rounded-xl bg-[#171E2B] border border-slate-800/80 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Direct Passenger Cash/UPI</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#171E2B] border border-slate-800/80 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Zero High Commissions</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-slate-500 py-3">
        <p>Dad's Auto &amp; Cab • Driver Partner Network (Tamil Nadu)</p>
        <p className="text-[10px] text-slate-600 mt-0.5">
          For new driver registration assistance, dial safety desk: +91 94431 87654
        </p>
      </footer>
    </div>
  );
};
