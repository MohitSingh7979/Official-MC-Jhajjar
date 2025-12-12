import React, { useState, useMemo } from 'react';
import { OFFICIALS, DIGNITARIES } from '../constants';
import { Search, Phone, Mail, Award, Filter, ArrowLeft } from 'lucide-react';

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
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
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
                      <a href={`mailto:${person.email}`} className="flex items-center text-sm text-slate-600 hover:text-brand-green transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-brand-green/10">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="truncate">{person.email}</span>
                      </a>
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