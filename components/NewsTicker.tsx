import React, { useState } from 'react';
import { Bell, Pause, Play } from 'lucide-react';

const NewsTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-brand-red text-white relative overflow-hidden flex items-center h-12 group">
      {/* Label */}
      <div className="bg-[#8a1c36] h-full px-4 md:px-6 flex items-center z-20 font-bold text-xs md:text-sm uppercase tracking-wide shrink-0 shadow-lg relative">
        <Bell className="w-4 h-4 mr-2 animate-pulse" />
        Latest Updates
      </div>
      
      {/* Marquee Area */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-brand-red">
        <div 
          className={`marquee-content whitespace-nowrap py-2 cursor-pointer flex items-center ${isPaused ? 'paused' : ''}`}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="mx-8 font-medium text-sm">• Last date for Property Tax submission with 10% rebate extended till 31st Dec 2023.</span>
          <span className="mx-8 font-medium text-sm">• Special sanitation drive to be held in Ward 4 & 5 this Sunday.</span>
          <span className="mx-8 font-medium text-sm">• Online portals will be down for maintenance from 10 PM to 2 AM.</span>
          <span className="mx-8 font-medium text-sm">• Citizen feedback required for the new city park project.</span>
        </div>
      </div>

      {/* Control Button (WCAG Requirement) */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        className="h-full px-3 bg-[#8a1c36] hover:bg-[#6e162b] text-white z-20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-label={isPaused ? "Play ticker" : "Pause ticker"}
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
      </button>

      <style>{`
        .paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;