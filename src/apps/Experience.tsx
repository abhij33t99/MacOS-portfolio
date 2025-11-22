import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Calendar, Briefcase } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <div className="h-full bg-white p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8 flex items-center">
        <Briefcase className="mr-3" /> Work Experience
      </h1>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {portfolioData.experience.map((exp) => (
          <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Briefcase size={16} />
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-slate-900">{exp.role}</div>
                <time className="font-caveat font-medium text-indigo-500 text-sm flex items-center">
                  <Calendar size={14} className="mr-1" /> {exp.period}
                </time>
              </div>
              <div className="text-slate-500 text-sm font-medium mb-2">{exp.company}</div>
              <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
