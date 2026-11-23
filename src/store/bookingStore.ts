import { create } from 'zustand';
import { Booking, BookingStatus, RideVehicleType, TNLocation } from '../types';
import {
  TAMIL_NADU_LOCATIONS,
  calculateRoute,
  getBrowserGeolocation,
  findNearestTirunelveliLocation,
  fetchRoadRoute,
} from '../services/locationService';
import { calculateEstimatedFare } from '../services/fareCalculator';
import { DEMO_DRIVER } from './authStore';

// Initial default route: Palayamkottai to Tirunelveli Junction (Requested Benchmark)
const DEFAULT_PICKUP = TAMIL_NADU_LOCATIONS[0]; // Palayamkottai Bus Stand
const DEFAULT_DESTINATION = TAMIL_NADU_LOCATIONS[1]; // Tirunelveli Junction

const INITIAL_ROUTE = calculateRoute(DEFAULT_PICKUP, DEFAULT_DESTINATION);
const INITIAL_FARE = calculateEstimatedFare('AUTO', INITIAL_ROUTE.distanceKm);

// Pre-seeded realistic booking history in Tamil Nadu
const SEED_BOOKINGS: Booking[] = [
  {
    id: 'bkg-1024',
    bookingCode: '#ATC1024',
    userId: 'usr-cust-01',
    customerName: 'Karthik Raja',
    customerPhone: '+91 98401 23456',
    driverId: 'drv-01',
    driver: DEMO_DRIVER,
    vehicleType: 'AUTO',
    pickup: TAMIL_NADU_LOCATIONS[0], // Palayamkottai
    destination: TAMIL_NADU_LOCATIONS[1], // Tirunelveli Junction
    distanceKm: 6.8,
    estimatedDurationMin: 15,
    estimatedFare: 135,
    finalFare: 140,
    paymentMethod: 'UPI',
    status: 'COMPLETED',
    createdAt: '2026-11-20T14:30:00Z',
    startedAt: '2026-11-20T14:35:00Z',
    completedAt: '2026-11-20T14:50:00Z',
    rating: 5,
    feedback: 'Very prompt pickup and smooth ride. Driver was polite!',
  },
  {
    id: 'bkg-1023',
    bookingCode: '#ATC1023',
    userId: 'usr-cust-01',
    customerName: 'Karthik Raja',
    customerPhone: '+91 98401 23456',
    driverId: 'drv-02',
    vehicleType: 'CAB',
    pickup: TAMIL_NADU_LOCATIONS[2], // Vannarpettai
    destination: TAMIL_NADU_LOCATIONS[4], // New Bus stand
    distanceKm: 4.2,
    estimatedDurationMin: 10,
    estimatedFare: 145,
    finalFare: 150,
    paymentMethod: 'CASH',
    status: 'COMPLETED',
    createdAt: '2026-11-18T18:10:00Z',
    completedAt: '2026-11-18T18:25:00Z',
    rating: 4,
    feedback: 'Good AC cab, on time.',
  },
  {
    id: 'bkg-1022',
    bookingCode: '#ATC1022',
    userId: 'usr-cust-01',
    customerName: 'Karthik Raja',
    customerPhone: '+91 98401 23456',
    vehicleType: 'AUTO',
    pickup: TAMIL_NADU_LOCATIONS[3], // Nellaiappar Temple
    destination: TAMIL_NADU_LOCATIONS[0], // Palayamkottai
    distanceKm: 5.5,
    estimatedDurationMin: 14,
    estimatedFare: 110,
    paymentMethod: 'CASH',
    status: 'CANCELLED',
    createdAt: '2026-11-15T11:00:00Z',
    cancelledAt: '2026-11-15T11:05:00Z',
    cancellationReason: 'Driver had flat tire nearby',
  },
];

interface BookingState {
  // Current selection before booking
  pickup: TNLocation;
  destination: TNLocation;
  vehicleType: RideVehicleType;
  paymentMethod: 'CASH' | 'UPI';
  distanceKm: number;
  durationMin: number;
  routePolyline: [number, number][];
  estimatedFare: number;
  fareMin: number;
  fareMax: number;

  // Active Live Ride
  activeBooking: Booking | null;
  driverSimulationStep: number;
  driverCoords: { lat: number; lng: number };
  isSimulating: boolean;

  // History & All Bookings
  bookingsList: Booking[];

  // Actions
  setPickup: (location: TNLocation) => void;
  setDestination: (location: TNLocation) => void;
  useCurrentGpsLocation: () => Promise<boolean>;
  setVehicleType: (type: RideVehicleType) => void;
  setPaymentMethod: (method: 'CASH' | 'UPI') => void;
  swapLocations: () => void;
  recalculate: () => void;

  createBooking: () => Booking;
  cancelActiveBooking: (reason?: string) => void;
  updateBookingStatus: (status: BookingStatus) => void;
  completeActiveBooking: (rating?: number, feedback?: string) => void;
  rateBooking: (bookingId: string, rating: number, feedback: string) => void;
  startDriverMovementSimulation: () => void;
  stopDriverMovementSimulation: () => void;
}

let simulationTimer: ReturnType<typeof setInterval> | null = null;

export const useBookingStore = create<BookingState>((set, get) => ({
  pickup: DEFAULT_PICKUP,
  destination: DEFAULT_DESTINATION,
  vehicleType: 'AUTO',
  paymentMethod: 'UPI',
  distanceKm: INITIAL_ROUTE.distanceKm,
  durationMin: INITIAL_ROUTE.durationMinutes,
  routePolyline: INITIAL_ROUTE.polyline,
  estimatedFare: INITIAL_FARE.totalEstimatedFare,
  fareMin: INITIAL_FARE.fareRangeMin,
  fareMax: INITIAL_FARE.fareRangeMax,

  activeBooking: null,
  driverSimulationStep: 0,
  driverCoords: {
    lat: DEMO_DRIVER.currentLocation.lat,
    lng: DEMO_DRIVER.currentLocation.lng,
  },
  isSimulating: false,

  bookingsList: SEED_BOOKINGS,

  setPickup: (location: TNLocation) => {
    set({ pickup: location });
    get().recalculate();
  },

  setDestination: (location: TNLocation) => {
    set({ destination: location });
    get().recalculate();
  },

  useCurrentGpsLocation: async () => {
    try {
      const coords = await getBrowserGeolocation();
      const nearest = findNearestTirunelveliLocation(coords.lat, coords.lng);
      const cleanName = nearest.name.split('(')[0].trim();
      const gpsLocation: TNLocation = {
        ...nearest,
        id: `gps-${Date.now()}`,
        name: `Current Location (${cleanName})`,
        lat: coords.lat,
        lng: coords.lng,
      };
      set({ pickup: gpsLocation });
      get().recalculate();
      return true;
    } catch (err) {
      console.warn('Geolocation could not be obtained:', err);
      return false;
    }
  },

  setVehicleType: (vehicleType: RideVehicleType) => {
    set({ vehicleType });
    get().recalculate();
  },

  setPaymentMethod: (paymentMethod: 'CASH' | 'UPI') => {
    set({ paymentMethod });
  },

  swapLocations: () => {
    const { pickup, destination } = get();
    set({ pickup: destination, destination: pickup });
    get().recalculate();
  },

  recalculate: () => {
    const { pickup, destination, vehicleType } = get();
    const route = calculateRoute(pickup, destination);
    const fare = calculateEstimatedFare(vehicleType, route.distanceKm);

    set({
      distanceKm: route.distanceKm,
      durationMin: route.durationMinutes,
      routePolyline: route.polyline,
      estimatedFare: fare.totalEstimatedFare,
      fareMin: fare.fareRangeMin,
      fareMax: fare.fareRangeMax,
    });

    // Asynchronously refine with real driving road geometry if available
    fetchRoadRoute([pickup.lat, pickup.lng], [destination.lat, destination.lng]).then((roadResult) => {
      if (roadResult && roadResult.polyline.length > 2) {
        const updatedFare = calculateEstimatedFare(vehicleType, roadResult.distanceKm);
        set({
          distanceKm: roadResult.distanceKm,
          durationMin: roadResult.durationMinutes,
          routePolyline: roadResult.polyline,
          estimatedFare: updatedFare.totalEstimatedFare,
          fareMin: updatedFare.fareRangeMin,
          fareMax: updatedFare.fareRangeMax,
        });
      }
    });
  },

  createBooking: () => {
    const {
      pickup,
      destination,
      vehicleType,
      distanceKm,
      durationMin,
      estimatedFare,
      paymentMethod,
      bookingsList,
    } = get();

    const bookingCodeNumber = 1025 + bookingsList.length;
    const newBooking: Booking = {
      id: `bkg-${bookingCodeNumber}`,
      bookingCode: `#ATC${bookingCodeNumber}`,
      userId: 'usr-cust-01',
      customerName: 'Karthik Raja',
      customerPhone: '+91 98401 23456',
      driverId: DEMO_DRIVER.id,
      driver: DEMO_DRIVER,
      vehicleType,
      pickup,
      destination,
      distanceKm,
      estimatedDurationMin: durationMin,
      estimatedFare,
      paymentMethod,
      status: 'ACCEPTED', // Prompt: Immediately assigns Ravi Kumar with #ATC1025
      createdAt: new Date().toISOString(),
      driverLocation: {
        lat: DEMO_DRIVER.currentLocation.lat,
        lng: DEMO_DRIVER.currentLocation.lng,
      },
    };

    set({
      activeBooking: newBooking,
      bookingsList: [newBooking, ...bookingsList],
      driverCoords: {
        lat: DEMO_DRIVER.currentLocation.lat,
        lng: DEMO_DRIVER.currentLocation.lng,
      },
    });

    // Start animated driver movement towards pickup
    get().startDriverMovementSimulation();

    return newBooking;
  },

  cancelActiveBooking: (reason = 'Customer cancelled') => {
    get().stopDriverMovementSimulation();
    const active = get().activeBooking;
    if (!active) return;

    const updatedBooking: Booking = {
      ...active,
      status: 'CANCELLED',
      cancelledAt: new Date().toISOString(),
      cancellationReason: reason,
    };

    set((state) => ({
      activeBooking: null,
      bookingsList: state.bookingsList.map((b) =>
        b.id === active.id ? updatedBooking : b
      ),
    }));
  },

  updateBookingStatus: (status: BookingStatus) => {
    const active = get().activeBooking;
    if (!active) return;

    const updatedBooking: Booking = {
      ...active,
      status,
      startedAt: status === 'STARTED' ? new Date().toISOString() : active.startedAt,
      completedAt:
        status === 'COMPLETED' ? new Date().toISOString() : active.completedAt,
    };

    set((state) => ({
      activeBooking: updatedBooking,
      bookingsList: state.bookingsList.map((b) =>
        b.id === active.id ? updatedBooking : b
      ),
    }));
  },

  completeActiveBooking: (rating = 5, feedback = 'Smooth ride') => {
    get().stopDriverMovementSimulation();
    const active = get().activeBooking;
    if (!active) return;

    const completedBooking: Booking = {
      ...active,
      status: 'COMPLETED',
      finalFare: active.estimatedFare,
      completedAt: new Date().toISOString(),
      rating,
      feedback,
    };

    set((state) => ({
      activeBooking: null,
      bookingsList: state.bookingsList.map((b) =>
        b.id === active.id ? completedBooking : b
      ),
    }));
  },

  rateBooking: (bookingId: string, rating: number, feedback: string) => {
    set((state) => ({
      bookingsList: state.bookingsList.map((b) =>
        b.id === bookingId ? { ...b, rating, feedback } : b
      ),
    }));
  },

  startDriverMovementSimulation: () => {
    get().stopDriverMovementSimulation();
    set({ isSimulating: true, driverSimulationStep: 0 });

    const polyline = get().routePolyline;
    if (!polyline || polyline.length === 0) return;

    let step = 0;
    simulationTimer = setInterval(() => {
      const active = get().activeBooking;
      if (!active || active.status === 'COMPLETED' || active.status === 'CANCELLED') {
        get().stopDriverMovementSimulation();
        return;
      }

      step += 1;
      const index = step % polyline.length;
      const targetPoint = polyline[index];

      // Smooth step towards target
      set({
        driverSimulationStep: step,
        driverCoords: { lat: targetPoint[0], lng: targetPoint[1] },
      });

      // Advance ride status automatically if requested
      if (step === 3 && active.status === 'ACCEPTED') {
        get().updateBookingStatus('ARRIVING');
      } else if (step === 6 && active.status === 'ARRIVING') {
        get().updateBookingStatus('STARTED');
      }
    }, 3500);
  },

  stopDriverMovementSimulation: () => {
    if (simulationTimer) {
      clearInterval(simulationTimer);
      simulationTimer = null;
    }
    set({ isSimulating: false });
  },
}));
