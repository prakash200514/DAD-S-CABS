import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { parseCustomerBookingPrompt, CustomerAiParsedIntent } from '../../services/aiAssistantService';
import {
  Sparkles,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Bot,
  Car,
} from 'lucide-react';

interface AiBookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyIntent: () => void;
}

export const AiBookingSheet: React.FC<AiBookingSheetProps> = ({
  isOpen,
  onClose,
  onApplyIntent,
}) => {
  const [prompt, setPrompt] = useState(
    'I need an auto from Palayamkottai to Tirunelveli Junction.'
  );
  const [parsedResult, setParsedResult] = useState<CustomerAiParsedIntent | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const { setPickup, setDestination, setVehicleType } = useBookingStore();

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const result = parseCustomerBookingPrompt(prompt);
      setParsedResult(result);
      setIsProcessing(false);
    }, 400);
  };

  const handleApplyToBooking = () => {
    if (!parsedResult) return;
    if (parsedResult.pickup) setPickup(parsedResult.pickup);
    if (parsedResult.destination) setDestination(parsedResult.destination);
    setVehicleType(parsedResult.vehicleType);
    onApplyIntent();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white dark:bg-brand-surface rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-5 space-y-4 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                Dad's AI Ride Assistant
              </h3>
              <p className="text-[11px] text-amber-500 font-medium">
                Natural Language Booking • Tirunelveli Inter-City
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
            Tell the AI where you want to go in Tirunelveli:
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. I need an auto from Palayamkottai to Tirunelveli Junction..."
              className="w-full p-3 pr-12 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:border-amber-500 transition-colors"
            />
            <button
              onClick={handleAnalyze}
              disabled={isProcessing}
              className="absolute right-2 bottom-3 w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow hover:bg-amber-400 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick sample chips */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setPrompt('I need an auto from Palayamkottai to Tirunelveli Junction.');
            }}
            className="text-[10px] bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-amber-500"
          >
            Palayamkottai ➔ Tirunelveli Jn
          </button>
          <button
            type="button"
            onClick={() => {
              setPrompt('Book an auto from Central Station to Koyambedu CMBT in Chennai.');
            }}
            className="text-[10px] bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-amber-500"
          >
            Chennai Central ➔ Koyambedu Auto
          </button>
        </div>

        {/* Parsed Result Box */}
        {parsedResult && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
              <Sparkles className="w-4 h-4" />
              <span>Parsed Intent Breakdown</span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-800 dark:text-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Pickup:</span>
                <span className="font-bold">
                  {parsedResult.pickup?.name || 'Not detected'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Destination:</span>
                <span className="font-bold">
                  {parsedResult.destination?.name || 'Not detected'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Vehicle:</span>
                <span className="font-bold uppercase text-amber-500">
                  {parsedResult.vehicleType}
                </span>
              </div>
              {parsedResult.estimatedFare && (
                <div className="flex items-center justify-between pt-1 border-t border-amber-500/20">
                  <span className="text-gray-400">Estimated Fare:</span>
                  <span className="font-black text-sm text-gray-900 dark:text-white">
                    ₹{parsedResult.estimatedFare} (~{parsedResult.distanceKm} km)
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-gray-500 italic">
              Notice: The AI prepares your ride parameters. Per company policy, rides are never booked without your manual confirmation.
            </p>

            {parsedResult.pickup && parsedResult.destination && (
              <button
                onClick={handleApplyToBooking}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-amber-400 transition-all"
              >
                <span>Load Route &amp; Review Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
