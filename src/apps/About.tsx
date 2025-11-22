import React from 'react';
import { portfolioData } from '../data/portfolio';
import { MapPin, Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 flex flex-col md:flex-row text-black">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-100 border-r border-gray-200 p-6 flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden ring-4 ring-white shadow-lg">
          <img 
            src="https://ui-avatars.com/api/?name=Abhijeet+Karmakar&background=0D8ABC&color=fff&size=256" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{portfolioData.name}</h2>
        <p className="text-sm text-gray-500 mb-4">{portfolioData.title}</p>
        
        <div className="flex flex-col space-y-2 w-full text-sm">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            {portfolioData.location}
          </div>
          <div className="flex items-center text-gray-600">
            <Mail size={16} className="mr-2" />
            <a href={`mailto:${portfolioData.email}`} className="hover:text-blue-500 truncate">
              {portfolioData.email}
            </a>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          {portfolioData.socials.map((social) => (
            <a 
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              {social.icon === 'github' && <Github size={20} />}
              {social.icon === 'linkedin' && <Linkedin size={20} />}
              {social.icon === 'twitter' && <Twitter size={20} />}
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">
            {portfolioData.about}
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Technical Skills</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.languages.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Backend Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.backend.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2">AI/ML</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.aiml.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Data & Messaging</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.data.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2">DevOps & Cloud</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.devops.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
