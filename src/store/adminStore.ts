import { create } from 'zustand';
import { Driver, Vehicle, FareRule, AdminAnalyticsData } from '../types';
import { DEFAULT_FARE_RULES } from '../services/fareCalculator';
import { DEMO_DRIVER } from './authStore';

const SEED_DRIVERS: Driver[] = [
  DEMO_DRIVER,
  {
    id: 'drv-02',
    userId: 'usr-drv-02',
    name: 'Murugan S',
    phone: '+91 98421 55678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    vehicleId: 'veh-02',
    vehicle: {
      id: 'veh-02',
      driverId: 'drv-02',
      type: 'CAB',
      model: 'Maruti Suzuki Dzire Tour',
      registrationNumber: 'TN 74 C 8921',
      color: 'Pearl White',
      status: 'ACTIVE',
    },
    licenseNumber: 'TN74 2016 0004128',
    rating: 4.9,
    totalRatingsCount: 940,
    onlineStatus: 'ONLINE',
    totalTrips: 875,
    todayTrips: 8,
    todayEarnings: 3120,
    totalEarnings: 68400,
    currentLocation: {
      lat: 8.7300,
      lng: 77.7110,
      address: 'Tirunelveli Junction Stand',
    },
  },
  {
    id: 'drv-03',
    userId: 'usr-drv-03',
    name: 'Senthil Nathan M',
    phone: '+91 97890 12345',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    vehicleId: 'veh-03',
    vehicle: {
      id: 'veh-03',
      driverId: 'drv-03',
      type: 'AUTO',
      model: 'Piaggio Ape City',
      registrationNumber: 'TN 72 BX 3319',
      color: 'Yellow & Black',
      status: 'ACTIVE',
    },
    licenseNumber: 'TN72 2019 0012903',
    rating: 4.7,
    totalRatingsCount: 680,
    onlineStatus: 'BUSY',
    totalTrips: 540,
    todayTrips: 6,
    todayEarnings: 1180,
    totalEarnings: 31200,
    currentLocation: {
      lat: 8.7050,
      lng: 77.7540,
      address: 'New Bus Stand, KTC Nagar',
    },
  },
  {
    id: 'drv-04',
    userId: 'usr-drv-04',
    name: 'K. Vijayakumar',
    phone: '+91 94441 99887',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80',
    vehicleId: 'veh-04',
    vehicle: {
      id: 'veh-04',
      driverId: 'drv-04',
      type: 'CAB',
      model: 'Hyundai Aura S Prime',
      registrationNumber: 'TN 72 AC 9901',
      color: 'Silver Grey',
      status: 'ACTIVE',
    },
    licenseNumber: 'TN72 2017 0005721',
    rating: 4.95,
    totalRatingsCount: 1102,
    onlineStatus: 'ONLINE',
    totalTrips: 1024,
    todayTrips: 10,
    todayEarnings: 4250,
    totalEarnings: 89400,
    currentLocation: {
      lat: 8.7230,
      lng: 77.7280,
      address: 'Vannarpettai Main Rd',
    },
  },
  {
    id: 'drv-05',
    userId: 'usr-drv-05',
    name: 'Arunachalam P',
    phone: '+91 93600 77123',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80',
    vehicleId: 'veh-05',
    vehicle: {
      id: 'veh-05',
      driverId: 'drv-05',
      type: 'AUTO',
      model: 'Bajaj RE Maxima',
      registrationNumber: 'TN 72 CC 1120',
      color: 'Yellow & Black',
      status: 'INACTIVE',
    },
    licenseNumber: 'TN72 2021 0003411',
    rating: 4.6,
    totalRatingsCount: 310,
    onlineStatus: 'OFFLINE',
    totalTrips: 290,
    todayTrips: 0,
    todayEarnings: 0,
    totalEarnings: 17800,
    currentLocation: {
      lat: 8.7180,
      lng: 77.7420,
      address: 'Palayamkottai Stand',
    },
  },
];

const SEED_VEHICLES: Vehicle[] = [
  SEED_DRIVERS[0].vehicle,
  SEED_DRIVERS[1].vehicle,
  SEED_DRIVERS[2].vehicle,
  SEED_DRIVERS[3].vehicle,
  SEED_DRIVERS[4].vehicle,
  {
    id: 'veh-06',
    type: 'CAB',
    model: 'Toyota Etios Platinum',
    registrationNumber: 'TN 72 D 4410',
    color: 'White',
    status: 'MAINTENANCE',
  },
];

const INITIAL_ANALYTICS: AdminAnalyticsData = {
  totalTrips: 128,
  totalRevenue: 18450,
  activeDriversCount: 8,
  totalCustomersCount: 245,
  averageFare: 144,
  cancellationRate: 3.2,
  autoRatioPercentage: 68,
  cabRatioPercentage: 32,
  popularRoutes: [
    {
      route: 'Palayamkottai → Tirunelveli Junction',
      tripsCount: 42,
      revenue: 5880,
      growth: '+18%',
    },
    {
      route: 'Vannarpettai → New Bus Stand',
      tripsCount: 28,
      revenue: 3920,
      growth: '+12%',
    },
    {
      route: 'Nellaiappar Temple → Palayamkottai',
      tripsCount: 22,
      revenue: 2860,
      growth: '+8%',
    },
    {
      route: 'Tirunelveli Junction → High Ground',
      tripsCount: 19,
      revenue: 2750,
      growth: '+15%',
    },
    {
      route: 'Madurai Junction → Meenakshi Temple',
      tripsCount: 17,
      revenue: 3040,
      growth: '+22%',
    },
  ],
  hourlyTraffic: [
    { hour: '06:00', trips: 4 },
    { hour: '08:00', trips: 14 },
    { hour: '10:00', trips: 18 },
    { hour: '12:00', trips: 12 },
    { hour: '14:00', trips: 8 },
    { hour: '16:00', trips: 15 },
    { hour: '18:00', trips: 26 },
    { hour: '20:00', trips: 21 },
    { hour: '22:00', trips: 10 },
  ],
  weeklyRevenue: [
    { day: 'Mon', revenue: 14200 },
    { day: 'Tue', revenue: 15600 },
    { day: 'Wed', revenue: 16100 },
    { day: 'Thu', revenue: 15900 },
    { day: 'Fri', revenue: 17800 },
    { day: 'Sat', revenue: 21400 },
    { day: 'Sun', revenue: 19800 },
  ],
};

interface AdminState {
  drivers: Driver[];
  vehicles: Vehicle[];
  fareRules: Record<'AUTO' | 'CAB', FareRule>;
  analytics: AdminAnalyticsData;

  // Actions
  toggleDriverOnline: (driverId: string) => void;
  updateDriver: (driverId: string, data: Partial<Driver>) => void;
  addDriver: (driver: Omit<Driver, 'id'>) => void;
  updateFareRule: (type: 'AUTO' | 'CAB', updates: Partial<FareRule>) => void;
  updateVehicleStatus: (
    vehicleId: string,
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'
  ) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  drivers: SEED_DRIVERS,
  vehicles: SEED_VEHICLES,
  fareRules: DEFAULT_FARE_RULES,
  analytics: INITIAL_ANALYTICS,

  toggleDriverOnline: (driverId: string) => {
    set((state) => ({
      drivers: state.drivers.map((drv) => {
        if (drv.id === driverId) {
          const nextStatus = drv.onlineStatus === 'ONLINE' ? 'OFFLINE' : 'ONLINE';
          return { ...drv, onlineStatus: nextStatus };
        }
        return drv;
      }),
    }));
  },

  updateDriver: (driverId: string, data: Partial<Driver>) => {
    set((state) => ({
      drivers: state.drivers.map((drv) =>
        drv.id === driverId ? { ...drv, ...data } : drv
      ),
    }));
  },

  addDriver: (newDriverData) => {
    const id = `drv-${Date.now()}`;
    const newDriver: Driver = {
      ...newDriverData,
      id,
    };
    set((state) => ({
      drivers: [newDriver, ...state.drivers],
    }));
  },

  updateFareRule: (type, updates) => {
    set((state) => ({
      fareRules: {
        ...state.fareRules,
        [type]: {
          ...state.fareRules[type],
          ...updates,
        },
      },
    }));
  },

  updateVehicleStatus: (vehicleId, status) => {
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === vehicleId ? { ...v, status } : v
      ),
    }));
  },
}));
