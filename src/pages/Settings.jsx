import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Building, 
  Upload, 
  Sparkles, 
  Check, 
  Bell, 
  Trash2, 
  Plus, 
  LogOut, 
  RotateCcw,
  GraduationCap,
  BookOpen,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import AddSkillModal from '../components/AddSkillModal';

export default function Settings() {
  const { currentUser, updateProfile, logout } = useAuth();
  const { deleteOfferedSkill, deleteWantedSkill, resetToDemoData } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    college: currentUser?.college || '',
    department: currentUser?.department || '',
    year: currentUser?.year || 'Senior',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    availability: currentUser?.availability || '6-8 hrs/week',
  });

  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || '');
  const [isSaved, setIsSaved] = useState(false);
  const [skillModalType, setSkillModalType] = useState(null); // 'offered' | 'wanted' | null

  const [notifPreferences, setNotifPreferences] = useState({
    exchangeRequests: true,
    chatMessages: true,
    projectInvites: true,
    campusDigest: false
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Local file selection for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      avatar: avatarPreview
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleResetData = () => {
    if (window.confirm("Reset all skills, exchanges, and projects to initial demo state?")) {
      resetToDemoData();
      alert("Demo state successfully reset.");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Account & Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your campus student card, barter availability, and notification preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profile changes updated and saved to LocalStorage!</span>
        </div>
      )}

      {/* 1. General Profile & Avatar Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-600" />
          <span>Student Identity</span>
        </h2>

        {/* Profile Picture Local Selection */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md"
            />
            <label className="absolute inset-0 bg-slate-900/40 rounded-2xl flex flex-col items-center justify-center text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Camera className="w-5 h-5 mb-1" />
              <span>Change</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Profile Picture</h4>
            <p className="text-xs text-slate-500 max-w-xs">
              Upload a clear photo from your computer (PNG, JPG). Persisted locally in your browser session.
            </p>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Choose local image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                College / University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Department / Major
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Class Standing
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                placeholder="e.g. 5-8 hrs/week"
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Bio & Collaboration Goals
            </label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full text-sm rounded-xl border border-slate-200 p-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* 2. Skills Management Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span>Manage Skills Barter Portfolio</span>
          </div>
        </h2>

        {/* Skills Offered */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Skills You Can Teach ({currentUser?.skillsOffered?.length || 0})
            </span>
            <button
              onClick={() => setSkillModalType('offered')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentUser?.skillsOffered?.map((sk) => (
              <div
                key={sk.id}
                className="p-3 rounded-xl border border-slate-200/70 bg-slate-50 flex items-center justify-between gap-2"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{sk.name}</h4>
                  <span className="text-[10px] text-slate-500">{sk.category} • {sk.level}</span>
                </div>
                <button
                  onClick={() => deleteOfferedSkill(sk.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Skills You Want to Learn ({currentUser?.skillsWanted?.length || 0})
            </span>
            <button
              onClick={() => setSkillModalType('wanted')}
              className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentUser?.skillsWanted?.map((skw) => (
              <div
                key={skw.id}
                className="p-3 rounded-xl border border-slate-200/70 bg-slate-50 flex items-center justify-between gap-2"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{skw.name}</h4>
                  <span className="text-[10px] text-violet-600 font-medium">{skw.priority || 'High'} Priority</span>
                </div>
                <button
                  onClick={() => deleteWantedSkill(skw.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete goal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Notification Preferences */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600" />
          <span>Notification Preferences</span>
        </h2>

        <div className="space-y-3 text-xs">
          {[
            { key: 'exchangeRequests', label: 'Skill Exchange Requests', desc: 'Notify me when another student proposes a knowledge barter.' },
            { key: 'chatMessages', label: 'Barter Chat Messages', desc: 'Notify me when peers send a message in an ongoing exchange room.' },
            { key: 'projectInvites', label: 'Collaboration Squad Invites', desc: 'Alert me when teammates apply to my posted project.' },
            { key: 'campusDigest', label: 'Weekly Campus Skill Digest', desc: 'Receive a weekly roundup of trending skills and hackathon squads.' },
          ].map((pref) => (
            <label key={pref.key} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <input
                type="checkbox"
                checked={notifPreferences[pref.key]}
                onChange={() => setNotifPreferences({ ...notifPreferences, [pref.key]: !notifPreferences[pref.key] })}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <div>
                <p className="font-bold text-slate-900">{pref.label}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">{pref.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Danger Zone: Reset Demo Data & Log Out */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-rose-700 pb-2 border-b border-rose-100">
          Session & Demo Controls
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Reset Demo Data</h4>
            <p className="text-xs text-slate-500">Restore all students, projects, and exchange requests to initial sample state.</p>
          </div>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Log Out of CampusExchange</h4>
            <p className="text-xs text-slate-500">End current demo session on this browser.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={skillModalType !== null}
        onClose={() => setSkillModalType(null)}
        type={skillModalType || 'offered'}
      />
    </div>
  );
}

