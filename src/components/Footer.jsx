import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, GraduationCap, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                CampusExchange
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier peer-to-peer knowledge exchange and team-formation network built exclusively for college students. Barter skills, form hackathon squads, and build meaningful peer connections.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Explore Skills
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/app/explore?category=Programming" className="hover:text-white transition-colors">Programming & DSA</Link></li>
              <li><Link to="/app/explore?category=Web+Development" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/app/explore?category=UI%2FUX+Design" className="hover:text-white transition-colors">UI/UX & Figma</Link></li>
              <li><Link to="/app/explore?category=AI+%26+Machine+Learning" className="hover:text-white transition-colors">AI & PyTorch</Link></li>
              <li><Link to="/app/explore?category=Video+Editing" className="hover:text-white transition-colors">Video & Motion</Link></li>
            </ul>
          </div>

          {/* Column 2: Squads */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Collaborations
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/app/collaboration" className="hover:text-white transition-colors">Hackathon Squads</Link></li>
              <li><Link to="/app/collaboration" className="hover:text-white transition-colors">Senior Capstone Projects</Link></li>
              <li><Link to="/app/collaboration" className="hover:text-white transition-colors">Startup MVP Teammates</Link></li>
              <li><Link to="/app/skill-exchange" className="hover:text-white transition-colors">1-on-1 Skill Barter</Link></li>
              <li><Link to="/app/explore" className="hover:text-white transition-colors">Campus Student Directory</Link></li>
            </ul>
          </div>

          {/* Column 3: Safety & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Trust & Campus
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Verified .edu Auth</span>
              </li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How Peer Barter Works</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Student Case Studies</a></li>
              <li><span className="text-slate-500 cursor-not-allowed">Community Guidelines</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Ambassador Program</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CampusExchange Platform. All rights reserved. Built for student creators.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for collegiate peer learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

