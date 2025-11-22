import React from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Window } from '../os/Window';
import { MobileLayout } from './MobileLayout';
import { useStore } from '../../store/useStore';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { About } from '../../apps/About';
import { Projects } from '../../apps/Projects';
import { Experience } from '../../apps/Experience';
import { Contact } from '../../apps/Contact';
import { Terminal } from '../../apps/Terminal';

export const Desktop: React.FC = () => {
  const { windows } = useStore();
  const { isMobile } = useMediaQuery();

  const renderApp = (id: string) => {
    switch (id) {
      case 'about': return <About />;
      case 'projects': return <Projects />;
      case 'experience': return <Experience />;
      case 'contact': return <Contact />;
      case 'terminal': return <Terminal />;
      default: return <div className="p-4">App not found</div>;
    }
  };

  // Render mobile layout for phones
  if (isMobile) {
    return <MobileLayout />;
  }

  // Desktop and tablet use the same layout for now
  return (
    <div className="h-screen w-screen overflow-hidden bg-cover bg-center relative font-sans text-gray-900"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3270&auto=format&fit=crop)',
        backgroundColor: '#2c3e50'
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <MenuBar />
      
      <div className="relative z-0 w-full h-full pt-8 pb-24">
        {Object.values(windows).map((window) => (
          <Window key={window.id} id={window.id}>
            {renderApp(window.id)}
          </Window>
        ))}
      </div>

      <Dock />
    </div>
  );
};
