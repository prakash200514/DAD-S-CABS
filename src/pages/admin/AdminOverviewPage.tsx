import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import {
  CalendarCheck2,
  IndianRupee,
  Users,
  Car,
  Calendar,
  ChevronDown,
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { drivers, analytics } = useAdminStore();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full bg-[#F4F6F9] min-h-screen text-slate-800">
      {/* Top Header: Dashboard + Date */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Dashboard
        </h1>

        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
          <span>Nov 22, 2026</span>
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* 4 Clean White Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Trips */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block">
              {analytics.totalTrips}
            </span>
            <span className="text-xs text-slate-500 font-medium">Total Trips</span>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block">
              ₹{analytics.totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500 font-medium">Earnings</span>
          </div>
        </div>

        {/* Active Drivers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block">
              {analytics.activeDriversCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">Active Drivers</span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block">
              {analytics.totalCustomersCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">Customers</span>
          </div>
        </div>
      </div>

      {/* Earnings Overview Smooth Curved Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">
            Earnings Overview
          </h3>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-xs font-medium text-slate-600 cursor-pointer">
            <span>This Month</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Smooth SVG Curve Chart */}
        <div className="relative pt-6 pb-2">
          {/* Floating Pill Tag with ₹18,450 */}
          <div className="absolute top-1 right-28 bg-[#F5A623] text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow">
            ₹18,450
          </div>

          <svg viewBox="0 0 800 200" className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="blueArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="#E2E8F0" stroke-dasharray="4 4" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#E2E8F0" stroke-dasharray="4 4" />
            <line x1="0" y1="160" x2="800" y2="160" stroke="#E2E8F0" stroke-dasharray="4 4" />

            {/* Smooth Spline Path */}
            <path
              d="M 20 160 Q 90 120, 150 140 T 280 80 T 420 130 T 560 90 T 680 50 T 780 110"
              fill="none"
              stroke="#3B82F6"
              stroke-width="3.5"
            />
            {/* Area Fill */}
            <path
              d="M 20 160 Q 90 120, 150 140 T 280 80 T 420 130 T 560 90 T 680 50 T 780 110 L 780 190 L 20 190 Z"
              fill="url(#blueArea)"
            />

            {/* Marker point for active earnings */}
            <circle cx="680" cy="50" r="5" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2.5" />
          </svg>

          {/* Time axis labels */}
          <div className="flex justify-between text-[11px] text-slate-400 pt-2 px-2">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>

      {/* Popular Routes Progress Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="font-extrabold text-base text-slate-900">
          Popular Routes
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
              Palayamkottai ➔ Tirunelveli
            </span>
            <span className="font-mono">32%</span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#3B82F6] h-full rounded-full w-[32%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
