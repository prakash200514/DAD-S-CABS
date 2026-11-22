import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { Booking, BookingStatus } from '../../types';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Car,
  Calendar,
  X,
  Phone,
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookingsList } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filtered = bookingsList.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.pickup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.destination.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ? true : b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            COMPLETED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            CANCELLED
          </span>
        );
      case 'STARTED':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            ON TRIP
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full text-white">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Bookings Management
          </h1>
          <p className="text-xs text-amber-400 font-semibold">
            Track and oversee customer rides across Tamil Nadu
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search code, passenger, stop..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-500 w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-amber-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="ARRIVING">Arriving</option>
            <option value="STARTED">Started</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-4 font-bold">Booking ID</th>
                <th className="py-4 px-4 font-bold">Customer</th>
                <th className="py-4 px-4 font-bold">Driver</th>
                <th className="py-4 px-4 font-bold">Route</th>
                <th className="py-4 px-4 font-bold">Vehicle</th>
                <th className="py-4 px-4 font-bold">Fare</th>
                <th className="py-4 px-4 font-bold">Status</th>
                <th className="py-4 px-4 font-bold">Date &amp; Time</th>
                <th className="py-4 px-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {b.bookingCode}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{b.customerName}</p>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {b.customerPhone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-200">
                      {b.driver?.name || 'Ravi Kumar'}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {b.driver?.vehicle.registrationNumber || 'TN 72 AB 4587'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate">
                    <p className="font-medium text-slate-200 truncate">
                      {b.pickup.name} ➔ {b.destination.name}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {b.distanceKm} km • ~{b.estimatedDurationMin} mins
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-300">
                    {b.vehicleType}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    ₹{b.finalFare || b.estimatedFare}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(b.status)}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {new Date(b.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-lg text-white">
                  Ride Details ({selectedBooking.bookingCode})
                </h3>
                <span className="text-xs text-amber-400">
                  {selectedBooking.vehicleType} Ride
                </span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Passenger:</span>
                <span className="font-bold">{selectedBooking.customerName} ({selectedBooking.customerPhone})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Driver:</span>
                <span className="font-bold">{selectedBooking.driver?.name} ({selectedBooking.driver?.vehicle.registrationNumber})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Pickup:</span>
                <span className="font-medium">{selectedBooking.pickup.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Destination:</span>
                <span className="font-medium">{selectedBooking.destination.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Distance &amp; Time:</span>
                <span className="font-bold">{selectedBooking.distanceKm} km • {selectedBooking.estimatedDurationMin} mins</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Fare &amp; Payment:</span>
                <span className="font-mono font-bold text-amber-400">₹{selectedBooking.finalFare || selectedBooking.estimatedFare} via {selectedBooking.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Status:</span>
                <span>{getStatusBadge(selectedBooking.status)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
