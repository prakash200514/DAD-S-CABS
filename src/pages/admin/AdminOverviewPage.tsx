import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useBookingStore } from '../../store/bookingStore';
import { TamilNaduMap } from '../../components/map/TamilNaduMap';
import {
  CalendarCheck2,
  IndianRupee,
  Users,
  Car,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { drivers, analytics } = useAdminStore();
  const { bookingsList } = useBookingStore();

  const activeDrivers = drivers.filter((d) => d.onlineStatus === 'ONLINE');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Tamil Nadu Fleet Operations
          </h1>
          <p className="text-xs text-amber-400 font-semibold">
            Live Business Intelligence • Dad's Auto &amp; Cab
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {activeDrivers.length} Drivers Online Now
          </span>
        </div>
      </div>

      {/* 4 Core KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Trips */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Trips</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">
              {analytics.totalTrips}
            </span>
            <span className="text-xs text-emerald-400 font-bold ml-2 flex-inline items-center">
              +14% this week
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across all TN districts</p>
        </div>

        {/* Total Earnings */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Platform Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-amber-400">
              ₹{analytics.totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-emerald-400 font-bold ml-2">
              Avg ₹{analytics.averageFare}/trip
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Cash &amp; UPI Settlements</p>
        </div>

        {/* Active Drivers */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Drivers</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">
              {analytics.activeDriversCount}
            </span>
            <span className="text-xs text-slate-400 ml-2">
              / {drivers.length} registered
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tirunelveli &amp; South TN</p>
        </div>

        {/* Total Customers */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Registered Users</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">
              {analytics.totalCustomersCount}
            </span>
            <span className="text-xs text-emerald-400 font-bold ml-2">
              +28 this month
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Verified mobile passengers</p>
        </div>
      </div>

      {/* Grid: Live Fleet Map & Popular Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Tamil Nadu Map View */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-white">
                Live Driver Fleet Map
              </h3>
              <p className="text-xs text-slate-400">
                Real-time active vehicle locations in Tamil Nadu
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Auto + Cab GPS Live
            </span>
          </div>

          <div className="h-80 w-full rounded-2xl overflow-hidden border border-slate-800 relative">
            <TamilNaduMap
              driverCoords={drivers[0]?.currentLocation}
              vehicleType="AUTO"
              interactive={true}
            />
          </div>
        </div>

        {/* Top Routes in Tamil Nadu */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-white">
              Busiest Routes
            </h3>
            <span className="text-xs text-amber-400 font-bold">This Week</span>
          </div>

          <div className="space-y-3">
            {analytics.popularRoutes.map((r, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 truncate max-w-[170px]">
                    {r.route}
                  </span>
                  <span className="font-mono font-bold text-amber-400">
                    ₹{r.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>{r.tripsCount} trips completed</span>
                  <span className="text-emerald-400 font-semibold">{r.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Revenue Bar Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-white">
              Weekly Revenue Trend (Tamil Nadu Operations)
            </h3>
            <p className="text-xs text-slate-400">
              Total ₹1,25,100 revenue across Auto &amp; Cab fleets
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Saturday Peak: ₹21,400
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 h-48 pt-8 px-4">
          {analytics.weeklyRevenue.map((item, idx) => {
            const heightPercent = Math.round((item.revenue / 22000) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-mono font-bold text-slate-300">
                  ₹{(item.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[42px] rounded-t-xl transition-all duration-500 ${
                    item.day === 'Sat'
                      ? 'bg-amber-500 shadow-glow-yellow'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
                <span className="text-xs font-bold text-slate-400">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
