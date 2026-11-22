import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { IndianRupee, Save, ShieldCheck, Clock, Zap, Info } from 'lucide-react';

export const AdminFareRulesPage: React.FC = () => {
  const { fareRules, updateFareRule } = useAdminStore();
  const [successMsg, setSuccessMsg] = useState('');

  // Local state for editing
  const [autoBase, setAutoBase] = useState(fareRules.AUTO.baseFare);
  const [autoPerKm, setAutoPerKm] = useState(fareRules.AUTO.perKmRate);
  const [autoWait, setAutoWait] = useState(fareRules.AUTO.waitingChargePerMin);
  const [autoMin, setAutoMin] = useState(fareRules.AUTO.minFare);

  const [cabBase, setCabBase] = useState(fareRules.CAB.baseFare);
  const [cabPerKm, setCabPerKm] = useState(fareRules.CAB.perKmRate);
  const [cabWait, setCabWait] = useState(fareRules.CAB.waitingChargePerMin);
  const [cabMin, setCabMin] = useState(fareRules.CAB.minFare);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFareRule('AUTO', {
      baseFare: Number(autoBase),
      perKmRate: Number(autoPerKm),
      waitingChargePerMin: Number(autoWait),
      minFare: Number(autoMin),
    });

    updateFareRule('CAB', {
      baseFare: Number(cabBase),
      perKmRate: Number(cabPerKm),
      waitingChargePerMin: Number(cabWait),
      minFare: Number(cabMin),
    });

    setSuccessMsg('Tamil Nadu Fare Rules successfully updated and applied in real time!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto w-full text-white">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Fare Calculation Rules</h1>
        <p className="text-xs text-amber-400 font-semibold">
          Configure dynamic pricing rules for Auto and Cab across Tamil Nadu districts
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AUTO RICKSHAW RULES */}
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 p-1 flex items-center justify-center">
                <img
                  src="/icons/icon-auto.svg"
                  alt="Auto"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">
                  Local Auto Pricing
                </h3>
                <span className="text-[11px] text-amber-400 font-medium">
                  Standard Meter / Fixed App Rate
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">
                  Base Fare (First 1.5 km)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={autoBase}
                    onChange={(e) => setAutoBase(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Rate Per Additional Kilometre
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={autoPerKm}
                    onChange={(e) => setAutoPerKm(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Waiting Charge per Minute
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    step="0.5"
                    value={autoWait}
                    onChange={(e) => setAutoWait(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Minimum Fare Threshold
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={autoMin}
                    onChange={(e) => setAutoMin(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500">
              Benchmark: Palayamkottai ➔ Tirunelveli Jn (6.8 km) calculates to ₹135–₹145 with these settings.
            </p>
          </div>

          {/* CAB PRICING RULES */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">
                  Prime Cab Pricing
                </h3>
                <span className="text-[11px] text-blue-400 font-medium">
                  Air-Conditioned Sedan / City &amp; Highway
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">
                  Base Fare (First 2.0 km)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={cabBase}
                    onChange={(e) => setCabBase(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Rate Per Additional Kilometre
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={cabPerKm}
                    onChange={(e) => setCabPerKm(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Waiting Charge per Minute
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    step="0.5"
                    value={cabWait}
                    onChange={(e) => setCabWait(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Minimum Fare Threshold
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={cabMin}
                    onChange={(e) => setCabMin(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500">
              Benchmark: Palayamkottai ➔ Tirunelveli Jn (6.8 km) calculates to ₹195–₹210 with these settings.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-glow-yellow flex items-center gap-2 transition-all active:scale-95"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>Save &amp; Publish Fare Rules</span>
          </button>
        </div>
      </form>
    </div>
  );
};
