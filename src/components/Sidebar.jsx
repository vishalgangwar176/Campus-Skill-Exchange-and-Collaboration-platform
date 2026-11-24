import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  ArrowRightLeft, 
  Users, 
  UserCircle2, 
  Bell, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function Sidebar() {
  const { currentUser, logout, switchDemoUser } = useAuth();
  const { students, exchangeRequests, notifications } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPersonaPicker, setShowPersonaPicker] = useState(false);
  const navigate = useNavigate();

  // Pending incoming exchanges count
  const pendingIncomingCount = exchangeRequests.filter(
    req => req.receiverId === currentUser?.id && req.status === 'pending'
  ).length;

  // Unread notifications count
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard, exact: true },
    { name: 'Explore Skills', path: '/app/explore', icon: Compass },
    { 
      name: 'Skill Exchange', 
      path: '/app/skill-exchange', 
      icon: ArrowRightLeft,
      badge: pendingIncomingCount > 0 ? pendingIncomingCount : null,
      badgeColor: 'bg-brand-500 text-white'
    },
    { name: 'Collaboration Hub', path: '/app/collaboration', icon: Users },
    { name: 'My Profile', path: '/app/profile', icon: UserCircle2 },
    { 
      name: 'Notifications', 
      path: '/app/notifications', 
      icon: Bell,
      badge: unreadNotifsCount > 0 ? unreadNotifsCount : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/90 text-slate-700 select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-indigo-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                CampusExchange
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200/50">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Peer Knowledge Network</p>
          </div>
        </Link>

        {/* Mobile close button */}
        <button 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Persona Switcher Quick Tool */}
        <div className="pt-5 mt-4 border-t border-slate-100 px-1">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Demo Personas
            </span>
            <button
              onClick={() => setShowPersonaPicker(!showPersonaPicker)}
              className="text-[11px] text-brand-600 font-semibold hover:underline"
            >
              {showPersonaPicker ? 'Hide' : 'Switch'}
            </button>
          </div>

          <div className="space-y-1.5">
            {students.slice(0, 4).map((student) => {
              const isSelected = currentUser?.id === student.id;
              return (
                <button
                  key={student.id}
                  onClick={() => switchDemoUser(student)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all ${
                    isSelected 
                      ? 'bg-slate-100 border border-slate-200 text-slate-900 shadow-xs' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">
                      {student.name} {isSelected && <span className="text-brand-600 font-normal">(Active)</span>}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{student.college}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Card & Logout Footer */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <Link to="/app/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
            <div className="relative">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                alt={currentUser?.name || "Student"}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate group-hover:text-brand-600 transition-colors">
                {currentUser?.name || "Campus Student"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser?.college || "University"}</p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar with Hamburger */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">CampusExchange</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/app/notifications" className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl">
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </Link>
          <Link to="/app/profile">
            <img
              src={currentUser?.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-200"
            />
          </Link>
        </div>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex"
          onClick={() => setMobileOpen(false)}
        >
          <div 
            className="w-72 h-full bg-white shadow-2xl animate-slideRight"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

