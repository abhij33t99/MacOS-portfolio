import React from 'react';
import { useStore } from '../../store/useStore';
import { About } from '../../apps/About';
import { Projects } from '../../apps/Projects';
import { Experience } from '../../apps/Experience';
import { Contact } from '../../apps/Contact';
import { Terminal } from '../../apps/Terminal';
import { Dock } from './Dock';
import { Window } from '../os/Window';

export const MobileLayout: React.FC = () => {
  const { windows } = useStore();

  const renderApp = (id: string) => {
    switch (id) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'experience':
        return <Experience />;
      case 'contact':
        return <Contact />;
      case 'terminal':
        return <Terminal />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* iOS‑style status bar */}
      <div
        style={{
          height: '44px',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '12px',
        }}
      >
        <span>9:41 AM</span>
        <span>🔋 100%</span>
      </div>

      {/* App content area */}
      <div
        className="relative z-0 w-full h-full pt-8 pb-24"
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3270&auto=format&fit=crop)',
          backgroundColor: '#2c3e50',
          backgroundSize: 'cover',
          padding: '1rem',
          color: '#fff', // ensure text is readable on dark background
        }}
      >
        {Object.values(windows).map((window) => (
          <Window key={window.id} id={window.id}>
            {renderApp(window.id)}
          </Window>
        ))}
      </div>

      {/* iOS‑style bottom navigation (home indicator) */}
      <Dock />
    </div>
  );
};
