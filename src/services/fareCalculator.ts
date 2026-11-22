import { FareRule, RideVehicleType } from '../types';

/**
 * Default Tamil Nadu Standard Fare Rules
 * Auto: Base ₹40 (first 1.5 km), then ₹16/km. (For 6.8 km: 40 + (5.3 * 16) = ₹125 ~ ₹140)
 * Cab: Base ₹90 (first 2 km), then ₹22/km. (For 6.8 km: 90 + (4.8 * 22) = ₹195 ~ ₹220)
 */
export const DEFAULT_FARE_RULES: Record<RideVehicleType, FareRule> = {
  AUTO: {
    vehicleType: 'AUTO',
    baseFare: 40,
    baseDistanceKm: 1.5,
    perKmRate: 16,
    waitingChargePerMin: 1.5,
    nightSurchargeMultiplier: 1.25,
    minFare: 50,
    currency: '₹',
  },
  CAB: {
    vehicleType: 'CAB',
    baseFare: 90,
    baseDistanceKm: 2.0,
    perKmRate: 22,
    waitingChargePerMin: 2.5,
    nightSurchargeMultiplier: 1.25,
    minFare: 120,
    currency: '₹',
  },
};

export interface FareCalculationResult {
  vehicleType: RideVehicleType;
  baseFare: number;
  distanceFare: number;
  totalEstimatedFare: number;
  fareRangeMin: number;
  fareRangeMax: number;
  isNightRateApplied: boolean;
  disclaimer: string;
}

/**
 * Calculates fare dynamically according to active fare rules
 */
export function calculateEstimatedFare(
  vehicleType: RideVehicleType,
  distanceKm: number,
  customRules?: Partial<FareRule>
): FareCalculationResult {
  const defaultRule = DEFAULT_FARE_RULES[vehicleType];
  const rule: FareRule = { ...defaultRule, ...customRules };

  // Calculate distance beyond base km
  const billableExtraKm = Math.max(0, distanceKm - rule.baseDistanceKm);
  const distanceFare = Math.round(billableExtraKm * rule.perKmRate);
  let total = rule.baseFare + distanceFare;

  // Check if current local time is night (10 PM to 5 AM)
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 22 || currentHour < 5;

  if (isNight) {
    total = Math.round(total * rule.nightSurchargeMultiplier);
  }

  // Ensure minimum fare threshold
  total = Math.max(total, rule.minFare);

  // Range allows for slight traffic / route deviations
  const fareRangeMin = Math.round(total * 0.95);
  const fareRangeMax = Math.round(total * 1.15);

  return {
    vehicleType,
    baseFare: rule.baseFare,
    distanceFare,
    totalEstimatedFare: total,
    fareRangeMin,
    fareRangeMax,
    isNightRateApplied: isNight,
    disclaimer:
      'Final fare may vary based on actual distance, waiting time, traffic conditions, or configured pricing rules.',
  };
}
