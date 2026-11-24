import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS } from '../data/students';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('campusexchange_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading user from localStorage', e);
    }
    // Default demo user: Alex Rivera
    return INITIAL_STUDENTS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('campusexchange_auth_token') || true;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campusexchange_user', JSON.stringify(currentUser));
      localStorage.setItem('campusexchange_auth_token', 'demo-token-' + currentUser.id);
    } else {
      localStorage.removeItem('campusexchange_user');
      localStorage.removeItem('campusexchange_auth_token');
    }
  }, [currentUser]);

  const login = (email, password) => {
    // Demo login: check against existing students or allow student email
    const found = INITIAL_STUDENTS.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      return { success: true, user: found };
    }
    // Allow any demo college email to log in
    const newUser = {
      ...INITIAL_STUDENTS[0],
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Campus Student"
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  };

  const signup = (studentData) => {
    const newStudent = {
      id: "std-" + Date.now(),
      name: studentData.name || "New Student",
      email: studentData.email,
      college: studentData.college || "State University",
      department: studentData.department || "Computer Science",
      year: studentData.year || "Freshman",
      avatar: studentData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(studentData.name || 'student')}`,
      banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      bio: studentData.bio || "Excited to share skills and learn from campus peers!",
      location: studentData.location || "Campus Quad",
      rating: 5.0,
      reviewCount: 0,
      completedExchanges: 0,
      activeProjects: 0,
      availability: "Flexible • 5 hrs/week",
      experienceLevel: studentData.year || "Junior",
      skillsOffered: studentData.skillsOffered || [
        {
          id: "sk-" + Date.now(),
          name: studentData.primarySkill || "Web Development",
          category: studentData.primaryCategory || "Web Development",
          level: "Intermediate",
          endorsements: 1,
          description: "Hands-on experience with modern tools.",
          tags: ["Skills", "Campus"]
        }
      ],
      skillsWanted: studentData.skillsWanted || [
        {
          id: "skw-" + Date.now(),
          name: studentData.wantedSkill || "UI/UX Design",
          category: "UI/UX Design",
          level: "Beginner",
          priority: "High",
          description: "Looking to collaborate and pick up design fundamentals."
        }
      ],
      projects: [],
      achievements: [
        { id: "ach-welcome", title: "Joined CampusExchange", date: "Just now", badge: "🎉" }
      ],
      socialLinks: {
        github: "",
        linkedin: "",
        portfolio: ""
      }
    };

    setCurrentUser(newStudent);
    setIsAuthenticated(true);
    return { success: true, user: newStudent };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('campusexchange_auth_token');
  };

  const switchDemoUser = (student) => {
    setCurrentUser(student);
    setIsAuthenticated(true);
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('campusexchange_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      signup,
      logout,
      switchDemoUser,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

