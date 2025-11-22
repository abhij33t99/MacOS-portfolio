import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

interface HistoryEntry {
  type: 'command' | 'output';
  content: string | React.JSX.Element;
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', content: 'Welcome to Abhijeet\'s Portfolio Terminal!' },
    { type: 'output', content: 'Type /help to see available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const commands: Record<string, () => string | React.JSX.Element> = {
      '/help': () => (
        <div className="space-y-2">
          <div className="text-green-400 font-bold">Available Commands:</div>
          <div className="ml-4 space-y-1">
            <div><span className="text-yellow-400">/help</span> - Show this help message</div>
            <div><span className="text-yellow-400">/about</span> - Display information about me</div>
            <div><span className="text-yellow-400">/contact</span> - Show contact information</div>
            <div><span className="text-yellow-400">/experience</span> - List work experience</div>
            <div><span className="text-yellow-400">/projects</span> - Show my projects</div>
            <div><span className="text-yellow-400">/skills</span> - Display technical skills</div>
            <div><span className="text-yellow-400">/clear</span> - Clear the terminal</div>
          </div>
        </div>
      ),
      '/about': () => (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold">{portfolioData.name}</div>
          <div className="text-gray-300">{portfolioData.title}</div>
          <div className="mt-2">{portfolioData.about}</div>
          <div className="mt-2 text-gray-400">📍 {portfolioData.location}</div>
        </div>
      ),
      '/contact': () => (
        <div className="space-y-2">
          <div className="text-green-400 font-bold">Contact Information:</div>
          <div className="ml-4 space-y-1">
            <div>📧 Email: <a href={`mailto:${portfolioData.email}`} className="text-blue-400 hover:underline">{portfolioData.email}</a></div>
            {portfolioData.socials.map((social) => (
              <div key={social.platform}>
                🔗 {social.platform}: <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{social.url}</a>
              </div>
            ))}
          </div>
        </div>
      ),
      '/experience': () => (
        <div className="space-y-3">
          <div className="text-green-400 font-bold">Work Experience:</div>
          {portfolioData.experience.map((exp, idx) => (
            <div key={exp.id} className="ml-4 space-y-1">
              <div className="text-cyan-400 font-semibold">{idx + 1}. {exp.role} @ {exp.company}</div>
              <div className="text-gray-400 text-sm">{exp.period}</div>
              <ul className="ml-4 list-disc list-inside text-sm space-y-0.5">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
      '/projects': () => (
        <div className="space-y-3">
          <div className="text-green-400 font-bold">Projects:</div>
          {portfolioData.projects.map((project, idx) => (
            <div key={project.id} className="ml-4 space-y-1">
              <div className="text-cyan-400 font-semibold">{idx + 1}. {project.title}</div>
              <div className="text-sm">{project.description}</div>
              <div className="text-sm text-gray-400">Tech: {project.technologies.join(', ')}</div>
              {project.github && (
                <div className="text-sm">
                  GitHub: <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{project.github}</a>
                </div>
              )}
              {project.link && (
                <div className="text-sm">
                  Live: <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{project.link}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      ),
      '/skills': () => (
        <div className="space-y-2">
          <div className="text-green-400 font-bold">Technical Skills:</div>
          <div className="ml-4 space-y-2">
            <div>
              <div className="text-cyan-400 font-semibold">Languages:</div>
              <div className="ml-2 text-sm">{portfolioData.skills.languages.join(', ')}</div>
            </div>
            <div>
              <div className="text-cyan-400 font-semibold">Backend Frameworks:</div>
              <div className="ml-2 text-sm">{portfolioData.skills.backend.join(', ')}</div>
            </div>
            <div>
              <div className="text-cyan-400 font-semibold">AI/ML:</div>
              <div className="ml-2 text-sm">{portfolioData.skills.aiml.join(', ')}</div>
            </div>
            <div>
              <div className="text-cyan-400 font-semibold">Data & Messaging:</div>
              <div className="ml-2 text-sm">{portfolioData.skills.data.join(', ')}</div>
            </div>
            <div>
              <div className="text-cyan-400 font-semibold">DevOps & Cloud:</div>
              <div className="ml-2 text-sm">{portfolioData.skills.devops.join(', ')}</div>
            </div>
          </div>
        </div>
      ),
      '/clear': () => {
        setHistory([]);
        return '';
      },
    };

    if (trimmedCmd === '') {
      return;
    }

    // Add command to history
    setHistory((prev) => [...prev, { type: 'command', content: cmd }]);

    // Execute command
    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      if (output !== '') {
        setHistory((prev) => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'output', content: `Command not found: ${cmd}. Type /help for available commands.` },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-y-auto flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 space-y-2">
        {history.map((entry, idx) => (
          <div key={idx}>
            {entry.type === 'command' ? (
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2">$</span>
                <span className="text-white">{entry.content}</span>
              </div>
            ) : (
              <div className="text-gray-300 ml-4">{entry.content}</div>
            )}
          </div>
        ))}
        <div ref={historyEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center mt-2">
        <span className="text-cyan-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white caret-green-400"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};
