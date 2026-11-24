import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Filter, 
  ArrowRightLeft, 
  Users, 
  UserPlus, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import NotificationCard from '../components/NotificationCard';

export default function Notifications() {
  const { 
    notifications, 
    markAllNotificationsRead 
  } = useData();

  const [filterType, setFilterType] = useState('all'); // 'all', 'unread', 'skill_exchange', 'project_invite', 'connection'

  const filtered = notifications.filter(n => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'skill_exchange') return n.type === 'skill_exchange' || n.type === 'exchange_accepted';
    if (filterType === 'project_invite') return n.type === 'project_invite';
    if (filterType === 'connection') return n.type === 'connection';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campus Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Stay updated on barter requests, squad invites, and peer endorsements.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-brand-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'skill_exchange', label: 'Skill Barters' },
          { id: 'project_invite', label: 'Project Squads' },
          { id: 'connection', label: 'Connections' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === tab.id
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((notif) => (
            <NotificationCard key={notif.id} notification={notif} />
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Bell className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No notifications in this filter</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
              You are all caught up! New barter requests and squad updates will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

