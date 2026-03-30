import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useCMS } from '../context/CMSContext';
import { motion } from 'motion/react';

const Layout: React.FC = () => {
  const { authState } = useCMS();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-zinc-50 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="p-8 flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
