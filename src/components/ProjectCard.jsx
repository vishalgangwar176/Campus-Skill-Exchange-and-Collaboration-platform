import React, { useState } from 'react';
import { Users, Calendar, Sparkles, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function ProjectCard({ project }) {
  const { currentUser } = useAuth();
  const { joinProject } = useData();

  const [roleInput, setRoleInput] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [likes, setLikes] = useState(project.likes || 12);
  const [hasLiked, setHasLiked] = useState(false);

  const isMember = project.members?.some(m => m.id === currentUser?.id);
  const isAuthor = project.authorId === currentUser?.id;
  const isFull = (project.members?.length || 0) >= project.teamSize;
  const openSlots = Math.max(0, project.teamSize - (project.members?.length || 0));

  const handleJoin = (e) => {
    e.preventDefault();
    joinProject(project.id, roleInput.trim() || "Teammate / Contributor");
    setShowRoleModal(false);
  };

  const toggleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Hackathon':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Capstone':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'Startup MVP':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Open Source':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-brand-200">
      <div className="p-6">
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              isFull || project.status === 'Team Formed'
                ? 'bg-slate-100 text-slate-600'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
            }`}>
              {isFull ? 'Team Full' : `${openSlots} Slots Open`}
            </span>
            <button
              onClick={toggleLike}
              className={`p-1 rounded-md text-xs flex items-center gap-1 transition-colors ${
                hasLiked ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
              }`}
              title="Endorse this project"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="text-[11px] font-semibold">{likes}</span>
            </button>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Author row */}
        <div className="flex items-center gap-2.5 mt-4 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <img 
            src={project.authorAvatar} 
            alt={project.authorName} 
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" 
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">
              {project.authorName} <span className="text-[10px] text-slate-500 font-normal">({project.authorRole || 'Lead'})</span>
            </p>
            <p className="text-[11px] text-slate-500 truncate">{project.authorCollege}</p>
          </div>
        </div>

        {/* Required Skills */}
        <div className="mt-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Looking for Skills:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.requiredSkills?.map((skill, idx) => (
              <span 
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50/80 text-brand-700 font-semibold border border-brand-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline & Meta info */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Target: {project.deadline}</span>
          </div>
          <span className="font-medium text-slate-600">{project.difficulty}</span>
        </div>
      </div>

      {/* Team Roster & Join Action */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100/90 flex items-center justify-between gap-3">
        {/* Avatars */}
        <div className="flex items-center">
          <div className="flex -space-x-2 overflow-hidden">
            {project.members?.map((m, idx) => (
              <img
                key={idx}
                src={m.avatar}
                alt={m.name}
                title={`${m.name} (${m.role})`}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
              />
            ))}
            {Array.from({ length: openSlots }).map((_, i) => (
              <div 
                key={i}
                className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 border border-dashed border-slate-300 items-center justify-center text-[10px] font-medium text-slate-500"
                title="Open teammate slot"
              >
                +1
              </div>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 ml-2 font-medium">
            {project.members?.length || 1}/{project.teamSize}
          </span>
        </div>

        {/* Join button */}
        {isMember ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>{isAuthor ? 'Project Owner' : 'Joined Team'}</span>
          </div>
        ) : isFull ? (
          <span className="text-xs font-medium text-slate-400 px-3 py-1.5 bg-slate-100 rounded-xl">
            Team Complete
          </span>
        ) : (
          <button
            onClick={() => setShowRoleModal(true)}
            className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Join Team</span>
          </button>
        )}
      </div>

      {/* Quick Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 max-w-sm w-full space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">Join {project.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Specify what role or skill you will contribute to this squad:</p>
            </div>

            <div>
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="e.g. Frontend Developer, UI Designer, ML Engineer"
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleJoin}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Confirm & Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

