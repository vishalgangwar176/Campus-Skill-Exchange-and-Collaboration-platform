export const INITIAL_STUDENTS = [
  {
    id: "std-1",
    name: "Alex Rivera",
    email: "alex.rivera@berkeley.edu",
    college: "UC Berkeley",
    department: "Computer Science & Design",
    year: "Senior",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    bio: "Passionate Full-Stack Developer & aspiring Product Engineer. I love crafting clean user interfaces with React & Tailwind, and I'm currently looking to level up my Figma design system and motion skills.",
    location: "Berkeley, CA",
    rating: 4.9,
    reviewCount: 18,
    completedExchanges: 14,
    activeProjects: 3,
    availability: "6-8 hrs/week • Evenings & Weekends",
    experienceLevel: "Senior",
    skillsOffered: [
      {
        id: "sk-101",
        name: "React.js & Next.js",
        category: "Web Development",
        level: "Advanced",
        endorsements: 24,
        description: "Modern component architecture, hooks, state management (Zustand/Redux), server components, and responsive performance tuning.",
        tags: ["React", "Next.js", "TypeScript", "TailwindCSS"]
      },
      {
        id: "sk-102",
        name: "Python & FastAPIs",
        category: "Programming",
        level: "Advanced",
        endorsements: 19,
        description: "RESTful architecture, async request handling, database ORMs (SQLAlchemy), and microservices deployment.",
        tags: ["Python", "FastAPI", "PostgreSQL", "Docker"]
      },
      {
        id: "sk-103",
        name: "Git & Team Workflows",
        category: "Programming",
        level: "Intermediate",
        endorsements: 15,
        description: "Merge conflict resolution, interactive rebasing, GitHub Actions CI/CD pipelines, and pull request reviews.",
        tags: ["Git", "GitHub", "CI/CD", "DevOps"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-101",
        name: "UI/UX & Design Systems in Figma",
        category: "UI/UX Design",
        level: "Intermediate",
        priority: "High",
        description: "Want to learn auto-layout masteries, component variants, accessibility contrast guidelines, and micro-interaction prototypes."
      },
      {
        id: "skw-102",
        name: "Video Editing & Motion Graphics",
        category: "Video Editing",
        level: "Beginner",
        priority: "Medium",
        description: "Looking to create killer demo videos and launch teasers using Premiere Pro or After Effects."
      }
    ],
    projects: [
      {
        id: "proj-101",
        title: "CampusEats Peer Delivery",
        description: "A student-to-student dining hall delivery coordination app with real-time tracking.",
        link: "https://github.com/alexrivera/campuseats",
        role: "Lead Frontend Engineer",
        tags: ["React", "Tailwind", "WebSockets"]
      },
      {
        id: "proj-102",
        title: "StudySync AI Notes",
        description: "Collaborative lecture note synthesizer using semantic search and markdown export.",
        link: "https://github.com/alexrivera/studysync",
        role: "Full Stack Builder",
        tags: ["Next.js", "OpenAI API", "Supabase"]
      }
    ],
    achievements: [
      { id: "ach-1", title: "CalHacks 2024 - 1st Runner Up", date: "Oct 2024", badge: "🏆" },
      { id: "ach-2", title: "Top Campus Mentor Badge", date: "Fall 2024", badge: "⭐" },
      { id: "ach-3", title: "50+ Skill Exchange Hours", date: "Dec 2024", badge: "🎓" }
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://alexrivera.dev"
    }
  },
  {
    id: "std-2",
    name: "Elena Rostova",
    email: "elena.rostova@stanford.edu",
    college: "Stanford University",
    department: "Symbolic Systems & HCI",
    year: "Junior",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    bio: "Design thinking devotee & visual storyteller. Specializing in high-fidelity Figma prototypes, design tokens, and user research. Excited to trade design chops for machine learning and React!",
    location: "Stanford, CA",
    rating: 5.0,
    reviewCount: 22,
    completedExchanges: 19,
    activeProjects: 2,
    availability: "5-10 hrs/week • Flexible hours",
    experienceLevel: "Junior",
    skillsOffered: [
      {
        id: "sk-201",
        name: "UI/UX Design & Prototyping",
        category: "UI/UX Design",
        level: "Advanced",
        endorsements: 38,
        description: "Interactive Figma components, auto-layout mastery, wireframing, user testing scripts, and creating design system libraries.",
        tags: ["Figma", "Design Systems", "Prototyping", "User Research"]
      },
      {
        id: "sk-202",
        name: "Graphic Design & Branding",
        category: "Graphic Design",
        level: "Advanced",
        endorsements: 21,
        description: "Visual identity design, vector typography, brand guidelines, and vector asset creation using Adobe Illustrator.",
        tags: ["Illustrator", "Brand Identity", "Typography", "Visuals"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-201",
        name: "React.js Component Architecture",
        category: "Web Development",
        level: "Intermediate",
        priority: "High",
        description: "Want to implement my Figma designs directly in clean React and Tailwind CSS."
      },
      {
        id: "skw-202",
        name: "AI Prompt Engineering & LLM APIs",
        category: "AI & Machine Learning",
        level: "Beginner",
        priority: "Medium",
        description: "Curious how to integrate Gemini or OpenAI APIs into interactive web experiences."
      }
    ],
    projects: [
      {
        id: "proj-201",
        title: "Aura Mental Wellness UI Kit",
        description: "An open-source accessible design system crafted for healthcare and wellness apps with 1,200+ Figma community clones.",
        link: "https://figma.com/@elena",
        role: "Lead Product Designer",
        tags: ["Figma", "Accessibility", "Design System"]
      }
    ],
    achievements: [
      { id: "ach-4", title: "Figma Campus Ambassador", date: "2024", badge: "🎨" },
      { id: "ach-5", title: "TreeHacks Best Design Award", date: "Feb 2024", badge: "🥇" }
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://elenarostova.design"
    }
  },
  {
    id: "std-3",
    name: "Marcus Chen",
    email: "marcus.chen@mit.edu",
    college: "MIT",
    department: "Artificial Intelligence & Robotics",
    year: "Master's",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
    bio: "Grad student working on deep learning, computer vision, and neural networks. Looking to exchange AI/ML mentoring for frontend interactive data visualizations or startup pitch coaching.",
    location: "Cambridge, MA",
    rating: 4.95,
    reviewCount: 31,
    completedExchanges: 26,
    activeProjects: 4,
    availability: "4-6 hrs/week • Weekends",
    experienceLevel: "Master's",
    skillsOffered: [
      {
        id: "sk-301",
        name: "Machine Learning & PyTorch",
        category: "AI & Machine Learning",
        level: "Advanced",
        endorsements: 45,
        description: "Deep neural networks, PyTorch training loops, transfer learning, fine-tuning Vision Transformers and CNNs.",
        tags: ["PyTorch", "Python", "Deep Learning", "Computer Vision"]
      },
      {
        id: "sk-302",
        name: "Data Science & Pandas/NumPy",
        category: "AI & Machine Learning",
        level: "Advanced",
        endorsements: 33,
        description: "Exploratory data analysis, statistical modeling, feature engineering, and automated Jupyter notebook workflows.",
        tags: ["Pandas", "Scikit-Learn", "Matplotlib", "Statistics"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-301",
        name: "Interactive Data Viz with D3 / Three.js",
        category: "Web Development",
        level: "Intermediate",
        priority: "High",
        description: "Need to build interactive 3D model visualizers and charts for research publications."
      },
      {
        id: "skw-302",
        name: "Startup Pitch & Communication",
        category: "Communication",
        level: "Beginner",
        priority: "High",
        description: "Preparing for demo day and seed investor presentations."
      }
    ],
    projects: [
      {
        id: "proj-301",
        title: "NeuroLens Vision Diagnostics",
        description: "Real-time edge device eye-tracking model for neurological tremor detection.",
        link: "https://github.com/marcuschen/neurolens",
        role: "ML Research Lead",
        tags: ["PyTorch", "OpenCV", "EdgeAI"]
      }
    ],
    achievements: [
      { id: "ach-6", title: "NeurIPS 2024 Workshop Speaker", date: "Dec 2024", badge: "🧠" },
      { id: "ach-7", title: "MIT Sandbox Grant Winner", date: "May 2024", badge: "🚀" }
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://marcuschen.ai"
    }
  },
  {
    id: "std-4",
    name: "Sophia Martinez",
    email: "sophia.m@nyu.edu",
    college: "NYU Tisch & Stern",
    department: "Film & Digital Marketing",
    year: "Senior",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80",
    bio: "Content creator, video producer, and growth marketer with 150k+ aggregate TikTok/Reels followers. I can help students create viral product launches, edit high-energy video content, and run college social campaigns.",
    location: "New York, NY",
    rating: 4.88,
    reviewCount: 16,
    completedExchanges: 12,
    activeProjects: 2,
    availability: "5 hrs/week • Flexible",
    experienceLevel: "Senior",
    skillsOffered: [
      {
        id: "sk-401",
        name: "Premiere Pro & After Effects",
        category: "Video Editing",
        level: "Advanced",
        endorsements: 29,
        description: "Pacing, sound design, color grading in Lumetri, keyframe kinetic typography, and vertical short-form editing.",
        tags: ["Premiere Pro", "After Effects", "Sound Design", "Color Grading"]
      },
      {
        id: "sk-402",
        name: "Growth Marketing & Social Strategy",
        category: "Marketing",
        level: "Advanced",
        endorsements: 22,
        description: "Hook optimization, organic content funnels, campus ambassador campaigns, and UGC creation strategies.",
        tags: ["Social Media", "Growth", "TikTok Strategy", "Content Funnels"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-401",
        name: "Web Development / Webflow / Portfolio",
        category: "Web Development",
        level: "Beginner",
        priority: "High",
        description: "Want to build an aesthetic personal portfolio site and client landing pages."
      }
    ],
    projects: [
      {
        id: "proj-401",
        title: "NYU Creator Collective Docuseries",
        description: "6-part mini-docuseries spotlighting student founders across New York City.",
        link: "https://youtube.com",
        role: "Director & Lead Editor",
        tags: ["Documentary", "Cinematography", "Marketing"]
      }
    ],
    achievements: [
      { id: "ach-8", title: "Adobe Certified Professional", date: "2023", badge: "🎬" },
      { id: "ach-9", title: "NYU Entrepreneurship Challenge Winner", date: "2024", badge: "💡" }
    ],
    socialLinks: {
      github: "",
      linkedin: "https://linkedin.com",
      portfolio: "https://sophiamartinez.media"
    }
  },
  {
    id: "std-5",
    name: "Devon Vance",
    email: "devon.vance@gatech.edu",
    college: "Georgia Tech",
    department: "Electrical & Computer Engineering",
    year: "Junior",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    bio: "Hardware enthusiast, embedded systems coder, and IoT builder. Skilled in C/C++, Arduino/ESP32, circuit schematic design, and 3D printing. Seeking help with mobile app development (React Native or Flutter).",
    location: "Atlanta, GA",
    rating: 4.85,
    reviewCount: 14,
    completedExchanges: 11,
    activeProjects: 3,
    availability: "8 hrs/week • Afternoons",
    experienceLevel: "Junior",
    skillsOffered: [
      {
        id: "sk-501",
        name: "C++ & Embedded Systems",
        category: "Programming",
        level: "Advanced",
        endorsements: 20,
        description: "Memory optimization, microcontroller firmware (ESP32, STM32), real-time operating systems (FreeRTOS), and hardware sensor protocols (I2C, SPI).",
        tags: ["C++", "C", "Microcontrollers", "IoT", "FreeRTOS"]
      },
      {
        id: "sk-502",
        name: "3D CAD & Prototyping",
        category: "Graphic Design",
        level: "Intermediate",
        endorsements: 12,
        description: "Fusion 360 parametric modeling, 3D printing tolerances, and rapid hardware casing prototyping.",
        tags: ["Fusion 360", "3D Printing", "Hardware", "CAD"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-501",
        name: "Mobile App Development",
        category: "Web Development",
        level: "Beginner",
        priority: "High",
        description: "Need to build a cross-platform mobile app to connect via Bluetooth BLE to my hardware projects."
      }
    ],
    projects: [
      {
        id: "proj-501",
        title: "SmartHydrate Sensor Bottle",
        description: "ESP32 Bluetooth-connected hydration tracking sleeve with companion analytics.",
        link: "https://github.com",
        role: "Firmware Engineer",
        tags: ["C++", "BLE", "ESP32"]
      }
    ],
    achievements: [
      { id: "ach-10", title: "HackGT Best Hardware Hack", date: "Sep 2024", badge: "⚡" }
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: ""
    }
  },
  {
    id: "std-6",
    name: "Aaliyah Washington",
    email: "aaliyah.w@ucla.edu",
    college: "UCLA",
    department: "Communications & Business Admin",
    year: "Senior",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    bio: "Public speaking coach, startup deck strategist, and debate champion. I help engineers turn complex technical jargon into irresistible narratives for investors, hackathon judges, and campus leadership.",
    location: "Los Angeles, CA",
    rating: 4.97,
    reviewCount: 27,
    completedExchanges: 23,
    activeProjects: 3,
    availability: "6 hrs/week • Weeknights",
    experienceLevel: "Senior",
    skillsOffered: [
      {
        id: "sk-601",
        name: "Executive Public Speaking & Pitching",
        category: "Communication",
        level: "Advanced",
        endorsements: 41,
        description: "Vocal projection, slide deck storytelling, handling tough Q&A rounds, and commanding the stage under pressure.",
        tags: ["Public Speaking", "Pitching", "Storytelling", "Leadership"]
      },
      {
        id: "sk-602",
        name: "Business Model Validation & Pitch Decks",
        category: "Business & Entrepreneurship",
        level: "Advanced",
        endorsements: 30,
        description: "Lean canvas formulation, pricing strategies, market sizing (TAM/SAM/SOM), and crafting 10-slide VC pitch decks.",
        tags: ["Business Models", "Pitch Decks", "Strategy", "Venture Capital"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-601",
        name: "No-Code Web App Tools (Bubble / Airtable)",
        category: "Web Development",
        level: "Beginner",
        priority: "High",
        description: "Looking to rapidly prototype MVPs without hiring developers for initial user testing."
      },
      {
        id: "skw-602",
        name: "Data Analytics & SQL",
        category: "Programming",
        level: "Beginner",
        priority: "Medium",
        description: "Want to write SQL queries to understand business cohort retention."
      }
    ],
    projects: [
      {
        id: "proj-601",
        title: "Bruin Pitch Lab",
        description: "Campus workshop series coaching over 200+ student founders for national competitions.",
        link: "https://ucla.edu",
        role: "Co-Founder & Lead Coach",
        tags: ["Public Speaking", "Startups", "Mentorship"]
      }
    ],
    achievements: [
      { id: "ach-11", title: "National Collegiate Debate Champion", date: "2023", badge: "🎙️" },
      { id: "ach-12", title: "Forbes Under 30 Scholar", date: "2024", badge: "🌟" }
    ],
    socialLinks: {
      github: "",
      linkedin: "https://linkedin.com",
      portfolio: "https://aaliyahwashington.com"
    }
  },
  {
    id: "std-7",
    name: "Rohan Varma",
    email: "rohan.varma@illinois.edu",
    college: "UIUC",
    department: "Computer Science",
    year: "Sophomore",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    bio: "Algorithm problem solver & competitive programmer (Codeforces Candidate Master). Passionate about data structures, algorithmic complexity, and backend systems. Want to learn Photography and UI Design!",
    location: "Urbana-Champaign, IL",
    rating: 4.82,
    reviewCount: 11,
    completedExchanges: 9,
    activeProjects: 2,
    availability: "7 hrs/week • Flexible",
    experienceLevel: "Sophomore",
    skillsOffered: [
      {
        id: "sk-701",
        name: "Data Structures & Algorithms (LeetCode Prep)",
        category: "Programming",
        level: "Advanced",
        endorsements: 35,
        description: "Graphs (BFS/DFS, Dijkstra), Dynamic Programming, Tree traversals, Bit manipulation, and FAANG interview mock rounds.",
        tags: ["Algorithms", "Data Structures", "C++", "Java", "Technical Interviews"]
      },
      {
        id: "sk-702",
        name: "Java & Spring Boot",
        category: "Web Development",
        level: "Intermediate",
        endorsements: 14,
        description: "Enterprise backend architecture, Spring Security, JPA/Hibernate, and REST controller patterns.",
        tags: ["Java", "Spring Boot", "SQL", "Backend"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-701",
        name: "DSLR Photography & Lightroom Editing",
        category: "Photography",
        level: "Beginner",
        priority: "High",
        description: "Just got a Sony A6400, need guidance on aperture, shutter speed, composition, and RAW color grading."
      },
      {
        id: "skw-702",
        name: "UI/UX Fundamentals",
        category: "UI/UX Design",
        level: "Beginner",
        priority: "Medium",
        description: "My frontend projects look like default bootstrap; want to learn visual hierarchy and typography."
      }
    ],
    projects: [
      {
        id: "proj-701",
        title: "AlgoVisualizer Pro",
        description: "Interactive visualizer for pathfinding and graph optimization algorithms.",
        link: "https://github.com",
        role: "Creator",
        tags: ["Algorithms", "JavaScript", "Canvas"]
      }
    ],
    achievements: [
      { id: "ach-13", title: "ICPC Regional Qualifier", date: "2024", badge: "💻" }
    ],
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: ""
    }
  },
  {
    id: "std-8",
    name: "Chloe Dubois",
    email: "chloe.dubois@columbia.edu",
    college: "Columbia University",
    department: "Visual Arts & Photojournalism",
    year: "Junior",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80",
    bio: "Editorial photographer & photojournalist published in campus publications and indie magazines. I teach manual camera controls, natural light portraiture, and Lightroom color grading presets.",
    location: "New York, NY",
    rating: 4.92,
    reviewCount: 15,
    completedExchanges: 13,
    activeProjects: 2,
    availability: "5 hrs/week • Weekends",
    experienceLevel: "Junior",
    skillsOffered: [
      {
        id: "sk-801",
        name: "DSLR / Mirrorless Photography",
        category: "Photography",
        level: "Advanced",
        endorsements: 28,
        description: "Mastering the exposure triangle, focal lengths, prime lenses, portrait composition, and street photography ethics.",
        tags: ["Photography", "Portraits", "Composition", "Sony/Canon"]
      },
      {
        id: "sk-802",
        name: "Adobe Lightroom & Color Grading",
        category: "Photography",
        level: "Advanced",
        endorsements: 25,
        description: "Tone curves, HSL color tuning, mask adjustments, batch editing workflows, and building custom aesthetic presets.",
        tags: ["Lightroom", "Color Grading", "Post Processing", "Photoshop"]
      }
    ],
    skillsWanted: [
      {
        id: "skw-801",
        name: "Personal Brand & Web Portfolio in React",
        category: "Web Development",
        level: "Beginner",
        priority: "High",
        description: "Want to showcase high-res galleries with fluid masonry grids and fast lazy loading."
      },
      {
        id: "skw-802",
        name: "Social Media Growth & Marketing",
        category: "Marketing",
        level: "Intermediate",
        priority: "Medium",
        description: "How to monetize photo licensing and build an engaged following on Instagram."
      }
    ],
    projects: [
      {
        id: "proj-801",
        title: "Morningside Chronicles",
        description: "A photo essay depicting student life and local neighborhood artisans in Upper Manhattan.",
        link: "https://chloedubois.photo",
        role: "Photographer & Author",
        tags: ["Photojournalism", "Editorial", "Lightroom"]
      }
    ],
    achievements: [
      { id: "ach-14", title: "Columbia Spectator Best Feature Photo", date: "2024", badge: "📷" }
    ],
    socialLinks: {
      github: "",
      linkedin: "https://linkedin.com",
      portfolio: "https://chloedubois.photo"
    }
  }
];

