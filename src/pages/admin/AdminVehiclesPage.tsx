import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Car, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

export const AdminVehiclesPage: React.FC = () => {
  const { vehicles, updateVehicleStatus } = useAdminStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ACTIVE
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            MAINTENANCE
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">
            INACTIVE
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full text-white">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Vehicles Fleet</h1>
        <p className="text-xs text-amber-400 font-semibold">
          Auto Rickshaws and Commercial Cabs registered in Tamil Nadu
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-4 font-bold">Plate Number</th>
                <th className="py-4 px-4 font-bold">Category</th>
                <th className="py-4 px-4 font-bold">Make &amp; Model</th>
                <th className="py-4 px-4 font-bold">Color</th>
                <th className="py-4 px-4 font-bold">Fleet Status</th>
                <th className="py-4 px-4 font-bold text-center">Toggle Maintenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {v.registrationNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-white">
                      {v.type === 'AUTO' ? '🛺 Auto Rickshaw' : '🚗 Prime Cab'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {v.model}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{v.color || 'Yellow / Black'}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(v.status)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() =>
                        updateVehicleStatus(
                          v.id,
                          v.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE'
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700"
                    >
                      {v.status === 'ACTIVE' ? 'Mark Maintenance' : 'Mark Active'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
