import React, { useRef } from 'react';
import { useStore } from '../../store/useStore';
import { User, Briefcase, FolderGit2, Mail, Terminal } from 'lucide-react';
import gsap from 'gsap';

const apps = [
  { id: 'about', title: 'About Me', icon: User, color: 'bg-blue-500' },
  { id: 'projects', title: 'Projects', icon: FolderGit2, color: 'bg-purple-500' },
  { id: 'experience', title: 'Experience', icon: Briefcase, color: 'bg-green-500' },
  { id: 'contact', title: 'Contact', icon: Mail, color: 'bg-red-500' },
  { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'bg-gray-800' },
];

export const Dock: React.FC = () => {
  const { openWindow, windows } = useStore();
  const dockRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Simple scale effect using GSAP or just CSS hover
    // For a true magnification effect, we'd need more complex mouse tracking
    // Let's stick to a simple bounce/scale for now
    gsap.to(e.currentTarget, { scale: 1.2, duration: 0.2, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex">
      <div 
        ref={dockRef}
        className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 flex items-end space-x-4 shadow-2xl"
      >
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id, app.title)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative group flex flex-col items-center"
          >
            <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center text-white shadow-lg transition-all duration-200`}>
              <app.icon size={24} />
            </div>
            {/* Dot indicator for open apps */}
            {windows[app.id]?.isOpen && (
              <div className="w-1 h-1 bg-black/50 rounded-full mt-1" />
            )}
            {/* Tooltip */}
            <div className="absolute -top-12 bg-gray-800/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
              {app.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
