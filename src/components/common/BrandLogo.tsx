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
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    hero: 'w-24 h-24',
  };

  const titleSizes = {
    sm: 'text-base font-black',
    md: 'text-xl sm:text-2xl font-black tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight',
    hero: 'text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    hero: 'text-base sm:text-lg',
  };

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* Brand Icon + Name */}
      <div className="flex items-center gap-3">
        {/* Curving Road + Auto Rickshaw Icon */}
        <div
          className={`${iconSizes[size]} relative flex-shrink-0 flex items-center justify-center`}
        >
          <img
            src="/icons/icon-auto.svg"
            alt="Dad's Auto & Cab"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <h1 className={`${titleSizes[size]} text-white leading-tight`}>
              <span className="font-extrabold italic">Dad's</span>{' '}
              <span className="text-[#F5A623] font-black">Auto &amp; Cab</span>
            </h1>
          </div>

          {showTagline && (
            <p
              className={`${taglineSizes[size]} text-gray-300 font-medium tracking-wide flex items-center gap-1.5 mt-0.5`}
            >
              <span>Safe Rides</span>
              <span className="text-[#F5A623] font-bold">•</span>
              <span>Local Routes</span>
              <span className="text-[#F5A623] font-bold">•</span>
              <span className="text-[#F5A623] font-bold">Always With You</span>
            </p>
          )}
        </div>
      </div>

      {/* "Proudly Serving Tamil Nadu" Yellow Badge with TN Map Silhouette */}
      {showBadge && (
        <div className="hidden sm:flex items-center gap-2 bg-[#F5A623] text-slate-950 font-black px-3.5 py-1.5 rounded-2xl shadow-md border border-amber-300">
          <div className="text-right">
            <span className="block text-[9px] uppercase tracking-wider font-extrabold opacity-90 leading-tight">
              Proudly Serving
            </span>
            <span className="block text-xs font-black tracking-tight leading-tight">
              Tamil Nadu
            </span>
          </div>
          <div className="w-5 h-6 text-slate-950 flex-shrink-0">
            <img
              src="/assets/tamil_nadu_map.svg"
              alt="TN"
              className="w-full h-full object-contain filter brightness-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};
