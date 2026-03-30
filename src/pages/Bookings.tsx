import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, CheckCircle, XCircle, Trash2, Filter, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Bookings: React.FC = () => {
  const { bookings, updateBookingStatus, deleteBooking } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(b => 
    b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">Bookings Management</h2>
        <p className="text-zinc-500">Review and manage event registration requests.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search bookings by user or event..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 pl-11 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-all">
          <Filter className="w-4 h-4" />
          Filter Status
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <AnimatePresence>
                {filteredBookings.map((booking) => (
                  <motion.tr 
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-zinc-400">#{booking.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-600">
                          {booking.userName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-zinc-900">{booking.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600">{booking.eventTitle}</td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{booking.bookingDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                        booking.status === 'Pending' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {booking.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'Approved')}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="p-12 text-center">
            <BookmarkCheck className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
            <p className="text-zinc-500 font-medium">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
