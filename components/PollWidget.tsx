import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';

const PollWidget: React.FC = () => {
  const [pollVoted, setPollVoted] = useState(false);

  return (
    <div className="bg-brand-blue rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 p-32 bg-brand-orange rounded-full blur-3xl opacity-20"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-6">
            <BarChart2 className="w-6 h-6 text-brand-orange mr-3" />
            <h3 className="text-xl font-bold">Citizen Opinion Poll</h3>
        </div>
        {!pollVoted ? (
          <div className="grid sm:grid-cols-3 gap-4">
            {['Road Maintenance', 'Street Lighting', 'Garbage Collection'].map(o => (
              <button 
                key={o} 
                onClick={() => setPollVoted(true)} 
                className="bg-white/10 hover:bg-brand-orange border border-white/10 hover:border-brand-orange transition-all py-3 px-4 rounded-lg font-medium text-sm text-left"
              >
                {o}
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in-up space-y-4">
            <p className="mb-4 text-brand-green font-bold">Thank you for your vote!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollWidget;