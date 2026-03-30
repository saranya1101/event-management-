import React from 'react';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const Navbar: React.FC = () => {
  const { authState } = useCMS();

  return (
    <header className="h-16 bg-white border-bottom border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-zinc-100 rounded-full px-4 py-2 w-96">
        <Search className="w-4 h-4 text-zinc-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search for events, users..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-zinc-900">{authState.user?.name}</p>
            <p className="text-xs text-zinc-500 capitalize">{authState.user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden">
            <UserIcon className="w-6 h-6 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
