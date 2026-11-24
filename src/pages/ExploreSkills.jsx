import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Sparkles, 
  LayoutGrid, 
  Users, 
  SlidersHorizontal, 
  Check, 
  X, 
  GraduationCap,
  Layers,
  Code2,
  Globe,
  BrainCircuit,
  Palette,
  Video,
  Camera,
  TrendingUp,
  Mic2,
  Briefcase
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';
import { useData } from '../context/DataContext';
import SkillCard from '../components/SkillCard';
import StudentCard from '../components/StudentCard';
import RequestExchangeModal from '../components/RequestExchangeModal';

export default function ExploreSkills() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { students } = useData();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all', 'Beginner', 'Intermediate', 'Advanced'
  const [sortBy, setSortBy] = useState('most_endorsed'); // 'most_endorsed', 'highest_rated', 'name'
  const [viewMode, setViewMode] = useState('skills'); // 'skills' | 'students'

  // Modal state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenExchange = (student, skill = null) => {
    setSelectedStudent(student);
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  // Compile all skills offered across all students in DataContext
  const allAggregatedSkills = useMemo(() => {
    const list = [];
    students.forEach(st => {
      (st.skillsOffered || []).forEach(sk => {
        list.push({
          ...sk,
          studentId: st.id,
          studentName: st.name,
          studentCollege: st.college,
          studentAvatar: st.avatar,
          studentRating: st.rating,
          studentExchanges: st.completedExchanges,
          lookingFor: st.skillsWanted?.[0]?.name || "Collaborative projects"
        });
      });
    });
    return list;
  }, [students]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return allAggregatedSkills.filter(sk => {
      // Category match
      if (selectedCategory !== 'all' && sk.category !== selectedCategory) {
        return false;
      }
      // Level match
      if (selectedLevel !== 'all' && sk.level?.toLowerCase() !== selectedLevel.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sk.name.toLowerCase().includes(q);
        const matchesCategory = sk.category.toLowerCase().includes(q);
        const matchesDesc = (sk.description || '').toLowerCase().includes(q);
        const matchesTags = (sk.tags || []).some(t => t.toLowerCase().includes(q));
        const matchesStudent = sk.studentName.toLowerCase().includes(q) || sk.studentCollege.toLowerCase().includes(q);
        return matchesName || matchesCategory || matchesDesc || matchesTags || matchesStudent;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'most_endorsed') {
        return (b.endorsements || 0) - (a.endorsements || 0);
      }
      if (sortBy === 'highest_rated') {
        return (b.studentRating || 0) - (a.studentRating || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [allAggregatedSkills, selectedCategory, selectedLevel, searchQuery, sortBy]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(st => {
      // Category match: student has at least one skill in that category
      if (selectedCategory !== 'all') {
        const hasSkillInCat = (st.skillsOffered || []).some(s => s.category === selectedCategory);
        if (!hasSkillInCat) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = st.name.toLowerCase().includes(q);
        const matchesCollege = st.college.toLowerCase().includes(q);
        const matchesDept = (st.department || '').toLowerCase().includes(q);
        const matchesBio = (st.bio || '').toLowerCase().includes(q);
        const matchesSkills = (st.skillsOffered || []).some(s => s.name.toLowerCase().includes(q));
        return matchesName || matchesCollege || matchesDept || matchesBio || matchesSkills;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'highest_rated') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return (b.completedExchanges || 0) - (a.completedExchanges || 0);
    });
  }, [students, selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Campus Skills & Mentors
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Find college peers ready to barter expertise in coding, design, AI, media, and business.
            </p>
          </div>

          {/* Toggle between Skills and Students View */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start">
            <button
              onClick={() => setViewMode('skills')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'skills'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Skills ({filteredSkills.length})</span>
            </button>
            <button
              onClick={() => setViewMode('students')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'students'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Students ({filteredStudents.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, tools (React, Figma, PyTorch), student names, colleges..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Level Filter */}
          {viewMode === 'skills' && (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-slate-500 shrink-0">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="text-xs font-semibold rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-auto"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          )}

          {/* Sort By */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-auto"
            >
              <option value="most_endorsed">Most Endorsed</option>
              <option value="highest_rated">Highest Student Rating</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter reset button if filters active */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-500">
              Showing {viewMode === 'skills' ? `${filteredSkills.length} skills` : `${filteredStudents.length} students`} matching filters
            </span>
            <button
              onClick={clearFilters}
              className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid Content */}
      {viewMode === 'skills' ? (
        filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((sk) => (
              <SkillCard
                key={sk.id}
                skill={sk}
                onOpenExchange={handleOpenExchange}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No skills match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your search query, selecting "All Categories", or removing level filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )
      ) : (
        filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((st) => (
              <StudentCard
                key={st.id}
                student={st}
                onOpenExchange={handleOpenExchange}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No students found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try clearing your search query or choosing a different campus category.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )
      )}

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

