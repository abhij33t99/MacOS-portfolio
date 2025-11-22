import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Github, ExternalLink } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 p-6 overflow-y-auto text-black">
      <h1 className="text-2xl font-bold mb-6 px-2">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group relative">
            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400 rounded-t-xl overflow-hidden">
              {/* Placeholder for project image */}
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🖥️</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-gray-600 hover:text-black"
                  >
                    <Github size={16} className="mr-1" /> Code
                  </a>
                )}
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink size={16} className="mr-1" /> Live Demo
                  </a>
                )}
              </div>
            </div>
            
            {/* Tooltip on hover - positioned outside the card */}
            <div className="absolute left-0 right-0 top-full mt-2 mx-4 p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
              <div className="font-semibold mb-2">{project.title}</div>
              <div className="text-gray-200">{project.description}</div>
              {/* Arrow pointing up */}
              <div className="absolute -top-2 left-8 w-4 h-4 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
