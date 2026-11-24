import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRightLeft, 
  Users, 
  Star, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Compass, 
  ShieldCheck,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import StudentCard from '../components/StudentCard';
import ProjectCard from '../components/ProjectCard';
import RequestExchangeModal from '../components/RequestExchangeModal';
import AddSkillModal from '../components/AddSkillModal';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { 
    students, 
    exchangeRequests, 
    projects, 
    respondToExchangeRequest, 
    deleteOfferedSkill, 
    deleteWantedSkill 
  } = useData();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [skillModalType, setSkillModalType] = useState(null); // 'offered' | 'wanted' | null

  // Open exchange modal
  const handleOpenExchange = (student) => {
    setSelectedStudent(student);
    setIsExchangeModalOpen(true);
  };

  // Profile completion calculation
  const getProfileCompletion = () => {
    if (!currentUser) return 50;
    let score = 30; // base account
    if (currentUser.avatar) score += 15;
    if (currentUser.bio && currentUser.bio.length > 20) score += 15;
    if (currentUser.skillsOffered?.length >= 2) score += 20;
    if (currentUser.skillsWanted?.length >= 1) score += 10;
    if (currentUser.college && currentUser.department) score += 10;
    return Math.min(score, 100);
  };

  const completionPct = getProfileCompletion();

  // Exchange requests relevant to user
  const incomingRequests = exchangeRequests.filter(
    req => req.receiverId === currentUser?.id
  );
  const outgoingRequests = exchangeRequests.filter(
    req => req.senderId === currentUser?.id
  );

  // Recommended students (exclude self)
  const recommendedStudents = students
    .filter(s => s.id !== currentUser?.id)
    .slice(0, 3);

  // User's active projects or open campus collaborations
  const userProjects = projects.filter(
    p => p.members.some(m => m.id === currentUser?.id) || p.authorId === currentUser?.id
  );
  const displayProjects = userProjects.length > 0 ? userProjects : projects.slice(0, 2);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. Personalized Welcome & Overview Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-lg shadow-brand-500/15">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-indigo-100 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus Peer Network • Fall Semester</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm mt-2 leading-relaxed">
              You have <strong className="text-white underline">{incomingRequests.filter(r => r.status === 'pending').length} pending exchange proposals</strong> waiting for your review. Trade knowledge, sharpen skills, and recruit your dream team.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/app/explore"
                className="px-4 py-2 rounded-xl text-xs font-bold text-brand-700 bg-white hover:bg-slate-100 shadow-md transition-all flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Skills</span>
              </Link>
              <Link
                to="/app/collaboration"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Find Teammates</span>
              </Link>
            </div>
          </div>

          {/* Profile Completion Widget Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 md:w-72 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-indigo-100">Profile Readiness</span>
              <span className="text-white">{completionPct}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-black/20 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <p className="text-[11px] text-indigo-100 mt-2.5 leading-snug">
              {completionPct < 100 
                ? "Add at least 3 skills and upload an avatar to reach verified peer mentor status." 
                : "Profile complete! You're featured on the campus leaderboards."}
            </p>
            {completionPct < 100 && (
              <Link
                to="/app/settings"
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-white hover:underline"
              >
                <span>Complete Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-50 text-brand-600">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Exchanges</p>
            <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">{currentUser?.completedExchanges || 14}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Peer Rating</p>
            <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">{currentUser?.rating || 4.9} / 5.0</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Squads</p>
            <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">{userProjects.length} Projects</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available Time</p>
            <h4 className="text-xs font-bold text-slate-800 mt-1 truncate">{currentUser?.availability || "6 hrs/week"}</h4>
          </div>
        </div>
      </div>

      {/* 3. Skills Barter Portfolio: Offered vs Wanted */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills I Offer */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Skills You Offer</h3>
                <p className="text-xs text-slate-500">Expertise peers can learn from you</p>
              </div>
            </div>

            <button
              onClick={() => setSkillModalType('offered')}
              className="p-2 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentUser?.skillsOffered && currentUser.skillsOffered.length > 0 ? (
              currentUser.skillsOffered.map((sk) => (
                <div 
                  key={sk.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 flex items-start justify-between gap-3 group hover:border-brand-200 transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">{sk.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-100/70 text-brand-700">
                        {sk.level}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {sk.endorsements || 12} endorsements
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">{sk.description}</p>
                  </div>

                  <button
                    onClick={() => deleteOfferedSkill(sk.id)}
                    className="text-slate-400 hover:text-rose-600 text-xs font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove skill"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-slate-500">
                You haven't listed any skills to teach yet. Click "+ Add Skill" to start receiving barter requests!
              </div>
            )}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Skills You Want</h3>
                <p className="text-xs text-slate-500">Subjects you want peer coaching in</p>
              </div>
            </div>

            <button
              onClick={() => setSkillModalType('wanted')}
              className="p-2 text-xs font-bold text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-xl flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="space-y-3">
            {currentUser?.skillsWanted && currentUser.skillsWanted.length > 0 ? (
              currentUser.skillsWanted.map((skw) => (
                <div 
                  key={skw.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 flex items-start justify-between gap-3 group hover:border-violet-200 transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">{skw.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-700">
                        {skw.priority || 'High'} Priority
                      </span>
                      <span className="text-[10px] text-slate-500">Target: {skw.level || 'Intermediate'}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">{skw.description}</p>
                  </div>

                  <button
                    onClick={() => deleteWantedSkill(skw.id)}
                    className="text-slate-400 hover:text-rose-600 text-xs font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove goal"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-slate-500">
                List the skills you want to learn so other campus students can offer to teach you.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Recent Exchange Requests Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Skill Exchanges</h3>
            <p className="text-xs text-slate-500">Manage incoming barter proposals and active conversations</p>
          </div>

          <Link
            to="/app/skill-exchange"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Open Exchange Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exchangeRequests.slice(0, 4).map((req) => {
            const isIncoming = req.receiverId === currentUser?.id;
            const peerName = isIncoming ? req.senderName : req.receiverName;
            const peerAvatar = isIncoming ? req.senderAvatar : req.receiverAvatar;
            const peerCollege = isIncoming ? req.senderCollege : req.receiverCollege;

            return (
              <div
                key={req.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-brand-200 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={peerAvatar} 
                        alt={peerName} 
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{peerName}</h4>
                        <p className="text-[10px] text-slate-500">{peerCollege} • {isIncoming ? 'Incoming' : 'Outgoing'}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'accepted'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : req.status === 'rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <span className="text-brand-600">{req.offeredSkill}</span>
                      <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-violet-600">{req.wantedSkill}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                      "{req.message}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-slate-400">{req.createdAt}</span>

                  <div className="flex items-center gap-2">
                    {isIncoming && req.status === 'pending' && (
                      <>
                        <button
                          onClick={() => respondToExchangeRequest(req.id, 'accepted')}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondToExchangeRequest(req.id, 'rejected')}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    <Link
                      to="/app/skill-exchange"
                      className="px-3 py-1 rounded-lg text-[11px] font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>{req.status === 'accepted' ? 'Open Chat' : 'View'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recommended Students for You */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recommended Student Matches</h3>
            <p className="text-xs text-slate-500">Students with complementary skills ready for peer barter</p>
          </div>

          <Link
            to="/app/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Browse All Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedStudents.map((st) => (
            <StudentCard
              key={st.id}
              student={st}
              onOpenExchange={handleOpenExchange}
            />
          ))}
        </div>
      </div>

      {/* 6. Ongoing Campus Collaborations Hub Preview */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Active Squads & Collaborations</h3>
            <p className="text-xs text-slate-500">Join hackathon and capstone squads seeking your talent</p>
          </div>

          <Link
            to="/app/collaboration"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Open Squad Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>

      {/* Modals */}
      <RequestExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        targetStudent={selectedStudent}
      />

      <AddSkillModal
        isOpen={skillModalType !== null}
        onClose={() => setSkillModalType(null)}
        type={skillModalType || 'offered'}
      />
    </div>
  );
}

