import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { SplashPage } from './pages/customer/SplashPage';
import { OnboardingPage } from './pages/customer/OnboardingPage';
import { AuthPage } from './pages/customer/AuthPage';

import { CustomerLayout } from './layouts/CustomerLayout';
import { CustomerHomePage } from './pages/customer/CustomerHomePage';
import { BookingHistoryPage } from './pages/customer/BookingHistoryPage';
import { ProfilePage } from './pages/customer/ProfilePage';

import { DriverLayout } from './layouts/DriverLayout';
import { DriverDashboardPage } from './pages/driver/DriverDashboardPage';
import { DriverEarningsPage } from './pages/driver/DriverEarningsPage';
import { DriverLoginPage } from './pages/driver/DriverLoginPage';
import { DriverRegisterPage } from './pages/driver/DriverRegisterPage';

import { AdminLayout } from './layouts/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminDriversPage } from './pages/admin/AdminDriversPage';
import { AdminVehiclesPage } from './pages/admin/AdminVehiclesPage';
import { AdminFareRulesPage } from './pages/admin/AdminFareRulesPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';

export function App() {
  // Register Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
        .catch((err) => console.log('Service Worker failed:', err));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing & Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Customer Portal */}
        <Route path="/app" element={<CustomerLayout />}>
          <Route index element={<CustomerHomePage />} />
          <Route path="history" element={<BookingHistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Driver Partner Portal */}
        <Route path="/driver/login" element={<DriverLoginPage />} />
        <Route path="/driver/register" element={<DriverRegisterPage />} />
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverDashboardPage />} />
          <Route path="earnings" element={<DriverEarningsPage />} />
        </Route>

        {/* Admin / Dad Portal */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="drivers" element={<AdminDriversPage />} />
          <Route path="vehicles" element={<AdminVehiclesPage />} />
          <Route path="fare-rules" element={<AdminFareRulesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
