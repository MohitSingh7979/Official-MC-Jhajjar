import React from 'react';
import { Home, Grid, AlertCircle, Phone } from 'lucide-react';

const MobileBottomNav: React.FC<{ onOpenGrievance: () => void }> = ({ onOpenGrievance }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 pb-safe">
      <div className="flex justify-around items-center h-16">
        <a href="#" className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-brand-orange active:text-brand-orange/80 transition-colors">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Home</span>
        </a>
        
        <a href="#services" className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-brand-orange active:text-brand-orange/80 transition-colors">
          <Grid className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Services</span>
        </a>

        {/* Floating Action Button Effect within Bar */}
        <div className="relative -top-5">
          <button 
            onClick={onOpenGrievance}
            className="flex flex-col items-center justify-center w-14 h-14 bg-brand-blue text-white rounded-full shadow-lg shadow-brand-blue/40 hover:scale-105 active:scale-95 transition-all border-4 border-slate-50 ring-2 ring-brand-blue/10"
            aria-label="Lodge Grievance"
          >
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <a href="#contact" className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-brand-orange active:text-brand-orange/80 transition-colors">
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wide">Contact</span>
        </a>
      </div>
    </div>
  );
};

export default MobileBottomNav;