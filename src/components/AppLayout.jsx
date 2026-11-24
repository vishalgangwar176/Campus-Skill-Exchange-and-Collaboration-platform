import React from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Bell, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AppLayout() {
  const { currentUser, isAuthenticated } = useAuth();
  const { notifications } = useData();
  const location = useLocation();

  if (!currentUser && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#fafbfe] flex flex-col lg:flex-row font-sans">
      {/* Sidebar (desktop left / mobile top bar + drawer) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Topbar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-800">CampusExchange</span>
            <span>/</span>
            <span className="capitalize text-slate-600 font-semibold">
              {location.pathname.replace('/app', '').replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/app/notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </Link>

            <Link
              to="/app/profile"
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 group"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-200 group-hover:ring-brand-400 transition-all"
              />
              <div className="text-left hidden xl:block">
                <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                  {currentUser?.name}
                </p>
                <p className="text-[10px] text-slate-400">{currentUser?.college}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic page container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

