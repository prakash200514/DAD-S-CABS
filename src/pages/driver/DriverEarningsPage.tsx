import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Wallet,
  Download,
  CheckCircle2,
} from 'lucide-react';

export const DriverEarningsPage: React.FC = () => {
  const { currentDriver } = useAuthStore();
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

  const weeklyData = [
    { day: 'Mon', amount: 1850, trips: 10 },
    { day: 'Tue', amount: 2100, trips: 11 },
    { day: 'Wed', amount: 2450, trips: 13 },
    { day: 'Thu', amount: 1950, trips: 9 },
    { day: 'Fri', amount: 2600, trips: 14 },
    { day: 'Sat', amount: 3100, trips: 16 },
    { day: 'Sun', amount: 2800, trips: 15 },
  ];

  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  return (
    <div className="flex-1 bg-slate-950 text-white p-4 sm:p-6 overflow-y-auto max-w-2xl mx-auto w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Earnings Dashboard
          </h2>
          <p className="text-xs text-amber-400 font-semibold">
            Ravi Kumar • TN 72 AB 4587 (Auto)
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors">
          <Download className="w-3.5 h-3.5" />
          <span>Statement</span>
        </button>
      </div>

      {/* Main Total Balance Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border-2 border-amber-500/40 shadow-glow-yellow space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase font-semibold">
            Current Available Payout
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            Direct Bank UPI Linked
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white tracking-tight">
            ₹{currentDriver?.todayEarnings || 2340}
          </span>
          <span className="text-xs text-emerald-400 font-bold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +18% vs yesterday
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Today's Trips</span>
            <span className="font-bold text-white text-sm">12 Trips</span>
          </div>
          <div>
            <span className="text-slate-500 block">Hours Online</span>
            <span className="font-bold text-white text-sm">6.5 hrs</span>
          </div>
          <div>
            <span className="text-slate-500 block">All-time</span>
            <span className="font-bold text-amber-400 text-sm">₹45,820</span>
          </div>
        </div>
      </div>

      {/* Weekly Earnings Chart */}
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-white">
            Weekly Breakdown (₹16,850 Total)
          </h3>
          <span className="text-xs text-amber-400 font-semibold">
            Tamil Nadu Auto Fleet
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="flex items-end justify-between gap-2 h-44 pt-6 px-2">
          {weeklyData.map((d, idx) => {
            const heightPercent = Math.round((d.amount / maxAmount) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400">
                  ₹{d.amount}
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                    idx === weeklyData.length - 1
                      ? 'bg-amber-500 shadow-glow-yellow'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
                <span className="text-xs font-bold text-slate-400">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Trips Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Completed Today
        </h4>

        <div className="space-y-2">
          {[
            {
              from: 'Palayamkottai Bus Stand',
              to: 'Tirunelveli Junction',
              fare: 140,
              time: '2:15 PM',
              km: '6.8 km',
            },
            {
              from: 'Vannarpettai',
              to: 'New Bus Stand',
              fare: 110,
              time: '1:05 PM',
              km: '4.2 km',
            },
            {
              from: 'Nellaiappar Temple',
              to: 'High Ground',
              fare: 155,
              time: '11:40 AM',
              km: '7.1 km',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-white text-sm">
                  {item.from} ➔ {item.to}
                </p>
                <span className="text-slate-400 text-[11px]">
                  {item.time} • {item.km}
                </span>
              </div>
              <div className="text-right">
                <span className="font-black text-amber-400 text-sm">
                  +₹{item.fare}
                </span>
                <span className="block text-[10px] text-emerald-400 font-semibold">
                  Received UPI
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
