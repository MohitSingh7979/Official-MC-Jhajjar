import React, { useState } from 'react';
import { Bell, Pause, Play } from 'lucide-react';

const NewsTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-brand-red text-white relative overflow-hidden flex items-center h-12 group">
      {/* Label - Using Brand Blue for contrast/header feel */}
      <div className="bg-brand-blue h-full px-4 md:px-6 flex items-center z-20 font-bold text-xs md:text-sm uppercase tracking-wide shrink-0 shadow-lg relative border-r border-white/10">
        <Bell className="w-4 h-4 mr-2 animate-pulse text-brand-orange" />
        Latest Updates
      </div>
      
      {/* Marquee Area - Using Brand Red for alerts/news */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-brand-red">
        <div 
          className={`marquee-content whitespace-nowrap py-2 cursor-pointer flex items-center ${isPaused ? 'paused' : ''}`}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="mx-8 font-medium text-sm flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>Last date for Property Tax submission with 10% rebate extended till 31st Dec 2023.</span>
          <span className="mx-8 font-medium text-sm flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>Special sanitation drive to be held in Ward 4 & 5 this Sunday.</span>
          <span className="mx-8 font-medium text-sm flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>Online portals will be down for maintenance from 10 PM to 2 AM.</span>
          <span className="mx-8 font-medium text-sm flex items-center"><span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>Citizen feedback required for the new city park project.</span>
        </div>
      </div>

      {/* Control Button - Using Brand Blue to match label */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        className="h-full px-3 bg-brand-blue hover:bg-brand-blue/90 text-white z-20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange border-l border-white/10"
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