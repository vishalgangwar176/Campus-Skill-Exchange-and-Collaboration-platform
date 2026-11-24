import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS } from '../data/students';
import { INITIAL_PROJECTS } from '../data/projects';
import { INITIAL_EXCHANGES } from '../data/exchangeRequests';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export function DataProvider({ children }) {
  const { currentUser, updateProfile } = useAuth();

  // 1. Students State
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('campusexchange_students');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDENTS;
  });

  // 2. Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('campusexchange_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  // 3. Exchange Requests State
  const [exchangeRequests, setExchangeRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('campusexchange_exchanges');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EXCHANGES;
  });

  // 4. Notifications State
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('campusexchange_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // 5. Connections State (Set of connected student IDs)
  const [connectedStudentIds, setConnectedStudentIds] = useState(() => {
    try {
      const saved = localStorage.getItem('campusexchange_connections');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['std-2', 'std-3', 'std-8'];
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('campusexchange_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('campusexchange_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('campusexchange_exchanges', JSON.stringify(exchangeRequests));
  }, [exchangeRequests]);

  useEffect(() => {
    localStorage.setItem('campusexchange_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('campusexchange_connections', JSON.stringify(connectedStudentIds));
  }, [connectedStudentIds]);

  // Keep students updated if currentUser profile changes
  useEffect(() => {
    if (currentUser) {
      setStudents(prev => {
        const idx = prev.findIndex(s => s.id === currentUser.id);
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], ...currentUser };
          return updated;
        } else {
          return [currentUser, ...prev];
        }
      });
    }
  }, [currentUser]);

  // ===================== SKILLS & PROFILE =====================
  const addOfferedSkill = (skill) => {
    if (!currentUser) return;
    const newSkill = {
      id: "sk-" + Date.now(),
      endorsements: 1,
      ...skill
    };
    const updatedSkills = [...(currentUser.skillsOffered || []), newSkill];
    updateProfile({ skillsOffered: updatedSkills });
  };

  const deleteOfferedSkill = (skillId) => {
    if (!currentUser) return;
    const updatedSkills = (currentUser.skillsOffered || []).filter(s => s.id !== skillId);
    updateProfile({ skillsOffered: updatedSkills });
  };

  const addWantedSkill = (skill) => {
    if (!currentUser) return;
    const newWanted = {
      id: "skw-" + Date.now(),
      priority: skill.priority || 'High',
      ...skill
    };
    const updatedWanted = [...(currentUser.skillsWanted || []), newWanted];
    updateProfile({ skillsWanted: updatedWanted });
  };

  const deleteWantedSkill = (skillId) => {
    if (!currentUser) return;
    const updatedWanted = (currentUser.skillsWanted || []).filter(s => s.id !== skillId);
    updateProfile({ skillsWanted: updatedWanted });
  };

  // ===================== CONNECTIONS =====================
  const toggleConnect = (studentId) => {
    setConnectedStudentIds(prev => {
      const isConnected = prev.includes(studentId);
      if (isConnected) {
        return prev.filter(id => id !== studentId);
      } else {
        const student = students.find(s => s.id === studentId);
        // Add a notification
        addNotification({
          type: "connection",
          title: "Connected!",
          message: `You connected with ${student ? student.name : 'a student'}.`,
          avatar: student ? student.avatar : "",
          link: `/app/students/${studentId}`,
          senderId: studentId
        });
        return [...prev, studentId];
      }
    });
  };

  // ===================== SKILL EXCHANGE =====================
  const createExchangeRequest = ({ receiverId, receiverName, receiverAvatar, receiverCollege, offeredSkill, wantedSkill, message, schedule }) => {
    if (!currentUser) return null;

    const newRequest = {
      id: "req-" + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderCollege: currentUser.college,
      senderDepartment: currentUser.department,
      receiverId,
      receiverName,
      receiverAvatar,
      receiverCollege,
      offeredSkill,
      wantedSkill,
      message,
      schedule: schedule || "Flexible hours",
      status: "pending",
      createdAt: "Just now",
      messages: [
        {
          id: "msg-" + Date.now(),
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: message || `Hey ${receiverName}! Would love to exchange skills: ${offeredSkill} for ${wantedSkill}.`,
          timestamp: "Just now"
        }
      ]
    };

    setExchangeRequests(prev => [newRequest, ...prev]);

    // Add local notification
    addNotification({
      type: "skill_exchange",
      title: "Exchange Request Sent",
      message: `Your exchange request was sent to ${receiverName}.`,
      avatar: receiverAvatar,
      link: "/app/skill-exchange",
      senderId: receiverId
    });

    return newRequest;
  };

  const respondToExchangeRequest = (requestId, responseStatus) => {
    // responseStatus is 'accepted' or 'rejected'
    setExchangeRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: responseStatus,
          messages: [
            ...req.messages,
            {
              id: "msg-" + Date.now(),
              senderId: currentUser ? currentUser.id : "sys",
              senderName: currentUser ? currentUser.name : "System",
              text: responseStatus === 'accepted' 
                ? "Accepted the skill exchange! Excited to collaborate and schedule our first session."
                : "Declined the exchange request at this time.",
              timestamp: "Just now"
            }
          ]
        };
      }
      return req;
    }));

    const req = exchangeRequests.find(r => r.id === requestId);
    if (req) {
      addNotification({
        type: responseStatus === 'accepted' ? "exchange_accepted" : "skill_exchange",
        title: responseStatus === 'accepted' ? "Exchange Accepted!" : "Exchange Request Declined",
        message: responseStatus === 'accepted'
          ? `You accepted the skill exchange with ${req.senderName}. Chat room unlocked!`
          : `You declined the request from ${req.senderName}.`,
        avatar: req.senderAvatar,
        link: "/app/skill-exchange",
        senderId: req.senderId
      });
    }
  };

  const sendMessageInExchange = (requestId, text) => {
    if (!currentUser || !text.trim()) return;

    setExchangeRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const newMsg = {
          id: "msg-" + Date.now(),
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: text.trim(),
          timestamp: "Just now"
        };
        return {
          ...req,
          messages: [...(req.messages || []), newMsg]
        };
      }
      return req;
    }));
  };

  // ===================== COLLABORATION & PROJECTS =====================
  const createProject = (projectData) => {
    if (!currentUser) return null;

    const newProject = {
      id: "proj-" + Date.now(),
      title: projectData.title,
      description: projectData.description,
      category: projectData.category || "Hackathon",
      status: "Open",
      difficulty: projectData.difficulty || "Intermediate",
      deadline: projectData.deadline || "In 3 weeks",
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorCollege: currentUser.college,
      authorRole: projectData.authorRole || "Project Lead",
      teamSize: Number(projectData.teamSize) || 4,
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          role: projectData.authorRole || "Creator & Lead"
        }
      ],
      requiredSkills: Array.isArray(projectData.requiredSkills) 
        ? projectData.requiredSkills 
        : projectData.requiredSkills ? projectData.requiredSkills.split(',').map(s => s.trim()) : ["React", "UI/UX"],
      tags: Array.isArray(projectData.tags) 
        ? projectData.tags 
        : projectData.tags ? projectData.tags.split(',').map(s => s.trim()) : ["CampusProject"],
      likes: 1
    };

    setProjects(prev => [newProject, ...prev]);

    addNotification({
      type: "project_invite",
      title: "Project Published!",
      message: `Your project "${newProject.title}" is now open for campus teammates.`,
      avatar: currentUser.avatar,
      link: "/app/collaboration",
      senderId: currentUser.id
    });

    return newProject;
  };

  const joinProject = (projectId, role = "Collaborator") => {
    if (!currentUser) return;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const alreadyMember = p.members.some(m => m.id === currentUser.id);
        if (alreadyMember) return p;

        const updatedMembers = [
          ...p.members,
          {
            id: currentUser.id,
            name: currentUser.name,
            avatar: currentUser.avatar,
            role: role
          }
        ];

        return {
          ...p,
          members: updatedMembers,
          status: updatedMembers.length >= p.teamSize ? "Team Formed" : p.status
        };
      }
      return p;
    }));

    const project = projects.find(p => p.id === projectId);
    if (project) {
      addNotification({
        type: "project_invite",
        title: "Joined Project!",
        message: `You successfully joined "${project.title}" as ${role}.`,
        avatar: project.authorAvatar,
        link: "/app/collaboration",
        senderId: project.authorId
      });
    }
  };

  // ===================== NOTIFICATIONS =====================
  const addNotification = (notif) => {
    const newNotif = {
      id: "notif-" + Date.now(),
      timestamp: "Just now",
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  // Reset helper
  const resetToDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setProjects(INITIAL_PROJECTS);
    setExchangeRequests(INITIAL_EXCHANGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setConnectedStudentIds(['std-2', 'std-3', 'std-8']);
    localStorage.removeItem('campusexchange_students');
    localStorage.removeItem('campusexchange_projects');
    localStorage.removeItem('campusexchange_exchanges');
    localStorage.removeItem('campusexchange_notifications');
    localStorage.removeItem('campusexchange_connections');
  };

  return (
    <DataContext.Provider value={{
      students,
      projects,
      exchangeRequests,
      notifications,
      connectedStudentIds,
      // Actions
      addOfferedSkill,
      deleteOfferedSkill,
      addWantedSkill,
      deleteWantedSkill,
      toggleConnect,
      createExchangeRequest,
      respondToExchangeRequest,
      sendMessageInExchange,
      createProject,
      joinProject,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      resetToDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

