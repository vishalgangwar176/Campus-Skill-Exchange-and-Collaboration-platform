import React, { useState } from 'react';
import { X, Plus, BookOpen, GraduationCap, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';
import { useData } from '../context/DataContext';

export default function AddSkillModal({ isOpen, onClose, type = 'offered' }) {
  const { addOfferedSkill, addWantedSkill } = useData();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState('Intermediate');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState('High');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (type === 'offered') {
      addOfferedSkill({
        name,
        category,
        level,
        description: description || `Proficient in ${name} through hands-on coursework and projects.`,
        tags: tags ? tags.split(',').map(t => t.trim()) : [name, category]
      });
    } else {
      addWantedSkill({
        name,
        category,
        level,
        priority,
        description: description || `Looking to learn ${name} through practical peer pair sessions.`
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setName('');
      setDescription('');
      setTags('');
    }, 1200);
  };

  const validCategories = SKILL_CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-brand-600 to-indigo-600 p-5 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/15">
              {type === 'offered' ? <GraduationCap className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {type === 'offered' ? 'Add Skill You Can Teach' : 'Add Skill You Want to Learn'}
              </h3>
              <p className="text-indigo-100 text-xs">
                {type === 'offered' ? 'Share your expertise with campus peers' : 'Find students ready to mentor you'}
              </p>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Check className="w-7 h-7 animate-bounce" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Skill Added!</h4>
            <p className="text-slate-600 text-sm">
              Your profile has been updated and peers can now discover this.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Skill Title *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === 'offered' ? "e.g. Next.js 14, Figma Systems, PyTorch" : "e.g. UI/UX Design, Public Speaking"}
                className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {validCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {type === 'offered' ? 'Proficiency Level' : 'Target Proficiency'}
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {type === 'wanted' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Priority
                </label>
                <div className="flex gap-4">
                  {['High', 'Medium', 'Low'].map(p => (
                    <label key={p} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        checked={priority === p}
                        onChange={() => setPriority(p)}
                        className="text-brand-600 focus:ring-brand-500"
                      />
                      <span>{p} Priority</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Description / What you cover
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Give a quick summary of what you can demonstrate or what you want to achieve..."
                className="w-full text-sm rounded-xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            {type === 'offered' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. Hooks, SSR, Tailwind, Fullstack"
                  className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

