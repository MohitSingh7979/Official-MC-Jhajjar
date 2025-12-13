import React, { useState, useMemo } from 'react';
import { OFFICIALS, DIGNITARIES } from '../constants';
import { Search, Phone, Mail, Award, Filter, ArrowLeft, Info, HelpCircle } from 'lucide-react';

const OfficialsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const allOfficials = [...DIGNITARIES, ...OFFICIALS];
  const categories = ['All', 'National', 'State', 'District', 'Municipal'];

  const filteredData = useMemo(() => {
    return allOfficials.filter(official => {
      const matchesSearch = official.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            official.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'All' || official.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fade-in-up">
      {/* Header */}
      <div className="bg-brand-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <button 
            onClick={() => window.location.hash = ''} 
            className="flex items-center text-brand-orange text-sm font-bold mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </button>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Officials Directory</h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Connect with the administration. Find contact details and profiles of key officials serving Jhajjar.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 -mt-8 relative z-20">
        {/* Communication Protocol Card */}
        <div className="bg-white rounded-xl shadow-lg border-l-4 border-brand-orange p-6 mb-8">
            <div className="flex items-start">
               <div className="bg-brand-orange/10 p-3 rounded-lg mr-4 hidden sm:block">
                  <Mail className="w-6 h-6 text-brand-orange" />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
                     <span className="sm:hidden mr-2 text-brand-orange"><Mail className="w-5 h-5"/></span>
                     Centralized Communication Protocol
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                     To streamline administrative responses, all employees and branches without individual email addresses utilize the centralized email: <span className="font-mono font-bold text-brand-blue bg-slate-100 px-1 rounded">eo-jhajjar@ulbharyana.gov.in</span>.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                     <p className="text-xs font-bold text-slate-500 uppercase mb-2">How to send an email:</p>
                     <ul className="text-sm space-y-2 text-slate-700">
                        <li className="flex items-start">
                           <span className="bg-slate-200 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 shrink-0">1</span>
                           Use <strong className="mx-1">eo-jhajjar@ulbharyana.gov.in</strong> as the recipient.
                        </li>
                        <li className="flex items-start">
                           <span className="bg-slate-200 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 shrink-0">2</span>
                           In the <strong>Subject Line</strong>, clearly mention the department or official.
                           <br/><span className="text-slate-500 text-xs italic">Example: "Subject: Attention Engineering Wing - Road Repair Sector 4"</span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or designation..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-orange outline-none text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-auto">
             <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 pr-8 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
                    category === cat 
                      ? 'bg-brand-blue text-white border-brand-blue' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Fade Mask for Scroll Hint */}
            <div className="absolute right-0 top-0 bottom-2 md:bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((person) => (
              <div key={person.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-24 bg-gradient-to-r from-brand-blue to-brand-blue/80 relative">
                  <div className="absolute -bottom-10 left-6">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-md bg-white"
                    />
                  </div>
                  <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm`}>
                    {person.category}
                  </span>
                </div>
                
                <div className="pt-12 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-brand-orange transition-colors">
                    {person.name}
                  </h3>
                  <div className="flex items-center text-sm font-medium text-brand-blue mb-4">
                    <Award className="w-4 h-4 mr-2 text-brand-orange" />
                    {person.designation}
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {person.phone ? (
                      <a href={`tel:${person.phone}`} className="flex items-center text-sm text-slate-600 hover:text-brand-green transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-brand-green/10">
                          <Phone className="w-4 h-4" />
                        </div>
                        {person.phone}
                      </a>
                    ) : (
                      <div className="flex items-center text-sm text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                          <Phone className="w-4 h-4" />
                        </div>
                        Not Available
                      </div>
                    )}
                    
                    {person.email ? (
                      <div className="group/email relative">
                        <a href={`mailto:${person.email}`} className="flex items-center text-sm text-slate-600 hover:text-brand-green transition-colors">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-brand-green/10">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="truncate">{person.email}</span>
                        </a>
                        {person.message && (
                          <div className="mt-2 ml-11 text-[10px] text-brand-orange font-bold bg-brand-orange/5 p-2 rounded border border-brand-orange/20 flex items-start">
                             <HelpCircle className="w-3 h-3 mr-1 shrink-0 mt-0.5" />
                             {person.message}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center text-sm text-slate-400">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                          <Mail className="w-4 h-4" />
                        </div>
                        Not Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No officials found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
              <button 
                onClick={() => {setSearchTerm(''); setCategory('All');}}
                className="mt-4 text-brand-orange font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficialsDirectory;