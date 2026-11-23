export type UserRole = 'CUSTOMER' | 'DRIVER' | 'ADMIN';

export type RideVehicleType = 'AUTO' | 'CAB';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  language?: 'en' | 'ta';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  driverId?: string;
  type: RideVehicleType;
  model: string;
  registrationNumber: string;
  color?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export interface DriverBioData {
  dob?: string;
  bloodGroup?: string;
  fatherOrSpouseName?: string;
  address?: string;
  district?: string;
  pincode?: string;
  experienceYears?: number;
  aadhaarNumber?: string;
  badgeNumber?: string;
  bioPhotoUrl?: string;
}

export interface DriverLegalDocuments {
  licenseDocName?: string;
  licenseDocUrl?: string;
  licenseExpiry?: string;
  aadhaarDocName?: string;
  aadhaarDocUrl?: string;
  rcBookDocName?: string;
  rcBookDocUrl?: string;
  permitDocName?: string;
  permitDocUrl?: string;
  permitNumber?: string;
  insuranceDocName?: string;
  insuranceDocUrl?: string;
  insuranceExpiry?: string;
  insurancePolicyNumber?: string;
  fitnessExpiry?: string;
  verificationStatus?: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export interface AutoRickshawSpecs {
  make?: string;
  model?: string;
  fuelType?: 'LPG' | 'CNG' | 'PETROL' | 'ELECTRIC';
  year?: number;
  seatingCapacity?: number;
  color?: string;
  photoUrl?: string;
}

export interface Driver {
  id: string;
  userId: string;
  name: string;
  phone: string;
  avatar: string;
  vehicleId: string;
  vehicle: Vehicle;
  licenseNumber: string;
  rating: number;
  totalRatingsCount: number;
  onlineStatus: 'ONLINE' | 'OFFLINE' | 'BUSY';
  totalTrips: number;
  todayTrips: number;
  todayEarnings: number;
  totalEarnings: number;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
    heading?: number;
  };
  bioData?: DriverBioData;
  legalDocs?: DriverLegalDocuments;
  autoSpecs?: AutoRickshawSpecs;
}

export interface TNLocation {
  id: string;
  name: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  category?: 'railway' | 'bus_stand' | 'temple' | 'airport' | 'hospital' | 'commercial' | 'residential' | 'college';
  popular?: boolean;
}

export interface RouteInfo {
  pickup: TNLocation;
  destination: TNLocation;
  distanceKm: number;
  durationMinutes: number;
  polyline: [number, number][]; // lat, lng pairs
}

export interface FareRule {
  vehicleType: RideVehicleType;
  baseFare: number;
  baseDistanceKm: number;
  perKmRate: number;
  waitingChargePerMin: number;
  nightSurchargeMultiplier: number; // e.g. 1.25 for 10 PM - 5 AM
  minFare: number;
  currency: string;
}

export type BookingStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'ARRIVING'
  | 'STARTED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  bookingCode: string; // e.g. #ATC1025
  userId: string;
  customerName: string;
  customerPhone: string;
  driverId?: string;
  driver?: Driver;
  vehicleType: RideVehicleType;
  pickup: TNLocation;
  destination: TNLocation;
  distanceKm: number;
  estimatedDurationMin: number;
  estimatedFare: number;
  finalFare?: number;
  paymentMethod: 'CASH' | 'UPI';
  status: BookingStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  driverLocation?: {
    lat: number;
    lng: number;
    heading?: number;
  };
  rating?: number;
  feedback?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'driver' | 'alert' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AdminAnalyticsData {
  totalTrips: number;
  totalRevenue: number;
  activeDriversCount: number;
  totalCustomersCount: number;
  averageFare: number;
  cancellationRate: number;
  autoRatioPercentage: number;
  cabRatioPercentage: number;
  popularRoutes: {
    route: string;
    tripsCount: number;
    revenue: number;
    growth: string;
  }[];
  hourlyTraffic: {
    hour: string;
    trips: number;
  }[];
  weeklyRevenue: {
    day: string;
    revenue: number;
  }[];
}
