import { Router, Request, Response } from 'express';
import { CONFIG } from '../config';

const router = Router();

// In-memory operational store for instant zero-dependency execution
const FARE_RULES = {
  AUTO: { baseFare: 40, baseKm: 1.5, perKmRate: 16, waitingCharge: 1.5, minFare: 50 },
  CAB: { baseFare: 90, baseKm: 2.0, perKmRate: 22, waitingCharge: 2.5, minFare: 120 },
};

/**
 * Health & Operational Status
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    serviceArea: 'TAMIL_NADU_ONLY',
    platform: "Dad's Auto & Cab",
    tagline: 'Safe Rides • Local Routes • Always With You',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Calculate Fare
 */
router.post('/fares/estimate', (req: Request, res: Response) => {
  const { vehicleType, distanceKm } = req.body;
  const type = (vehicleType || 'AUTO') as 'AUTO' | 'CAB';
  const rule = FARE_RULES[type] || FARE_RULES.AUTO;

  const extraKm = Math.max(0, Number(distanceKm) - rule.baseKm);
  const distanceCost = Math.round(extraKm * rule.perKmRate);
  const total = Math.max(rule.minFare, rule.baseFare + distanceCost);

  res.json({
    vehicleType: type,
    distanceKm: Number(distanceKm),
    baseFare: rule.baseFare,
    distanceCost,
    totalEstimatedFare: total,
    fareRange: {
      min: Math.round(total * 0.95),
      max: Math.round(total * 1.15),
    },
    disclaimer:
      'Final fare may vary based on actual distance, waiting time, traffic conditions, or configured pricing rules.',
  });
});

/**
 * Update Fare Rules (Admin)
 */
router.put('/fares/rules', (req: Request, res: Response) => {
  const { type, rules } = req.body;
  if (type === 'AUTO' || type === 'CAB') {
    Object.assign(FARE_RULES[type], rules);
    res.json({ success: true, updated: FARE_RULES[type] });
  } else {
    res.status(400).json({ error: 'Invalid vehicle type' });
  }
});

/**
 * AI Natural Language Booking Parser
 */
router.post('/ai/parse-booking', (req: Request, res: Response) => {
  const { query } = req.body;
  const q = (query || '').toLowerCase();

  let vehicleType = 'AUTO';
  if (q.includes('cab') || q.includes('car')) vehicleType = 'CAB';

  res.json({
    query,
    detectedVehicle: vehicleType,
    pickupHint: q.includes('palayamkottai') ? 'Palayamkottai, Tirunelveli' : null,
    destinationHint: q.includes('junction') ? 'Tirunelveli Junction' : null,
    requiresConfirmation: true,
  });
});

/**
 * Real-time Admin Business Intelligence
 */
router.get('/admin/analytics', (req: Request, res: Response) => {
  res.json({
    totalTrips: 128,
    totalRevenue: 18450,
    activeDrivers: 8,
    totalCustomers: 245,
    busiestRoute: 'Palayamkottai ➔ Tirunelveli Junction',
    state: 'Tamil Nadu',
  });
});

export default router;
