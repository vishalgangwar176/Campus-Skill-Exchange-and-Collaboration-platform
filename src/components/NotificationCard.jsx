import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, CheckCircle2, Users, UserPlus, Bell, Check, Trash2, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function NotificationCard({ notification }) {
  const { markNotificationRead, deleteNotification } = useData();

  const getIcon = (type) => {
    switch (type) {
      case 'skill_exchange':
        return <ArrowRightLeft className="w-4 h-4 text-brand-600" />;
      case 'exchange_accepted':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'project_invite':
        return <Users className="w-4 h-4 text-violet-600" />;
      case 'connection':
        return <UserPlus className="w-4 h-4 text-sky-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group ${
      notification.read 
        ? 'bg-white border-slate-200/80 hover:border-slate-300' 
        : 'bg-brand-50/40 border-brand-200/70 shadow-xs'
    }`}>
      {/* Icon badge or Avatar */}
      <div className="relative shrink-0 mt-0.5">
        {notification.avatar ? (
          <img 
            src={notification.avatar} 
            alt="Sender avatar" 
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-xs" 
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
            {getIcon(notification.type)}
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-xs border border-slate-100">
          {getIcon(notification.type)}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-900 truncate">
            {notification.title}
          </h4>
          <span className="text-[11px] text-slate-400 shrink-0 font-medium">
            {notification.timestamp}
          </span>
        </div>

        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {notification.message}
        </p>

        {/* Action button link */}
        {notification.link && (
          <div className="mt-2.5 flex items-center gap-3">
            <Link
              to={notification.link}
              onClick={() => markNotificationRead(notification.id)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              <span>View details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {!notification.read && (
              <button
                onClick={() => markNotificationRead(notification.id)}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-emerald-500" />
                <span>Mark read</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete button */}
      <button
        onClick={() => deleteNotification(notification.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all shrink-0"
        title="Remove notification"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

