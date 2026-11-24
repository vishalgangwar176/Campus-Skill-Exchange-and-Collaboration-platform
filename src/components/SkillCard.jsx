import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRightLeft, UserCheck, UserPlus, ThumbsUp, Tag, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function SkillCard({ skill, onOpenExchange }) {
  const { currentUser } = useAuth();
  const { students, connectedStudentIds, toggleConnect } = useData();

  // Find owner student details if not directly attached
  const student = students.find(s => s.id === skill.studentId) || {
    id: skill.studentId,
    name: skill.studentName || "Student Mentor",
    college: skill.studentCollege || "Campus",
    avatar: skill.studentAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    rating: skill.studentRating || 4.9,
    completedExchanges: skill.studentExchanges || 10
  };

  const isConnected = connectedStudentIds.includes(student.id);
  const isMe = currentUser?.id === student.id;

  const getLevelBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-brand-200">
      <div className="p-5 pb-4">
        {/* Top meta: Category & Level */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
            {skill.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(skill.level)}`}>
              {skill.level}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
              <ThumbsUp className="w-3 h-3 text-brand-500" />
              <span>{skill.endorsements || 12}</span>
            </div>
          </div>
        </div>

        {/* Skill Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {skill.description}
        </p>

        {/* Tags */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {skill.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded bg-brand-50/70 text-brand-700 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Looking for barter match hint */}
        {skill.lookingFor && (
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-brand-600 text-[11px] uppercase tracking-wider shrink-0 mt-0.5">Wants:</span>
            <span className="line-clamp-1 text-slate-700 font-medium">{skill.lookingFor}</span>
          </div>
        )}
      </div>

      {/* Student Author Banner & Actions */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100/90 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link 
            to={`/app/students/${student.id}`} 
            className="flex items-center gap-2.5 group/student min-w-0"
          >
            <img 
              src={student.avatar} 
              alt={student.name}
              className="w-9 h-9 rounded-full object-cover border border-white shadow-sm ring-1 ring-slate-200"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-800 group-hover/student:text-brand-600 transition-colors truncate">
                {student.name} {isMe && <span className="text-[10px] text-brand-600 font-normal">(You)</span>}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">{student.college}</p>
            </div>
          </Link>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{student.rating || 5.0}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to={`/app/students/${student.id}`}
            className="text-center py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm transition-all"
          >
            View Profile
          </Link>

          {isMe ? (
            <Link
              to="/app/settings"
              className="text-center py-2 px-3 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-all"
            >
              Manage Skill
            </Link>
          ) : (
            <button
              onClick={() => onOpenExchange && onOpenExchange(student, skill)}
              className="py-2 px-3 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Exchange</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

