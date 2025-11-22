import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';
import { format } from 'date-fns';

export const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 bg-white/40 backdrop-blur-md flex items-center justify-between px-4 text-sm font-medium select-none fixed top-0 w-full z-50 border-b border-white/20 text-black hidden md:flex">
      <div className="flex items-center space-x-4">
        <Apple size={18} className="fill-current" />
        <span className="font-bold">Finder</span>
        <span className="hidden md:inline">File</span>
        <span className="hidden md:inline">Edit</span>
        <span className="hidden md:inline">View</span>
        <span className="hidden md:inline">Go</span>
        <span className="hidden md:inline">Window</span>
        <span className="hidden md:inline">Help</span>
      </div>

      <div className="flex items-center space-x-4">
        <Battery size={18} className="rotate-90" />
        <Wifi size={18} />
        <Search size={16} />
        <SlidersHorizontal size={16} />
        <span>{format(time, 'EEE MMM d h:mm aa')}</span>
      </div>
    </div>
  );
};
