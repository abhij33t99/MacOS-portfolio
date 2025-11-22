import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${portfolioData.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(formState.message)}`;
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center px-4 space-x-4 bg-gray-50">
        <button 
          onClick={handleSubmit}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Send size={18} />
          <span className="text-sm font-medium">Send</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <div className="border-b border-gray-200 py-2 flex items-center">
          <label className="w-16 text-gray-500 text-sm">To:</label>
          <div className="flex-1 text-sm font-medium text-gray-800">{portfolioData.email}</div>
        </div>
        
        <div className="border-b border-gray-200 py-2 flex items-center">
          <label className="w-16 text-gray-500 text-sm">Subject:</label>
          <input 
            type="text"
            value={formState.subject}
            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
            className="flex-1 text-sm outline-none bg-transparent"
            placeholder="Project Inquiry"
            required
          />
        </div>

        <textarea 
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="flex-1 mt-4 resize-none outline-none text-sm leading-relaxed"
          placeholder="Hi, I'd like to discuss a project..."
          required
        />
      </form>
    </div>
  );
};
