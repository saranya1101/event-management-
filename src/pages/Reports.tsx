import React from 'react';
import { useCMS } from '../context/CMSContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Download, Calendar, Users, BookmarkCheck, DollarSign } from 'lucide-react';

const Reports: React.FC = () => {
  const { events, users, bookings } = useCMS();

  const data = [
    { name: 'Week 1', events: 4, bookings: 24, revenue: 2400 },
    { name: 'Week 2', events: 3, bookings: 13, revenue: 1398 },
    { name: 'Week 3', events: 2, bookings: 98, revenue: 9800 },
    { name: 'Week 4', events: 7, bookings: 39, revenue: 3908 },
    { name: 'Week 5', events: 5, bookings: 48, revenue: 4800 },
    { name: 'Week 6', events: 8, bookings: 38, revenue: 3800 },
  ];

  const pieData = [
    { name: 'Technology', value: 400 },
    { name: 'Music', value: 300 },
    { name: 'Business', value: 300 },
    { name: 'Sports', value: 200 },
  ];

  const COLORS = ['#4f46e5', '#6366f1', '#10b981', '#f43f5e'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Reports & Analytics</h2>
          <p className="text-zinc-500">Detailed insights into your event management performance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all">
          <Download className="w-5 h-5" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-zinc-500">Total Events</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900">{events.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-zinc-500">Total Users</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900">{users.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-zinc-500">Total Bookings</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900">{bookings.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-zinc-500">Total Revenue</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900">$12,450</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="bookings" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Category Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
