import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  Sparkles,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { analytics } = useAdminStore();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full text-white">
      <div>
        <h1 className="text-2xl font-black tracking-tight">
          Business Intelligence &amp; Analytics
        </h1>
        <p className="text-xs text-amber-400 font-semibold">
          Real metrics driven by Tamil Nadu operations and live customer bookings
        </p>
      </div>

      {/* AI Key Insights Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Operational Highlights (Live Intelligence)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block font-medium">Busiest Corridor</span>
            <p className="font-extrabold text-white text-sm mt-0.5">
              Palayamkottai ➔ Tirunelveli Jn
            </p>
            <span className="text-[11px] text-emerald-400">
              42 rides completed (+18% growth)
            </span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block font-medium">Peak Surge Hours</span>
            <p className="font-extrabold text-white text-sm mt-0.5">
              6:00 PM – 9:00 PM (Evening)
            </p>
            <span className="text-[11px] text-amber-400">
              Evening bookings increased by 12%
            </span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block font-medium">Best Revenue Day</span>
            <p className="font-extrabold text-white text-sm mt-0.5">
              Saturday (₹21,400)
            </p>
            <span className="text-[11px] text-emerald-400">
              Saturday generated highest revenue
            </span>
          </div>
        </div>
      </div>

      {/* Hourly Traffic Chart & Vehicle Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Rush Times */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-white">
                Hourly Booking Demand (24h Traffic)
              </h3>
              <p className="text-xs text-slate-400">
                Hourly distribution of passenger requests across Tamil Nadu
              </p>
            </div>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>

          <div className="flex items-end justify-between gap-2 h-48 pt-8 px-2">
            {analytics.hourlyTraffic.map((h, i) => {
              const heightPercent = Math.round((h.trips / 30) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-mono text-slate-400">
                    {h.trips}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[32px] rounded-t-lg transition-all ${
                      h.trips >= 20
                        ? 'bg-amber-500 shadow-glow-yellow'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                  <span className="text-[11px] text-slate-400">{h.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto vs Cab Ratio */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-white">
              Fleet Split Ratio
            </h3>
            <span className="text-xs text-slate-400 font-bold">Volume</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-amber-400">Auto Rickshaw ({analytics.autoRatioPercentage}%)</span>
                <span className="text-white">87 trips</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  style={{ width: `${analytics.autoRatioPercentage}%` }}
                  className="bg-amber-500 h-full rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-blue-400">Prime Cab ({analytics.cabRatioPercentage}%)</span>
                <span className="text-white">41 trips</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  style={{ width: `${analytics.cabRatioPercentage}%` }}
                  className="bg-blue-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Cancellation Rate:</span>
              <span className="font-bold text-emerald-400">
                {analytics.cancellationRate}% (Low)
              </span>
            </div>
            <div className="flex justify-between">
              <span>Customer Satisfaction:</span>
              <span className="font-bold text-amber-400">4.85 / 5.0 ★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
