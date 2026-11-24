export const INITIAL_EXCHANGES = [
  {
    id: "req-1",
    senderId: "std-2",
    senderName: "Elena Rostova",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    senderCollege: "Stanford University",
    senderDepartment: "Symbolic Systems & HCI",
    receiverId: "std-1",
    receiverName: "Alex Rivera",
    receiverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    receiverCollege: "UC Berkeley",
    offeredSkill: "UI/UX Design & Prototyping (Figma)",
    wantedSkill: "React.js & Next.js",
    message: "Hey Alex! I saw your CampusEats project and was really impressed. I can teach you advanced Figma design systems, tokens, and auto-layout in exchange for coaching me on React hooks and component structuring.",
    status: "pending",
    createdAt: "2 hours ago",
    schedule: "Thursdays & Sundays • 5:00 PM PST",
    messages: [
      {
        id: "msg-101",
        senderId: "std-2",
        senderName: "Elena Rostova",
        text: "Hey Alex! I prepared a starter Figma file with variable tokens and atomic components for our session whenever you are ready.",
        timestamp: "2 hours ago"
      }
    ]
  },
  {
    id: "req-2",
    senderId: "std-1",
    senderName: "Alex Rivera",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    senderCollege: "UC Berkeley",
    receiverId: "std-3",
    receiverName: "Marcus Chen",
    receiverAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    receiverCollege: "MIT",
    receiverDepartment: "Artificial Intelligence & Robotics",
    offeredSkill: "React.js & Tailwind CSS",
    wantedSkill: "Machine Learning & PyTorch",
    message: "Hi Marcus! I'm eager to understand neural network loss curves and PyTorch inference pipelines. Happy to build interactive research visualization dashboards in exchange!",
    status: "accepted",
    createdAt: "1 day ago",
    schedule: "Saturdays • 11:00 AM EST",
    messages: [
      {
        id: "msg-201",
        senderId: "std-1",
        senderName: "Alex Rivera",
        text: "Hi Marcus! Glad to connect. I set up a demo repository with React + Vite + Recharts so we can display your neural net checkpoints.",
        timestamp: "1 day ago"
      },
      {
        id: "msg-202",
        senderId: "std-3",
        senderName: "Marcus Chen",
        text: "Fantastic Alex! That's exactly what my lab needed for the upcoming demo. Let's do a 45-minute sync on Saturday. I will send over the Google Colab notebook beforehand.",
        timestamp: "18 hours ago"
      },
      {
        id: "msg-203",
        senderId: "std-1",
        senderName: "Alex Rivera",
        text: "Sounds great! Looking forward to it.",
        timestamp: "15 hours ago"
      }
    ]
  },
  {
    id: "req-3",
    senderId: "std-4",
    senderName: "Sophia Martinez",
    senderAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    senderCollege: "NYU Tisch & Stern",
    senderDepartment: "Film & Digital Marketing",
    receiverId: "std-1",
    receiverName: "Alex Rivera",
    receiverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    receiverCollege: "UC Berkeley",
    offeredSkill: "Premiere Pro & Short-Form Video Strategy",
    wantedSkill: "Web Development / Webflow Portfolio",
    message: "Hey! I can help you edit an awesome 60-second viral demo video for your tech projects if you can help me structure my personal portfolio website.",
    status: "pending",
    createdAt: "3 days ago",
    schedule: "Flexible",
    messages: [
      {
        id: "msg-301",
        senderId: "std-4",
        senderName: "Sophia Martinez",
        text: "Hi Alex! Let me know if you want to collaborate. I have some sample sound design packs we can test out.",
        timestamp: "3 days ago"
      }
    ]
  },
  {
    id: "req-4",
    senderId: "std-1",
    senderName: "Alex Rivera",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    senderCollege: "UC Berkeley",
    receiverId: "std-6",
    receiverName: "Aaliyah Washington",
    receiverAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    receiverCollege: "UCLA",
    receiverDepartment: "Communications & Business Admin",
    offeredSkill: "Python FastAPIs & Database Architecture",
    wantedSkill: "Executive Public Speaking & Pitching",
    message: "Hi Aaliyah! We are presenting at CalHacks next month. I would love feedback on our slide deck structure and stage presence. Can teach you Python backend fundamentals in return!",
    status: "accepted",
    createdAt: "4 days ago",
    schedule: "Wednesdays • 6:30 PM PST",
    messages: [
      {
        id: "msg-401",
        senderId: "std-6",
        senderName: "Aaliyah Washington",
        text: "Hey Alex! Loved your demo video. Let's do a mock pitch drill this Wednesday. Send me your draft slides!",
        timestamp: "4 days ago"
      },
      {
        id: "msg-402",
        senderId: "std-1",
        senderName: "Alex Rivera",
        text: "Just sent the Figma deck link to your email. See you Wednesday!",
        timestamp: "3 days ago"
      }
    ]
  }
];

