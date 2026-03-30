import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, BookmarkCheck, BarChart3, Settings, LogOut } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { cn } from '../lib/utils';

const Sidebar: React.FC = () => {
  const { logout } = useCMS();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Bookings', path: '/bookings', icon: BookmarkCheck },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white text-zinc-600 h-screen flex flex-col border-r border-zinc-200">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
        <h1 className="text-xl font-bold text-zinc-900 tracking-tight italic">Eventify Admin</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-50 text-indigo-600" 
                  : "hover:bg-zinc-50 hover:text-zinc-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-900")} />
                <span className="text-sm font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 text-zinc-400 group-hover:text-red-600" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
