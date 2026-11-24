import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowRightLeft, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Search, 
  Star, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  Palette, 
  TrendingUp, 
  MessageSquare,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkillCard from '../components/SkillCard';
import RequestExchangeModal from '../components/RequestExchangeModal';
import { ALL_SKILLS_DATA, SKILL_CATEGORIES } from '../data/skills';
import { INITIAL_STUDENTS } from '../data/students';

export default function Landing() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenExchange = (student, skill) => {
    setSelectedStudent(student);
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const featuredSkills = ALL_SKILLS_DATA.slice(0, 6);

  const stats = [
    { value: '3,800+', label: 'Active Students', icon: GraduationCap },
    { value: '850+', label: 'Skills Exchanged', icon: ArrowRightLeft },
    { value: '320+', label: 'Hackathon Squads', icon: Users },
    { value: '98.4%', label: 'Satisfaction Rate', icon: Star },
  ];

  const steps = [
    {
      step: '01',
      title: 'List What You Know & Want',
      description: 'Create your student card in 60 seconds. List your superpowers (React, Video Editing, AI) and what you want to master next.',
      icon: Code2,
      badge: 'Zero Tuition'
    },
    {
      step: '02',
      title: 'Discover Your Skill Counterpart',
      description: 'Explore peer listings across 10+ campus categories. Find a student whose strengths match your learning goals.',
      icon: ArrowRightLeft,
      badge: 'Mutual Barter'
    },
    {
      step: '03',
      title: 'Exchange & Build Together',
      description: 'Send a structured exchange proposal. Connect over live pair-learning sessions or team up to conquer collegiate hackathons.',
      icon: Zap,
      badge: 'Real Results'
    }
  ];

  const testimonials = [
    {
      quote: "I traded 4 hours of Figma auto-layout coaching with Alex for React component tutorials. That barter directly helped me land my summer product design internship!",
      name: "Elena Rostova",
      role: "Junior at Stanford University",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      skills: "UI/UX ⇄ React.js"
    },
    {
      quote: "Finding hackathon teammates used to mean sending random cold messages on Discord. On CampusExchange, I assembled a 4-person hardware + CV squad in 24 hours for HackGT.",
      name: "Devon Vance",
      role: "Junior at Georgia Tech",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      skills: "Hardware ⇄ Mobile Dev"
    },
    {
      quote: "As a film student, I needed someone to code my interactive gallery. I helped an AI researcher shoot their pitch video, and he built my portfolio. Win-win!",
      name: "Sophia Martinez",
      role: "Senior at NYU Tisch",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      skills: "Premiere Pro ⇄ Web Dev"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfe]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft atmospheric gradient blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-300/30 via-violet-300/25 to-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill announcement */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold shadow-xs mb-6 hover:bg-brand-100 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span>Campus Skill Barter 2.0 is Live</span>
            <span className="text-brand-300">•</span>
            <span className="text-slate-600 font-medium">Join 3,800+ peers</span>
          </div>

          {/* Strong Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Learn Any Skill From Your Peers. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600">
              Trade What You Know.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            The collegiate peer-to-peer collaboration hub. Trade coding for design, video editing for pitch coaching, and find the perfect teammates for hackathons and capstone projects.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 hover:from-brand-700 hover:to-violet-700 shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 group transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/app/explore"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Search className="w-4 h-4 text-brand-600" />
              <span>Explore Student Skills</span>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free for all verified .edu students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Direct 1-on-1 peer scheduling</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Cross-campus hackathon matching</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-brand-50 text-brand-600 mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-900">{s.value}</span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                Featured Student Talents
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                High-Demand Peer Skills Ready for Exchange
              </h2>
            </div>
            <Link
              to="/app/explore"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              <span>View All 16+ Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkills.map((skill) => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                onOpenExchange={handleOpenExchange}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#fafbfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Campus Skill Barter Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              No money required. Learn faster by exchanging real expertise directly with fellow students who share your passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-brand-200 transition-colors">
                      {st.step}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">
                      {st.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-2">
              Real Campus Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by Student Founders & Builders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50/70 p-7 rounded-3xl border border-slate-200/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={t.avatar} 
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                      <p className="text-[10px] text-slate-500">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                    {t.skills}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Pre-Footer Callout */}
      <section className="py-16 bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Unlock Your Campus Network?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Join thousands of college students exchanging skills, building portfolios, and forming winning hackathon teams.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl text-sm font-bold bg-white text-brand-700 hover:bg-slate-100 shadow-xl transition-all"
            >
              Sign Up With College Email
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Interactive Modal */}
      <RequestExchangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetStudent={selectedStudent}
        preselectedSkill={selectedSkill}
      />
    </div>
  );
}

