import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  showBadge?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  showBadge = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    hero: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg sm:text-xl font-bold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
    hero: 'text-4xl sm:text-5xl font-extrabold tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    hero: 'text-base',
  };

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* Brand Icon + Name */}
      <div className="flex items-center gap-3">
        {/* Modern clean auto badge */}
        <div
          className={`${iconSizes[size]} rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center flex-shrink-0 shadow-sm`}
        >
          <img
            src="/icons/icon-auto.svg"
            alt="Dad's Auto & Cab"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className={`${titleSizes[size]} text-white leading-tight`}>
              <span className="font-semibold text-slate-100">Dad's</span>{' '}
              <span className="text-amber-400 font-extrabold">Auto &amp; Cab</span>
            </h1>
          </div>

          {showTagline && (
            <p
              className={`${taglineSizes[size]} text-slate-400 font-medium tracking-normal flex items-center gap-1.5 mt-0.5`}
            >
              <span>Safe Rides</span>
              <span className="text-slate-600">•</span>
              <span>Local Routes</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Always With You</span>
            </p>
          )}
        </div>
      </div>

      {/* Subtle, refined "Serving Tirunelveli" Pill Badge */}
      {showBadge && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">
              Inter-City Fleet
            </span>
            <span className="block text-xs font-bold text-white leading-tight">
              Tirunelveli
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
