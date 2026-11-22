import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminTopbar } from '../components/admin/AdminTopbar';
import { AdminAiBusinessSheet } from '../components/admin/AdminAiBusinessSheet';

export const AdminLayout: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const { activeRole, isAuthenticated } = useAuthStore();

  // Guard: if not admin, redirect to admin login
  if (!isAuthenticated || activeRole !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white select-none">
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <AdminSidebar onOpenAiAssistant={() => setIsAiOpen(true)} />

        {/* Content Column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminTopbar onOpenAi={() => setIsAiOpen(true)} />
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Admin AI Business Intelligence Dialog */}
      <AdminAiBusinessSheet
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />
    </div>
  );
};
