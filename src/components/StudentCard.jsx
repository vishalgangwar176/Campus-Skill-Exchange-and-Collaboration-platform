import React from 'react';
import { Link } from 'react-router-dom';
import { Star, UserPlus, UserCheck, ArrowRightLeft, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function StudentCard({ student, onOpenExchange }) {
  const { currentUser } = useAuth();
  const { connectedStudentIds, toggleConnect } = useData();

  const isConnected = connectedStudentIds.includes(student.id);
  const isMe = currentUser?.id === student.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-brand-200">
      {/* Top Banner & Avatar */}
      <div className="relative">
        <div className="h-20 w-full overflow-hidden bg-gradient-to-r from-brand-600/90 via-indigo-600/90 to-violet-600/90">
          {student.banner && (
            <img 
              src={student.banner} 
              alt="Profile banner" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" 
            />
          )}
        </div>
        
        {/* Avatar badge */}
        <div className="px-5 -mt-9 flex items-end justify-between">
          <div className="relative">
            <img 
              src={student.avatar} 
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover border-3 border-white shadow-md bg-white ring-2 ring-slate-100"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Active student" />
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{student.rating || 5.0}</span>
            <span className="text-slate-400 font-normal">({student.completedExchanges || 0} trades)</span>
          </div>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <Link 
              to={`/app/students/${student.id}`}
              className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors"
            >
              {student.name} {isMe && <span className="text-xs font-normal text-brand-600 ml-1">(You)</span>}
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <GraduationCap className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{student.college} • {student.department}</span>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {student.bio}
          </p>

          {/* Skills Offered */}
          <div className="mt-3.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Can Teach:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {student.skillsOffered?.slice(0, 3).map((sk) => (
                <span 
                  key={sk.id}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-semibold border border-brand-100"
                >
                  {sk.name}
                </span>
              ))}
              {(student.skillsOffered?.length || 0) > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                  +{student.skillsOffered.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          {student.skillsWanted && student.skillsWanted.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Wants to Learn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {student.skillsWanted.slice(0, 2).map((skw) => (
                  <span 
                    key={skw.id}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 font-medium border border-violet-100"
                  >
                    {skw.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          {!isMe && (
            <button
              onClick={() => toggleConnect(student.id)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isConnected
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
              }`}
            >
              {isConnected ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 text-slate-500" />
                  <span>Connect</span>
                </>
              )}
            </button>
          )}

          {!isMe && (
            <button
              onClick={() => onOpenExchange && onOpenExchange(student)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Exchange</span>
            </button>
          )}

          <Link
            to={`/app/students/${student.id}`}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
              isMe 
                ? 'w-full bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isMe ? 'View My Profile' : 'Profile'}
          </Link>
        </div>
      </div>
    </div>
  );
}

