import React from 'react';
import { Loader2 } from 'lucide-react';

const SectionLoader: React.FC = () => {
  return (
    <div className="w-full py-24 flex flex-col items-center justify-center bg-slate-50 border-b border-slate-100">
      <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
      <p className="text-slate-400 text-sm font-medium animate-pulse">Loading section content...</p>
    </div>
  );
};

export default SectionLoader;