import React, { useState } from 'react';
import { X, ArrowRightLeft, Sparkles, Check, Clock, BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function RequestExchangeModal({ isOpen, onClose, targetStudent, preselectedSkill }) {
  const { currentUser } = useAuth();
  const { createExchangeRequest } = useData();

  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [schedule, setSchedule] = useState('Weekends (2-3 hrs)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set default values when opened
  React.useEffect(() => {
    if (targetStudent) {
      if (preselectedSkill) {
        setWantedSkill(preselectedSkill.name);
      } else if (targetStudent.skillsOffered && targetStudent.skillsOffered.length > 0) {
        setWantedSkill(targetStudent.skillsOffered[0].name);
      }

      if (currentUser?.skillsOffered && currentUser.skillsOffered.length > 0) {
        setOfferedSkill(currentUser.skillsOffered[0].name);
      } else {
        setOfferedSkill('Web Development');
      }

      setMessage(`Hi ${targetStudent.name}! I noticed your experience with ${preselectedSkill?.name || 'your skills'}. I'd love to exchange knowledge and schedule a weekly peer session.`);
      setIsSubmitted(false);
    }
  }, [targetStudent, preselectedSkill, currentUser]);

  if (!isOpen || !targetStudent) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    createExchangeRequest({
      receiverId: targetStudent.id,
      receiverName: targetStudent.name,
      receiverAvatar: targetStudent.avatar,
      receiverCollege: targetStudent.college,
      offeredSkill: offeredSkill || "General Programming",
      wantedSkill: wantedSkill || targetStudent.skillsOffered?.[0]?.name || "Design",
      schedule,
      message
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <ArrowRightLeft className="w-6 h-6 text-indigo-100" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Propose Skill Exchange</h3>
              <p className="text-indigo-100 text-sm mt-0.5">Peer-to-peer 1-on-1 knowledge barter</p>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Check className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-2xl font-bold text-slate-800">Proposal Dispatched!</h4>
            <p className="text-slate-600 max-w-sm">
              Your exchange request has been sent to <strong>{targetStudent.name}</strong>. You will be notified when they accept.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Student Preview Bar */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <img 
                src={targetStudent.avatar} 
                alt={targetStudent.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 truncate">{targetStudent.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-brand-700 font-medium">
                    {targetStudent.college}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{targetStudent.department} • {targetStudent.year}</p>
              </div>
            </div>

            {/* Exchange Pair Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  Skill You Will Teach
                </label>
                {currentUser?.skillsOffered && currentUser.skillsOffered.length > 0 ? (
                  <select
                    value={offeredSkill}
                    onChange={(e) => setOfferedSkill(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {currentUser.skillsOffered.map((sk) => (
                      <option key={sk.id} value={sk.name}>
                        {sk.name} ({sk.level})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={offeredSkill}
                    onChange={(e) => setOfferedSkill(e.target.value)}
                    placeholder="e.g. React.js, Python, Figma"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-violet-600" />
                  Skill You Want to Learn
                </label>
                {targetStudent.skillsOffered && targetStudent.skillsOffered.length > 0 ? (
                  <select
                    value={wantedSkill}
                    onChange={(e) => setWantedSkill(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {targetStudent.skillsOffered.map((sk) => (
                      <option key={sk.id} value={sk.name}>
                        {sk.name} ({sk.level})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={wantedSkill}
                    onChange={(e) => setWantedSkill(e.target.value)}
                    placeholder="e.g. UI/UX Design"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                )}
              </div>
            </div>

            {/* Proposed Availability */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                Proposed Cadence / Schedule
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Weekends (2-3 hrs)">Weekends (2-3 hrs total)</option>
                <option value="Weekday Evenings (1 hr twice a week)">Weekday Evenings (1 hr twice a week)</option>
                <option value="Sunday Deep Dive (3 hrs)">Sunday Deep Dive (3 hrs)</option>
                <option value="Asynchronous Code/Figma Reviews">Asynchronous Code/Figma Reviews</option>
                <option value="Flexible / To be decided">Flexible / To be decided in chat</option>
              </select>
            </div>

            {/* Introduction Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Introductory Note & Collaboration Goal
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm rounded-xl border border-slate-200 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                placeholder="Explain what project you're working on and how you can help each other..."
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Send Exchange Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

