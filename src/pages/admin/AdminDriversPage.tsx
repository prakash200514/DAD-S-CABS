import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Driver } from '../../types';
import {
  Users,
  Plus,
  Star,
  Power,
  Phone,
  Car,
  CheckCircle,
  X,
  Edit2,
  Trash2,
} from 'lucide-react';

export const AdminDriversPage: React.FC = () => {
  const { drivers, toggleDriverOnline, addDriver } = useAdminStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');
  const [newDriverVehicleType, setNewDriverVehicleType] = useState<
    'AUTO' | 'CAB'
  >('AUTO');
  const [newDriverReg, setNewDriverReg] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriverName || !newDriverPhone || !newDriverReg) return;

    addDriver({
      userId: `usr-${Date.now()}`,
      name: newDriverName,
      phone: newDriverPhone,
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
      vehicleId: `veh-${Date.now()}`,
      vehicle: {
        id: `veh-${Date.now()}`,
        type: newDriverVehicleType,
        model: newDriverVehicleType === 'AUTO' ? 'Bajaj RE' : 'Swift Dzire',
        registrationNumber: newDriverReg,
        status: 'ACTIVE',
      },
      licenseNumber: 'TN72 2024 0001928',
      rating: 5.0,
      totalRatingsCount: 1,
      onlineStatus: 'ONLINE',
      totalTrips: 0,
      todayTrips: 0,
      todayEarnings: 0,
      totalEarnings: 0,
      currentLocation: {
        lat: 8.72,
        lng: 77.72,
        address: 'Tirunelveli Central',
      },
    });

    setShowAddModal(false);
    setNewDriverName('');
    setNewDriverPhone('');
    setNewDriverReg('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Driver Fleet</h1>
          <p className="text-xs text-amber-400 font-semibold">
            Manage Auto &amp; Cab operators registered in Tamil Nadu
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-glow-yellow flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Driver</span>
        </button>
      </div>

      {/* Driver Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((drv) => {
          const isOnline = drv.onlineStatus === 'ONLINE';
          const isBusy = drv.onlineStatus === 'BUSY';

          return (
            <div
              key={drv.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 hover:border-amber-500/40 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={drv.avatar}
                      alt={drv.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-amber-500/50"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                        isOnline
                          ? 'bg-emerald-500'
                          : isBusy
                          ? 'bg-amber-500'
                          : 'bg-slate-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">
                      {drv.name}
                    </h4>
                    <span className="text-xs text-amber-400 font-mono">
                      {drv.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{drv.rating}</span>
                </div>
              </div>

              {/* Vehicle & Registration */}
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Assigned Vehicle:</span>
                  <span className="font-bold text-white">
                    {drv.vehicle.type} ({drv.vehicle.model})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Plate Number:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {drv.vehicle.registrationNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">License:</span>
                  <span className="font-mono text-slate-300">
                    {drv.licenseNumber}
                  </span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-800/50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Trips Today</span>
                  <span className="font-bold text-white">{drv.todayTrips}</span>
                </div>
                <div className="p-2 bg-slate-800/50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Today ₹</span>
                  <span className="font-bold text-amber-400">₹{drv.todayEarnings}</span>
                </div>
                <div className="p-2 bg-slate-800/50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Total ₹</span>
                  <span className="font-bold text-emerald-400">₹{drv.totalEarnings}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleDriverOnline(drv.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                    isOnline
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{isOnline ? 'Online (Active)' : 'Offline (Click to Enable)'}</span>
                </button>

                <span className="text-[10px] text-slate-500">
                  {drv.currentLocation?.address?.split(',')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Add Tamil Nadu Driver</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Driver Name</label>
                <input
                  type="text"
                  required
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  placeholder="e.g. S. Kannan"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={newDriverPhone}
                  onChange={(e) => setNewDriverPhone(e.target.value)}
                  placeholder="+91 94431 00000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Vehicle Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewDriverVehicleType('AUTO')}
                    className={`p-2 rounded-xl border text-center font-bold ${
                      newDriverVehicleType === 'AUTO'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Auto Rickshaw
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewDriverVehicleType('CAB')}
                    className={`p-2 rounded-xl border text-center font-bold ${
                      newDriverVehicleType === 'CAB'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Prime Cab
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">TN Registration Number</label>
                <input
                  type="text"
                  required
                  value={newDriverReg}
                  onChange={(e) => setNewDriverReg(e.target.value)}
                  placeholder="e.g. TN 72 BC 4091"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs"
                >
                  Save &amp; Activate Driver
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
