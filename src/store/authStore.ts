import { create } from 'zustand';
import { User, UserRole, Driver } from '../types';

interface AuthState {
  currentUser: User | null;
  currentDriver: Driver | null;
  activeRole: UserRole;
  isAuthenticated: boolean;
  loginCustomer: (name: string, phone: string) => void;
  loginDriver: (phone: string) => void;
  registerDriver: (driver: Driver) => void;
  loginAdmin: () => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Realistic Demo Users
const DEMO_CUSTOMER: User = {
  id: 'usr-cust-01',
  name: 'Karthik Raja',
  phone: '+91 98401 23456',
  email: 'karthik.tn@gmail.com',
  role: 'CUSTOMER',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
  language: 'en',
  createdAt: '2026-01-15T10:00:00Z',
};

export const DEMO_DRIVER: Driver = {
  id: 'drv-01',
  userId: 'usr-drv-01',
  name: 'Ravi Kumar',
  phone: '+91 94431 87654',
  avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80',
  vehicleId: 'veh-01',
  vehicle: {
    id: 'veh-01',
    driverId: 'drv-01',
    type: 'AUTO',
    model: 'Bajaj Compact RE 4S',
    registrationNumber: 'TN 72 AB 4587',
    color: 'Yellow & Black',
    status: 'ACTIVE',
  },
  licenseNumber: 'TN72 2018 0008452',
  rating: 4.8,
  totalRatingsCount: 1420,
  onlineStatus: 'ONLINE',
  totalTrips: 1248,
  todayTrips: 12,
  todayEarnings: 2340,
  totalEarnings: 45820,
  currentLocation: {
    lat: 8.7210,
    lng: 77.7340,
    address: 'Vannarpettai Bridge Rd, Tirunelveli',
    heading: 45,
  },
};

const DEMO_ADMIN: User = {
  id: 'usr-adm-01',
  name: 'Sundar Rajan (Business Owner)',
  phone: '+91 94422 11000',
  email: 'owner@dadsautocab.com',
  role: 'ADMIN',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
  createdAt: '2025-10-01T08:00:00Z',
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: DEMO_CUSTOMER,
  currentDriver: DEMO_DRIVER,
  activeRole: 'CUSTOMER',
  isAuthenticated: true,

  loginCustomer: (name: string, phone: string) => {
    set({
      currentUser: {
        id: 'usr-' + Date.now(),
        name: name || 'Valued Passenger',
        phone,
        role: 'CUSTOMER',
        createdAt: new Date().toISOString(),
      },
      activeRole: 'CUSTOMER',
      isAuthenticated: true,
    });
  },

  loginDriver: (_phone: string) => {
    set({
      currentUser: {
        id: DEMO_DRIVER.userId,
        name: DEMO_DRIVER.name,
        phone: DEMO_DRIVER.phone,
        role: 'DRIVER',
        createdAt: '2026-01-01T00:00:00Z',
      },
      currentDriver: DEMO_DRIVER,
      activeRole: 'DRIVER',
      isAuthenticated: true,
    });
  },

  registerDriver: (driver: Driver) => {
    set({
      currentUser: {
        id: driver.userId,
        name: driver.name,
        phone: driver.phone,
        role: 'DRIVER',
        avatar: driver.avatar,
        createdAt: new Date().toISOString(),
      },
      currentDriver: driver,
      activeRole: 'DRIVER',
      isAuthenticated: true,
    });
  },

  loginAdmin: () => {
    set({
      currentUser: DEMO_ADMIN,
      activeRole: 'ADMIN',
      isAuthenticated: true,
    });
  },

  switchRole: (role: UserRole) => {
    if (role === 'CUSTOMER') {
      set({ activeRole: 'CUSTOMER', currentUser: DEMO_CUSTOMER });
    } else if (role === 'DRIVER') {
      set({ activeRole: 'DRIVER', currentDriver: DEMO_DRIVER });
    } else if (role === 'ADMIN') {
      set({ activeRole: 'ADMIN', currentUser: DEMO_ADMIN });
    }
  },

  logout: () => {
    set({
      currentUser: null,
      currentDriver: null,
      activeRole: 'CUSTOMER',
      isAuthenticated: false,
    });
  },

  updateUser: (data: Partial<User>) => {
    set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, ...data } : null,
    }));
  },
}));
