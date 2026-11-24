import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  GraduationCap, 
  UserPlus, 
  UserCheck, 
  ArrowRightLeft, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Globe, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ThumbsUp, 
  BookOpen, 
  Briefcase,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import RequestExchangeModal from '../components/RequestExchangeModal';

export default function StudentProfile() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { students, connectedStudentIds, toggleConnect } = useData();

  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // If no id or id is 'me', show currentUser
  const targetId = id || currentUser?.id;
  const student = students.find(s => s.id === targetId) || currentUser;

  const isConnected = student ? connectedStudentIds.includes(student.id) : false;
  const isMe = currentUser?.id === student?.id;

  const handleOpenExchangeWithSkill = (sk) => {
    setSelectedSkill(sk);
    setIsExchangeModalOpen(true);
  };

  if (!student) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">Student Profile Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">This profile may have been updated or removed.</p>
        <Link to="/app/explore" className="mt-4 inline-block px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Back button */}
      <div>
        <Link
          to="/app/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Banner */}
        <div className="h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 relative">
          {student.banner && (
            <img 
              src={student.banner} 
              alt="Banner" 
              className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
          )}
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Student Mentor</span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 sm:px-8 pb-8 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white ring-2 ring-slate-100"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Online now" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {student.name}
                  </h1>
                  {isMe && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                      You
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-brand-600" />
                    <span>{student.college} • {student.department} ({student.year})</span>
                  </div>
                  {student.location && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{student.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Connect & Request Exchange */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto pt-2 sm:pt-0">
              {isMe ? (
                <Link
                  to="/app/settings"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-all"
                >
                  Edit Profile & Skills
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleConnect(student.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isConnected
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 text-slate-500" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsExchangeModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Request Skill Exchange</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bio statement */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 max-w-4xl">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {student.bio || "Student at " + student.college + " ready to exchange peer skills."}
            </p>
          </div>

          {/* Reputation Stats Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Peer Rating</p>
                <p className="text-sm font-extrabold text-slate-900">{student.rating || 5.0} / 5.0</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Completed Trades</p>
                <p className="text-sm font-extrabold text-slate-900">{student.completedExchanges || 0} Sessions</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Projects</p>
                <p className="text-sm font-extrabold text-slate-900">{student.projects?.length || 1} Built</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Availability</p>
                <p className="text-xs font-bold text-slate-800 truncate">{student.availability || "Flexible"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Offered & Wanted Detailed Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Offered */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Skills {student.name.split(' ')[0]} Offers</h3>
              <p className="text-xs text-slate-500">Expertise available for peer learning</p>
            </div>
          </div>

          <div className="space-y-4">
            {student.skillsOffered?.map((sk) => (
              <div
                key={sk.id}
                className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 hover:bg-white hover:border-brand-200 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {sk.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/50">
                      {sk.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sk.description}
                  </p>

                  {sk.tags && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {sk.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {!isMe && (
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <ThumbsUp className="w-3.5 h-3.5 text-brand-500" />
                      <span>{sk.endorsements || 12} student endorsements</span>
                    </div>

                    <button
                      onClick={() => handleOpenExchangeWithSkill(sk)}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <span>Exchange for this</span>
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Skills {student.name.split(' ')[0]} Wants to Learn</h3>
              <p className="text-xs text-slate-500">Topics where peer instruction is welcomed</p>
            </div>
          </div>

          <div className="space-y-4">
            {student.skillsWanted?.map((skw) => (
              <div
                key={skw.id}
                className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {skw.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200/60">
                    {skw.priority || 'High'} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {skw.description}
                </p>

                <div className="text-[11px] text-slate-400 mt-1">
                  Target Level: <span className="font-semibold text-slate-600">{skw.level || 'Intermediate'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects & Achievements Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-600" />
            <span>Notable Campus Projects</span>
          </h3>

          <div className="space-y-3">
            {student.projects && student.projects.length > 0 ? (
              student.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                    <span className="text-[10px] font-semibold text-brand-600">{proj.role}</span>
                  </div>
                  <p className="text-xs text-slate-600">{proj.description}</p>
                  {proj.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No public projects attached yet.</p>
            )}
          </div>
        </div>

        {/* Achievements & Badges */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Achievements & Hackathons</span>
          </h3>

          <div className="space-y-3">
            {student.achievements && student.achievements.length > 0 ? (
              student.achievements.map((ach) => (
                <div key={ach.id} className="p-3.5 rounded-2xl border border-slate-200/70 bg-slate-50/60 flex items-center gap-3">
                  <div className="text-2xl p-2 rounded-xl bg-white shadow-xs">
                    {ach.badge || "🏆"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{ach.title}</h4>
                    <p className="text-[10px] text-slate-400">{ach.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No achievements recorded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <RequestExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        targetStudent={student}
        preselectedSkill={selectedSkill}
      />
    </div>
  );
}

