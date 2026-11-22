import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BrandLogo } from '../../components/common/BrandLogo';
import {
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  Car,
  Shield,
  Sparkles,
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [mobile, setMobile] = useState('9840123456');
  const [name, setName] = useState('Karthik Raja');
  const [otp, setOtp] = useState('1234');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginCustomer, loginDriver, loginAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter the 4-digit verification code');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginCustomer(name, `+91 ${mobile}`);
      navigate('/app');
    }, 600);
  };

  // Quick Demo Fast-Logins
  const handleFastLogin = (role: 'CUSTOMER' | 'DRIVER' | 'ADMIN') => {
    if (role === 'CUSTOMER') {
      loginCustomer('Karthik Raja', '+91 98401 23456');
      navigate('/app');
    } else if (role === 'DRIVER') {
      loginDriver('+91 94431 87654');
      navigate('/driver');
    } else if (role === 'ADMIN') {
      loginAdmin();
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="pt-6">
        <BrandLogo size="md" showBadge={true} />
      </div>

      {/* Main Form Box */}
      <div className="my-auto py-6 space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">
            Tamil Nadu Mobility Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {step === 'phone' ? 'Enter your Mobile' : 'Verify Mobile Number'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {step === 'phone'
              ? 'We will send a one-time OTP to authenticate your ride account.'
              : `Enter the code sent to +91 ${mobile}`}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">
                Mobile Number (India)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-sm font-bold text-amber-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="98401 23456"
                  className="w-full pl-14 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-white text-sm font-semibold tracking-wider outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-base shadow-glow-yellow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">
                4-Digit OTP Code (Demo: 1234)
              </label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                className="w-full text-center tracking-widest text-2xl font-black py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-amber-500 text-amber-400 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-base shadow-glow-yellow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Verify &amp; Continue</span>
                  <ShieldCheck className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-slate-400 hover:text-white"
            >
              Change mobile number
            </button>
          </form>
        )}

        {/* Quick Demo Access Bar */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
            ⚡ Quick Demo Testing Login
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleFastLogin('CUSTOMER')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-200 flex flex-col items-center gap-1"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Passenger</span>
            </button>

            <button
              type="button"
              onClick={() => handleFastLogin('DRIVER')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-200 flex flex-col items-center gap-1"
            >
              <Car className="w-4 h-4 text-emerald-400" />
              <span>Ravi (Driver)</span>
            </button>

            <button
              type="button"
              onClick={() => handleFastLogin('ADMIN')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-200 flex flex-col items-center gap-1"
            >
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Dad (Admin)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-[11px] text-slate-500 text-center pb-4">
        By continuing, you agree to Dad's Auto &amp; Cab safety guidelines and terms of travel within Tamil Nadu.
      </p>
    </div>
  );
};
