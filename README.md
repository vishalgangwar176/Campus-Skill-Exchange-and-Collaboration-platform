# 🎓 Campus Skill Exchange & Collaboration Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80" alt="Campus Skill Exchange Banner" width="100%" style="border-radius: 16px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <strong>A premium, modern peer-to-peer knowledge barter & hackathon squad assembly platform built exclusively for college students.</strong>
</p>

<p align="center">
  <a href="https://github.com/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform"><img src="https://img.shields.io/github/stars/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform?style=for-the-badge&color=6366f1&logo=github" alt="GitHub Stars" /></a>
  <a href="https://github.com/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform/fork"><img src="https://img.shields.io/github/forks/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform?style=for-the-badge&color=8b5cf6&logo=github" alt="GitHub Forks" /></a>
  <a href="https://github.com/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform/issues"><img src="https://img.shields.io/github/issues/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform?style=for-the-badge&color=38bdf8" alt="GitHub Issues" /></a>
  <a href="https://github.com/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/React_Router-6.28.0-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Lucide_Icons-0.460.0-F97316?style=flat-square&logo=lucide&logoColor=white" alt="Lucide Icons" />
  <img src="https://img.shields.io/badge/Storage-LocalStorage-10B981?style=flat-square" alt="LocalStorage" />
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem & The Solution](#-the-problem--the-solution)
- [Key Features](#-key-features)
- [Walkthrough of Core Pages](#-walkthrough-of-core-pages)
  - [1. Landing Page](#1-landing-page)
  - [2. Authentication & Demo Personas](#2-authentication--demo-personas)
  - [3. Personalized Dashboard](#3-personalized-dashboard)
  - [4. Explore Skills Directory](#4-explore-skills-directory)
  - [5. Student Profile & Endorsements](#5-student-profile--endorsements)
  - [6. Skill Exchange Hub & Live Chat](#6-skill-exchange-hub--live-chat)
  - [7. Collaboration Hub (Hackathon Squads)](#7-collaboration-hub-hackathon-squads)
  - [8. Notifications Center](#8-notifications-center)
  - [9. Settings & Identity Customization](#9-settings--identity-customization)
- [Design System & UI/UX Standards](#-design-system--uiux-standards)
- [State Management & LocalStorage Persistence](#-state-management--localstorage-persistence)
- [Project Architecture](#-project-architecture)
- [Quick Start Guide](#-quick-start-guide)
- [Interactive Demo Personas](#-interactive-demo-personas)
- [Academic Project Information](#-academic-project-information)
- [Contributors](#-contributors)
- [License](#-license)

---

## 📖 Overview

**Campus Skill Exchange & Collaboration Platform** is a modern collegiate web application that connects university students to barter knowledge and assemble hackathon/project teams. 

Instead of paying expensive course fees or scrolling through unstructured college group chats, students can:
1. **Teach What They Know**: Offer their expertise (e.g., React, Python, Video Editing, Public Speaking).
2. **Learn What They Need**: Get mentored 1-on-1 by fellow students (e.g., UI/UX in Figma, PyTorch, Pitch Decks).
3. **Assemble Winning Squads**: Recruit cross-disciplinary teammates for hackathons (CalHacks, TreeHacks, HackGT) and capstone projects.

The frontend is built with **React 18**, **Vite**, and **Tailwind CSS**, styled with a sleek Linear/Notion aesthetic, and powered by client-side browser **`LocalStorage` persistence** for a complete, zero-backend interactive experience.

---

## 💡 The Problem & The Solution

```
┌────────────────────────────────────────────────────────┐
│                      THE PROBLEM                       │
├────────────────────────────────────────────────────────┤
│ ❌ Expensive online courses with zero 1-on-1 feedback  │
│ ❌ Isolated campus silos (CS, Design, Business don't   │
│    naturally cross paths)                              │
│ ❌ Chaotic Discord & WhatsApp groups for hackathon     │
│    teammate search                                     │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                      THE SOLUTION                      │
├────────────────────────────────────────────────────────┤
│ ✅ Peer-to-peer 1-on-1 skill barter: Zero tuition cost │
│ ✅ Structured skill compatibility matching             │
│ ✅ Dedicated Squad Recruitment Board with open slots   │
│ ✅ Real-time proposal management and direct peer chat  │
└────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- **Zero External Backend Required**: Operates seamlessly in the browser using interactive mock datasets and synchronized `localStorage`.
- **10 Core Campus Categories**: Programming, Web Development, AI/ML, UI/UX Design, Graphic Design, Video Editing, Photography, Marketing, Communication, and Business/Entrepreneurship.
- **1-Click Demo Personas**: Instantly switch identities between 4 diverse student profiles (CS Engineer, Product Designer, AI Researcher, Video Producer) to test barter interactions from both sides.
- **Live Peer Messaging**: Full-featured chat room to coordinate session times, share Google Meet links, and plan milestones.
- **Interactive Modals**:
  - `RequestExchangeModal`: Barter proposal creator with automatic complementary skill detection.
  - `CreateProjectModal`: Publish new projects with required skills, deadlines, and team limits.
  - `AddSkillModal`: Add new skills offered or learning goals to your student profile.
- **Dynamic Profile Readiness**: Visual progress tracker guiding students to complete their mentor card.
- **Local Photo Upload**: Select any image from your computer to update your avatar using live `FileReader` data URLs.

---

## 🖥️ Walkthrough of Core Pages

### 1. Landing Page
- **Hero Banner**: Strong headline with animated badge indicator and quick action buttons.
- **Live Statistics**: 3,800+ Active Students, 850+ Skills Exchanged, 320+ Squads Formed, 98.4% Satisfaction Rate.
- **Featured Skills**: Interactive skill cards with endorsement badges and mutual barter match tags.
- **How It Works**: 3-step illustrated workflow (*List Skills*, *Find Peers*, *Barter & Build*).
- **Student Testimonials**: Verified stories from students at Stanford, Georgia Tech, and NYU.

### 2. Authentication & Demo Personas
- College `.edu` email authentication with full validation.
- Password visibility toggle (`Eye` / `EyeOff`).
- Student profile setup (Name, University, Department, Class Standing).
- Initial barter skill configuration (1 skill you teach + 1 skill you want).
- Quick **1-Click Demo Logins** for instant evaluation.

### 3. Personalized Dashboard
- Dynamic greeting tailored to the active student persona.
- Real-time pending barter proposal alerts.
- Profile completion bar with actionable tips.
- Reputation counters: Completed Trades, Rating (e.g., `4.9 ★`), Active Squads, and Weekly Availability.
- Skills Offered vs. Skills Wanted barter cards with "+ Add Skill" modal triggers.
- Recent exchanges feed with one-click **Accept** and **Decline** buttons.
- Recommended student matches based on complementary skills.

### 4. Explore Skills Directory
- Fast instant search across skills, tools, descriptions, and colleges.
- Filter pills for all 10 campus categories.
- Filter by proficiency: **Beginner**, **Intermediate**, and **Advanced**.
- Toggle between **Skills View** and **Students View**.
- Sort options: *Most Endorsed*, *Highest Student Rating*, and *Alphabetical (A-Z)*.

### 5. Student Profile & Endorsements
- Custom university cover banner, student avatar, and online status badge.
- College & department credentials, class year, and bio.
- Endorsed skills offered with detailed descriptions and hashtags.
- Skills wanted with priority ratings (*High / Medium*).
- Project portfolio links and hackathon achievements.
- Functional **Connect** button and **Propose Skill Exchange** modal.

### 6. Skill Exchange Hub & Live Chat
- **2-Column Workspace**:
  - **Left Queue**: Tabbed lists for *Incoming*, *Outgoing*, and *All* exchange requests.
  - **Right Workspace**: Detailed barter proposal contract + interactive chat room.
- Status badges: `Pending Review`, `Accepted • Active Session`, and `Declined`.
- Real-time message stream with timestamping and instant response handling.

### 7. Collaboration Hub (Hackathon Squads)
- Squad board categorized by: *Hackathon*, *Capstone*, *Startup MVP*, *Open Source*, and *Campus Initiative*.
- Team roster display showing existing members and empty slot placeholders (`+1 Open`).
- **Post a Project Modal**: Set project title, description, team size (2 to 6 members), deadline, and required skills.
- **Join Team Modal**: Apply to join a squad by specifying your intended role (e.g., *Frontend Lead*, *UI Designer*).

### 8. Notifications Center
- Categorized notification feed: *All*, *Unread*, *Skill Barters*, *Project Squads*, and *Connections*.
- Direct deep-links to exchange rooms or project pages.
- Single-click **"Mark All as Read"** and individual alert deletion.

### 9. Settings & Identity Customization
- **Local Photo Upload**: Choose any local image to update your profile picture with instant preview.
- **Identity Editor**: Update full name, college, department, class standing, and bio.
- **Barter Portfolio Editor**: Add or delete skills you offer and learning goals.
- **Notification Toggles**: Granular settings for email digests and proposal alerts.
- **Reset Demo State**: Restore sample data with one click.

---

## 🎨 Design System & UI/UX Standards

Built to meet high modern SaaS design standards (Linear, Notion, Raycast):

| Token | Value / Class | Description |
|---|---|---|
| **Background Canvas** | `#fafbfe` / `bg-[#fafbfe]` | Premium soft off-white canvas |
| **Primary Brand** | `#6366f1` / `brand-600` | Indigo primary accent for tech & clarity |
| **Creative Accent** | `#8b5cf6` / `violet-600` | Violet secondary accent for creative fields |
| **Success & Online** | `#10b981` / `emerald-500` | Active status dots, accepted contracts |
| **Headings Font** | `Plus Jakarta Sans` | Modern geometric sans-serif |
| **Body Font** | `Inter` | High legibility neutral sans-serif |
| **Card Borders** | `border-slate-200/80` | Subtle hairline borders |
| **Shadows** | `shadow-card`, `shadow-card-hover` | Deep, soft SaaS card elevations |
| **Responsiveness** | Mobile, Tablet, Desktop | Dedicated drawer on mobile + persistent sidebar on desktop |

---

## 💾 State Management & LocalStorage Persistence

All changes persist across page refreshes and browser restarts:

```
┌────────────────────────────────────────────────────────┐
│                   LOCALSTORAGE KEYS                    │
├─────────────────────────────┬──────────────────────────┤
│ Key                         │ Stores                   │
├─────────────────────────────┼──────────────────────────┤
│ campusexchange_user         │ Active student profile   │
│ campusexchange_students     │ All student profiles     │
│ campusexchange_projects     │ Active squads & rosters  │
│ campusexchange_exchanges    │ Barter requests & chats  │
│ campusexchange_notifications│ Notification alerts      │
│ campusexchange_connections  │ Connected student IDs    │
└─────────────────────────────┴──────────────────────────┘
```

---

## 🏗️ Project Architecture

```
Campus-Skill-Exchange-and-Collaboration-platform/
├── index.html                       # HTML5 template with Google Fonts preloads
├── package.json                     # Project dependencies & scripts
├── postcss.config.js                # PostCSS plugins
├── tailwind.config.js               # Theme extensions, brand colors, shadows
├── vite.config.js                   # Vite configuration (Port: 3000)
├── README.md                        # Documentation
└── src/
    ├── App.jsx                      # App routes & provider configuration
    ├── index.css                    # Global Tailwind styles & custom scrollbars
    ├── main.jsx                     # React application entry point
    ├── components/
    │   ├── AddSkillModal.jsx        # Modal to add offered skills or goals
    │   ├── AppLayout.jsx            # Main app shell with sidebar & header
    │   ├── CreateProjectModal.jsx   # Modal to post new squad initiatives
    │   ├── Footer.jsx               # Multi-column landing page footer
    │   ├── Navbar.jsx               # Landing page navigation bar
    │   ├── NotificationCard.jsx     # Alert card with action link
    │   ├── ProjectCard.jsx          # Collaboration project card & roster
    │   ├── RequestExchangeModal.jsx # Skill barter request modal
    │   ├── Sidebar.jsx              # Responsive navigation with persona tool
    │   ├── SkillCard.jsx            # Skill card with endorsements & tags
    │   └── StudentCard.jsx          # Student card with connect toggle
    ├── context/
    │   ├── AuthContext.jsx          # Session auth & demo persona switcher
    │   └── DataContext.jsx          # Global state (skills, chats, squads, notifs)
    ├── data/
    │   ├── exchangeRequests.js      # Initial barter proposals & chats
    │   ├── notifications.js         # Initial notifications
    │   ├── projects.js              # Initial hackathon & capstone squads
    │   ├── skills.js                # Aggregated skills & category definitions
    │   └── students.js              # Student profiles with rich initial data
    └── pages/
        ├── Collaboration.jsx        # Collaboration Hub (hackathon squads)
        ├── Dashboard.jsx            # Student dashboard & overview
        ├── ExploreSkills.jsx        # Searchable skills & student directory
        ├── Landing.jsx              # Public landing page
        ├── Login.jsx                # Student login screen
        ├── Notifications.jsx        # Notifications management page
        ├── Settings.jsx             # Profile editing, photo upload, demo reset
        ├── Signup.jsx               # Student registration screen
        ├── SkillExchange.jsx        # Barter desk & live chat room
        └── StudentProfile.jsx       # Public student profile view
```

---

## ⚡ Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) installed on your system.

### 1. Clone the repository
```bash
git clone https://github.com/vishalgangwar176/Campus-Skill-Exchange-and-Collaboration-platform.git
cd Campus-Skill-Exchange-and-Collaboration-platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`**.

### 4. Build for production
```bash
npm run build
```

---

## 🎭 Interactive Demo Personas

The sidebar includes an **Instant Demo Persona Switcher** designed for reviewers and testers to experience peer-to-peer exchanges from multiple perspectives:

| Student Persona | University | Department | Core Strengths | Seeking to Learn |
|---|---|---|---|---|
| **Alex Rivera** *(Default)* | UC Berkeley | Computer Science | React.js, FastAPI, Git | UI/UX in Figma, Video Editing |
| **Elena Rostova** | Stanford | Symbolic Systems & HCI | Figma Systems, Branding | React Hooks, AI Prompts |
| **Marcus Chen** | MIT | AI & Robotics | Machine Learning, PyTorch | D3 Data Viz, Pitch Coaching |
| **Sophia Martinez** | NYU Tisch | Film & Digital Marketing | Premiere Pro, Social Growth | Webflow / React Portfolio |

### Suggested Interactive Testing Flow
1. **Search**: Go to **Explore Skills**, search for `"Figma"`, and click **Exchange** on Elena's card.
2. **Send Proposal**: Select your React skill in exchange for her Figma skill and submit the proposal.
3. **Switch Persona**: In the sidebar, click **Elena Rostova** under Demo Personas.
4. **Accept & Chat**: Open **Skill Exchange** as Elena, review Alex's proposal, click **Accept Barter**, and reply in the live chat room.
5. **Join a Squad**: Open **Collaboration Hub**, find the *EcoCycle Smart Bin* project, click **Join Team**, and claim a slot.
6. **Upload Avatar**: Open **Settings**, select a picture from your computer, click **Save Profile Changes**, and verify it persists on refresh.

---

## 🎓 Academic Project Information

| Field | Details |
|---|---|
| **Course Name** | Object Oriented Techniques Using Java (OOTS) |
| **Course Code** | CCSE0355 |
| **Faculty Name** | Mr. Suraj Kumar |
| **Assignment Type** | Capstone Assignment |
| **Team / Group No.** | Group 88 (Capstone) |
| **Problem Statement / Project Title** | Campus Skill Exchange & Collaboration Platform |
| **Sustainable Development Goal (SDG)** | SDG 4 – Quality Education *(Proposed)* |
| **Reporting Month** | Month 2 |
| **Date of Submission** | 22 October 2026 |

### 👥 Project Team (Group 88)

| Student Name | ERP ID / Roll No. | Role |
|---|---|---|
| **Vikas Pal** | `2501330100408` | Frontend Developer & Contributor |
| **Vinayak Dev Tiwari** | `2501330100409` | Team Member |
| **Tanay Dubey** | `2501330100387` | Team Member |
| **Vishal Gangwar** | `2501330100410` | Team Member |
| **Urvashi Anand** | `2501330100394` | Team Member |

---

## 👤 Contributor

<p align="left">
  <a href="https://github.com/Vikaspal505">
    <img src="https://github.com/Vikaspal505.png" width="90" height="90" style="border-radius: 50%; margin-right: 15px;" alt="Vikas Pal" />
  </a>
</p>

- **Name**: **Vikas Pal**
- **GitHub**: [@Vikaspal505](https://github.com/Vikaspal505)
- **Roll No. / ERP ID**: `2501330100408`
- **Role**: Lead Frontend Developer & UI/UX Architect
- **Contributions**: Complete Frontend Engineering, React Component Architecture, Tailwind Design System, Interactive State Management & LocalStorage Persistence

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE). Feel free to fork, customize, and deploy for your own campus community!
