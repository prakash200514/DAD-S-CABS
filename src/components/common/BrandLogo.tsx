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
  showBadge = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    hero: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
    hero: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    hero: 'text-base sm:text-lg',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand Icon SVG Badge */}
      <div
        className={`${iconSizes[size]} relative flex-shrink-0 rounded-2xl bg-gradient-to-br from-brand-charcoal to-brand-dark p-1.5 border border-amber-500/40 shadow-glow-yellow flex items-center justify-center overflow-hidden group`}
      >
        <img
          src="/icons/icon-auto.svg"
          alt="Dad's Auto & Cab Logo"
          className="w-full h-full object-contain filter drop-shadow transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`${titleSizes[size]} text-gray-900 dark:text-white flex items-center`}
          >
            Dad's <span className="text-amber-500 ml-1.5 font-black">Auto & Cab</span>
          </span>

          {showBadge && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              TN Only V1
            </span>
          )}
        </div>

        {showTagline && (
          <p
            className={`${taglineSizes[size]} text-gray-500 dark:text-gray-400 font-medium tracking-wide flex items-center gap-1.5 mt-0.5`}
          >
            <span>Safe Rides</span>
            <span className="text-amber-500 font-bold">•</span>
            <span>Local Routes</span>
            <span className="text-amber-500 font-bold">•</span>
            <span className="text-amber-500/90 font-semibold">Always With You</span>
          </p>
        )}
      </div>
    </div>
  );
};
