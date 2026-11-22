import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import {
  LayoutDashboard,
  CalendarCheck2,
  Users,
  Car,
  Truck,
  IndianRupee,
  Map,
  BarChart3,
  Bell,
  Settings,
  Sparkles,
  Bot,
} from 'lucide-react';

interface AdminSidebarProps {
  onOpenAiAssistant: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onOpenAiAssistant,
}) => {
  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck2 },
    { to: '/admin/drivers', label: 'Drivers Fleet', icon: Users },
    { to: '/admin/vehicles', label: 'Vehicles', icon: Car },
    { to: '/admin/fare-rules', label: 'Fare Rules', icon: IndianRupee },
    { to: '/admin/analytics', label: 'Analytics & Routes', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-full flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <BrandLogo size="sm" showBadge={true} />
        <p className="text-[10px] text-amber-500/80 font-bold tracking-wider uppercase mt-2">
          Admin Portal • Tamil Nadu
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* AI Assistant Special Nav Button */}
        <div className="pt-4">
          <button
            onClick={onOpenAiAssistant}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-400 hover:text-amber-300 text-xs font-bold transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Ask Dad's AI</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </button>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500">
        <p className="font-semibold text-slate-400">Dad's Auto & Cab Platform</p>
        <p>Version 1.0.0 (Tamil Nadu)</p>
      </div>
    </aside>
  );
};
