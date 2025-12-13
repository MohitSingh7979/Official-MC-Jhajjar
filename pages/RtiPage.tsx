import React from 'react';
import { Scale } from 'lucide-react';

const RtiPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white animate-fade-in-up">
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">RTI</h1>
          <p className="text-slate-300 max-w-2xl text-lg">Right to Information.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-brand-blue rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-40 bg-brand-orange/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="md:w-2/3">
                 <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-4">
                   <Scale className="w-4 h-4 mr-2" /> Right to Information
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Transparency is our priority.</h2>
                 <p className="text-slate-300 mb-6 leading-relaxed">
                   Under the RTI Act 2005, citizens can request information regarding the activities of the 
                   Municipal Council. Our Public Information Officers are dedicated to providing timely responses.
                 </p>
                 <div className="flex flex-wrap gap-4">
                   <button className="bg-brand-orange hover:bg-brand-orange/90 px-6 py-3 rounded-lg font-bold transition-colors">
                     File Online RTI
                   </button>
                   <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-lg font-bold transition-colors">
                     View Proactive Disclosures
                   </button>
                 </div>
               </div>
               
               <div className="md:w-1/3 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                 <h3 className="font-bold text-lg mb-4 border-b border-white/10 pb-2">RTI Officers</h3>
                 <div className="space-y-4">
                   <div>
                     <p className="text-xs text-slate-400 uppercase">First Appellate Authority</p>
                     <p className="font-medium">Sh. Deputy Commissioner</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 uppercase">SPIO</p>
                     <p className="font-medium">Sh. Executive Officer</p>
                     <a href="mailto:eo.mcj@hry.nic.in" className="text-xs text-brand-orange hover:underline">eo.mcj@hry.nic.in</a>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RtiPage;