import React, { useEffect, useState } from 'react';
import { Download, X, Check, Smartphone, Zap, ShieldCheck } from 'lucide-react';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show simulated promotion banner after 2 seconds if not installed
    const timer = setTimeout(() => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone) {
        setShowPrompt(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        "To Install Dad's Auto & Cab:\n\n• On Chrome/Android: Tap Browser Menu (⋮) ➔ 'Install App' or 'Add to Home Screen'.\n• On Safari/iOS: Tap Share ➔ 'Add to Home Screen'."
      );
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-4 shadow-glow-yellow text-white animate-in slide-in-from-bottom-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 p-2 flex items-center justify-center flex-shrink-0">
            <img
              src="/icons/icon-auto.svg"
              alt="Install Dad's Cab"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">
              Install Dad's Auto &amp; Cab
            </h4>
            <p className="text-[11px] text-amber-400 font-medium">
              Add to Home Screen for a faster, smoother experience.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPrompt(false)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Benefits List */}
      <div className="grid grid-cols-2 gap-1.5 py-3 text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Quick 1-tap access</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Smooth native feel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Offline support</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>No Play Store required</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleInstall}
          className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow flex items-center justify-center gap-1.5 transition-all"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Install App Now</span>
        </button>

        <button
          onClick={() => setShowPrompt(false)}
          className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold"
        >
          Later
        </button>
      </div>
    </div>
  );
};
